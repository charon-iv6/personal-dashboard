/*
  # Investment and Savings Tables

  1. New Tables
    - investments: Track investment portfolio
    - savings_goals: Track savings goals and progress
    - investment_transactions: Track investment buy/sell transactions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Investments table
CREATE TABLE investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  symbol text NOT NULL,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('stock', 'crypto', 'mutual_fund')),
  quantity numeric NOT NULL,
  purchase_price numeric NOT NULL,
  current_price numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their investments"
  ON investments FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Savings Goals table
CREATE TABLE savings_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  name text NOT NULL,
  target_amount numeric NOT NULL,
  current_amount numeric NOT NULL DEFAULT 0,
  target_date date,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their savings goals"
  ON savings_goals FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Investment Transactions table
CREATE TABLE investment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  investment_id uuid REFERENCES investments(id) NOT NULL,
  type text NOT NULL CHECK (type IN ('buy', 'sell')),
  quantity numeric NOT NULL,
  price numeric NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE investment_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their investment transactions"
  ON investment_transactions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);