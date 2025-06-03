/*
  # Add Security Logging Tables

  1. New Tables
    - `webhook_logs`: Logs all incoming webhook events
    - `checkout_logs`: Logs all checkout attempts
    - `edge_function_logs`: Logs all edge function calls

  2. Security
    - Enables Row Level Security (RLS) on all tables
    - Only admins can view logs
*/

-- Create webhook logs table
CREATE TABLE IF NOT EXISTS webhook_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_type TEXT NOT NULL,
    event_id TEXT NOT NULL,
    status TEXT NOT NULL,
    error_message TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create checkout logs table
CREATE TABLE IF NOT EXISTS checkout_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    success BOOLEAN NOT NULL,
    error_message TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create edge function logs table
CREATE TABLE IF NOT EXISTS edge_function_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    function_name TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    status TEXT NOT NULL,
    error_message TEXT,
    request_data JSONB,
    response_data JSONB,
    ip_address TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE edge_function_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Only admins can view webhook logs"
    ON webhook_logs
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can view checkout logs"
    ON checkout_logs
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can view edge function logs"
    ON edge_function_logs
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Create indexes for better query performance
CREATE INDEX webhook_logs_timestamp_idx ON webhook_logs (timestamp DESC);
CREATE INDEX checkout_logs_user_id_idx ON checkout_logs (user_id);
CREATE INDEX checkout_logs_timestamp_idx ON checkout_logs (timestamp DESC);
CREATE INDEX edge_function_logs_function_name_idx ON edge_function_logs (function_name);
CREATE INDEX edge_function_logs_user_id_idx ON edge_function_logs (user_id);
CREATE INDEX edge_function_logs_timestamp_idx ON edge_function_logs (timestamp DESC);