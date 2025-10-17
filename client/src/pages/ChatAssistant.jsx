import React, { useState, useEffect } from 'react';
import { MessageSquare, Bot, User, Lightbulb } from 'lucide-react';
import Chatbot from '../components/Chatbot';
import { useReports } from '../context/ReportContext';

const ChatAssistant = () => {
  const { reports, dashboardStats } = useReports();
  const [selectedReportId, setSelectedReportId] = useState(null);

  // Auto-select the most recent report if available
  useEffect(() => {
    if (reports.length > 0 && !selectedReportId) {
      setSelectedReportId(reports[0]._id);
    }
  }, [reports, selectedReportId]);

  const getReportStats = () => {
    if (!dashboardStats) return null;
    
    return {
      totalReports: dashboardStats.totalReports,
      averageScore: Math.round(dashboardStats.averageFitScore),
      bestScore: dashboardStats.maxFitScore,
    };
  };

  const stats = getReportStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary-100 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                AI Career Assistant
              </h1>
              <p className="text-gray-600">
                Get personalized career advice and resume optimization tips
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Analyses</p>
                  <p className="text-xl font-bold text-gray-900">{stats.totalReports}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3">
                <div className="bg-success-100 p-2 rounded-lg">
                  <Bot className="h-5 w-5 text-success-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-xl font-bold text-gray-900">{stats.averageScore}%</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3">
                <div className="bg-warning-100 p-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-warning-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Best Score</p>
                  <p className="text-xl font-bold text-gray-900">{stats.bestScore}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Chatbot 
              reportId={selectedReportId} 
              className="h-[600px]"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Context Selection */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Chat Context
              </h3>
              
              {reports.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <input
                      type="radio"
                      id="no-context"
                      name="context"
                      checked={!selectedReportId}
                      onChange={() => setSelectedReportId(null)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="no-context" className="text-sm text-gray-700">
                      General career advice
                    </label>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Or use specific report:</p>
                    {reports.slice(0, 5).map((report) => (
                      <div key={report._id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`report-${report._id}`}
                          name="context"
                          checked={selectedReportId === report._id}
                          onChange={() => setSelectedReportId(report._id)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <label 
                          htmlFor={`report-${report._id}`} 
                          className="text-sm text-gray-700 cursor-pointer flex-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate max-w-[150px]">
                              {report.fileName || 'Resume Analysis'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {report.analysis.fitScore}%
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Bot className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    No resume analyses yet. 
                    <br />
                    Upload a resume for contextual advice.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Tips
              </h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="bg-primary-100 p-1 rounded mt-0.5">
                    <Lightbulb className="h-3 w-3 text-primary-600" />
                  </div>
                  <p>Ask about specific skills or technologies</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="bg-primary-100 p-1 rounded mt-0.5">
                    <Lightbulb className="h-3 w-3 text-primary-600" />
                  </div>
                  <p>Get interview preparation advice</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="bg-primary-100 p-1 rounded mt-0.5">
                    <Lightbulb className="h-3 w-3 text-primary-600" />
                  </div>
                  <p>Request resume improvement suggestions</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="bg-primary-100 p-1 rounded mt-0.5">
                    <Lightbulb className="h-3 w-3 text-primary-600" />
                  </div>
                  <p>Explore career growth opportunities</p>
                </div>
              </div>
            </div>

            {/* Sample Questions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sample Questions
              </h3>
              
              <div className="space-y-2 text-sm">
                <p className="text-gray-700 font-medium mb-2">Career Development:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• "How can I improve my leadership skills?"</li>
                  <li>• "What certifications should I pursue?"</li>
                  <li>• "How do I transition to a new industry?"</li>
                </ul>
                
                <p className="text-gray-700 font-medium mb-2 mt-4">Resume Optimization:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• "How can I make my resume stand out?"</li>
                  <li>• "What keywords should I include?"</li>
                  <li>• "How do I quantify my achievements?"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
