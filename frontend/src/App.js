import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IntroUpload from "./pages/IntroUpload";   // ✅ correct name
import Summarization from "./pages/Summarization"; // ✅ correct name
import ClauseExplanation from "./pages/ClauseExplanation"; // ✅ correct name
import QnA from "./pages/QnA";  // ✅ this matches your file


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<IntroUpload />} />
        <Route path="/summarize" element={<Summarization />} />
        <Route path="/clause" element={<ClauseExplanation />} />
        <Route path="/qa" element={<QnA />} />
      </Routes>
    </Router>
  );
}

export default App;

