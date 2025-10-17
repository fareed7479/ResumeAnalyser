const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const resumeRoutes = require('./routes/resumeRoutes');
const chatRoutes = require('./routes/chatRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from uploads directory (for development)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI Resume Analyzer API is running',
    timestamp: new Date(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/resume', resumeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/reports', reportRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to AI Resume Analyzer API',
    endpoints: {
      health: '/health',
      analyze: 'POST /api/resume/analyze',
      reports: 'GET /api/resume/reports',
      dashboard: 'GET /api/resume/dashboard',
      chat: 'POST /api/chat',
      chatSuggestions: 'GET /api/chat/suggestions'
    },
    documentation: 'https://github.com/your-repo/ai-resume-analyzer'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /health',
      'POST /api/resume/analyze',
      'GET /api/resume/reports',
      'GET /api/resume/reports/:id',
      'GET /api/resume/dashboard',
      'DELETE /api/resume/reports/:id',
      'POST /api/chat',
      'GET /api/chat/suggestions',
      'GET /api/chat/history'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  // Handle specific error types
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: error.message
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
  }

  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate entry found'
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

module.exports = app;
