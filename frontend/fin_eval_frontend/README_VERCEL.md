# Deploying Frontend to Vercel

This guide explains how to deploy the FinEval frontend to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Your backend API deployed on Render (or another hosting service)
3. Git repository with your code

## Deployment Steps

### Option 1: Using Vercel Dashboard (Recommended)

1. **Connect Your Repository**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Select the repository containing your frontend

2. **Configure the Project**
   - **Root Directory**: Set to `frontend/fin_eval_frontend`
   - **Framework Preset**: Next.js (should auto-detect)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

3. **Set Environment Variables**
   - Go to "Environment Variables" section
   - Add the following:
     - **Key**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://fineval-llm-financial-reasoning-benchmark.onrender.com` (your Render backend URL - **without** `/api` suffix)
     - **Environment**: Production, Preview, Development (select all)
   - **Important**: Do NOT include `/api` in the URL. The code will automatically append it.

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your frontend

### Option 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to Frontend Directory**
   ```bash
   cd frontend/fin_eval_frontend
   ```

4. **Deploy**
   ```bash
   vercel
   ```

5. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   # Enter: https://fineval-llm-financial-reasoning-benchmark.onrender.com
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Environment Variables

### Required

- `NEXT_PUBLIC_API_URL`: Your backend API base URL (without `/api` suffix)
  - Local (optional): `http://localhost:8000` (if not set, defaults to using Next.js rewrites)
  - Production: `https://your-render-service.onrender.com` (your Render backend URL)
  
  **Note**: The code automatically appends `/api` to this URL when making API calls.

### Setting in Vercel Dashboard

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `NEXT_PUBLIC_API_URL` with your backend URL
4. Make sure to select all environments (Production, Preview, Development)

## Important Notes

1. **Root Directory**: Make sure to set the Root Directory to `frontend/fin_eval_frontend` in Vercel settings, not the project root.

2. **API Rewrites**: The `next.config.ts` already has rewrites configured to proxy API requests to your backend. These will work automatically.

3. **Public Files**: All files in the `public/` folder are served statically. Make sure your judgment JSONL files are in `public/` folder.

4. **Build Time**: The first build might take a few minutes. Subsequent builds are faster.

## Testing After Deployment

1. Visit your Vercel deployment URL
2. Test the health endpoint: `https://your-frontend.vercel.app/api/gemini3` (should proxy to backend)
3. Test the evaluator page
4. Test the dashboard pages

## Troubleshooting

1. **Build Fails**: 
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript errors are resolved

2. **API Calls Fail**:
   - Verify `NEXT_PUBLIC_API_URL` is set correctly
   - Check that your backend is accessible
   - Verify CORS is enabled on backend

3. **404 Errors on Routes**:
   - Ensure you're using Next.js App Router correctly
   - Check that all page files are in the `app/` directory

4. **Dataset Files Not Loading**:
   - Verify judgment files are in `public/` folder
   - Check the dataset API route is working
   - Verify file paths in `app/api/dataset/route.ts`

## Updating Environment Variables

After deployment, you can update environment variables:
1. Go to Project Settings → Environment Variables
2. Edit or add variables
3. Redeploy the project (or wait for automatic redeploy)

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificates

