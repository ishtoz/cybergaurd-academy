const { body, validationResult } = require('express-validator');

// Validation middleware to check for errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Validator for registration
const registerValidator = [
  body('username')
    .trim()
    .escape()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
  
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email format')
    .escape(),
  
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
  
  handleValidationErrors
];

// Validator for login
const loginValidator = [
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email format')
    .escape(),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

module.exports = {
  registerValidator,
  loginValidator
};

