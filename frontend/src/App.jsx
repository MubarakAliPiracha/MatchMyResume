import { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import AnalysisResults from './components/AnalysisResults';
import { analyzeMatch } from './services/api';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('Please upload a resume first');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const analysis = await analyzeMatch(resumeText, jobDescription);
      setResults(analysis);
    } catch (err) {
      setError(err.message || 'Failed to analyze match. Please try again.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Resume Match AI
          </h1>
          <p className="text-gray-600">
            Analyze your resume against job descriptions and get actionable insights
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Resume Upload */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <ResumeUpload 
              onResumeParsed={setResumeText}
              resumeText={resumeText}
            />
          </div>

          {/* Job Description Input */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
            />
          </div>
        </div>

        {/* Analyze Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleAnalyze}
            disabled={loading || !resumeText || !jobDescription}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200"
          >
            {loading ? 'Analyzing...' : 'Analyze Match'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Results */}
        {results && <AnalysisResults results={results} />}
      </div>
    </div>
  );
}

export default App;