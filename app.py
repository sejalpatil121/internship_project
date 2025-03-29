from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import os
import redis
import json
from dotenv import load_dotenv
import google.generativeai as genai
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import UnstructuredURLLoader
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate

# Load environment variables
load_dotenv()
app = Flask(__name__)
app.secret_key = 'your-secret-key'  # Replace with a secure key in production

# Configure Redis
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)

# Configure Google Generative AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# --- Helper Functions ---

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    return text_splitter.split_text(text)

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")  # Save the index
    return vector_store

def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, making sure to provide all relevant details. 
    If the answer is not available in the provided context, return: "Answer is not available in the context."

    Context:
    {context}

    Question:
    {question}

    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-1.5-pro-002", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def get_url(url):
    try:
        loader = UnstructuredURLLoader(urls=[url])
        data = loader.load()
        cleaned_lines = []
        for ch in data:
            page_content = ch.page_content.strip()
            if page_content:
                lines = [line.strip() for line in page_content.splitlines() if line.strip()]
                cleaned_lines.extend(lines)
        return " ".join(cleaned_lines)
    except Exception as e:
        print(f"Error loading URL: {e}")
        return None

def process_question(url, question):
    cache_key = f"{url}:{question}"  # Unique key for caching

    # Check if response is already cached
    cached_response = redis_client.get(cache_key)
    if cached_response:
        print("Cache HIT - Returning cached response")
        return json.loads(cached_response)  # Return cached response

    print("Cache MISS - Processing request")
    text = get_url(url)
    if not text:
        return {"error": "Failed to load content from the URL."}

    text_chunks = get_text_chunks(text)
    get_vector_store(text_chunks)  # Build vector store
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    loaded_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = loaded_store.similarity_search(question)

    chain = get_conversational_chain()
    response = chain({"input_documents": docs, "question": question}, return_only_outputs=True)

    # Store response in Redis (cache expires in 1 hour)
    redis_client.setex(cache_key, 3600, json.dumps(response))

    return response

# --- Flask Routes ---

@app.route('/', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == 'admin' and password == 'password':
            session['logged_in'] = True
            return redirect(url_for('dashboard'))
        else:
            error = 'Invalid Credentials. Please try again.'
    return render_template('login.html', error=error)

@app.route('/dashboard', methods=['GET'])
def dashboard():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('dashboard.html')

@app.route('/process', methods=['POST'])
def process():
    if not session.get('logged_in'):
        return jsonify({'error': 'Unauthorized'}), 401
    url_input = request.form.get('url')
    question = request.form.get('question')
    if not url_input or not question:
        return jsonify({'error': 'Please provide both URL and question.'}), 400
    result = process_question(url_input, question)
    return jsonify(result)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
