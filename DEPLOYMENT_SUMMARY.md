# Deployment Summary

This document provides a quick overview of the deployment setup for both backend and frontend.

## Backend (Render)

✅ **Status**: Deployed and running
- **URL**: `https://fineval-llm-financial-reasoning-benchmark.onrender.com`
- **Health Check**: `https://fineval-llm-financial-reasoning-benchmark.onrender.com/health`
- **Framework**: Flask with Gunicorn
- **Entry Point**: `wsgi.py` or `app.py`

### Key Files:
- `wsgi.py` - WSGI entry point for Gunicorn
- `app.py` - Fallback entry point (for auto-detection)
- `requirements.txt` - Python dependencies
- `Procfile` - Process configuration
- `render.yaml` - Render service configuration
- `runtime.txt` - Python version (3.11.0)

### Environment Variables (Set in Render Dashboard):
- `GEMINI_API_KEY` - Your Gemini API key
- `FINO1_API_KEY` - Your Fin-o1 API key
- `PORT` - Automatically set by Render

### Testing:
```bash
# Health check
curl https://fineval-llm-financial-reasoning-benchmark.onrender.com/health

# Test API endpoint
curl -X POST https://fineval-llm-financial-reasoning-benchmark.onrender.com/api/gemini3 \
  -H "Content-Type: application/json" \
  -d '{"context": "Revenue: 1000", "question": "What is the revenue?"}'
```

## Frontend (Vercel)

📋 **Status**: Ready for deployment
- **Framework**: Next.js 16
- **Root Directory**: `frontend/fin_eval_frontend`

### Key Files:
- `vercel.json` - Vercel configuration
- `next.config.ts` - Next.js configuration with API rewrites
- `package.json` - Node.js dependencies

### Environment Variables (Set in Vercel Dashboard):
- `NEXT_PUBLIC_API_URL` - Backend URL (without `/api` suffix)
  - Example: `https://fineval-llm-financial-reasoning-benchmark.onrender.com`

### Deployment Steps:

1. **Connect Repository to Vercel**
   - Go to https://vercel.com/dashboard
   - Import your Git repository
   - Set **Root Directory** to: `frontend/fin_eval_frontend`

2. **Configure Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` = `https://fineval-llm-financial-reasoning-benchmark.onrender.com`
   - Select all environments (Production, Preview, Development)

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

### How API Calls Work:

1. **With Environment Variable Set**:
   - Frontend calls: `/api/gemini3`
   - Next.js rewrites to: `${NEXT_PUBLIC_API_URL}/api/gemini3`
   - Example: `https://fineval-llm-financial-reasoning-benchmark.onrender.com/api/gemini3`

2. **Without Environment Variable** (Local Dev):
   - Frontend calls: `/api/gemini3`
   - Next.js rewrites to: `http://localhost:8000/api/gemini3`
   - Requires local backend running

### Public Files:
All files in `frontend/fin_eval_frontend/public/` are served statically:
- Judgment JSONL files (e.g., `gemini3_easy_judgement.jsonl`)
- Dataset files in `public/data/` folder
- Static assets (images, icons, etc.)

## Architecture

```
┌─────────────────┐         ┌──────────────────┐
│   Vercel        │         │   Render         │
│   (Frontend)    │────────▶│   (Backend)      │
│   Next.js       │  HTTPS  │   Flask + Gunicorn│
└─────────────────┘         └──────────────────┘
      │                              │
      │                              │
      ▼                              ▼
  Static Files                  API Endpoints:
  (public/)                     - /api/gemini3
                                - /api/fino1
                                - /api/judge
                                - /health
```

## Troubleshooting

### Backend Issues:
- **404 on root URL**: Expected - use `/health` endpoint
- **ModuleNotFoundError**: Check `wsgi.py` and `app.py` exist in project root
- **API key errors**: Verify environment variables are set in Render dashboard

### Frontend Issues:
- **API calls fail**: Check `NEXT_PUBLIC_API_URL` is set correctly
- **Build fails**: Check build logs, verify all dependencies in `package.json`
- **Dataset files not loading**: Verify files are in `public/` folder

## Quick Links

- **Backend Health**: https://fineval-llm-financial-reasoning-benchmark.onrender.com/health
- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Backend Deployment Guide**: `README_DEPLOYMENT.md`
- **Frontend Deployment Guide**: `frontend/fin_eval_frontend/README_VERCEL.md`

