import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Plus,
  Eye,
  Trash2,
  RefreshCw,
  Calendar,
  Target,
  CheckCircle,
  XCircle,
  X
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import ReportCard from '../components/ReportCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useReports } from '../context/ReportContext';

const Dashboard = () => {
  const { 
    reports, 
    dashboardStats, 
    loading, 
    error, 
    loadReports, 
    loadDashboardStats,
    deleteReport 
  } = useReports();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    loadReports(currentPage);
    loadDashboardStats();
  }, [currentPage]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && selectedReport) {
        handleCloseModal();
      }
    };

    if (selectedReport) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedReport]);

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      await deleteReport(reportId);
      if (selectedReport?._id === reportId) {
        setSelectedReport(null);
      }
    }
  };

  const handleRefresh = () => {
    loadReports(currentPage);
    loadDashboardStats();
  };

  // Prepare chart data
  const chartData = reports.map((report, index) => ({
    name: `Report ${index + 1}`,
    score: report.analysis.fitScore,
    date: new Date(report.uploadedAt).toLocaleDateString(),
  }));

  const skillData = dashboardStats?.topSkills?.slice(0, 5) || [];
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (loading && reports.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Track your resume analysis history and performance
            </p>
          </div>
          
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="btn-secondary flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            
            <Link
              to="/analyzer"
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Analysis</span>
            </Link>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="card bg-error-50 border-error-200 mb-6">
            <div className="flex items-center space-x-2 text-error-700">
              <XCircle className="h-5 w-5" />
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        {dashboardStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardStats.totalReports}
                  </p>
                </div>
                <div className="bg-primary-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(dashboardStats.averageFitScore)}%
                  </p>
                </div>
                <div className="bg-success-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-success-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Best Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardStats.maxFitScore}%
                  </p>
                </div>
                <div className="bg-warning-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-warning-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recent Activity</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardStats.recentReports?.length || 0}
                  </p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Score Trend Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Score Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Fit Score']}
                    labelStyle={{ color: '#374151' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Skills Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Skills
            </h3>
            <div className="h-64">
              {skillData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ skill, count }) => `${skill} (${count})`}
                    >
                      {skillData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>No skill data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Reports
            </h3>
            {reports.length > 0 && (
              <span className="text-sm text-gray-500">
                Showing {reports.length} reports
              </span>
            )}
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                No reports yet
              </h4>
              <p className="text-gray-500 mb-6">
                Upload your first resume to start tracking your progress
              </p>
              <Link
                to="/analyzer"
                className="btn-primary flex items-center space-x-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                <span>Analyze Resume</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <ReportCard
                  key={report._id}
                  report={report}
                  onView={handleViewReport}
                  onDelete={handleDeleteReport}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {reports.length > 0 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || loading}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <span className="px-4 py-2 text-sm text-gray-600">
                Page {currentPage}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={loading}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Report Detail Modal */}
        {selectedReport && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
          >
            <div 
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedReport.fileName || 'Resume Analysis'}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(selectedReport.uploadedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Job Fit Score */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {selectedReport.analysis.fitScore}%
                  </div>
                  <p className="text-lg text-gray-600">Job Fit Score</p>
                </div>

                {/* Skills Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Matched Skills */}
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-success-600" />
                      <span>Matched Skills ({selectedReport.analysis.matchedSkills?.length || 0})</span>
                    </h3>
                    <div className="space-y-2">
                      {selectedReport.analysis.matchedSkills?.map((skill, index) => (
                        <span key={index} className="badge-success">
                          {skill}
                        </span>
                      ))}
                      {(!selectedReport.analysis.matchedSkills || selectedReport.analysis.matchedSkills.length === 0) && (
                        <p className="text-gray-500 text-sm">No matched skills found</p>
                      )}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <XCircle className="h-5 w-5 text-error-600" />
                      <span>Missing Skills ({selectedReport.analysis.missingSkills?.length || 0})</span>
                    </h3>
                    <div className="space-y-2">
                      {selectedReport.analysis.missingSkills?.map((skill, index) => (
                        <span key={index} className="badge-warning">
                          {skill}
                        </span>
                      ))}
                      {(!selectedReport.analysis.missingSkills || selectedReport.analysis.missingSkills.length === 0) && (
                        <p className="text-gray-500 text-sm">No missing skills identified</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Analysis */}
                {(selectedReport.analysis.strengths?.length > 0 || selectedReport.analysis.weaknesses?.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    {selectedReport.analysis.strengths?.length > 0 && (
                      <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                          <TrendingUp className="h-5 w-5 text-success-600" />
                          <span>Strengths</span>
                        </h3>
                        <ul className="space-y-2">
                          {selectedReport.analysis.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-success-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Weaknesses */}
                    {selectedReport.analysis.weaknesses?.length > 0 && (
                      <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                          <Target className="h-5 w-5 text-warning-600" />
                          <span>Areas for Improvement</span>
                        </h3>
                        <ul className="space-y-2">
                          {selectedReport.analysis.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <XCircle className="h-4 w-4 text-warning-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Experience and Education Match */}
                {(selectedReport.analysis.experienceMatch || selectedReport.analysis.educationMatch) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedReport.analysis.experienceMatch && (
                      <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience Match</h3>
                        <p className="text-gray-700">{selectedReport.analysis.experienceMatch}</p>
                      </div>
                    )}
                    {selectedReport.analysis.educationMatch && (
                      <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Education Match</h3>
                        <p className="text-gray-700">{selectedReport.analysis.educationMatch}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* AI Suggestions */}
                {selectedReport.analysis.suggestions && (
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-primary-600" />
                      <span>AI Recommendations</span>
                    </h3>
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedReport.analysis.suggestions}
                      </p>
                    </div>
                  </div>
                )}

                {/* Modal Footer */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleCloseModal}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleDeleteReport(selectedReport._id)}
                    className="btn-error flex items-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
