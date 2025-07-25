-- Create the goals table
CREATE TABLE goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  target_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  saved_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  category TEXT,
  deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for now - you can make this more restrictive later)
CREATE POLICY "Allow all operations on goals" ON goals
  FOR ALL USING (true);

-- Create an index on created_at for better performance
CREATE INDEX idx_goals_created_at ON goals(created_at DESC);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_goals_updated_at 
    BEFORE UPDATE ON goals 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 