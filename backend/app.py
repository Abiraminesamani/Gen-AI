import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import fitz  # PyMuPDF for PDF text extraction
import traceback

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)

# Flask app setup
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "✅ Backend is running with Gemini AI!"

# ---------- PDF Upload ----------
@app.route("/upload", methods=["POST"])
def upload():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files["file"]

        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400

        os.makedirs("uploads", exist_ok=True)
        file_path = os.path.join("uploads", file.filename)
        file.save(file_path)

        text = ""
        if file.filename.lower().endswith(".pdf"):
            doc = fitz.open(file_path)
            for page in doc:
                text += page.get_text("text")
        else:
            return jsonify({"error": "Only PDF files are supported"}), 400

        return jsonify({"text": text.strip()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------- Summarization ----------
@app.route("/api/summarize", methods=["POST"])
def summarize():
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text.strip():
            return jsonify({"error": "No text provided"}), 400

        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=f"Summarize this legal text in simple terms:\n\n{text}"
        )

        summary = response.text.strip()
        return jsonify({"summary": summary})

    except Exception as e:
        print("❌ ERROR in summarize:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# ---------- Clause Explanation ----------
@app.route("/api/clause-explain", methods=["POST"])
def clause_explain():
    try:
        data = request.get_json()
        print("DEBUG incoming:", data)
        clause = data.get("clause", "")

        if not clause.strip():
            return jsonify({"error": "No clause provided"}), 400

        print("✅ Sending to Gemini:", clause)

        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=f"""Explain this contract clause in detail:
            Clause: {clause}

            Include:
            1. Meaning
            2. Who it affects
            3. Risks or hidden pitfalls
            4. Whether it is standard or unusual
            5. A simple real-world example"""
        )

        print("✅ Gemini raw response:", response)
        explanation = response.text.strip()
        return jsonify({"explanation": explanation})

    except Exception as e:
        print("❌ ERROR in clause_explain:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# ---------- Q&A ----------
@app.route("/api/qa", methods=["POST"])
def qa():
    try:
        data = request.get_json()
        question = data.get("question", "")

        if not question.strip():
            return jsonify({"error": "No question provided"}), 400

        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=f"Answer this legal question clearly and simply:\n\n{question}"
        )

        answer = response.text.strip()
        return jsonify({"answer": answer})

    except Exception as e:
        print("❌ ERROR in qa:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# ---------- Run App ----------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
