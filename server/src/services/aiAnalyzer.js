const { model } = require('../config/gemini');

/**
 * Analyze resume against job description using Gemini AI
 * @param {string} resumeText - Extracted resume text
 * @param {string} jobDescription - Job description text
 * @returns {Promise<Object>} - Analysis results
 */
const analyzeResumeWithAI = async (resumeText, jobDescription) => {
  try {
    const prompt = `
You are an expert HR analyst and resume reviewer. Analyze the following resume against the given job description.

RESUME TEXT:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Please provide a comprehensive analysis in the following JSON format only (no additional text):

{
  "fitScore": <number between 0-100 representing overall job fit percentage>,
  "matchedSkills": [<array of skills from resume that match job requirements>],
  "missingSkills": [<array of skills mentioned in job description but missing from resume>],
  "suggestions": "<string with specific, actionable suggestions for improving the resume and increasing job fit>",
  "strengths": [<array of key strengths and qualifications>],
  "weaknesses": [<array of areas that need improvement>],
  "experienceMatch": "<string describing how well the candidate's experience aligns with the role>",
  "educationMatch": "<string describing how well the candidate's education aligns with requirements>"
}

Guidelines:
- Be specific and actionable in your analysis
- Focus on skills, experience, and qualifications
- Provide constructive feedback
- Consider both hard and soft skills
- Be objective and fair in your assessment
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response text to extract JSON
    let jsonText = text.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/, '').replace(/```\n?$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/, '').replace(/```\n?$/, '');
    }
    
    // Parse the JSON response
    const analysis = JSON.parse(jsonText);
    
    // Validate the response structure
    if (!analysis.fitScore || !analysis.matchedSkills || !analysis.missingSkills || !analysis.suggestions) {
      throw new Error('Invalid AI response format');
    }
    
    return analysis;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    
    // Return fallback analysis if AI fails
    return {
      fitScore: 50,
      matchedSkills: ['Basic qualifications detected'],
      missingSkills: ['Please review job requirements'],
      suggestions: 'Unable to complete AI analysis. Please try again or contact support.',
      strengths: ['Resume uploaded successfully'],
      weaknesses: ['AI analysis temporarily unavailable'],
      experienceMatch: 'Analysis pending',
      educationMatch: 'Analysis pending'
    };
  }
};

/**
 * Generate AI-powered career suggestions
 * @param {string} question - User's question about career development
 * @param {string} resumeText - User's resume text for context
 * @returns {Promise<string>} - AI-generated response
 */
const generateCareerAdvice = async (question, resumeText) => {
  try {
    const prompt = `
You are a professional career advisor. Based on the user's resume and their question, provide helpful career advice.

RESUME CONTEXT:
${resumeText.substring(0, 1000)}...

USER QUESTION:
${question}

Please provide a helpful, specific, and actionable response. Keep it concise but informative.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Career Advice Error:', error);
    return 'I apologize, but I\'m having trouble processing your request right now. Please try again later.';
  }
};

module.exports = {
  analyzeResumeWithAI,
  generateCareerAdvice
};
