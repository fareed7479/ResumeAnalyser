/**
 * Generate comprehensive analysis report
 * @param {Object} analysisData - Raw analysis data from AI
 * @param {string} resumeText - Original resume text
 * @param {string} jobDescription - Job description
 * @param {string} fileName - Original file name
 * @returns {Object} - Formatted report
 */
const generateReport = (analysisData, resumeText, jobDescription, fileName) => {
  const timestamp = new Date();
  
  return {
    id: generateReportId(),
    fileName: fileName,
    uploadedAt: timestamp,
    resumeText: resumeText,
    jobDescription: jobDescription,
    analysis: {
      fitScore: analysisData.fitScore,
      matchedSkills: analysisData.matchedSkills || [],
      missingSkills: analysisData.missingSkills || [],
      suggestions: analysisData.suggestions || '',
      strengths: analysisData.strengths || [],
      weaknesses: analysisData.weaknesses || [],
      experienceMatch: analysisData.experienceMatch || '',
      educationMatch: analysisData.educationMatch || ''
    },
    metadata: {
      textLength: resumeText.length,
      jobDescLength: jobDescription.length,
      analysisTimestamp: timestamp,
      version: '1.0'
    }
  };
};

/**
 * Generate unique report ID
 * @returns {string} - Unique report identifier
 */
const generateReportId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `report_${timestamp}_${random}`;
};

/**
 * Format report for API response
 * @param {Object} report - Complete report object
 * @returns {Object} - Formatted response
 */
const formatReportResponse = (report) => {
  return {
    success: true,
    data: {
      reportId: report.id,
      fileName: report.fileName,
      uploadedAt: report.uploadedAt,
      analysis: report.analysis,
      metadata: {
        textLength: report.metadata.textLength,
        analysisTimestamp: report.metadata.analysisTimestamp
      }
    }
  };
};

/**
 * Generate summary statistics for dashboard
 * @param {Array} reports - Array of all reports
 * @returns {Object} - Dashboard statistics
 */
const generateDashboardStats = (reports) => {
  if (!reports || reports.length === 0) {
    return {
      totalReports: 0,
      averageFitScore: 0,
      maxFitScore: 0,
      minFitScore: 0,
      topSkills: [],
      improvementAreas: [],
      recentActivity: []
    };
  }

  const totalReports = reports.length;
  const fitScores = reports.map(report => report.analysis.fitScore);
  const averageFitScore = Math.round(
    fitScores.reduce((sum, score) => sum + score, 0) / totalReports
  );
  const maxFitScore = Math.max(...fitScores);
  const minFitScore = Math.min(...fitScores);

  // Aggregate all matched skills
  const allSkills = {};
  const allMissingSkills = {};
  
  reports.forEach(report => {
    // Safely handle matched skills
    if (report.analysis.matchedSkills && Array.isArray(report.analysis.matchedSkills)) {
      report.analysis.matchedSkills.forEach(skill => {
        if (skill && typeof skill === 'string') {
          allSkills[skill] = (allSkills[skill] || 0) + 1;
        }
      });
    }
    
    // Safely handle missing skills
    if (report.analysis.missingSkills && Array.isArray(report.analysis.missingSkills)) {
      report.analysis.missingSkills.forEach(skill => {
        if (skill && typeof skill === 'string') {
          allMissingSkills[skill] = (allMissingSkills[skill] || 0) + 1;
        }
      });
    }
  });

  const topSkills = Object.entries(allSkills)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));

  const improvementAreas = Object.entries(allMissingSkills)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));

  const recentActivity = reports
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(0, 5)
    .map(report => ({
      reportId: report.id,
      fileName: report.fileName,
      fitScore: report.analysis.fitScore,
      uploadedAt: report.uploadedAt
    }));

  return {
    totalReports,
    averageFitScore,
    maxFitScore,
    minFitScore,
    topSkills,
    improvementAreas,
    recentActivity
  };
};

/**
 * Validate analysis data structure
 * @param {Object} data - Analysis data to validate
 * @returns {boolean} - Whether data is valid
 */
const validateAnalysisData = (data) => {
  const requiredFields = ['fitScore', 'matchedSkills', 'missingSkills', 'suggestions'];
  return requiredFields.every(field => data.hasOwnProperty(field));
};

module.exports = {
  generateReport,
  formatReportResponse,
  generateDashboardStats,
  validateAnalysisData
};
