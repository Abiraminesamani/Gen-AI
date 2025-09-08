import React, { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setText(data.text || "No text extracted.");
    } catch (error) {
      setText("⚠️ Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Document</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {text && (
        <div style={{ marginTop: "20px" }}>
          <h3>Extracted Text:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

export default Upload;
