-- Migration: Add email verification columns to users table
-- Date: 2024

-- Add email verification columns
ALTER TABLE users 
ADD COLUMN email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN verification_token VARCHAR(255),
ADD COLUMN token_expiry TIMESTAMP;

-- Create index on verification_token for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);

-- Verify the columns were added successfully
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns
WHERE table_name = 'users' 
    AND column_name IN ('email_verified', 'verification_token', 'token_expiry')
ORDER BY column_name;

