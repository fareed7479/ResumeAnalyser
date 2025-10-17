# 💼 AI-Powered Resume & Skill Analyzer

A comprehensive full-stack application that uses AI (Gemini) to analyze resumes against job descriptions, providing detailed insights, skill matching, and personalized career advice.

## 🚀 Features

- **AI-Powered Analysis**: Uses Google's Gemini AI for intelligent resume analysis
- **Job Fit Scoring**: Get percentage match scores with detailed breakdowns
- **Skill Matching**: Identify matched and missing skills
- **Career Assistant**: Chat with AI for personalized career guidance
- **Dashboard Analytics**: Track your resume analysis history and progress
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **File Support**: Upload PDF and DOCX resume files

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **Google Gemini AI** (Gemini 1.5 Flash)
- **Multer** for file uploads
- **pdf-parse** for PDF text extraction

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **Recharts** for data visualization
- **Axios** for API calls
- **Lucide React** for icons

## 📁 Project Structure

```
AI-Resume-Analyzer/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Main application pages
│   │   ├── api/            # API integration layer
│   │   ├── context/        # React context for state management
│   │   └── ...
│   └── package.json
├── server/                 # Backend Node.js application
│   ├── src/
│   │   ├── config/         # Database and AI configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── middleware/     # Custom middleware
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd AI-Resume-Analyzer
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-resume-analyzer?retryWrites=true&w=majority
GEMINI_API_KEY=your-gemini-api-key-here
```

Start the backend server:

```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## 🔧 Configuration

### MongoDB Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update the `MONGO_URI` in your `.env` file

### Gemini AI Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your backend `.env` file as `GEMINI_API_KEY`

## 📊 API Endpoints

### Resume Analysis
- `POST /api/resume/analyze` - Upload and analyze resume
- `GET /api/resume/reports` - Get all reports with pagination
- `GET /api/resume/reports/:id` - Get specific report
- `GET /api/resume/dashboard` - Get dashboard statistics
- `DELETE /api/resume/reports/:id` - Delete report

### Chat Assistant
- `POST /api/chat` - Send message to AI assistant
- `GET /api/chat/suggestions` - Get contextual suggestions
- `GET /api/chat/history` - Get chat history (placeholder)

### Health Check
- `GET /health` - API health status

## 🎯 Usage

1. **Upload Resume**: Go to the Analyzer page and upload your PDF or DOCX resume
2. **Add Job Description**: Paste the job description you're applying for
3. **Get Analysis**: Click "Analyze Resume" to get AI-powered insights
4. **View Dashboard**: Track your analysis history and progress
5. **Chat Assistant**: Get personalized career advice

## 🔒 File Upload Limits

- **Supported formats**: PDF, DOCX
- **Maximum file size**: 10MB
- **File processing**: Automatic text extraction and cleanup

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds

### Environment Variables for Production

**Backend:**
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your-production-mongodb-uri
GEMINI_API_KEY=your-production-gemini-key
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-url/api
```

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Adding New Features

1. **Backend**: Add new routes in `server/src/routes/`
2. **Frontend**: Create new components in `client/src/components/`
3. **API Integration**: Update API files in `client/src/api/`

## 🐛 Troubleshooting

### Common Issues

1. **File upload fails**: Check file size and format
2. **AI analysis fails**: Verify Gemini API key and quota
3. **Database connection**: Ensure MongoDB URI is correct
4. **CORS errors**: Check backend CORS configuration

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📈 Performance Optimization

- **File processing**: Automatic cleanup of uploaded files
- **AI requests**: Optimized prompts for faster responses
- **Database**: Indexed queries for better performance
- **Frontend**: Lazy loading and code splitting

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Resume templates and builder
- [ ] Company-specific analysis
- [ ] Email notifications
- [ ] Resume comparison tool
- [ ] Integration with job boards
- [ ] Mobile app (React Native)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the troubleshooting section

## 🙏 Acknowledgments

- Google Gemini AI for powerful text analysis
- MongoDB for reliable data storage
- React and Tailwind CSS communities
- All contributors and testers

---

**Built with ❤️ for job seekers everywhere**
