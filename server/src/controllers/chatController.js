const { generateCareerAdvice } = require('../services/aiAnalyzer');
const Report = require('../models/Report');

/**
 * Handle chat messages for career advice
 * POST /api/chat
 */
const handleChatMessage = async (req, res) => {
  try {
    const { message, reportId } = req.body;

    // Validate input
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message is required.'
      });
    }

    let resumeText = '';

    // If reportId is provided, get the resume text for context
    if (reportId) {
      try {
        const report = await Report.findById(reportId);
        if (report) {
          resumeText = report.resumeText;
        }
      } catch (error) {
        console.error('Error fetching report for chat context:', error);
        // Continue without context if report not found
      }
    }

    // Generate AI response
    let aiResponse;
    try {
      aiResponse = await generateCareerAdvice(message, resumeText);
    } catch (aiError) {
      console.error('AI chat error:', aiError);
      return res.status(500).json({
        success: false,
        error: 'AI service is temporarily unavailable. Please try again later.'
      });
    }

    // Send response
    res.json({
      success: true,
      data: {
        message: message,
        response: aiResponse,
        timestamp: new Date(),
        hasContext: !!resumeText
      }
    });

  } catch (error) {
    console.error('Chat controller error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during chat processing.'
    });
  }
};

/**
 * Get chat suggestions based on recent reports
 * GET /api/chat/suggestions
 */
const getChatSuggestions = async (req, res) => {
  try {
    // Get recent reports to generate contextual suggestions
    const recentReports = await Report.find()
      .sort({ uploadedAt: -1 })
      .limit(3)
      .select('analysis fileName uploadedAt')
      .lean();

    const suggestions = [];

    if (recentReports.length > 0) {
      const latestReport = recentReports[0];
      
      // Generate suggestions based on the latest analysis
      if (latestReport.analysis.missingSkills.length > 0) {
        suggestions.push({
          type: 'skill_improvement',
          text: `How can I improve my ${latestReport.analysis.missingSkills.slice(0, 2).join(' and ')} skills?`,
          priority: 'high'
        });
      }

      if (latestReport.analysis.fitScore < 70) {
        suggestions.push({
          type: 'resume_optimization',
          text: 'What can I do to make my resume more attractive to employers?',
          priority: 'high'
        });
      }

      suggestions.push({
        type: 'career_guidance',
        text: 'What are the trending skills in my field?',
        priority: 'medium'
      });

      suggestions.push({
        type: 'interview_prep',
        text: 'How should I prepare for interviews in my industry?',
        priority: 'medium'
      });
    } else {
      // Default suggestions when no reports exist
      suggestions.push(
        {
          type: 'general',
          text: 'How can I improve my resume?',
          priority: 'high'
        },
        {
          type: 'general',
          text: 'What skills are most in demand in tech?',
          priority: 'medium'
        },
        {
          type: 'general',
          text: 'How do I write a compelling cover letter?',
          priority: 'medium'
        }
      );
    }

    res.json({
      success: true,
      data: {
        suggestions: suggestions.slice(0, 5), // Limit to 5 suggestions
        recentReportsCount: recentReports.length
      }
    });

  } catch (error) {
    console.error('Get chat suggestions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve chat suggestions.'
    });
  }
};

/**
 * Get chat history (placeholder for future implementation)
 * GET /api/chat/history
 */
const getChatHistory = async (req, res) => {
  try {
    // For now, return empty history
    // In a full implementation, you would store chat sessions in the database
    res.json({
      success: true,
      data: {
        history: [],
        message: 'Chat history feature coming soon!'
      }
    });

  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve chat history.'
    });
  }
};

module.exports = {
  handleChatMessage,
  getChatSuggestions,
  getChatHistory
};
