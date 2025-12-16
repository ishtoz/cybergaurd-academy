# Production Deployment Checklist

## ✅ What's Been Done
- ✅ Backend deployed to Railway.app: `https://web-production-80279.up.railway.app`
- ✅ Database (PostgreSQL) running on Railway
- ✅ Authentication system (Register → Email verify → 2FA → Login)
- ✅ All sprites and animations working
- ✅ Error handling and input validation added
- ✅ Comprehensive logging added
- ✅ All code pushed to GitHub

## ❌ What Still Needs to Be Done

### 1. **Deploy Frontend to Vercel** (5 minutes)
1. Go to https://vercel.com/new
2. Import GitHub repo `n10man/cybergaurd-academy`
3. Framework: React
4. Root Directory: `client`
5. Add environment variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://web-production-80279.up.railway.app`
6. Click Deploy
7. Wait 2-3 minutes for build
8. **Copy the Vercel URL** (e.g., `https://cybergaurd-academy.vercel.app`)

### 2. **Update Backend CORS** (5 minutes)
1. Open [server/server.js](server/server.js)
2. Find the CORS configuration
3. Add your Vercel URL to `allowedOrigins`:
   ```javascript
   const allowedOrigins = [
     'http://localhost:3000',
     'http://localhost:3001',
     'https://cybergaurd-academy.vercel.app'  // ← Add your Vercel URL here
   ];
   ```
4. Push to GitHub: `git add -A && git commit -m "Update CORS for production" && git push origin main`
5. Railway auto-redeploys (~1-2 minutes)

### 3. **Create Production Database Tables** (5 minutes)
1. Go to Railway Dashboard
2. Click PostgreSQL service
3. Go to Data Studio
4. Run this SQL:
   ```sql
   CREATE TABLE IF NOT EXISTS users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(50) UNIQUE NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     email_verified BOOLEAN DEFAULT FALSE,
     two_fa_enabled BOOLEAN DEFAULT FALSE,
     two_fa_secret VARCHAR(255),
     two_fa_backup_codes TEXT DEFAULT '[]',
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE IF NOT EXISTS user_progress (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
     game_progress VARCHAR(100) DEFAULT 'start',
     emails_processed INT DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

### 4. **Test Full Workflow** (15 minutes)
1. Visit your Vercel URL
2. Click "Register"
3. Create a test account
4. Complete 2FA setup with Google Authenticator
5. Login with your test account
6. Play game - interact with NPCs, click on emails
7. Check browser console (F12) for any errors
8. Check Rails logs for backend errors

### 5. **Enable Custom Domain (Optional)**
1. Buy a domain (Godaddy, Namecheap, etc.)
2. Vercel: Project Settings → Domains → Add custom domain
3. Follow Vercel's DNS setup instructions
4. Wait 24 hours for DNS propagation

---

## Testing Commands

**Test Register API:**
```bash
curl -X POST https://web-production-80279.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test@123","captchaToken":"token"}'
```

**Test Login API:**
```bash
curl -X POST https://web-production-80279.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123"}'
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| CORS error on frontend | Check backend URL in env vars, ensure Railway CORS updated |
| Database not working | Check Railway PostgreSQL credentials, run SQL schema |
| Sprites not loading | Ensure all files pushed to GitHub with `git add -A` |
| 2FA QR code blank | Check backend `/setup-2fa` endpoint, verify QRCode library |
| Login stuck | Check browser localStorage, clear cache, check server logs |

---

## Production Environment Variables

**Backend (.env on server):**
```
DB_HOST=<Railway PostgreSQL host>
DB_USER=postgres
DB_PASSWORD=<Railway password>
DB_NAME=railway
DB_PORT=5432
JWT_SECRET=b778a2875093ae4d817314ee351d7830d7126d5312e7b18cd33bb32f4889cad0719cec656fbde12b551328252ee2476d226d56299aee085ff6ebefc592ce41b6
EMAIL_USER=cybergaurd.academy@gmail.com
EMAIL_PASSWORD=rzexqptkaqnwujvf
RECAPTCHA_SITE_KEY=6LfwRC0sAAAAAI4uY5mHJ699kTPFnNeZVrNz9sbh
RECAPTCHA_SECRET_KEY=6LfwRC0sAAAAAJRis4IJ4lU9XwBAH35lcJzbCgY8
```

**Frontend (.env in client):**
```
REACT_APP_API_URL=https://web-production-80279.up.railway.app
```

---

## Monitoring & Logging

- **Backend logs:** Railway Dashboard → PostgreSQL → Logs
- **Frontend logs:** Browser console (F12)
- **Production errors:** Check email or set up error tracking (Sentry, LogRocket)

---

**Status:** Ready for final deployment! 🚀
