function AnalysisResults({ results }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreTextColor = (score) => {
    if (score >= 80) return 'text-green-700';
    if (score >= 60) return 'text-yellow-700';
    return 'text-red-700';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis Results</h2>

      {/* Match Score */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-700">Match Score</h3>
          <span className={`text-3xl font-bold ${getScoreTextColor(results.matchScore)}`}>
            {results.matchScore}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`${getScoreColor(results.matchScore)} h-4 rounded-full transition-all duration-500`}
            style={{ width: `${results.matchScore}%` }}
          ></div>
        </div>
      </div>

      {/* Strengths */}
      {results.strengths && results.strengths.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Strengths</h3>
          <ul className="space-y-2">
            {results.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing Keywords */}
      {results.missingKeywords && results.missingKeywords.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Missing Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {results.missingKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Improvements */}
      {results.improvements && results.improvements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Suggested Improvements</h3>
          <ul className="space-y-2">
            {results.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">→</span>
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Resume Bullet Rewrites */}
      {results.resumeBulletsRewrite && results.resumeBulletsRewrite.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Resume Bullet Improvements</h3>
          <div className="space-y-4">
            {results.resumeBulletsRewrite.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Original:</span> {item.original}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Improved:</span> {item.improved}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalysisResults;