import React, { useState } from "react";
import axios from "axios";
import "../styles/AskPage.css"; // Import the CSS file

const AskPage = () => {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("userToken");

    if (!token) {
      alert("Please log in to ask a question!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/ask",
        { url, question },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(res.data);
    } catch (err) {
      console.error("Error fetching response:", err);
      setResponse({ error: "Failed to get a response. Please try again." });
    }
  };

  return (
    <div className="ask-page-container">
      <h1 className="ask-page-title">Ask a Question About a Webpage</h1>
      <form onSubmit={handleSubmit} className="ask-form">
        <div className="input-group">
          <label htmlFor="url" className="input-label">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="question" className="input-label">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What is this page about?"
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="submit-button">Ask</button>
      </form>

      {response && (
        <div className="response-section">
          <h2 className="response-title">Response:</h2>
          {response.error ? (
            <p className="response-error">{response.error}</p>
          ) : (
            <pre className="response-content">{JSON.stringify(response, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default AskPage;
