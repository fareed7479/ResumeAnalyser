import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 seconds for file uploads and AI processing
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 413) {
      error.message = 'File too large. Please upload a file smaller than 10MB.';
    } else if (error.response?.status === 415) {
      error.message = 'Unsupported file type. Please upload PDF or DOCX files only.';
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. The server is taking too long to respond.';
    } else if (!error.response) {
      error.message = 'Network error. Please check your connection and try again.';
    }
    
    return Promise.reject(error);
  }
);

/**
 * Upload and analyze resume against job description
 * @param {File} file - Resume file (PDF or DOCX)
 * @param {string} jobDescription - Job description text
 * @returns {Promise<Object>} - Analysis results
 */
export const uploadAndAnalyze = async (file, jobDescription) => {
  try {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    const response = await api.post('/resume/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error('Upload and analyze error:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze resume',
      details: error.response?.data?.error || 'Unknown error occurred',
    };
  }
};

/**
 * Get all reports with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<Object>} - Reports and pagination info
 */
export const getReports = async (page = 1, limit = 10) => {
  try {
    const response = await api.get('/resume/reports', {
      params: { page, limit },
    });

    return {
      success: true,
      data: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error('Get reports error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch reports',
      data: [],
      pagination: null,
    };
  }
};

/**
 * Get single report by ID
 * @param {string} id - Report ID
 * @returns {Promise<Object>} - Report data
 */
export const getReportById = async (id) => {
  try {
    const response = await api.get(`/resume/reports/${id}`);

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error('Get report by ID error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch report',
      data: null,
    };
  }
};

/**
 * Get dashboard statistics
 * @returns {Promise<Object>} - Dashboard stats
 */
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/resume/dashboard');

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch dashboard statistics',
      data: null,
    };
  }
};

/**
 * Delete report by ID
 * @param {string} id - Report ID
 * @returns {Promise<Object>} - Deletion result
 */
export const deleteReport = async (id) => {
  try {
    const response = await api.delete(`/resume/reports/${id}`);

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.error('Delete report error:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete report',
    };
  }
};

/**
 * Check API health
 * @returns {Promise<Object>} - Health status
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Health check error:', error);
    return {
      success: false,
      error: error.message || 'API is not responding',
    };
  }
};

export default api;
