# Deployment Guide

> **Recommended**: Use [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md) for free permanent hosting (Render + Vercel)

This guide covers multiple deployment options for the Resume Match AI application.

---

## 🎯 Recommended: Free & Permanent Setup

**Best for portfolio projects and recruiters:**

- **Backend**: Render.com (Free tier - permanent)
- **Frontend**: Vercel.com (Free tier - permanent)
- **Cost**: $0/month forever
- **Setup Time**: 10-15 minutes

👉 **See [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md) for detailed instructions**

---

## Alternative Deployment Options

### Backend Options

#### Option 1: Render.com (Recommended - Free)
- ✅ Free tier available (permanent)
- ⏰ Sleeps after 15 min inactivity (wakes automatically)
- 📊 750 hours/month free
- 🔗 [render.com](https://render.com)

See [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md) for setup.

#### Option 2: Fly.io (Free - No Sleep)
- ✅ Free tier: 3 shared-cpu VMs (256MB each)
- ⚡ No sleep time
- 📦 More complex setup (CLI required)
- 🔗 [fly.io](https://fly.io)

**Setup:**
```bash
npm install -g flyctl
cd backend
fly launch
# Follow prompts
```

#### Option 3: Heroku (Paid)
- ⚠️ No free tier (as of Nov 2022)
- 💰 Starts at $7/month
- 🔗 [heroku.com](https://heroku.com)

---

### Frontend Options

#### Option 1: Vercel (Recommended - Free)
- ✅ Free tier (permanent, unlimited for personal projects)
- ⚡ Instant deployments
- 🌐 Custom domains available
- 🔗 [vercel.com](https://vercel.com)

See [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md) for setup.

#### Option 2: Netlify (Free)
- ✅ Free tier (permanent)
- ⚡ Instant deployments
- 🌐 Custom domains available
- 🔗 [netlify.com](https://netlify.com)

**Setup:**
1. Sign up at [netlify.com](https://netlify.com)
2. Import GitHub repository
3. Set build directory to `frontend`
4. Set publish directory to `frontend/dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy!

---

## Environment Variables

### Backend

**Render/Heroku/Fly.io:**
```
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
PORT=10000 (auto-set by Render, don't override)
```

### Frontend

**Vercel/Netlify:**
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

⚠️ **Important**: 
- Backend URL must include `/api` at the end
- Frontend URL must include `https://` protocol
- No trailing slashes

---

## Testing Deployment

1. **Test Backend Health**
   - Visit: `https://your-backend-url.onrender.com/health`
   - Should return: `{"status":"ok"}`

2. **Test Frontend**
   - Visit your frontend URL
   - Upload a resume
   - Paste a job description
   - Click "Analyze Match"

---

## Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` in backend matches your frontend domain exactly
- Include `https://` protocol (no trailing slash)
- Redeploy backend after changing environment variables

### API Not Found (404)
- Check `VITE_API_URL` includes `/api` at the end
- Verify backend is deployed and running
- Check backend logs for errors

### Backend Sleep (Render Free Tier)
- **Normal behavior**: First request after 15 min inactivity takes 30-50 seconds
- Backend wakes automatically
- Subsequent requests are instant
- **Solution**: Upgrade to paid plan ($7/month) or use Fly.io

### Build Failures
- Check deployment logs
- Verify Node.js version (18+)
- Ensure root directory is set correctly:
  - Backend: `backend`
  - Frontend: `frontend`
- Check all dependencies are in package.json

---

## Cost Comparison

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| **Render** | ✅ Permanent | $7+/month | Portfolio projects |
| **Vercel** | ✅ Permanent | $20+/month | Frontend hosting |
| **Netlify** | ✅ Permanent | $19+/month | Frontend hosting |
| **Fly.io** | ✅ Permanent | $1.94+/month | Backend (no sleep) |
| **Heroku** | ❌ None | $7+/month | Legacy projects |

**Recommended**: Render (Backend) + Vercel (Frontend) = **$0/month forever**

---

## Support

For issues:
1. Check deployment logs in your hosting platform
2. Verify environment variables
3. Test endpoints using Postman or curl
4. Review platform-specific documentation
5. See [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md) for detailed troubleshooting

---

## Quick Links

- [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md) - **Recommended**: Free permanent setup
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Fast deployment guide
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs