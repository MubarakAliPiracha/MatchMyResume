# Quick Deployment Guide

Follow these steps to deploy your Resume Match AI application in under 10 minutes.

## Prerequisites
- GitHub account (already have ✅)
- Repository pushed to GitHub (already done ✅)

---

## 🚀 Step-by-Step Deployment

### 1️⃣ Deploy Backend to Railway (Recommended)

**Time: 3-5 minutes**

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository: `MubarakAliPiracha/MatchMyResume`
5. Click **"Configure"** next to the repo
6. In the settings:
   - **Root Directory**: `backend`
   - **Build Command**: Leave default (auto-detected)
   - **Start Command**: Leave default (auto-detected)
7. Click **"Deploy"**
8. Wait for deployment (2-3 minutes)
9. **Copy your backend URL** (e.g., `https://resume-match-api-production.up.railway.app`)
   - You'll find it in the "Settings" tab → "Domains"

**Environment Variables (Optional for now):**
- Go to "Variables" tab
- Add: `NODE_ENV=production`
- We'll add `FRONTEND_URL` after deploying the frontend

---

### 2️⃣ Deploy Frontend to Vercel (Recommended)

**Time: 3-5 minutes**

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (use GitHub)
3. Click **"Add New..."** → **"Project"**
4. Import your repository: `MubarakAliPiracha/MatchMyResume`
5. Configure:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `frontend` (click "Edit" and change to `frontend`)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
6. Go to **"Environment Variables"**:
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app/api`
     (Replace with your actual Railway backend URL from Step 1, including `/api`)
7. Click **"Deploy"**
8. Wait for deployment (2-3 minutes)
9. **Copy your frontend URL** (e.g., `https://match-my-resume.vercel.app`)

---

### 3️⃣ Update Backend CORS

**Time: 1 minute**

1. Go back to Railway dashboard
2. Select your backend project
3. Go to **"Variables"** tab
4. Add/Update:
   - `FRONTEND_URL` = `https://your-frontend-url.vercel.app`
     (Replace with your actual Vercel frontend URL)
5. Railway will automatically redeploy

---

### 4️⃣ Test Your Deployment

1. Visit your frontend URL
2. Upload a resume (PDF or DOCX)
3. Paste a job description
4. Click "Analyze Match"
5. Check the results!

---

## 🔧 Alternative: Deploy to Render

If you prefer Render over Railway:

### Backend on Render:
1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repository
4. Configure:
   - **Name**: `resume-match-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variable: `NODE_ENV=production`
6. Click **"Create Web Service"**
7. Copy your backend URL

---

## 🆘 Troubleshooting

### Issue: CORS Error
**Solution**: Make sure `FRONTEND_URL` in backend matches your frontend URL exactly (including `https://`)

### Issue: API Not Working
**Solution**: 
- Check that `VITE_API_URL` in frontend ends with `/api`
- Verify backend is running (check Railway/Render logs)
- Test backend health endpoint: `https://your-backend-url/health`

### Issue: Build Fails
**Solution**:
- Check Node.js version (need 18+)
- Review deployment logs
- Verify all environment variables are set

---

## ✅ Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Backend URL copied
- [ ] Frontend URL copied
- [ ] `VITE_API_URL` set in frontend
- [ ] `FRONTEND_URL` set in backend
- [ ] Application tested and working

---

## 📝 Your Deployment URLs

After deployment, note down:

- **Backend URL**: `_________________________`
- **Frontend URL**: `_________________________`

Save these URLs for future reference!

---

## 🎉 You're Done!

Your Resume Match AI application is now live on the internet! Share your frontend URL with others to use the application.

**Next Steps:**
- Share your application
- Monitor usage in Railway/Vercel dashboards
- Consider upgrading to paid plans for production use