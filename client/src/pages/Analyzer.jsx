import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Send, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Share2
} from 'lucide-react';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import { uploadAndAnalyze } from '../api/resumeAPI';
import { useReports } from '../context/ReportContext';

const Analyzer = () => {
  const navigate = useNavigate();
  const { addReport } = useReports();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError(null);
    setAnalysisResult(null);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setError(null);
    setAnalysisResult(null);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
    setError(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please upload a resume file.');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please enter a job description.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await uploadAndAnalyze(selectedFile, jobDescription);
      
      if (result.success) {
        setAnalysisResult(result.data);
        addReport(result.data);
        
        // Navigate to dashboard after successful analysis
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setError(result.error || 'Analysis failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setJobDescription('');
    setAnalysisResult(null);
    setError(null);
  };

  const handleDownloadReport = () => {
    if (!analysisResult) return;
    
    const reportData = {
      fileName: analysisResult.fileName,
      fitScore: analysisResult.analysis.fitScore,
      matchedSkills: analysisResult.analysis.matchedSkills,
      missingSkills: analysisResult.analysis.missingSkills,
      suggestions: analysisResult.analysis.suggestions,
      analyzedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareReport = () => {
    if (!analysisResult) return;
    
    const shareText = `I just analyzed my resume with AI! Job fit score: ${analysisResult.analysis.fitScore}%. Check out AI Resume Analyzer!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Resume Analysis Results',
        text: shareText,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI Resume Analyzer
          </h1>
          <p className="text-xl text-gray-600">
            Upload your resume and job description to get AI-powered analysis
          </p>
        </div>

        {!analysisResult ? (
          <div className="space-y-8">
            {/* File Upload Section */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Resume</span>
              </h2>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                selectedFile={selectedFile}
                isLoading={isAnalyzing}
                error={error && error.includes('file') ? error : null}
              />
            </div>

            {/* Job Description Section */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Job Description</span>
              </h2>
              <div className="space-y-4">
                <textarea
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                  placeholder="Paste the job description you're applying for here..."
                  className="textarea-field h-32"
                  disabled={isAnalyzing}
                />
                <p className="text-sm text-gray-500">
                  Include key requirements, responsibilities, and qualifications for better analysis.
                </p>
              </div>
            </div>

            {/* Error Display */}
            {error && !error.includes('file') && (
              <div className="card bg-error-50 border-error-200">
                <div className="flex items-center space-x-2 text-error-700">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || !jobDescription.trim() || isAnalyzing}
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Analyze Resume</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-8">
            {/* Success Message */}
            <div className="card bg-success-50 border-success-200">
              <div className="flex items-center space-x-2 text-success-700 mb-2">
                <CheckCircle className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Analysis Complete!</h2>
              </div>
              <p className="text-success-600">
                Your resume has been analyzed successfully. Redirecting to dashboard...
              </p>
            </div>

            {/* Fit Score */}
            <div className="card text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Job Fit Score</h3>
              <div className="text-6xl font-bold text-primary-600 mb-4">
                {analysisResult.analysis.fitScore}%
              </div>
              <p className="text-gray-600">
                Your resume matches {analysisResult.analysis.fitScore}% of the job requirements
              </p>
            </div>

            {/* Skills Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Skills */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success-600" />
                  <span>Matched Skills</span>
                </h3>
                <div className="space-y-2">
                  {analysisResult.analysis.matchedSkills?.map((skill, index) => (
                    <span key={index} className="badge-success">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-warning-600" />
                  <span>Missing Skills</span>
                </h3>
                <div className="space-y-2">
                  {analysisResult.analysis.missingSkills?.map((skill, index) => (
                    <span key={index} className="badge-warning">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Suggestions</h3>
              <p className="text-gray-700 leading-relaxed">
                {analysisResult.analysis.suggestions}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownloadReport}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>
              
              <button
                onClick={handleShareReport}
                className="btn-secondary flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Results</span>
              </button>
              
              <button
                onClick={handleReset}
                className="btn-primary flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Analyze Another Resume</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;
