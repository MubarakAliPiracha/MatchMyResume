# Free Permanent Deployment Guide

This guide will help you deploy your Resume Match AI application **completely free** and **permanently** using free-tier hosting services.

## 🎯 Deployment Strategy (100% Free & Permanent)

- **Backend**: Render.com (Free tier - permanent, sleeps after inactivity)
- **Frontend**: Vercel.com (Free tier - permanent, unlimited for personal projects)

Both services offer **permanent free tiers** that don't expire after trials.

---

## 📦 Step 1: Deploy Backend to Render (Free & Permanent)

### Setup (5 minutes)

1. **Sign up for Render** (Free)
   - Go to [render.com](https://render.com)
   - Click "Get Started for Free"
   - Sign up with your **GitHub account**
   - Complete email verification

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Click "Connect account" if GitHub isn't connected
   - Select your repository: `MubarakAliPiracha/MatchMyResume`

3. **Configure the Service**
   - **Name**: `resume-match-api` (or any name you like)
   - **Region**: Choose closest to you (or leave default)
   - **Branch**: `main`
   - **Root Directory**: `backend` ⚠️ **IMPORTANT: Set this to `backend`**
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Select Free Plan**
   - Choose **"Free"** plan (not Starter/Standard)
   - This plan is **permanent** and **free forever**

5. **Add Environment Variables** (Optional for now)
   - Click "Advanced" to expand
   - Add Environment Variable:
     - Key: `NODE_ENV`
     - Value: `production`
   - We'll add `FRONTEND_URL` after deploying frontend

6. **Deploy**
   - Click "Create Web Service"
   - Render will start building (takes 5-7 minutes on first deploy)
   - Wait for "Live" status

7. **Get Your Backend URL**
   - Once deployed, you'll see a URL like: `https://resume-match-api.onrender.com`
   - **Copy this URL** - you'll need it for the frontend

### ⚠️ Free Tier Notes (Render)

- ✅ **Free forever** - no trial period
- ✅ Your service stays active
- ⏰ **Sleeps after 15 minutes of inactivity** (wakes up automatically on first request)
- ⏱️ **First request after sleep** may take 30-50 seconds (normal behavior)
- 📊 **750 hours/month free** (plenty for a portfolio project)

---

## 🌐 Step 2: Deploy Frontend to Vercel (Free & Permanent)

### Setup (5 minutes)

1. **Sign up for Vercel** (Free)
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Sign up with your **GitHub account**

2. **Import Project**
   - Click "Add New..." → "Project"
   - Find and select your repository: `MubarakAliPiracha/MatchMyResume`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: Click "Edit" → Change to `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Set Environment Variable**
   - Click "Environment Variables"
   - Add new variable:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://your-backend-url.onrender.com/api`
       (Replace with your actual Render backend URL from Step 1, **include `/api` at the end**)
   - Make sure it's selected for **Production**, **Preview**, and **Development**

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Once deployed, you'll see your live URL!

6. **Get Your Frontend URL**
   - Your site will be live at: `https://match-my-resume.vercel.app` (or similar)
   - **Copy this URL**

### ✅ Vercel Free Tier Benefits

- ✅ **Free forever** - no trial period
- ✅ **Unlimited** deployments for personal projects
- ✅ **Instant** deployments (no sleeping)
- ✅ **Custom domains** available (optional)
- ✅ **99.99% uptime** for free tier

---

## 🔄 Step 3: Update Backend CORS

Now connect your frontend and backend:

1. **Go back to Render**
   - Open your backend service
   - Go to "Environment" tab
   - Click "Add Environment Variable"
   - Add:
     - **Key**: `FRONTEND_URL`
     - **Value**: `https://your-frontend-url.vercel.app`
       (Replace with your actual Vercel frontend URL)

2. **Redeploy**
   - Render will automatically redeploy when you add environment variables
   - Wait for deployment to complete

---

## ✅ Step 4: Test Your Deployment

1. **Test Backend**
   - Visit: `https://your-backend-url.onrender.com/health`
   - Should return: `{"status":"ok"}`
   - ⏰ If it's the first visit after sleep, wait 30-50 seconds

2. **Test Frontend**
   - Visit your Vercel URL
   - Upload a resume
   - Paste a job description
   - Click "Analyze Match"
   - Should work! 🎉

---

## 💰 Cost Summary

| Service | Plan | Cost | Duration |
|---------|------|------|----------|
| **Render (Backend)** | Free | $0/month | **Forever** |
| **Vercel (Frontend)** | Free | $0/month | **Forever** |
| **Total** | - | **$0/month** | **Permanent** |

---

## 🆘 Troubleshooting

### Backend Sleeps (Render)
- **Issue**: First request takes 30-50 seconds
- **Solution**: This is normal! Render free tier sleeps after 15 min inactivity
- **Fix**: Not needed - it wakes automatically. For instant wake, consider upgrading ($7/month) or use Fly.io free tier

### CORS Error
- **Issue**: Frontend can't connect to backend
- **Solution**: 
  - Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
  - Include `https://` protocol
  - Make sure backend is redeployed after adding `FRONTEND_URL`

### API Not Working
- **Issue**: 404 or connection errors
- **Solution**:
  - Check `VITE_API_URL` ends with `/api`
  - Verify backend URL is correct
  - Test backend health endpoint first
  - Check Render logs for errors

### Build Failures
- **Check Render logs**: Service → Logs tab
- **Check Vercel logs**: Project → Deployments → Click failed deployment
- **Verify**: Root directory is set correctly (`backend` for Render, `frontend` for Vercel)

---

## 📝 Your Deployment URLs

After deployment, save these:

- **Backend URL**: `https://____________________.onrender.com`
- **Frontend URL**: `https://____________________.vercel.app`

These URLs are **permanent** and **free** - perfect for sharing with recruiters!

---

## 🚀 Alternative: Fly.io (Backend - Optional)

If you want faster backend (no sleep time), consider Fly.io:

1. Sign up at [fly.io](https://fly.io)
2. Install Fly CLI: `npm install -g flyctl`
3. Run: `fly launch` in backend folder
4. Free tier: 3 shared-cpu VMs (256MB each) - enough for this app

Fly.io free tier doesn't sleep but has resource limits. Render is easier for beginners.

---

## ✅ Success Checklist

- [ ] Backend deployed to Render (Free plan)
- [ ] Backend URL copied
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL copied
- [ ] `VITE_API_URL` set in Vercel
- [ ] `FRONTEND_URL` set in Render
- [ ] Backend health endpoint working
- [ ] Frontend connects to backend successfully
- [ ] Application tested end-to-end

---

## 🎉 You're Done!

Your Resume Match AI is now **live forever** and **completely free**! 

Share your Vercel frontend URL with recruiters - it will always be available.

**Next Steps:**
- Share your portfolio link
- Add to your resume/LinkedIn
- Consider adding a custom domain (optional, costs ~$10/year)

---

## 📚 Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Check deployment logs in both platforms
- Verify environment variables are set correctly