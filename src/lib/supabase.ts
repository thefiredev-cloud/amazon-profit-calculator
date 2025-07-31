import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  user_id: string;
  created_at: string;
  subscription_tier?: 'free' | 'pro';
  calculations_count?: number;
}

export interface Calculation {
  id: string;
  user_id: string;
  product_name: string;
  price: number;
  category: string;
  weight: number;
  dimensions: string;
  cogs: number;
  monthly_units: number;
  profit_per_unit: number;
  profit_margin: number;
  monthly_profit: number;
  created_at: string;
}