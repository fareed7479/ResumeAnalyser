const { extractResumeText, cleanText } = require('../services/textExtractor');
const { analyzeResumeWithAI } = require('../services/aiAnalyzer');
const { generateReport, formatReportResponse, generateDashboardStats } = require('../services/reportGenerator');
const Report = require('../models/Report');

/**
 * Upload and analyze resume
 * POST /api/resume/analyze
 */
const analyzeResume = async (req, res) => {
  try {
    // Check if file and job description are provided
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded. Please upload a resume file.'
      });
    }

    if (!req.body.jobDescription || req.body.jobDescription.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Job description is required.'
      });
    }

    const { jobDescription } = req.body;
    const file = req.file;

    console.log(`Processing resume: ${file.originalname}`);

    // Extract text from uploaded file
    let resumeText;
    try {
      resumeText = await extractResumeText(file);
      resumeText = cleanText(resumeText);
      
      if (!resumeText || resumeText.trim().length < 50) {
        return res.status(400).json({
          success: false,
          error: 'Unable to extract meaningful text from the uploaded file. Please ensure the file is not corrupted and contains readable text.'
        });
      }
    } catch (extractError) {
      console.error('Text extraction error:', extractError);
      return res.status(400).json({
        success: false,
        error: `Error processing file: ${extractError.message}`
      });
    }

    // Analyze resume with AI
    let analysisResult;
    try {
      analysisResult = await analyzeResumeWithAI(resumeText, jobDescription);
      console.log('AI analysis completed successfully');
    } catch (aiError) {
      console.error('AI analysis error:', aiError);
      return res.status(500).json({
        success: false,
        error: 'AI analysis failed. Please try again later.'
      });
    }

    // Generate report
    const report = generateReport(
      analysisResult,
      resumeText,
      jobDescription,
      file.originalname
    );

    // Save report to database
    let savedReport;
    try {
      savedReport = await Report.create(report);
      console.log(`Report saved with ID: ${savedReport._id}`);
    } catch (dbError) {
      console.error('Database save error:', dbError);
      return res.status(500).json({
        success: false,
        error: 'Failed to save analysis results.'
      });
    }

    // Format and send response
    const response = formatReportResponse(savedReport);
    res.status(201).json(response);

  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during resume analysis.'
    });
  }
};

/**
 * Get all reports with pagination
 * GET /api/resume/reports?page=1&limit=10
 */
const getReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid pagination parameters. Page must be >= 1, limit must be between 1-100.'
      });
    }

    const result = await Report.getReportsWithPagination(page, limit);

    res.json({
      success: true,
      data: result.reports,
      pagination: result.pagination
    });

  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve reports.'
    });
  }
};

/**
 * Get single report by ID
 * GET /api/resume/reports/:id
 */
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found.'
      });
    }

    res.json({
      success: true,
      data: report
    });

  } catch (error) {
    console.error('Get report by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid report ID format.'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve report.'
    });
  }
};

/**
 * Get dashboard statistics
 * GET /api/resume/dashboard
 */
const getDashboardStats = async (req, res) => {
  try {
    // Get all reports for comprehensive statistics
    const allReports = await Report.find()
      .select('fileName uploadedAt analysis.fitScore analysis.matchedSkills analysis.missingSkills')
      .lean();
    
    // Generate comprehensive dashboard stats including skills aggregation
    const stats = generateDashboardStats(allReports);
    
    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve dashboard statistics.'
    });
  }
};

/**
 * Delete report by ID
 * DELETE /api/resume/reports/:id
 */
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findByIdAndDelete(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found.'
      });
    }

    res.json({
      success: true,
      message: 'Report deleted successfully.',
      data: { deletedId: id }
    });

  } catch (error) {
    console.error('Delete report error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid report ID format.'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to delete report.'
    });
  }
};

module.exports = {
  analyzeResume,
  getReports,
  getReportById,
  getDashboardStats,
  deleteReport
};
