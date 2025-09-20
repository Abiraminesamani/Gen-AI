import React, { useState } from "react";
import axios from "axios";
import "./Summarization.css";

function Summarize() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [history, setHistory] = useState([]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setCharCount(newText.length);
  };

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please enter some text to summarize");
      return;
    }
    
    if (text.length < 50) {
      setError("Text is too short. Please enter at least 50 characters.");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/summarize", { text });
      setSummary(res.data.summary);
      
      // Add to history
      setHistory(prev => [
        { 
          id: Date.now(), 
          original: text, 
          summary: res.data.summary,
          date: new Date().toLocaleString()
        },
        ...prev.slice(0, 4) // Keep only last 5 items
      ]);
    } catch (err) {
      console.error(err);
      setError("Error summarizing text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearText = () => {
    setText("");
    setSummary("");
    setCharCount(0);
    setError("");
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
  };

  const loadFromHistory = (item) => {
    setText(item.original);
    setSummary(item.summary);
    setCharCount(item.original.length);
  };

  return (
    <div className="summarize-container">
      <div className="summarize-header">
        <div className="logo">LegalMind</div>
        <h1>Legal Text Summarizer</h1>
        <p className="subtitle">Simplify complex legal documents with AI-powered summarization</p>
      </div>

      <div className="summarize-content">
        <div className="input-section">
          <div className="input-card">
            <div className="input-header">
              <h2><i className="fas fa-file-alt"></i> Input Text</h2>
              <div className="char-count">{charCount} characters</div>
            </div>
            
            <textarea
              rows="10"
              className="text-input"
              placeholder="Paste your legal text here..."
              value={text}
              onChange={handleTextChange}
              disabled={isLoading}
            />
            
            <div className="actions">
              <button
                onClick={clearText}
                className="btn-secondary"
                disabled={isLoading}
              >
                <i className="fas fa-trash-alt"></i> Clear
              </button>
              
              <button
                onClick={handleSummarize}
                disabled={isLoading || text.length < 50}
                className={`btn-primary ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-magic"></i> Summarize
                  </>
                )}
              </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
        
        <div className="sidebar">
          <div className="summary-card">
            <h2><i className="fas fa-scroll"></i> Summary</h2>
            <div className="summary-content">
              {summary ? (
                <>
                  <p>{summary}</p>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(summary)}
                  >
                    <i className="fas fa-copy"></i> Copy
                  </button>
                </>
              ) : (
                <p>Your summarized text will appear here...</p>
              )}
            </div>
          </div>
          
          <div className="history-card">
            <h2><i className="fas fa-history"></i> Recent Summaries</h2>
            <div className="history-content">
              {history.length === 0 ? (
                <p className="no-history">No recent summaries yet</p>
              ) : (
                <ul>
                  {history.map((item) => (
                    <li 
                      key={item.id} 
                      onClick={() => loadFromHistory(item)}
                      className="history-item"
                    >
                      <div className="history-text">{item.original.substring(0, 80)}...</div>
                      <div className="history-date">{item.date}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div className="tips-card">
            <h2><i className="fas fa-lightbulb"></i> Tips for Better Summaries</h2>
            <ul>
              <li><i className="fas fa-check-circle"></i> Ensure text is at least 50 characters long</li>
              <li><i className="fas fa-check-circle"></i> Remove any unnecessary formatting</li>
              <li><i className="fas fa-check-circle"></i> Focus on one legal concept at a time</li>
              <li><i className="fas fa-check-circle"></i> Use clear and concise language</li>
              <li><i className="fas fa-check-circle"></i> Break down complex sentences</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summarize;