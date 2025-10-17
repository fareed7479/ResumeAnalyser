import React from 'react';
import { 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  FileText,
  Trash2,
  Eye,
  ExternalLink
} from 'lucide-react';
import clsx from 'clsx';

const ReportCard = ({ 
  report, 
  onView, 
  onDelete, 
  showActions = true,
  className = '' 
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFitScoreColor = (score) => {
    if (score >= 80) return 'text-success-600 bg-success-100';
    if (score >= 60) return 'text-warning-600 bg-warning-100';
    return 'text-error-600 bg-error-100';
  };

  const getFitScoreLabel = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Poor Match';
  };

  return (
    <div className={clsx('card-hover', className)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-100 p-2 rounded-lg">
            <FileText className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 truncate max-w-xs">
              {report.fileName || 'Resume Analysis'}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(report.uploadedAt)}</span>
            </div>
          </div>
        </div>

        {/* Fit Score Badge */}
        <div className={clsx(
          'px-3 py-1 rounded-full text-sm font-medium',
          getFitScoreColor(report.analysis.fitScore)
        )}>
          {report.analysis.fitScore}%
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Match Summary */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Job Fit</p>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <span className={clsx('text-sm font-medium', getFitScoreColor(report.analysis.fitScore))}>
              {getFitScoreLabel(report.analysis.fitScore)}
            </span>
          </div>
        </div>

        {/* Skills Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-success-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {report.analysis.matchedSkills?.length || 0}
              </p>
              <p className="text-xs text-gray-500">Matched Skills</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <XCircle className="h-4 w-4 text-error-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {report.analysis.missingSkills?.length || 0}
              </p>
              <p className="text-xs text-gray-500">Missing Skills</p>
            </div>
          </div>
        </div>

        {/* Key Skills Preview */}
        {report.analysis.matchedSkills?.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Key Skills</p>
            <div className="flex flex-wrap gap-1">
              {report.analysis.matchedSkills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="badge-success text-xs"
                >
                  {skill}
                </span>
              ))}
              {report.analysis.matchedSkills.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{report.analysis.matchedSkills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Suggestions Preview */}
        {report.analysis.suggestions && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">AI Suggestions</p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {report.analysis.suggestions}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => onView(report)}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onView(report)}
              className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => onDelete(report._id)}
              className="p-2 text-gray-400 hover:text-error-600 transition-colors duration-200"
              title="Delete report"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCard;
