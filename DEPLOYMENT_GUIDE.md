# CyberGuard Academy - Deployment Guide

## Deployment Architecture
- **Backend**: Railway.app (Node.js + PostgreSQL)
- **Frontend**: Vercel (React)
- **Database**: Railway.app PostgreSQL

---

## Step 1: Deploy Backend to Railway.app

### Prerequisites
- Railway.app account (sign up at https://railway.app)
- GitHub account with repo access
- All environment variables ready

### Deploy Steps

1. **Go to Railway.app Dashboard**
   - Sign in at https://railway.app

2. **Create New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your `cybergaurd-academy` repository
   - Railway auto-detects it as Node.js

3. **Configure Environment Variables**
   - In Railway dashboard → Variables
   - Add these variables (get values from `.env.production`):
     ```
     DB_HOST=trolley.proxy.rlwy.net
     DB_USER=postgres
     DB_PASSWORD=your_railway_password
     DB_NAME=railway
     DB_PORT=5432
     JWT_SECRET=your_64_char_random_string
     EMAIL_USER=cybergaurd.academy@gmail.com
     EMAIL_PASSWORD=your_gmail_app_password
     RECAPTCHA_SITE_KEY=your_site_key
     RECAPTCHA_SECRET_KEY=your_secret_key
     NODE_ENV=production
     PORT=5000
     ```

4. **Deploy**
   - Railway auto-deploys on every GitHub push
   - Or manually trigger in dashboard
   - Wait for build to complete (usually 2-5 min)

5. **Get Backend URL**
   - After deploy, Railway shows your public URL
   - Example: `https://cybergaurd-api.up.railway.app`
   - Save this URL for frontend

---

## Step 2: Deploy Frontend to Vercel

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- Backend URL from Step 1

### Deploy Steps

1. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project" → "Import Git Repository"
   - Select `cybergaurd-academy`

2. **Configure Build**
   - **Framework**: React
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

3. **Set Environment Variables**
   - Add variable:
     ```
     REACT_APP_API_URL=https://your-railway-backend-url.up.railway.app
     ```
   - Example: `REACT_APP_API_URL=https://cybergaurd-api.up.railway.app`

4. **Deploy**
   - Click "Deploy"
   - Wait for build (~3-5 min)
   - Vercel shows your frontend URL
   - Example: `https://cybergaurd-academy.vercel.app`

---

## Step 3: Update Backend CORS for Production

### Important: Update Backend for Production Domain

In `server/server.js`, update CORS to include your Vercel URL:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://your-vercel-domain.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
}));
```

Then push to GitHub - Railway auto-redeploys!

---

## Step 4: Update Frontend API Calls for Production

### Update API Endpoint in Client

In `client/src/services/api.js` (if it exists), ensure it uses the environment variable:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const register = (username, email, password, captchaToken) => {
  return fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, captchaToken })
  }).then(res => res.json());
};
```

---

## Step 5: Database Migration to Production

### Create Tables on Production Database

1. **Connect to Railway PostgreSQL**
   - Get connection string from Railway dashboard
   - Format: `postgresql://user:password@host:port/dbname`

2. **Run Migration Script**
   ```bash
   cd server
   node create-tables.js
   ```
   (Update the script to use production DB credentials)

3. **Or Manually Run SQL**
   - Use Railway's SQL editor in dashboard
   - Run the schema from `server/schema.sql`

---

## Step 6: Testing Production Deployment

### Test the Workflow

1. **Register New User**
   - Go to `https://your-vercel-domain.vercel.app`
   - Click Register
   - Fill in username, email, password
   - Complete CAPTCHA
   - Should auto-verify and go to 2FA

2. **Setup 2FA**
   - Scan QR code with Google Authenticator
   - Enter 6-digit code
   - Download backup codes

3. **Login**
   - Click Login
   - Enter email and password
   - Enter 2FA code
   - Should access dashboard/game

---

## Troubleshooting

### Backend Not Responding
- Check Railway logs: Dashboard → Deployments → View Logs
- Verify environment variables are set
- Check database connection string

### Frontend Can't Reach Backend
- Verify `REACT_APP_API_URL` is correct
- Check CORS is configured for your domain
- Check browser console for errors

### Database Connection Failed
- Verify DB credentials in `.env.production`
- Check Railway PostgreSQL is running
- Run `schema.sql` to create tables

### SSL Certificate Issues
- Vercel auto-handles SSL for `*.vercel.app`
- Railway auto-handles SSL for `*.up.railway.app`
- Custom domains require additional setup

---

## Production Checklist

- [ ] Backend deployed to Railway.app
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set in both
- [ ] CORS updated with production domain
- [ ] Database tables created
- [ ] Test full registration flow
- [ ] Test login with 2FA
- [ ] Test game access
- [ ] Check email sending works (if enabled)
- [ ] Monitor logs for errors

---

## Next: Custom Domain (Optional)

To use a custom domain like `cybergaurd-academy.com`:

1. **Buy domain** from Namecheap, GoDaddy, etc.
2. **Vercel**: Add custom domain in project settings
3. **Railway**: Add custom domain in project settings
4. **Update DNS** records to point to your services

For detailed instructions, see Vercel and Railway documentation.

---

## Rollback Strategy

If something breaks:

1. **Railway**: Previous deployments saved, click "Redeploy" on prior version
2. **Vercel**: Previous builds saved, click "Redeploy" on stable version
3. **Git**: Push rollback commit to undo changes

---

## Monitoring & Support

- **Railway Logs**: Dashboard → Deployments → Logs
- **Vercel Logs**: Dashboard → Deployments → Logs
- **Error Tracking**: Add Sentry later for production errors
- **Analytics**: Add tracking to understand user behavior
