import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Ask a Question About a Webpage</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What is this page about?"
            required
          />
        </div>
        <button type="submit">Ask</button>
      </form>

      {response && (
        <div>
          <h2>Response:</h2>
          {response.error ? (
            <p style={{ color: "red" }}>{response.error}</p>
          ) : (
            <pre>{JSON.stringify(response, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default AskPage;