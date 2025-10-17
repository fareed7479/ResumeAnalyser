const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the Gemini 1.5 Flash model for cost-effective analysis
//const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

module.exports = { genAI, model };
