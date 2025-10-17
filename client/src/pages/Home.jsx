import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Brain, 
  BarChart3, 
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Zap,
  Target
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced Gemini AI analyzes your resume against job requirements with precision.',
    },
    {
      icon: Target,
      title: 'Job Fit Scoring',
      description: 'Get instant compatibility scores and detailed matching insights.',
    },
    {
      icon: CheckCircle,
      title: 'Skill Matching',
      description: 'Identify matched and missing skills to improve your profile.',
    },
    {
      icon: MessageSquare,
      title: 'AI Career Assistant',
      description: 'Get personalized career advice and resume improvement suggestions.',
    },
  ];

  const stats = [
    { label: 'Resumes Analyzed', value: '10,000+' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Average Score Improvement', value: '+25%' },
    { label: 'User Satisfaction', value: '4.9/5' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Optimize Your Resume with
              <span className="text-gradient block mt-2">AI Intelligence</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload your resume, add a job description, and get instant AI-powered analysis 
              with actionable insights to improve your job application success rate.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/analyzer"
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group"
              >
                <FileText className="h-5 w-5" />
                <span>Start Analysis</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link
                to="/dashboard"
                className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2"
              >
                <BarChart3 className="h-5 w-5" />
                <span>View Dashboard</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-success-100 rounded-full opacity-20"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Career Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to optimize your resume and land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-200"
              >
                <div className="bg-gradient-primary p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:shadow-lg transition-shadow duration-200">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your resume analysis in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Upload Resume
              </h3>
              <p className="text-gray-600">
                Upload your resume in PDF or DOCX format. Our AI will extract and analyze the content.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Add Job Description
              </h3>
              <p className="text-gray-600">
                Paste the job description you're applying for. Our AI will compare it with your resume.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get Analysis
              </h3>
              <p className="text-gray-600">
                Receive detailed insights, skill matching, and personalized improvement suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Job Seekers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful job applications
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Start your AI-powered resume analysis today and increase your chances of landing interviews.
          </p>
          
          <Link
            to="/analyzer"
            className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Zap className="h-5 w-5" />
            <span>Get Started Now</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
