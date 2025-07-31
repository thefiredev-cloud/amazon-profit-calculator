-- Amazon Profit Calculator Database Schema
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro')),
  calculations_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Calculations table
CREATE TABLE IF NOT EXISTS calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  category TEXT NOT NULL,
  weight DECIMAL(6,2) NOT NULL,
  length DECIMAL(6,2) NOT NULL,
  width DECIMAL(6,2) NOT NULL,
  height DECIMAL(6,2) NOT NULL,
  cogs DECIMAL(8,2) NOT NULL,
  monthly_units INTEGER NOT NULL,
  
  -- Calculated fields
  referral_fee DECIMAL(8,2) NOT NULL,
  fba_fee DECIMAL(8,2) NOT NULL,
  storage_fee DECIMAL(8,2) NOT NULL,
  total_fees DECIMAL(8,2) NOT NULL,
  profit_per_unit DECIMAL(8,2) NOT NULL,
  profit_margin DECIMAL(5,2) NOT NULL,
  monthly_profit DECIMAL(10,2) NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Calculations policies
CREATE POLICY "Users can view own calculations" ON calculations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calculations" ON calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calculations" ON calculations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own calculations" ON calculations
  FOR DELETE USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile for new users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update calculations count
CREATE OR REPLACE FUNCTION public.increment_calculations_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles 
  SET calculations_count = calculations_count + 1,
      updated_at = NOW()
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to increment calculation count when new calculation is added
CREATE OR REPLACE TRIGGER on_calculation_created
  AFTER INSERT ON public.calculations
  FOR EACH ROW EXECUTE FUNCTION public.increment_calculations_count();

-- Function to check if user can create more calculations
CREATE OR REPLACE FUNCTION public.can_create_calculation(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_tier TEXT;
  calc_count INTEGER;
BEGIN
  SELECT subscription_tier, calculations_count 
  INTO user_tier, calc_count
  FROM public.profiles 
  WHERE user_id = user_uuid;
  
  -- Pro users have unlimited calculations
  IF user_tier = 'pro' THEN
    RETURN TRUE;
  END IF;
  
  -- Free users are limited to 5 calculations per month
  -- For simplicity, we're using total count here
  -- In production, you might want to check monthly count
  RETURN calc_count < 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_calculations_user_id ON calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_calculations_created_at ON calculations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Sample data for testing (optional)
-- INSERT INTO auth.users (id, email) VALUES ('00000000-0000-0000-0000-000000000001', 'test@example.com');
-- This would normally be handled by Supabase Auth