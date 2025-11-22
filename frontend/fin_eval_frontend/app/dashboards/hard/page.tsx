'use client';

import { useRouter } from 'next/navigation';

export default function HardDashboard() {
  const router = useRouter();
  
  const hardStats = {
    totalHardQuestions: 40,
    averageScore: 58.3,
    completedEvaluations: 280,
    pendingEvaluations: 25
  };

  const hardQuestions = [
    {
      id: 1,
      question: "Perform a comprehensive cash flow analysis for a company with complex revenue recognition patterns and multiple subsidiaries",
      category: "Advanced Cash Flow",
      score: 52,
      attempts: 3,
      lastEvaluated: "2024-11-21",
      complexity: "High"
    },
    {
      id: 2,
      question: "Evaluate the financial impact of a leveraged buyout including debt service coverage and exit strategies",
      category: "M&A Analysis",
      score: 45,
      attempts: 2,
      lastEvaluated: "2024-11-21",
      complexity: "High"
    },
    {
      id: 3,
      question: "Calculate the weighted average cost of capital (WACC) for a multinational corporation with complex capital structure",
      category: "Corporate Finance",
      score: 61,
      attempts: 4,
      lastEvaluated: "2024-11-20",
      complexity: "High"
    },
    {
      id: 4,
      question: "Analyze the valuation of a startup using multiple methods including DCF, comparables, and option pricing",
      category: "Valuation",
      score: 58,
      attempts: 3,
      lastEvaluated: "2024-11-20",
      complexity: "High"
    },
    {
      id: 5,
      question: "Assess the risk-adjusted returns of a complex derivatives portfolio including Greeks and scenario analysis",
      category: "Risk Management",
      score: 67,
      attempts: 5,
      lastEvaluated: "2024-11-19",
      complexity: "High"
    }
  ];

  const categories = [
    { name: "Advanced Cash Flow", count: 8, avgScore: 54 },
    { name: "M&A Analysis", count: 6, avgScore: 48 },
    { name: "Corporate Finance", count: 10, avgScore: 62 },
    { name: "Valuation", count: 9, avgScore: 59 },
    { name: "Risk Management", count: 7, avgScore: 65 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Hard Questions Dashboard</h1>
            <p className="text-lg text-gray-600">Advanced financial reasoning questions with high complexity</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 transition duration-150 ease-in-out shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboards
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hard Questions</p>
                <p className="text-3xl font-bold text-red-600">{hardStats.totalHardQuestions}</p>
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
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-blue-600">{hardStats.averageScore}%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-orange-600">{hardStats.completedEvaluations}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-600">{hardStats.pendingEvaluations}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Question Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Question Categories</h2>
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

          {/* Challenge Level Indicators */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Challenge Level Analysis</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <span className="text-sm font-medium text-gray-700">Conceptual Complexity</span>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  </div>
                  <span className="ml-2 text-xs text-red-600 font-semibold">Very High</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <span className="text-sm font-medium text-gray-700">Calculation Intensity</span>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                  <span className="ml-2 text-xs text-orange-600 font-semibold">High</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-sm font-medium text-gray-700">Time Required</span>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                  <span className="ml-2 text-xs text-yellow-600 font-semibold">Moderate</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-sm font-medium text-gray-700">Success Rate</span>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                  <span className="ml-2 text-xs text-green-600 font-semibold">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Hard Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Hard Questions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempts</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Evaluated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hardQuestions.map((question) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{question.attempts}</td>
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