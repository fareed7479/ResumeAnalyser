import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance for chat API
const chatAPI = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds for chat responses
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Send chat message to AI assistant
 * @param {string} message - User's message
 * @param {string} reportId - Optional report ID for context
 * @returns {Promise<Object>} - AI response
 */
export const askAI = async (message, reportId = null) => {
  try {
    const response = await chatAPI.post('/chat', {
      message: message.trim(),
      reportId,
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      success: false,
      error: error.message || 'Failed to get AI response',
      data: null,
    };
  }
};

/**
 * Get chat suggestions based on recent reports
 * @returns {Promise<Object>} - Suggested questions
 */
export const getChatSuggestions = async () => {
  try {
    const response = await chatAPI.get('/chat/suggestions');

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error('Get chat suggestions error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch suggestions',
      data: { suggestions: [] },
    };
  }
};

/**
 * Get chat history (placeholder for future implementation)
 * @returns {Promise<Object>} - Chat history
 */
export const getChatHistory = async () => {
  try {
    const response = await chatAPI.get('/chat/history');

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error('Get chat history error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch chat history',
      data: { history: [] },
    };
  }
};

export default chatAPI;
