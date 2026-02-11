-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting emails (public access for waitlist signup)
CREATE POLICY "Allow public to insert emails" ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow reading emails (optional - only if you need to check for duplicates)
CREATE POLICY "Allow public to read their own email" ON waitlist
  FOR SELECT
  TO public
  USING (true);
