# Deployment to Render

This guide explains how to deploy the FinEval backend API to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. API keys:
   - `GEMINI_API_KEY` - Google Gemini API key
   - `FINO1_API_KEY` - Fin-o1 API key (RunPod)

## Deployment Steps

### Option 1: Using Render Dashboard

1. **Create a New Web Service**
   - Go to your Render dashboard
   - Click "New +" → "Web Service"
   - Connect your Git repository

2. **Configure the Service**
   - **Name**: `fin-eval-api` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT backend.api_server:app`
   - **Root Directory**: Leave empty (or set to project root)

3. **Set Environment Variables**
   - Go to "Environment" tab
   - Add the following environment variables:
     - `GEMINI_API_KEY`: Your Google Gemini API key
     - `FINO1_API_KEY`: Your Fin-o1 API key
     - `PYTHON_VERSION`: `3.11.0` (optional, but recommended)

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your service

### Option 2: Using render.yaml (Infrastructure as Code)

1. **Push your code to Git** (GitHub, GitLab, or Bitbucket)

2. **Create a Blueprint**
   - In Render dashboard, go to "Blueprints"
   - Click "New Blueprint"
   - Connect your repository
   - Render will automatically detect `render.yaml` and create the service

3. **Set Environment Variables**
   - After the service is created, go to "Environment" tab
   - Add `GEMINI_API_KEY` and `FINO1_API_KEY`
   - These are marked as `sync: false` in render.yaml for security

## Environment Variables

The following environment variables are required:

- `GEMINI_API_KEY`: Google Gemini API key (used for Gemini 3 and Judge model)
- `FINO1_API_KEY`: Fin-o1 API key (used for Fin-o1-14B model)
- `PORT`: Automatically set by Render (you don't need to set this)

## API Endpoints

Once deployed, your API will be available at:
- `https://your-service-name.onrender.com/api/gemini3`
- `https://your-service-name.onrender.com/api/fino1`
- `https://your-service-name.onrender.com/api/judge`
- `https://your-service-name.onrender.com/health`

## Testing the Deployment

After deployment, test the health endpoint:
```bash
curl https://your-service-name.onrender.com/health
```

Expected response:
```json
{"ok": true}
```

## Updating the Frontend

After deploying the backend, update your frontend's `NEXT_PUBLIC_API_URL` environment variable to point to your Render service URL:

```env
NEXT_PUBLIC_API_URL=https://your-service-name.onrender.com
```

## Troubleshooting

1. **Build fails**: Check the build logs in Render dashboard
2. **Service won't start**: Verify the start command is correct
3. **API errors**: Check that environment variables are set correctly
4. **CORS errors**: The backend includes CORS middleware, but verify your frontend URL is allowed

## Notes

- Render provides a free tier with some limitations
- Services on the free tier may spin down after inactivity
- Consider upgrading to a paid plan for production use

