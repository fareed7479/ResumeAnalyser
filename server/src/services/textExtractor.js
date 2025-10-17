const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');

/**
 * Extract text content from PDF files
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<string>} - Extracted text content
 */
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error(`Error extracting text from PDF: ${error.message}`);
  }
};

/**
 * Extract text content from DOCX files (placeholder for future implementation)
 * @param {string} filePath - Path to the DOCX file
 * @returns {Promise<string>} - Extracted text content
 */
const extractTextFromDOCX = async (filePath) => {
  // Note: For DOCX support, you would need to install 'mammoth' package
  // npm install mammoth
  // const mammoth = require('mammoth');
  // const result = await mammoth.extractRawText({ path: filePath });
  // return result.value;
  
  throw new Error('DOCX extraction not implemented. Please convert to PDF or install mammoth package.');
};

/**
 * Extract text from uploaded resume file
 * @param {Object} file - Multer file object
 * @returns {Promise<string>} - Extracted text content
 */
const extractResumeText = async (file) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  switch (fileExtension) {
    case '.pdf':
      return await extractTextFromPDF(file.path);
    case '.docx':
      return await extractTextFromDOCX(file.path);
    default:
      throw new Error(`Unsupported file format: ${fileExtension}. Please upload PDF or DOCX files.`);
  }
};

/**
 * Clean and normalize extracted text
 * @param {string} text - Raw extracted text
 * @returns {string} - Cleaned text
 */
const cleanText = (text) => {
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
    .trim();
};

module.exports = {
  extractResumeText,
  cleanText
};
