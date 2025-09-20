import React, { useState, useRef } from "react";
import axios from "axios";
import "./IntroUpload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type (allow PDF, text files, and Word documents)
      const validTypes = [
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!validTypes.includes(selectedFile.type)) {
        setError("Please select a valid document (PDF, TXT, DOC, or DOCX)");
        setFile(null);
        return;
      }
      
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError("");
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setText(res.data.text);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Error uploading file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const event = { target: { files: [droppedFile] } };
      handleFileChange(event);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setText("");
    setError("");
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch(extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'txt':
        return '📃';
      default:
        return '📎';
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Document</h2>
        <p className="upload-subtitle">Extract text from your documents</p>
        
        <div 
          className={`drop-zone ${file ? 'has-file' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-input"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.txt,.doc,.docx"
            className="file-input"
          />
          <label htmlFor="file-input" className="file-label">
            <div className="upload-icon">📤</div>
            <p className="drop-text">
              {file ? file.name : "Drag & drop your file here or click to browse"}
            </p>
            <p className="file-types">Supported formats: PDF, TXT, DOC, DOCX</p>
          </label>
          
          {file && (
            <div className="file-preview">
              <span className="file-icon">{getFileIcon(file.name)}</span>
              <span className="file-name">{file.name}</span>
              <button 
                className="remove-file-btn"
                onClick={handleRemoveFile}
                aria-label="Remove file"
              >
                ×
              </button>
            </div>
          )}
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          onClick={handleUpload} 
          disabled={!file || isLoading}
          className={`upload-btn ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            'Extract Text'
          )}
        </button>
        
        {success && <div className="success-message">Text extracted successfully!</div>}
        
        {text && (
          <div className="result-container">
            <h3>Extracted Text:</h3>
            <div className="text-result">
              <pre>{text}</pre>
            </div>
            <button 
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(text);
              }}
            >
              Copy Text
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;