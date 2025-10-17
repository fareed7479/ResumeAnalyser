const express = require('express');
const router = express.Router();
const {
  getReports,
  getReportById,
  getDashboardStats,
  deleteReport
} = require('../controllers/resumeController');

/**
 * @route GET /api/reports
 * @desc Get all reports with pagination (alias for resume routes)
 * @access Public
 */
router.get('/', getReports);

/**
 * @route GET /api/reports/:id
 * @desc Get single report by ID (alias for resume routes)
 * @access Public
 */
router.get('/:id', getReportById);

/**
 * @route DELETE /api/reports/:id
 * @desc Delete report by ID (alias for resume routes)
 * @access Public
 */
router.delete('/:id', deleteReport);

module.exports = router;
