import os
from dotenv import load_dotenv
from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Flask app setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Home route
@app.route('/')
def home():
    return "✅ Backend is running!"

# Simplify API
@app.route('/simplify', methods=['POST'])
def simplify():
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        simplified_text = text.lower().replace("hereinafter", "from now on")
        return jsonify({"simplified": simplified_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Summarize API using OpenAI
@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Use OpenAI to generate summary
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # lightweight & fast for summarization
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes legal documents."},
                {"role": "user", "content": f"Summarize this legal text:\n\n{text}"}
            ],
            max_tokens=200
        )

        summary = response.choices[0].message.content.strip()
        return jsonify({"summary": summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
