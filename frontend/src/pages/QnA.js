import React, { useState } from "react";

function QnA() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) {
      alert("Please enter a legal question.");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("http://localhost:5000/api/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }), // ✅ send question correctly
      });

      if (!response.ok) {
        throw new Error("Server error: " + response.status);
      }

      const data = await response.json();

      if (data.answer) {
        setAnswer(data.answer);
      } else {
        setAnswer("⚠ Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      setAnswer("⚠ Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Legal Q&A</h2>
      <input
        type="text"
        placeholder="Ask a legal question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "400px", padding: "8px" }}
      />
      <br /><br />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>

      {answer && (
        <div style={{ marginTop: "20px" }}>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default QnA;
