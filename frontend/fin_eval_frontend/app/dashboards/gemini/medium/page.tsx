'use client';

import { useRouter } from 'next/navigation';

export default function GeminiMediumDashboard() {
  const router = useRouter();
  
  const geminiMediumStats = {
    totalMediumQuestions: 60,
    averageScore: 74.2,
    completedEvaluations: 380,
    pendingEvaluations: 45,
    accuracyRate: 76,
    reasoningQuality: 78
  };

  const geminiMediumQuestions = [
    {
      id: 1,
      question: "Calculate the debt-to-equity ratio given total assets of $500,000 and total liabilities of $200,000",
      category: "Financial Ratios",
      score: 78,
      attempts: 8,
      lastEvaluated: "2024-11-21",
      reasoningQuality: "Good",
      confidence: 0.82,
      complexityScore: 6.5
    },
    {
      id: 2,
      question: "Determine the present value of an annuity paying $1,000 annually for 5 years at 6% discount rate",
      category: "Time Value of Money",
      score: 65,
      attempts: 6,
      lastEvaluated: "2024-11-21",
      reasoningQuality: "Fair",
      confidence: 0.68,
      complexityScore: 7.2
    },
    {
      id: 3,
      question: "Analyze the impact of a 10% increase in variable costs on break-even point",
      category: "Cost Analysis",
      score: 71,
      attempts: 9,
      lastEvaluated: "2024-11-20",
      reasoningQuality: "Good",
      confidence: 0.75,
      complexityScore: 6.8
    },
    {
      id: 4,
      question: "Calculate working capital given current assets of $150,000 and current liabilities of $80,000",
      category: "Working Capital",
      score: 82,
      attempts: 7,
      lastEvaluated: "2024-11-20",
      reasoningQuality: "Excellent",
      confidence: 0.85,
      complexityScore: 5.5
    },
    {
      id: 5,
      question: "Evaluate ROI for a project with initial investment of $50,000 and annual returns of $12,000",
      category: "Investment Analysis",
      score: 68,
      attempts: 5,
      lastEvaluated: "2024-11-19",
      reasoningQuality: "Fair",
      confidence: 0.71,
      complexityScore: 7.0
    }
  ];

  const categories = [
    { name: "Financial Ratios", count: 15, avgScore: 76, geminiAccuracy: 78 },
    { name: "Time Value of Money", count: 12, avgScore: 68, geminiAccuracy: 70 },
    { name: "Cost Analysis", count: 18, avgScore: 73, geminiAccuracy: 75 },
    { name: "Working Capital", count: 8, avgScore: 78, geminiAccuracy: 82 },
    { name: "Investment Analysis", count: 7, avgScore: 71, geminiAccuracy: 74 }
  ];

  const weeklyPerformance = [
    { week: "Week 1", score: 71, accuracy: 73, reasoning: 72 },
    { week: "Week 2", score: 73, accuracy: 75, reasoning: 74 },
    { week: "Week 3", score: 75, accuracy: 77, reasoning: 76 },
    { week: "Week 4", score: 74, accuracy: 76, reasoning: 78 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Gemini 3 - Medium Questions Dashboard</h1>
            <p className="text-lg text-gray-600">Intermediate financial reasoning performance analysis</p>
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
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-yellow-600">{geminiMediumStats.averageScore}%</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
                <p className="text-3xl font-bold text-blue-600">{geminiMediumStats.accuracyRate}%</p>
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
                <p className="text-sm font-medium text-gray-600">Reasoning Quality</p>
                <p className="text-3xl font-bold text-purple-600">{geminiMediumStats.reasoningQuality}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Question Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Question Categories - Gemini 3 Medium</h2>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} questions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-600">{category.avgScore}%</p>
                    <p className="text-xs text-gray-500">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Performance Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Performance - Gemini 3 Medium</h2>
            <div className="space-y-4">
              {weeklyPerformance.map((week, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="text-sm font-medium text-gray-700">{week.week}</span>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-yellow-600">{week.score}%</p>
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
        </div>

        {/* All Gemini 3 Medium Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Gemini 3 Medium Questions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complexity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Evaluated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {geminiMediumQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-md">{question.question}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {question.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-yellow-600 h-2 rounded-full" style={{width: `${question.score}%`}}></div>
                        </div>
                        <span className="text-sm font-medium">{question.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-medium text-blue-600">{(question.confidence * 100).toFixed(0)}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-medium text-purple-600">{question.complexityScore}/10</span>
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