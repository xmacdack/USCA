/*
  # Create settings table

  1. New Tables
    - `settings`
      - `id` (text, primary key) - setting identifier
      - `data` (jsonb) - settings JSON data
      - `created_at` (timestamptz) - creation timestamp
      - `updated_at` (timestamptz) - last update timestamp

  2. Security
    - Enable RLS on `settings` table
    - Add policy for public read access (settings are site-wide config)
    - Add policy for authenticated admin updates
*/

CREATE TABLE IF NOT EXISTS settings (
  id text PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings"
  ON settings
  FOR SELECT
  TO anon, authenticated
  USING (id = 'site_settings');

CREATE POLICY "Authenticated users can insert settings"
  ON settings
  FOR INSERT
  TO authenticated
  WITH CHECK (id = 'site_settings');

CREATE POLICY "Authenticated users can update settings"
  ON settings
  FOR UPDATE
  TO authenticated
  USING (id = 'site_settings')
  WITH CHECK (id = 'site_settings');