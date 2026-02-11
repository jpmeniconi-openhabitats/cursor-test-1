-- Create projects table (unified schema for explorer map, grid, country pages, detail)
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  architect TEXT,
  location TEXT NOT NULL,
  country_code TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  type TEXT NOT NULL,
  year INTEGER,
  status TEXT DEFAULT 'completed',
  materials TEXT[],
  climate TEXT,
  co2_saved TEXT,
  certifications TEXT[],
  image_url TEXT,
  zoom DOUBLE PRECISION DEFAULT 1,
  focus TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_projects_country_code ON projects(country_code);
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(type);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_location ON projects(location);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public read access (no auth required for explorer)
CREATE POLICY "Allow public to read projects" ON projects
  FOR SELECT
  TO public
  USING (true);
