const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const crypto = require('crypto');
const db = require('../config/database');
const { registerValidator, loginValidator } = require('../middleware/validators');
const { authLimiter, registerLimiter } = require('../middleware/rateLimiter');
const { sendVerificationEmail } = require('../utils/emailService');

// Register a new user - SIMPLIFIED FOR DEBUGGING
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    console.log('=== Registration Attempt ===');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password received:', password ? 'Yes' : 'No');

    // Basic validation
    if (!username || !email || !password) {
      console.log('Missing fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Username, email, and password are required' 
      });
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Insert into database
    console.log('Inserting into database...');
    
    const insertQuery = `
      INSERT INTO users (username, email, password_hash, email_verified, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, username, email, created_at
    `;
    
    const result = await db.query(insertQuery, [username, email, hashedPassword, true]);
    const user = result.rows[0];
    
    console.log('User created successfully:', user.id);

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = jwt.sign(
  { userId: result.rows[0].id },
  process.env.JWT_SECRET,  // Make sure this line is there
  { expiresIn: '24h' }
);
    
    console.log('Token generated successfully');
    console.log('=== Registration Successful ===');

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('=== Registration Error ===');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
    
    // Handle duplicate username/email
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Registration failed: ' + error.message
    });
  }
});

// Verify email
router.get('/verify-email', async (req, res, next) => {
  try {
    // Extract token from query parameters
    const { token } = req.query;

    // Validate token is provided
    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Verification token is required'
      });
    }

    // Query database to find user with verification token
    let result;
    try {
      result = await db.query(
        'SELECT id, email, username, verification_token, token_expiry, email_verified FROM users WHERE verification_token = $1',
        [token]
      );
    } catch (dbError) {
      console.error('Database error finding user by verification token:', dbError);
      return res.status(500).json({
        success: false,
        error: 'Failed to verify email. Please try again.'
      });
    }

    // Check if user found
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired verification token'
      });
    }

    const user = result.rows[0];

    // Check if email already verified
    if (user.email_verified) {
      return res.status(400).json({
        success: false,
        error: 'Email has already been verified'
      });
    }

    // Check if token expired
    if (!user.token_expiry) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired verification token'
      });
    }

    const now = new Date();
    const expiryDate = new Date(user.token_expiry);

    if (now > expiryDate) {
      return res.status(400).json({
        success: false,
        error: 'Verification link has expired. Please request a new one.'
      });
    }

    // Update user: set email_verified = true, clear verification_token and token_expiry
    try {
      await db.query(
        'UPDATE users SET email_verified = true, verification_token = NULL, token_expiry = NULL WHERE id = $1',
        [user.id]
      );
    } catch (dbError) {
      console.error('Database error updating email verification:', dbError);
      return res.status(500).json({
        success: false,
        error: 'Failed to verify email. Please try again.'
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Email verified successfully! You can now login.'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    next(error);
  }
});

// Login user
router.post('/login', authLimiter, loginValidator, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Find user by email
    const result = await db.query(
      'SELECT id, username, email, password_hash, email_verified FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    const user = result.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Check if email is verified
    if (!user.email_verified) {
      return res.status(403).json({
        success: false,
        error: 'Please verify your email before logging in. Check your inbox for the verification link.'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
});

// Verify token
router.get('/verify', async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'No token provided' 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Optionally verify user still exists in database
      const result = await db.query(
        'SELECT id, username, email FROM users WHERE id = $1',
        [decoded.userId]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ 
          error: 'User not found' 
        });
      }

      res.json({
        valid: true,
        user: result.rows[0]
      });
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          error: 'Token expired',
          valid: false 
        });
      }
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          error: 'Invalid token',
          valid: false 
        });
      }
      throw jwtError;
    }
  } catch (error) {
    console.error('Token verification error:', error);
    next(error);
  }
});

module.exports = router;

