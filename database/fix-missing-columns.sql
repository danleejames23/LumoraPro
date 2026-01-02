-- Fix missing columns in database schema

-- Add missing columns to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS client VARCHAR(255),
ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS budget DECIMAL(10,2);

-- Add missing column to messages table
ALTER TABLE messages 
ADD COLUMN IF NOT EXISTS is_from_admin BOOLEAN DEFAULT false;

-- Update existing messages to set is_from_admin based on sender_type
UPDATE messages 
SET is_from_admin = (sender_type = 'admin')
WHERE is_from_admin IS NULL;
