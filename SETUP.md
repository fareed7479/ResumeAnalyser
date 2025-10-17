# 🚀 Setup Guide - AI Resume Analyzer

This guide will help you set up the AI Resume Analyzer project from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB Atlas account** - [Sign up here](https://www.mongodb.com/atlas)
- **Google Gemini API key** - [Get it here](https://makersuite.google.com/app/apikey)

## 🔧 Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd AI-Resume-Analyzer
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:

```bash
# Create .env file
touch .env
```

Add the following content to `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-resume-analyzer?retryWrites=true&w=majority
GEMINI_API_KEY=your-gemini-api-key-here
```

**Important**: Replace the placeholder values with your actual credentials.

### 4. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new account or sign in
3. Create a new cluster (free tier is sufficient)
4. Create a database user:
   - Go to Database Access
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a strong password
5. Whitelist your IP address:
   - Go to Network Access
   - Click "Add IP Address"
   - Add your current IP or use `0.0.0.0/0` for development
6. Get your connection string:
   - Go to Clusters
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `ai-resume-analyzer`

### 5. Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Add it to your `server/.env` file

### 6. Frontend Setup

Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

### 7. Frontend Environment Configuration

Create a `.env` file in the `client` directory:

```bash
# Create .env file
touch .env
```

Add the following content to `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 8. Start the Application

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 9. Verify Installation

1. Backend should be running on: `http://localhost:5000`
2. Frontend should be running on: `http://localhost:3000`
3. Visit `http://localhost:5000/health` to check backend health
4. Visit `http://localhost:3000` to access the application

## 🧪 Test the Application

1. Go to `http://localhost:3000`
2. Click "Start Analysis" or navigate to the Analyzer page
3. Upload a sample resume (PDF or DOCX)
4. Add a job description
5. Click "Analyze Resume"
6. Check the results and dashboard

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: 
- Check your MongoDB URI in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify your database credentials

#### 2. Gemini API Error
```
Error: API key not found
```
**Solution**:
- Verify your Gemini API key in `.env`
- Check if the API key has proper permissions
- Ensure you're using the correct API key format

#### 3. File Upload Issues
```
Error: File too large
```
**Solution**:
- Check file size (must be < 10MB)
- Verify file format (PDF or DOCX only)
- Ensure multer configuration is correct

#### 4. CORS Errors
```
Error: CORS policy
```
**Solution**:
- Check backend CORS configuration
- Verify frontend API URL in `.env`
- Ensure both servers are running

#### 5. Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution**:
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=*
```

### Check Logs

**Backend logs**: Check terminal where you ran `npm run dev`
**Frontend logs**: Check browser console (F12)

## 🔄 Development Workflow

1. **Make changes** to the code
2. **Backend**: Restarts automatically with nodemon
3. **Frontend**: Hot reloads automatically
4. **Test changes** in the browser
5. **Check console** for any errors

## 📁 File Structure Reference

```
AI-Resume-Analyzer/
├── server/
│   ├── src/
│   │   ├── config/         # Database and AI config
│   │   ├── controllers/    # API handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── middleware/     # Custom middleware
│   ├── .env                # Backend environment variables
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Application pages
│   │   ├── api/            # API integration
│   │   └── context/        # State management
│   ├── .env                # Frontend environment variables
│   └── package.json
└── README.md
```

## 🚀 Next Steps

Once setup is complete:

1. **Explore the codebase** to understand the structure
2. **Read the API documentation** in the README
3. **Test all features** thoroughly
4. **Customize the application** for your needs
5. **Deploy to production** when ready

## 📞 Need Help?

If you encounter issues:

1. Check this setup guide again
2. Review the main README.md
3. Check the troubleshooting section
4. Create an issue in the GitHub repository
5. Check the console logs for error messages

## ✅ Setup Checklist

- [ ] Node.js installed
- [ ] Repository cloned
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] MongoDB Atlas account created
- [ ] Database connection configured
- [ ] Gemini API key obtained
- [ ] Environment variables set
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Application tested successfully

**🎉 Congratulations! Your AI Resume Analyzer is now ready to use!**
