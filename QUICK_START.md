# 🚀 Quick Start Guide

Get your AI Resume Analyzer running in 5 minutes!

## ⚡ One-Command Setup

### Windows
```bash
start.bat
```

### Linux/Mac
```bash
./start.sh
```

## 🔧 Manual Setup

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all project dependencies
npm run install:all
```

### 2. Configure Environment

**Backend** (`server/.env`):
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-resume-analyzer
GEMINI_API_KEY=your-gemini-api-key
```

**Frontend** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Servers
```bash
# Start both servers
npm run dev

# Or start individually
npm run server:dev  # Backend only
npm run client:dev  # Frontend only
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📋 What You Need

1. **MongoDB Atlas Account** - [Free tier available](https://www.mongodb.com/atlas)
2. **Google Gemini API Key** - [Get it here](https://makersuite.google.com/app/apikey)
3. **Node.js** (v16+) - [Download here](https://nodejs.org/)

## 🎯 First Steps

1. **Upload a Resume**: Go to Analyzer page and upload a PDF/DOCX file
2. **Add Job Description**: Paste the job requirements
3. **Get AI Analysis**: Click "Analyze Resume" for instant insights
4. **View Dashboard**: Track your analysis history
5. **Chat with AI**: Get personalized career advice

## 🆘 Need Help?

- Check the full [SETUP.md](./SETUP.md) for detailed instructions
- Review [README.md](./README.md) for complete documentation
- Create an issue if you encounter problems

## ✅ Ready to Go!

Your AI Resume Analyzer is now running! 🎉
