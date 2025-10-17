const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  fitScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  matchedSkills: [{
    type: String,
    trim: true
  }],
  missingSkills: [{
    type: String,
    trim: true
  }],
  suggestions: {
    type: String,
    required: true,
    trim: true
  },
  strengths: [{
    type: String,
    trim: true
  }],
  weaknesses: [{
    type: String,
    trim: true
  }],
  experienceMatch: {
    type: String,
    trim: true
  },
  educationMatch: {
    type: String,
    trim: true
  }
});

const metadataSchema = new mongoose.Schema({
  textLength: {
    type: Number,
    required: true
  },
  jobDescLength: {
    type: Number,
    required: true
  },
  analysisTimestamp: {
    type: Date,
    default: Date.now
  },
  version: {
    type: String,
    default: '1.0'
  }
});

const reportSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  resumeText: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  analysis: {
    type: analysisSchema,
    required: true
  },
  metadata: {
    type: metadataSchema,
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
reportSchema.index({ uploadedAt: -1 });
reportSchema.index({ 'analysis.fitScore': -1 });

// Virtual for formatted fit score
reportSchema.virtual('formattedFitScore').get(function() {
  return `${this.analysis.fitScore}%`;
});

// Virtual for skill match percentage
reportSchema.virtual('skillMatchPercentage').get(function() {
  const totalSkills = this.analysis.matchedSkills.length + this.analysis.missingSkills.length;
  if (totalSkills === 0) return 0;
  return Math.round((this.analysis.matchedSkills.length / totalSkills) * 100);
});

// Method to get summary for dashboard
reportSchema.methods.getSummary = function() {
  return {
    id: this._id,
    fileName: this.fileName,
    fitScore: this.analysis.fitScore,
    skillMatchPercentage: this.skillMatchPercentage,
    uploadedAt: this.uploadedAt,
    matchedSkillsCount: this.analysis.matchedSkills.length,
    missingSkillsCount: this.analysis.missingSkills.length
  };
};

// Static method to get dashboard statistics
reportSchema.statics.getDashboardStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalReports: { $sum: 1 },
        averageFitScore: { $avg: '$analysis.fitScore' },
        maxFitScore: { $max: '$analysis.fitScore' },
        minFitScore: { $min: '$analysis.fitScore' }
      }
    }
  ]);

  const recentReports = await this.find()
    .sort({ uploadedAt: -1 })
    .limit(5)
    .select('fileName analysis.fitScore uploadedAt')
    .lean();

  return {
    ...(stats[0] || { totalReports: 0, averageFitScore: 0, maxFitScore: 0, minFitScore: 0 }),
    recentReports
  };
};

// Static method to get reports with pagination
reportSchema.statics.getReportsWithPagination = async function(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  const reports = await this.find()
    .sort({ uploadedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await this.countDocuments();

  return {
    reports,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalReports: total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  };
};

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
