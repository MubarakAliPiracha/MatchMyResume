# Deployment Guide

This guide will help you deploy both the backend and frontend of the Resume Match AI application.

## Deployment Options

### Recommended Setup
- **Backend**: Railway.app or Render.com (free tier available)
- **Frontend**: Vercel.com or Netlify.com (free tier available)

---

## Step 1: Deploy Backend

### Option A: Deploy to Railway

1. **Sign up/Login to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `MatchMyResume` repository
   - Select the `backend` folder as the root directory

3. **Configure Environment Variables**
   - Go to the Variables tab
   - Add:
     ```
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend-url.vercel.app
     ```
   - Railway will automatically set `PORT`

4. **Deploy**
   - Railway will automatically detect Node.js and deploy
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://your-app.railway.app`)

### Option B: Deploy to Render

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `resume-match-api`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Configure Environment Variables**
   - In the Environment section, add:
     ```
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend-url.vercel.app
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy your backend URL (e.g., `https://resume-match-api.onrender.com`)

---

## Step 2: Deploy Frontend

### Option A: Deploy to Vercel (Recommended)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Set Environment Variables**
   - Go to Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.railway.app/api
     ```
     (Replace with your actual backend URL from Step 1)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Copy your frontend URL (e.g., `https://your-app.vercel.app`)

5. **Update Backend CORS**
   - Go back to your backend deployment (Railway/Render)
   - Update the `FRONTEND_URL` environment variable with your Vercel URL
   - Redeploy the backend

### Option B: Deploy to Netlify

1. **Sign up/Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `frontend/dist`

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.railway.app/api
     ```
     (Replace with your actual backend URL from Step 1)

4. **Deploy**
   - Click "Deploy site"
   - Wait for deployment
   - Copy your frontend URL

5. **Update Backend CORS**
   - Update the `FRONTEND_URL` in your backend with your Netlify URL
   - Redeploy the backend

---

## Quick Deploy Scripts

### Using Railway CLI (Backend)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize and deploy
cd backend
railway init
railway up
```

### Using Vercel CLI (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel
```

---

## Environment Variables Summary

### Backend (.env)
```
PORT=3001 (auto-set by hosting)
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend.railway.app/api
```

---

## Testing Deployment

1. **Test Backend Health**
   - Visit: `https://your-backend-url.railway.app/health`
   - Should return: `{"status":"ok"}`

2. **Test Frontend**
   - Visit your frontend URL
   - Upload a resume
   - Paste a job description
   - Click "Analyze Match"

---

## Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your frontend domain exactly
- Check that the frontend URL includes `https://` protocol

### API Not Found
- Verify `VITE_API_URL` in frontend includes `/api` at the end
- Check that backend is deployed and running

### Build Failures
- Check Node.js version (should be 18+)
- Review build logs for dependency issues
- Ensure all environment variables are set

---

## Cost

All recommended platforms offer free tiers:
- **Railway**: Free tier with $5 credit/month
- **Render**: Free tier (sleeps after inactivity)
- **Vercel**: Free tier (generous limits)
- **Netlify**: Free tier (generous limits)

For production use, consider upgrading to paid plans for better performance and uptime.

---

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test endpoints using Postman or curl
4. Review platform-specific documentation