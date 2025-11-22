# FinEval Backend API

Flask-based REST API for evaluating financial reasoning models.

## Local Development

### Prerequisites

- Python 3.11+
- API Keys:
  - `GEMINI_API_KEY` - Google Gemini API key
  - `FINO1_API_KEY` - Fin-o1 API key (RunPod)

### Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set environment variables:**
   Create a `.env` file in the project root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   FINO1_API_KEY=your_fin_o1_api_key_here
   ```

3. **Run the server:**
   ```bash
   # From project root
   python backend/api_server.py
   
   # Or using gunicorn (production-like)
   gunicorn --bind 0.0.0.0:8000 wsgi:app
   ```

   The server will start on `http://localhost:8000`

### API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/gemini3` - Run Gemini 3 model
- `POST /api/fino1` - Run Fin-o1-14B model
- `POST /api/judge` - Judge model outputs

### API Documentation

Once the server is running, visit `http://localhost:8000/docs` for interactive API documentation (if using FastAPI) or test endpoints using curl/Postman.

### Example Request

```bash
curl -X POST http://localhost:8000/api/gemini3 \
  -H "Content-Type: application/json" \
  -d '{
    "context": "Revenue: 1000",
    "question": "What is the revenue?"
  }'
```

## Deployment

See `README_DEPLOYMENT.md` for deployment instructions to Render.

