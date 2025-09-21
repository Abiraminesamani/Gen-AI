import React from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-doc-app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-scale-balanced"></i>
            <span>LegalDocSimplifier</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Simplify Complex Legal Documents in Minutes</h1>
            <p>LegalDocSimplifier uses AI to help you understand contracts, summarize terms, and explain legal jargon in plain English.</p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-large" onClick={() => navigate("/upload")}>
                Get Started Free
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <i className="fas fa-file-contract"></i>
              <p>Contract Simplified</p>
            </div>
            <div className="floating-card card-2">
              <i className="fas fa-check-circle"></i>
              <p>Key Points Highlighted</p>
            </div>
            <div className="floating-card card-3">
              <i className="fas fa-clock"></i>
              <p>Save Time</p>
            </div>
            <div className="main-hero-image">
              <i className="fas fa-scale-balanced"></i>
            </div>
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
              <div className="feature-card" onClick={() => navigate("/upload")}>
                <div className="feature-icon">
                  <i className="fas fa-file-upload"></i>
                </div>
                <h3>Upload Documents</h3>
                <p>Upload your legal documents securely for analysis and simplification.</p>
                <div className="feature-action">
                  <span>Upload Now</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
              
              {/* Summarize */}
              <div className="feature-card" onClick={() => navigate("/summarize")}>
                <div className="feature-icon">
                  <i className="fas fa-file-contract"></i>
                </div>
                <h3>Summarize Contracts</h3>
                <p>Get concise summaries of lengthy contracts with key points highlighted.</p>
                <div className="feature-action">
                  <span>Summarize</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
              
              {/* Clause Explanation */}
              <div className="feature-card" onClick={() => navigate("/clause")}>
                <div className="feature-icon">
                  <i className="fas fa-paragraph"></i>
                </div>
                <h3>Explain Clauses</h3>
                <p>Understand complex legal clauses explained in simple, plain language.</p>
                <div className="feature-action">
                  <span>Explain</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
              
              {/* Q&A */}
              <div className="feature-card" onClick={() => navigate("/qa")}>
                <div className="feature-icon">
                  <i className="fas fa-question-circle"></i>
                </div>
                <h3>Ask Q&A</h3>
                <p>Get answers to your specific questions about any legal document.</p>
                <div className="feature-action">
                  <span>Ask Question</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="benefits-section">
            <h2>Why Choose LegalDocSimplifier?</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Secure & Private</h3>
                <p>Your documents are encrypted and never stored longer than necessary.</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <h3>Instant Results</h3>
                <p>Get explanations and summaries in seconds, not hours.</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>AI-Powered</h3>
                <p>Advanced algorithms trained on thousands of legal documents.</p>
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
              <li><button className="footer-link" onClick={() => navigate("/upload")}>Document Upload</button></li>
              <li><button className="footer-link" onClick={() => navigate("/summarize")}>Contract Summarization</button></li>
              <li><button className="footer-link" onClick={() => navigate("/clause")}>Clause Explanation</button></li>
              <li><button className="footer-link" onClick={() => navigate("/qa")}>Q&A</button></li>
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