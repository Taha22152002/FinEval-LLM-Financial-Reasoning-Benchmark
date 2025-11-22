# Render Deployment - Quick Setup Guide

## Critical Settings in Render Dashboard

When creating/editing your web service in Render, make sure these settings are correct:

### Service Settings

1. **Root Directory**: `.` (dot - means project root)
   - **DO NOT** set this to `backend` or leave it empty
   - This ensures Render runs commands from the project root

2. **Build Command**: `pip install -r requirements.txt`

3. **Start Command**: `gunicorn --bind 0.0.0.0:$PORT --workers 2 --timeout 120 wsgi:app`
   - **Alternative** (if auto-detection is used): `gunicorn --bind 0.0.0.0:$PORT --workers 2 --timeout 120 app:app`
   - Both should work now since we have both `wsgi.py` and `app.py`

4. **Environment**: `Python 3`

### Environment Variables

Add these in the "Environment" tab:

- `GEMINI_API_KEY` = `your_gemini_api_key`
- `FINO1_API_KEY` = `your_fin_o1_api_key`

### If You're Still Getting "ModuleNotFoundError: No module named 'app'"

1. **Check Root Directory**: Must be `.` (project root)
2. **Verify Start Command**: Should be `wsgi:app` or `app:app`
3. **Check Build Logs**: Make sure `requirements.txt` installed successfully
4. **Verify Files**: Ensure `wsgi.py` and `app.py` are in the project root (not in `backend/`)

### File Structure Should Be:

```
project-root/
├── app.py              ← Entry point (if auto-detected)
├── wsgi.py             ← Preferred entry point
├── requirements.txt    ← Dependencies
├── Procfile            ← Start command (optional)
├── render.yaml         ← Render config (optional)
├── runtime.txt         ← Python version
└── backend/
    ├── __init__.py
    ├── api_server.py
    ├── fin_o1.py
    ├── gemini_3_model.py
    └── judge.py
```

### Testing Locally Before Deploying

Test the start command locally:
```bash
# From project root
gunicorn --bind 0.0.0.0:8000 wsgi:app
```

If that works, the same command should work on Render.

