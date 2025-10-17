const express = require('express');
const router = express.Router();
const {
  handleChatMessage,
  getChatSuggestions,
  getChatHistory
} = require('../controllers/chatController');

/**
 * @route POST /api/chat
 * @desc Handle chat messages for career advice
 * @access Public
 */
router.post('/', handleChatMessage);

/**
 * @route GET /api/chat/suggestions
 * @desc Get contextual chat suggestions
 * @access Public
 */
router.get('/suggestions', getChatSuggestions);

/**
 * @route GET /api/chat/history
 * @desc Get chat history (placeholder)
 * @access Public
 */
router.get('/history', getChatHistory);

module.exports = router;
