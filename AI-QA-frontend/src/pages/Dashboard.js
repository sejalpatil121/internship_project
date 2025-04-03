import React, { useState } from "react";
import API from "../axios";
import "../App.css";

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/extract", { url, question });
      setAnswer(res.data.answer);
    } catch (error) {
      alert("Error fetching data!");
    }
  };

  return (
    <div className="container">
      <h2>Intellecta: Info Scratcher Tool</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
        <textarea placeholder="Enter your question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
      {answer && <p>Answer: {answer}</p>}
    </div>
  );
};

export default Dashboard;
