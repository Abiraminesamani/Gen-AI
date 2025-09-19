import React, { useState } from "react";
import "./Summarization.css"; // optional styling

function Summarization() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text to summarize.");
      return;
    }

    setLoading(true);
    setSummary("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Server error: " + response.status);
      }

      const data = await response.json();
      if (data.summary) {
        setSummary(data.summary);
      } else {
        setError("⚠ Error: No summary returned");
      }
    } catch (error) {
      setError("⚠ Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="summarization-container">
      <h2>Summarization</h2>

      <textarea
        rows="8"
        cols="80"
        placeholder="Paste your legal text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <br />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {summary && (
        <div className="summary-box">
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarization;
