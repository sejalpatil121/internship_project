import React, { useState } from "react";

const SubmitForm = () => {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5001/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, question }),
      });

      const data = await res.json();
      setResponse(data.response || "No response received.");
    } catch (error) {
      console.error("Error submitting request:", error);
      setResponse("Failed to fetch response.");
    }
  };

  return (
    <div className="form-container">
      <h2>Ask a Question from a URL</h2>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Your Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div className="response-box">
          <h4>Response:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default SubmitForm;
