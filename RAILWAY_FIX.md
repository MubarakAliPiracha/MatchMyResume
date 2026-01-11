# Railway Build Failed - Fix Instructions

## The Problem
Railway is trying to build from the repository root instead of the `backend` folder.

## The Solution

### Option 1: Set Root Directory in Railway Dashboard (Recommended)

1. **Go to your Railway project**: `MatchMyResume`
2. **Click on the service** (the card that shows "Build failed")
3. **Go to "Settings" tab**
4. **Find "Root Directory"** setting
5. **Set it to**: `backend`
6. **Save** and Railway will automatically redeploy

### Option 2: Check Build Logs First

To see what the actual error is:

1. **Click on your `MatchMyResume` project**
2. **Click on "Logs" tab**
3. **Review the error message**

Common errors you might see:
- `package.json not found` → Root directory is wrong
- `Cannot find module` → Dependencies issue
- `Build timeout` → Node version issue

## After Fixing

Once you set Root Directory to `backend`:
- Railway should automatically detect Node.js
- It will run `npm install`
- Then run `npm start`
- Your backend should deploy successfully

## Verify Deployment

After successful deployment:
1. Go to **"Settings" → "Domains"**
2. Copy your Railway URL (e.g., `https://matchmyresume-production.up.railway.app`)
3. Test it: Visit `https://your-url/health`
4. Should return: `{"status":"ok"}`

## Still Having Issues?

If it still fails after setting root directory:
1. Check the logs for specific error
2. Verify `package.json` exists in `backend` folder
3. Make sure Node.js version is 18+ (Railway auto-detects)
4. Try redeploying manually