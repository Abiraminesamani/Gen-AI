import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";                // ✅ new import
import IntroUpload from "./pages/IntroUpload";
import Summarization from "./pages/Summarization";
import ClauseExplanation from "./pages/ClauseExplanation";
import QnA from "./pages/QnA";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/upload">Upload</Link> |{" "}   {/* ✅ new route */}
        <Link to="/summary">Summarization</Link> |{" "}
        <Link to="/clauses">Clause Explanation</Link> |{" "}
        <Link to="/qna">Q&A</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />              {/* ✅ new homepage */}
        <Route path="/upload" element={<IntroUpload />} /> {/* ✅ moved here */}
        <Route path="/summary" element={<Summarization />} />
        <Route path="/clauses" element={<ClauseExplanation />} />
        <Route path="/qna" element={<QnA />} />
      </Routes>
    </Router>
  );
}

export default App;
