const express = require('express');
const router = express.Router();
const {
  analyzeResume,
  getReports,
  getReportById,
  getDashboardStats,
  deleteReport
} = require('../controllers/resumeController');
const { upload, handleUploadError, cleanupUploadedFile } = require('../middleware/uploadMiddleware');

/**
 * @route POST /api/resume/analyze
 * @desc Upload and analyze resume against job description
 * @access Public
 */
router.post('/analyze', 
  upload.single('resume'),
  handleUploadError,
  cleanupUploadedFile,
  analyzeResume
);

/**
 * @route GET /api/resume/reports
 * @desc Get all reports with pagination
 * @access Public
 */
router.get('/reports', getReports);

/**
 * @route GET /api/resume/reports/:id
 * @desc Get single report by ID
 * @access Public
 */
router.get('/reports/:id', getReportById);

/**
 * @route GET /api/resume/dashboard
 * @desc Get dashboard statistics
 * @access Public
 */
router.get('/dashboard', getDashboardStats);

/**
 * @route DELETE /api/resume/reports/:id
 * @desc Delete report by ID
 * @access Public
 */
router.delete('/reports/:id', deleteReport);

module.exports = router;
