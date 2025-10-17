#!/bin/bash

# AI Resume Analyzer Startup Script

echo "🚀 Starting AI Resume Analyzer..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies if node_modules don't exist
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

# Check for environment files
if [ ! -f "server/.env" ]; then
    echo "⚠️  server/.env not found. Please create it with your configuration."
    echo "📋 Copy server/env.example to server/.env and update the values."
    exit 1
fi

if [ ! -f "client/.env" ]; then
    echo "⚠️  client/.env not found. Creating from template..."
    cp client/env.example client/.env
    echo "✅ Created client/.env from template. Please update the API URL if needed."
fi

echo "🔧 Starting servers..."

# Start both servers concurrently
npm run dev
