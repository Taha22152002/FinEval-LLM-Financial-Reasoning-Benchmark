#!/usr/bin/env python3
import os
import sys
from pathlib import Path

# Add parent directory to path to allow imports when running from backend directory
backend_dir = Path(__file__).parent
project_root = backend_dir.parent
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from flask import Flask, request, jsonify
from werkzeug.middleware.proxy_fix import ProxyFix

# Try importing with backend prefix first (when run from project root)
# Fall back to direct imports (when run from backend directory)
try:
    import backend.fin_o1 as fin_o1
    import backend.gemini_3_model as gemini_3_model
    import backend.judge as judge
except ImportError:
    import fin_o1
    import gemini_3_model as gemini_3_model
    import judge

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)

# Enable CORS for frontend
try:
    from flask_cors import CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
except ImportError:
    # Manual CORS headers if flask-cors is not installed
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response


@app.route("/health")
def health():
    return jsonify({"ok": True})


@app.post("/api/gemini3")
def api_gemini3():
    try:
        body = request.get_json(force=True) or {}
        context = body.get("context", "")
        question = body.get("question", "")
        
        # Get API key from environment variable
        api_key = os.getenv("GEMINI_API_KEY")
        
        gemini_3_model.ensure_google_genai()
        res = gemini_3_model.run_gemini3(context, question, api_key=api_key)
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.post("/api/fino1")
def api_fino1():
    try:
        body = request.get_json(force=True) or {}
        context = body.get("context", "")
        question = body.get("question", "")
        
        # Get API key from environment variable
        api_key = os.getenv("FINO1_API_KEY")
        
        fin_o1.ensure_requests()
        res = fin_o1.run_fino1(context, question, api_key=api_key)
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.post("/api/judge")
def api_judge():
    try:
        body = request.get_json(force=True) or {}
        context = body.get("context", "")
        question = body.get("question", "")
        gt_answer = body.get("gt_answer", "")
        gt_reasoning = body.get("gt_reasoning", "")
        model_answer = body.get("model_answer", "")
        model_reasoning = body.get("model_reasoning", "")
        use_gemini3 = body.get("use_gemini3", False)
        
        # Get API key from environment variable (judge uses Gemini)
        api_key = os.getenv("GEMINI_API_KEY")
        
        judge.ensure_google_genai()
        m_ans = model_answer
        m_rs = model_reasoning
        
        if use_gemini3 or not (m_ans and m_rs):
            gemini_3_model.ensure_google_genai()
            gen = gemini_3_model.run_gemini3(context, question, api_key=api_key)
            m_ans = gen.get("answer", "")
            m_rs = gen.get("reasoning", "")
        
        res = judge.run_judge(
            context, 
            question, 
            gt_answer, 
            gt_reasoning, 
            m_ans or "", 
            m_rs or "", 
            api_key=api_key
        )
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    app.run(host="0.0.0.0", port=port)
