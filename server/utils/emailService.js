const nodemailer = require('nodemailer');

/**
 * Send verification email to user
 * @param {string} email - User's email address
 * @param {string} verificationToken - Verification token
 * @param {string} username - User's username
 * @returns {Promise} Promise that resolves on success, rejects on error
 */
const sendVerificationEmail = async (email, verificationToken, username) => {
  try {
    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Verification URL
    const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;

    // HTML email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #667eea;
            margin: 0;
          }
          .content {
            margin-bottom: 30px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
          }
          .button:hover {
            opacity: 0.9;
          }
          .note {
            background-color: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #667eea;
            margin: 20px 0;
            font-size: 14px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CyberGuard Academy</h1>
          </div>
          <div class="content">
            <p>Hi ${username},</p>
            <p>Thanks for signing up! Please verify your email address to complete your registration.</p>
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
            <div class="note">
              <strong>Note:</strong> This link expires in 24 hours.
            </div>
          </div>
          <div class="footer">
            <p>If you didn't create an account, please ignore this email.</p>
            <p>&copy; ${new Date().getFullYear()} CyberGuard Academy. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const textTemplate = `
Hi ${username},

Thanks for signing up! Please verify your email address to complete your registration.

Click this link to verify your email:
${verificationUrl}

Note: This link expires in 24 hours.

If you didn't create an account, please ignore this email.

© ${new Date().getFullYear()} CyberGuard Academy. All rights reserved.
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your CyberGuard Academy Account',
      text: textTemplate,
      html: htmlTemplate
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully:', info.messageId);
    console.log('Email sent to:', email);
    
    return info;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail
};

