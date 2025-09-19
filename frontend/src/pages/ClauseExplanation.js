import React, { useState } from "react";

function ClauseExplanation() {
  const [inputText, setInputText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!inputText.trim()) {
      alert("Please enter a legal clause to explain.");
      return;
    }

    setLoading(true);
    setExplanation("");

    try {
      const response = await fetch("http://localhost:5000/api/clause-explain", { // ✅ fixed route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clause: inputText }),
      });

      if (!response.ok) {
        throw new Error("Server error: " + response.status);
      }

      const data = await response.json();

      if (data.explanation) {
        setExplanation(data.explanation);
      } else {
        setExplanation("⚠ Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      setExplanation("⚠ Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Clause Explanation</h2>
      <textarea
        rows="4"
        cols="80"
        placeholder="Paste your legal clause here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <br />
      <button onClick={handleExplain} disabled={loading}>
        {loading ? "Explaining..." : "Explain"}
      </button>

      {explanation && (
        <div style={{ marginTop: "20px" }}>
          <h3>Explanation:</h3>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}

export default ClauseExplanation;
