import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai

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
        return jsonify({"error": str(e)}), 500


# ---------- Clause Explanation ----------
@app.route("/api/clause-explain", methods=["POST"])
def clause_explain():
    try:
        data = request.get_json()
        clause = data.get("clause", "")

        if not clause.strip():
            return jsonify({"error": "No clause provided"}), 400

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

        explanation = response.text.strip()
        return jsonify({"explanation": explanation})

    except Exception as e:
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
        return jsonify({"error": str(e)}), 500


if __name__ == "_main_":
    app.run(debug=True, port=5000)