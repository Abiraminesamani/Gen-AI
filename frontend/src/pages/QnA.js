import React, { useState } from "react";
import "./QnA.css"; // custom styles

function QnA() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Please enter a legal question.");
      return;
    }

    setLoading(true);
    setError("");
    
    const userMessage = { type: "user", content: question };
    setConversation(prev => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/api/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Server error: " + response.status);
      }

      const data = await response.json();

      if (data.answer) {
        const aiMessage = { type: "ai", content: data.answer };
        setConversation(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      setError("Error: " + error.message);
      const errorMessage = { type: "error", content: "Error: " + error.message };
      setConversation(prev => [...prev, errorMessage]);
    }

    setLoading(false);
    setQuestion("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const clearConversation = () => {
    setConversation([]);
    setError("");
  };

  return (
    <div className="qna-container">
      <div className="qna-header">
        <h2>Legal Q&A Assistant</h2>
        <p>Get answers to your legal questions powered by AI</p>
      </div>

      <div className="conversation-panel">
        <div className="conversation-header">
          <h3>Conversation</h3>
          {conversation.length > 0 && (
            <button onClick={clearConversation} className="btn-clear">
              Clear Chat
            </button>
          )}
        </div>
        
        <div className="messages-container">
          {conversation.length === 0 ? (
            <div className="empty-state">
              <p>Ask a legal question to get started</p>
            </div>
          ) : (
            conversation.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>
                <p>{msg.content}</p>
              </div>
            ))
          )}
          {loading && <p>🤖 AI is thinking...</p>}
        </div>
      </div>

      <div className="input-panel">
        {error && <div className="error-message">{error}</div>}
        <textarea
          placeholder="Ask a legal question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          rows="3"
        />
        <button 
          onClick={handleAsk} 
          disabled={loading || !question.trim()}
          className="btn-ask"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </div>
  );
}

export default QnA;
