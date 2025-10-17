@echo off

REM AI Resume Analyzer Startup Script for Windows

echo 🚀 Starting AI Resume Analyzer...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies if node_modules don't exist
if not exist "server\node_modules" (
    echo 📦 Installing server dependencies...
    cd server
    npm install
    cd ..
)

if not exist "client\node_modules" (
    echo 📦 Installing client dependencies...
    cd client
    npm install
    cd ..
)

REM Check for environment files
if not exist "server\.env" (
    echo ⚠️  server\.env not found. Please create it with your configuration.
    echo 📋 Copy server\env.example to server\.env and update the values.
    pause
    exit /b 1
)

if not exist "client\.env" (
    echo ⚠️  client\.env not found. Creating from template...
    copy "client\env.example" "client\.env"
    echo ✅ Created client\.env from template. Please update the API URL if needed.
)

echo 🔧 Starting servers...

REM Start both servers concurrently
npm run dev

pause
