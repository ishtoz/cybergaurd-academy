# Setup Guide: Real CAPTCHA & Email Verification

## 📧 Part 1: Setup Real Email Verification

### Step 1: Create a Gmail Account (or use existing)
If you don't have a Gmail account, create one at https://www.gmail.com

### Step 2: Generate Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. You may need to enable 2-Factor Authentication first
3. Select **Mail** and **Windows Computer**
4. Google generates a 16-character password like: `xxxx xxxx xxxx xxxx`
5. **Copy this password**

### Step 3: Create .env File
In your server folder (`d:\projects\cybergaurd-academy\server`), create a `.env` file:

```
JWT_SECRET=your_super_secret_key_here
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
RECAPTCHA_SECRET_KEY=your_secret_key_from_recaptcha
DATABASE_URL=postgresql://user:password@localhost:5432/cybergaurd
```

**Important:**
- Use your **Gmail app password** (not your regular password)
- Keep this file **private** - never commit to git
- Add `.env` to `.gitignore` if not already there

### Step 4: Test Email Sending
Run your server and try registering. Check the server console for email sending logs.

---

## 🤖 Part 2: Setup Real CAPTCHA

### Step 1: Register Domain with Google reCAPTCHA
1. Go to: https://www.google.com/recaptcha/admin
2. Sign in with your Google account
3. Click the **"Create" (+)** button
4. Fill in the form:
   - **Label**: `CyberGuard Academy`
   - **reCAPTCHA type**: Choose `reCAPTCHA v2 → "I'm not a robot" Checkbox`
   - **Domains**: Add these:
     - `localhost` (for testing)
     - `127.0.0.1` (alternative localhost)
     - Your production domain later
5. **Accept the reCAPTCHA Terms of Service**
6. Click **SUBMIT**

### Step 2: Copy Your Keys
You'll see a page with:
- **Site Key** (frontend) - looks like: `6LeIxAcTAAAAAJ...`
- **Secret Key** (backend) - looks like: `6LeIxAcTAAAAAJ...` (longer)

### Step 3: Add to Environment
Add to your `.env` file:
```
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### Step 4: Update Frontend Site Key
In `client/src/pages/Register.js`, replace the test key:

```javascript
<ReCAPTCHA
  ref={recaptchaRef}
  sitekey="YOUR_ACTUAL_SITE_KEY"  // ← Replace here
  onChange={handleCaptchaChange}
  theme="dark"
/>
```

### Step 5: Test It
1. Start your server and client
2. Try to register without completing CAPTCHA - it should fail
3. Complete the CAPTCHA - should pass

---

## ✅ Complete Flow After Setup

1. **User Registers**
   - Completes real CAPTCHA (blocks bots)
   - Backend verifies with Google
   - User created in database

2. **Verification Email Sent**
   - Real email from your Gmail account
   - Contains verification link

3. **User Clicks Link**
   - Email verified in database
   - Auto-login token generated
   - Redirect to dashboard

---

## 🔒 Environment Variables Summary

```
# Critical for emails
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app_password_from_gmail

# Critical for CAPTCHA
RECAPTCHA_SECRET_KEY=from_google_recaptcha_console

# For JWT tokens
JWT_SECRET=any_random_string_you_want

# Database
DATABASE_URL=your_postgresql_url
```

---

## 🚀 Production Notes

### Before Going Live:
1. **Change JWT_SECRET** to a strong random string
2. **Add your domain** to reCAPTCHA allowed domains
3. **Use a production email** (don't use personal Gmail)
4. **Store .env securely** - never commit to git
5. **Consider Email Service**: Gmail has daily limits (~100 emails/day). For production, use:
   - SendGrid
   - Mailgun
   - AWS SES
   - Twilio SendGrid

### Update Frontend:
Change verification link domain from `localhost:3000` to your production domain in `emailService.js`:

```javascript
// Before (development):
const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;

// After (production):
const verificationLink = `https://yourdomain.com/verify-email?token=${verificationToken}`;
```

---

## 🐛 Troubleshooting

### Emails not being sent?
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Gmail account needs 2FA enabled
- Use app password, not regular password
- Check server console for error logs

### CAPTCHA not validating?
- Verify RECAPTCHA_SECRET_KEY is correct
- Ensure Site Key in Register.js matches your reCAPTCHA admin console
- Allow localhost in reCAPTCHA domains

### Still using test keys?
- Will always pass - fine for development
- Switch to real keys before production
