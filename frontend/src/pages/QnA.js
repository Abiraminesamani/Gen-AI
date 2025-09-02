import React, { useState } from "react";

export default function QnA() {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      setOutput(data.simplified); // backend returns { simplified: "..." }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Q&A Page</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your legal text..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Simplify</button>
      <h2>Output:</h2>
      <p>{output}</p>
    </div>
  );
}
