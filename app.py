from flask import Flask, request, jsonify
import os
import redis
import json
from flask_cors import CORS
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
CORS(app)

# Configure Redis
redis_client = redis.StrictRedis(
    host=os.getenv('REDIS_HOST', 'localhost'),
    port=os.getenv('REDIS_PORT', 6379),
    db=0,
    decode_responses=True
)

# Configure Google Generative AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    return text_splitter.split_text(text)

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")
    return vector_store

def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context.
    If the answer isn't in the context, say "answer is not available in the context".

    Context:
    {context}

    Question:
    {question}

    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-1.5-pro-002", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    return load_qa_chain(model, chain_type="stuff", prompt=prompt)

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

@app.route('/process', methods=['POST'])
def process():
    url_input = request.json.get('url')
    question = request.json.get('question')
    
    if not url_input or not question:
        return jsonify({'error': 'Both URL and question are required'}), 400
    
    # Create unique cache key
    cache_key = f"qa:{url_input}:{question}"
    
    # Check Redis cache first
    cached_response = redis_client.get(cache_key)
    if cached_response:
        print("Cache HIT - Returning cached response")
        return jsonify({
            'cached': True,
            'response': json.loads(cached_response)
        })
    
    print("Cache MISS - Processing request")
    text = get_url(url_input)
    if not text:
        return jsonify({'error': 'Failed to load content from URL'}), 400
    
    text_chunks = get_text_chunks(text)
    get_vector_store(text_chunks)
    
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    loaded_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = loaded_store.similarity_search(question)
    
    chain = get_conversational_chain()
    response = chain({"input_documents": docs, "question": question}, return_only_outputs=True)
    
    # Cache response for 1 hour (3600 seconds)
    redis_client.setex(cache_key, 3600, json.dumps(response))
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5001)