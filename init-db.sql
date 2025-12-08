-- Database Initialization Script
-- This script runs automatically when the PostgreSQL container starts for the first time

-- Ensure the database exists (though container creation usually handles this)
-- CREATE DATABASE neocircuitlab;

\c neocircuit_lab;

-- Basic setup if needed (extensions, schemas)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Additional initial grants or config can go here
