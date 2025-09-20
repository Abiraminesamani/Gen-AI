import React from 'react';
import { useNavigate } from "react-router-dom";   // ✅ Import navigation
import './Home.css';

const Home = () => {
  const navigate = useNavigate();  // ✅ Hook for navigation

  return (
    <div className="legal-doc-app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-scale-balanced"></i>
            <span>LegalDocSimplifier</span>
          </div>
          <nav>
            <ul>
              <li><a href="#" className="active">Home</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <button className="btn btn-outline">Log In</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Simplify Complex Legal Documents in Minutes</h1>
          <p>LegalDocSimplifier uses AI to help you understand contracts, summarize terms, and explain legal jargon in plain English.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-large" onClick={() => navigate("/upload")}>Get Started Free</button>
            <button className="btn btn-outline-light btn-large">Watch Demo</button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <section className="features-section">
            <h2>How can we help you today?</h2>
            <div className="features-grid">
              
              {/* Upload */}
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-file-upload"></i>
                </div>
                <h3>Upload Documents</h3>
                <p>Upload your legal documents securely for analysis and simplification.</p>
                <button className="btn btn-outline" onClick={() => navigate("/upload")}>Upload Now</button>
              </div>
              
              {/* Summarize */}
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-file-contract"></i>
                </div>
                <h3>Summarize Contracts</h3>
                <p>Get concise summaries of lengthy contracts with key points highlighted.</p>
                <button className="btn btn-outline" onClick={() => navigate("/summarize")}>Summarize</button>
              </div>
              
              {/* Clause Explanation */}
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-paragraph"></i>
                </div>
                <h3>Explain Clauses</h3>
                <p>Understand complex legal clauses explained in simple, plain language.</p>
                <button className="btn btn-outline" onClick={() => navigate("/clause")}>Explain</button>
              </div>
              
              {/* Q&A */}
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-question-circle"></i>
                </div>
                <h3>Ask Q&A</h3>
                <p>Get answers to your specific questions about any legal document.</p>
                <button className="btn btn-outline" onClick={() => navigate("/qa")}>Ask Question</button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <i className="fas fa-scale-balanced"></i>
              <span>LegalDocSimplifier</span>
            </div>
            <p>Making legal documents accessible to everyone.</p>
          </div>
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li><a href="#">Document Upload</a></li>
              <li><a href="#">Contract Summarization</a></li>
              <li><a href="#">Clause Explanation</a></li>
              <li><a href="#">Q&A</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 LegalDocSimplifier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
