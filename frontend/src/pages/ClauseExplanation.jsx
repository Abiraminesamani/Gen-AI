import React, { useState } from "react";
import axios from "axios";
import "./ClauseExplain.css";

function ClauseExplain() {
  const [clause, setClause] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [history, setHistory] = useState([]);

  const handleExplain = async () => {
    if (!clause.trim()) {
      setError("Please enter a clause to explain");
      return;
    }
    
    if (clause.length < 10) {
      setError("Clause is too short. Please enter a more detailed clause.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setExplanation("");

      const res = await axios.post("http://127.0.0.1:5000/api/clause-explain", {
        clause,
      });

      setExplanation(res.data.explanation);
      
      // Add to history
      setHistory(prev => [
        { 
          id: Date.now(), 
          clause: clause, 
          explanation: res.data.explanation,
          date: new Date().toLocaleString()
        },
        ...prev.slice(0, 4) // Keep only last 5 items
      ]);
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Error explaining clause. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearText = () => {
    setClause("");
    setExplanation("");
    setError("");
    setCharCount(0);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const loadFromHistory = (item) => {
    setClause(item.clause);
    setExplanation(item.explanation);
    setCharCount(item.clause.length);
  };

  const handleClauseChange = (e) => {
    const text = e.target.value;
    setClause(text);
    setCharCount(text.length);
  };

  return (
    <div className="clause-explain-container">
      <div className="clause-explain-header">
        <div className="logo">LegalClause</div>
        <h1>Legal Clause Explainer</h1>
        <p className="subtitle">Understand complex legal clauses with AI-powered explanations</p>
      </div>

      <div className="clause-explain-content">
        <div className="input-section">
          <div className="input-card">
            <div className="input-header">
              <h2><i className="fas fa-gavel"></i> Legal Clause</h2>
              <div className="char-count">{charCount} characters</div>
            </div>
            
            <textarea
              className="clause-input"
              placeholder="Paste your legal clause here..."
              value={clause}
              onChange={handleClauseChange}
              disabled={loading}
              rows="6"
            />
            
            <div className="actions">
              <button
                onClick={clearText}
                className="btn-secondary"
                disabled={loading}
              >
                <i className="fas fa-trash-alt"></i> Clear
              </button>
              
              <button
                onClick={handleExplain}
                disabled={loading || clause.length < 10}
                className={`btn-primary ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Analyzing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search"></i> Explain Clause
                  </>
                )}
              </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
        
        <div className="sidebar">
          <div className="explanation-card">
            <h2><i className="fas fa-lightbulb"></i> Explanation</h2>
            <div className="explanation-content">
              {explanation ? (
                <>
                  <p>{explanation}</p>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(explanation)}
                  >
                    <i className="fas fa-copy"></i> Copy
                  </button>
                </>
              ) : (
                <p className="placeholder">Your clause explanation will appear here...</p>
              )}
            </div>
          </div>
          
          <div className="history-card">
            <h2><i className="fas fa-history"></i> Recent Explanations</h2>
            <div className="history-content">
              {history.length === 0 ? (
                <p className="no-history">No recent explanations yet</p>
              ) : (
                <ul>
                  {history.map((item) => (
                    <li 
                      key={item.id} 
                      onClick={() => loadFromHistory(item)}
                      className="history-item"
                    >
                      <div className="history-clause">{item.clause.substring(0, 80)}...</div>
                      <div className="history-date">{item.date}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div className="tips-card">
            <h2><i className="fas fa-info-circle"></i> Tips</h2>
            <ul>
              <li><i className="fas fa-check"></i> Use complete clauses for accurate explanations</li>
              <li><i className="fas fa-check"></i> Focus on one clause at a time</li>
              <li><i className="fas fa-check"></i> Include context for better results</li>
              <li><i className="fas fa-check"></i> Complex clauses may take longer to analyze</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClauseExplain;