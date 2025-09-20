import React, { useState } from "react";
import axios from "axios";
import "./QnA.css";

function QnA() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  
  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }
    
    if (question.length < 5) {
      setError("Question is too short. Please provide more details.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAnswer("");

      const res = await axios.post("http://127.0.0.1:5000/api/qa", {
        question,
      });
      
      setAnswer(res.data.answer);
      
      // Add to history
      setHistory(prev => [
        { 
          id: Date.now(), 
          question: question, 
          answer: res.data.answer,
          date: new Date().toLocaleString()
        },
        ...prev.slice(0, 4) // Keep only last 5 items
      ]);
    } catch (err) {
      console.error(err);
      setError("Error fetching answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearQuestion = () => {
    setQuestion("");
    setAnswer("");
    setError("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const loadFromHistory = (item) => {
    setQuestion(item.question);
    setAnswer(item.answer);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="qna-container">
      <div className="qna-header">
        <div className="logo">LegalQA</div>
        <h1>Legal Question & Answer</h1>
        <p className="subtitle">Get AI-powered answers to your legal questions</p>
      </div>

      <div className="qna-content">
        <div className="input-section">
          <div className="question-card">
            <div className="question-header">
              <h2><i className="fas fa-question-circle"></i> Ask a Legal Question</h2>
            </div>
            
            <div className="input-group">
              <textarea
                className="question-input"
                placeholder="Type your legal question here... (e.g., What are the requirements for a valid contract?)"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                rows="3"
              />
              
              <div className="suggestions">
                <span className="suggestion-title">Try asking:</span>
                <div className="suggestion-chips">
                  <div className="chip" onClick={() => setQuestion("What are the elements of a valid contract?")}>Elements of a valid contract</div>
                  <div className="chip" onClick={() => setQuestion("What is the difference between civil and criminal law?")}>Civil vs criminal law</div>
                  <div className="chip" onClick={() => setQuestion("How does intellectual property protection work?")}>Intellectual property</div>
                </div>
              </div>
            </div>
            
            <div className="actions">
              <button
                onClick={clearQuestion}
                className="btn-secondary"
                disabled={loading}
              >
                <i className="fas fa-times"></i> Clear
              </button>
              
              <button
                onClick={handleAsk}
                disabled={loading || question.length < 5}
                className={`btn-primary ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Researching...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search"></i> Ask Question
                  </>
                )}
              </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
          </div>
          
          {answer && (
            <div className="answer-card">
              <div className="answer-header">
                <h2><i className="fas fa-lightbulb"></i> Answer</h2>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(answer)}
                  title="Copy answer"
                >
                  <i className="fas fa-copy"></i>
                </button>
              </div>
              
              <div className="answer-content">
                <p>{answer}</p>
              </div>
              
              <div className="answer-actions">
                <div className="helpful-prompt">
                  <span>Was this helpful?</span>
                  <button className="feedback-btn">
                    <i className="fas fa-thumbs-up"></i>
                  </button>
                  <button className="feedback-btn">
                    <i className="fas fa-thumbs-down"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="sidebar">
          <div className="history-card">
            <div className="history-header">
              <h2><i className="fas fa-history"></i> Recent Questions</h2>
              {history.length > 0 && (
                <button 
                  className="clear-history"
                  onClick={() => setHistory([])}
                  title="Clear history"
                >
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </div>
            
            <div className="history-content">
              {history.length === 0 ? (
                <p className="no-history">Your question history will appear here</p>
              ) : (
                <div className="history-list">
                  {history.map((item) => (
                    <div 
                      key={item.id} 
                      className="history-item"
                      onClick={() => loadFromHistory(item)}
                    >
                      <div className="history-question">{item.question}</div>
                      <div className="history-date">{item.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="tips-card">
            <h2><i className="fas fa-info-circle"></i> Tips for Better Answers</h2>
            <ul>
              <li><i className="fas fa-check"></i> Be specific and detailed in your questions</li>
              <li><i className="fas fa-check"></i> Include relevant context when applicable</li>
              <li><i className="fas fa-check"></i> Ask one question at a time for best results</li>
              <li><i className="fas fa-check"></i> Use proper legal terminology when possible</li>
            </ul>
          </div>
          
          <div className="disclaimer-card">
            <h3><i className="fas fa-exclamation-triangle"></i> Disclaimer</h3>
            <p>This AI-powered legal information service provides general guidance only and does not constitute legal advice. For specific legal matters, please consult a qualified attorney.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QnA;