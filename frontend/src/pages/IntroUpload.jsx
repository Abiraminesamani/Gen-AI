import React, { useState, useRef } from "react";
import './IntroUpload.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF, DOC, DOCX, or TXT file.");
      return;
    }

    if (selectedFile.size > maxSize) {
      setError("File size must be less than 10MB.");
      return;
    }

    setFile(selectedFile);
    setError("");
    setText("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      setText(data.text || "No text extracted.");
    } catch (error) {
      setError("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setText("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return 'fas fa-file-pdf';
    if (type.includes('word')) return 'fas fa-file-word';
    if (type.includes('text')) return 'fas fa-file-alt';
    return 'fas fa-file';
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h2>Document Upload</h2>
        <p>Upload legal documents for text extraction and analysis</p>
      </div>

      <div className="upload-content">
        {/* Upload Area */}
        <div className="upload-section">
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
              className="file-input"
            />
            
            <div className="upload-placeholder">
              <i className="fas fa-cloud-upload-alt"></i>
              <h3>Drop your file here or click to browse</h3>
              <p>Supports PDF, DOC, DOCX, TXT files (max 10MB)</p>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {/* File Preview */}
          {file && (
            <div className="file-preview">
              <div className="file-info">
                <i className={getFileIcon(file.type)}></i>
                <div className="file-details">
                  <h4>{file.name}</h4>
                  <p>{formatFileSize(file.size)}</p>
                </div>
                <button onClick={handleRemoveFile} className="remove-btn">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <button 
                onClick={handleUpload} 
                disabled={loading}
                className="upload-btn"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-upload"></i>
                    Extract Text
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Extracted Text */}
        {text && (
          <div className="result-section">
            <div className="section-header">
              <h3>Extracted Text</h3>
              <div className="text-actions">
                <span className="word-count">
                  {text.trim().split(/\s+/).length} words
                </span>
                <button 
                  onClick={() => navigator.clipboard.writeText(text)}
                  className="copy-btn"
                >
                  <i className="fas fa-copy"></i>
                  Copy Text
                </button>
              </div>
            </div>
            
            <div className="extracted-text">
              <div className="text-content">
                <p>{text}</p>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-secondary">
                <i className="fas fa-summarize"></i>
                Summarize
              </button>
              <button className="btn-secondary">
                <i className="fas fa-question"></i>
                Ask Questions
              </button>
              <button className="btn-secondary">
                <i className="fas fa-explain"></i>
                Explain Clauses
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Supported Formats */}
      <div className="supported-formats">
        <h4>Supported Formats</h4>
        <div className="format-list">
          <div className="format-item">
            <i className="fas fa-file-pdf"></i>
            <span>PDF Documents</span>
          </div>
          <div className="format-item">
            <i className="fas fa-file-word"></i>
            <span>Word Documents</span>
          </div>
          <div className="format-item">
            <i className="fas fa-file-alt"></i>
            <span>Text Files</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;