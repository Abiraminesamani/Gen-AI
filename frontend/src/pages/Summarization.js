import React, { useState } from "react";

function Summarization() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text to summarize.");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (data.summary) {
        setSummary(data.summary);
      } else {
        setSummary("⚠️ Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      setSummary("⚠️ Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
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

      {summary && (
        <div style={{ marginTop: "20px" }}>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarization;
