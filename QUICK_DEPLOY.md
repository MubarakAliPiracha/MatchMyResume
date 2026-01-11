# Quick Deployment Guide (FREE & PERMANENT)

Deploy your Resume Match AI **forever for free** using Render + Vercel.

⏱️ **Total time: 10-15 minutes**

---

## 🚀 Step 1: Deploy Backend to Render (Free Forever)

**Time: 5-7 minutes**

1. Go to [render.com](https://render.com) → Sign up with GitHub

2. Click **"New +"** → **"Web Service"**

3. Connect GitHub → Select `MubarakAliPiracha/MatchMyResume`

4. Configure:
   - **Name**: `resume-match-api`
   - **Root Directory**: `backend` ⚠️ **IMPORTANT**
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Select **"Free"** (permanent, no trial)

5. Click **"Create Web Service"**

6. Wait 5-7 minutes for deployment

7. **Copy your backend URL**: `https://resume-match-api.onrender.com`

**Note**: Render free tier sleeps after 15 min inactivity (wakes automatically on request)

---

## 🌐 Step 2: Deploy Frontend to Vercel (Free Forever)

**Time: 3-5 minutes**

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub

2. Click **"Add New..."** → **"Project"**

3. Import `MubarakAliPiracha/MatchMyResume`

4. Configure:
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT**
   - **Framework**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto)
   - **Output Directory**: `dist` (auto)

5. **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com/api`
     (Use your Render URL from Step 1 + `/api`)

6. Click **"Deploy"**

7. Wait 2-3 minutes → **Copy your frontend URL**

---

## 🔄 Step 3: Connect Frontend & Backend

**Time: 1 minute**

1. **Go back to Render** → Your backend service

2. **Environment** tab → Add:
   - Key: `FRONTEND_URL`
   - Value: `https://your-frontend-url.vercel.app`
     (Use your Vercel URL from Step 2)

3. Render auto-redeploys ✅

---

## ✅ Step 4: Test

1. Visit your **Vercel frontend URL**
2. Upload resume + paste job description
3. Click "Analyze Match"
4. Should work! 🎉

---

## 💰 Cost: $0/month - Forever!

- ✅ Render: Free tier (permanent)
- ✅ Vercel: Free tier (permanent)
- ✅ **Total: $0/month - No trials, no expiration**

---

## 🆘 Quick Troubleshooting

**Backend slow first request?**
- Normal! Render free tier sleeps after 15 min
- First request after sleep takes 30-50 seconds
- Subsequent requests are instant

**CORS Error?**
- Check `FRONTEND_URL` in Render matches Vercel URL exactly
- Include `https://` protocol

**API not working?**
- Verify `VITE_API_URL` ends with `/api`
- Test backend: `https://your-backend-url.onrender.com/health`

---

## 📝 Save These URLs

- **Backend**: `https://____________________.onrender.com`
- **Frontend**: `https://____________________.vercel.app`

Share your frontend URL with recruiters - it's **permanent and free**! 🚀

For detailed instructions, see [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md)