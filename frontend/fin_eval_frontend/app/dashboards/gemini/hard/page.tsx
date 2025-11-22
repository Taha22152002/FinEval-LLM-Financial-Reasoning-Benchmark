'use client';

import { useRouter } from 'next/navigation';

export default function GeminiHardDashboard() {
  const router = useRouter();
  
  const geminiHardStats = {
    totalHardQuestions: 40,
    averageScore: 62.8,
    completedEvaluations: 280,
    pendingEvaluations: 25,
    accuracyRate: 58,
    reasoningQuality: 65,
    complexityHandling: 7.2
  };

  const geminiHardQuestions = [
    {
      id: 1,
      question: "Perform a comprehensive cash flow analysis for a company with complex revenue recognition patterns and multiple subsidiaries",
      category: "Advanced Cash Flow",
      score: 58,
      attempts: 3,
      lastEvaluated: "2024-11-21",
      reasoningQuality: "Fair",
      confidence: 0.62,
      complexityScore: 8.5,
      challengeLevel: "High"
    },
    {
      id: 2,
      question: "Evaluate the financial impact of a leveraged buyout including debt service coverage and exit strategies",
      category: "M&A Analysis",
      score: 48,
      attempts: 2,
      lastEvaluated: "2024-11-21",
      reasoningQuality: "Poor",
      confidence: 0.45,
      complexityScore: 9.2,
      challengeLevel: "Very High"
    },
    {
      id: 3,
      question: "Calculate the weighted average cost of capital (WACC) for a multinational corporation with complex capital structure",
      category: "Corporate Finance",
      score: 68,
      attempts: 4,
      lastEvaluated: "2024-11-20",
      reasoningQuality: "Good",
      confidence: 0.71,
      complexityScore: 7.8,
      challengeLevel: "High"
    },
    {
      id: 4,
      question: "Analyze the valuation of a startup using multiple methods including DCF, comparables, and option pricing",
      category: "Valuation",
      score: 62,
      attempts: 3,
      lastEvaluated: "2024-11-20",
      reasoningQuality: "Fair",
      confidence: 0.65,
      complexityScore: 8.0,
      challengeLevel: "High"
    },
    {
      id: 5,
      question: "Assess the risk-adjusted returns of a complex derivatives portfolio including Greeks and scenario analysis",
      category: "Risk Management",
      score: 71,
      attempts: 5,
      lastEvaluated: "2024-11-19",
      reasoningQuality: "Good",
      confidence: 0.74,
      complexityScore: 7.5,
      challengeLevel: "High"
    }
  ];

  const categories = [
    { name: "Advanced Cash Flow", count: 8, avgScore: 55, geminiAccuracy: 58 },
    { name: "M&A Analysis", count: 6, avgScore: 45, geminiAccuracy: 48 },
    { name: "Corporate Finance", count: 10, avgScore: 64, geminiAccuracy: 67 },
    { name: "Valuation", count: 9, avgScore: 59, geminiAccuracy: 62 },
    { name: "Risk Management", count: 7, avgScore: 66, geminiAccuracy: 69 }
  ];

  const weeklyPerformance = [
    { week: "Week 1", score: 58, accuracy: 55, reasoning: 52 },
    { week: "Week 2", score: 61, accuracy: 58, reasoning: 59 },
    { week: "Week 3", score: 64, accuracy: 61, reasoning: 63 },
    { week: "Week 4", score: 63, accuracy: 60, reasoning: 65 }
  ];

  const challengeAnalysis = [
    { factor: "Conceptual Complexity", level: "Very High", score: 9.2 },
    { factor: "Calculation Intensity", level: "High", score: 8.5 },
    { factor: "Multi-step Reasoning", level: "Very High", score: 9.0 },
    { factor: "Domain Knowledge", level: "High", score: 8.8 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Gemini 3 - Hard Questions Dashboard</h1>
            <p className="text-lg text-gray-600">Advanced financial reasoning performance analysis</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/dashboards/gemini')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition duration-150 ease-in-out shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Gemini
            </button>
            <button
              onClick={() => router.push('/dashboards')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50 transition duration-150 ease-in-out shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              All Models
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-red-600">{geminiHardStats.averageScore}%</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
                <p className="text-3xl font-bold text-blue-600">{geminiHardStats.accuracyRate}%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Complexity Handling</p>
                <p className="text-3xl font-bold text-purple-600">{geminiHardStats.complexityHandling}/10</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Question Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Question Categories - Gemini 3 Hard</h2>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} questions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">{category.avgScore}%</p>
                    <p className="text-xs text-gray-500">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Challenge Level Analysis</h2>
            <div className="space-y-4">
              {challengeAnalysis.map((challenge, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-sm font-medium text-gray-700">{challenge.factor}</span>
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-3 h-3 rounded-full ${
                            i < Math.ceil(challenge.score / 2) ? 'bg-red-600' : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <span className="text-xs text-red-600 font-semibold">{challenge.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Performance Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Performance - Gemini 3 Hard</h2>
          <div className="space-y-4">
            {weeklyPerformance.map((week, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <span className="text-sm font-medium text-gray-700">{week.week}</span>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-600">{week.score}%</p>
                    <p className="text-xs text-gray-500">score</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">{week.accuracy}%</p>
                    <p className="text-xs text-gray-500">accuracy</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-purple-600">{week.reasoning}%</p>
                    <p className="text-xs text-gray-500">reasoning</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Gemini 3 Hard Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Gemini 3 Hard Questions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Challenge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Evaluated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {geminiHardQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-lg">{question.question}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        {question.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{width: `${question.score}%`}}></div>
                        </div>
                        <span className="text-sm font-medium">{question.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-medium text-blue-600">{(question.confidence * 100).toFixed(0)}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        question.challengeLevel === 'Very High' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {question.challengeLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{question.lastEvaluated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}