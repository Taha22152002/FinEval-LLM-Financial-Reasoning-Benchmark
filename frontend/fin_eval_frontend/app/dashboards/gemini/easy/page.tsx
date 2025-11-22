'use client';

import { useRouter } from 'next/navigation';

export default function GeminiEasyDashboard() {
  const router = useRouter();
  
  const geminiEasyStats = {
    totalEasyQuestions: 50,
    averageScore: 88.5,
    completedEvaluations: 420,
    pendingEvaluations: 30,
    accuracyRate: 92,
    reasoningQuality: 89
  };

  const geminiEasyQuestions = [
    {
      id: 1,
      question: "Calculate simple interest on $1000 at 5% for 2 years",
      category: "Interest Calculations",
      score: 94,
      attempts: 15,
      lastEvaluated: "2024-11-21",
      reasoningQuality: "Excellent",
      confidence: 0.95
    },
    {
      id: 2,
      question: "Find the percentage increase from $50 to $65",
      category: "Percentage Problems",
      score: 91,
      attempts: 12,
      lastEvaluated: "2024-11-21",
      reasoningQuality: "Excellent",
      confidence: 0.92
    },
    {
      id: 3,
      question: "Convert 0.75 to a percentage",
      category: "Decimal to Percentage",
      score: 97,
      attempts: 18,
      lastEvaluated: "2024-11-20",
      reasoningQuality: "Excellent",
      confidence: 0.98
    },
    {
      id: 4,
      question: "Calculate total cost of 5 items at $12 each",
      category: "Basic Multiplication",
      score: 99,
      attempts: 20,
      lastEvaluated: "2024-11-20",
      reasoningQuality: "Excellent",
      confidence: 0.99
    },
    {
      id: 5,
      question: "Find 20% of $150",
      category: "Percentage Calculations",
      score: 89,
      attempts: 14,
      lastEvaluated: "2024-11-19",
      reasoningQuality: "Good",
      confidence: 0.88
    }
  ];

  const categories = [
    { name: "Interest Calculations", count: 12, avgScore: 91, geminiAccuracy: 94 },
    { name: "Percentage Problems", count: 15, avgScore: 93, geminiAccuracy: 96 },
    { name: "Basic Arithmetic", count: 10, avgScore: 95, geminiAccuracy: 98 },
    { name: "Decimal Operations", count: 8, avgScore: 92, geminiAccuracy: 95 }
  ];

  const weeklyPerformance = [
    { week: "Week 1", score: 85, accuracy: 88 },
    { week: "Week 2", score: 87, accuracy: 90 },
    { week: "Week 3", score: 89, accuracy: 92 },
    { week: "Week 4", score: 88, accuracy: 91 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Gemini 3 - Easy Questions Dashboard</h1>
            <p className="text-lg text-gray-600">Basic financial reasoning performance analysis</p>
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
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-green-600">{geminiEasyStats.averageScore}%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
                <p className="text-3xl font-bold text-blue-600">{geminiEasyStats.accuracyRate}%</p>
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
                <p className="text-3xl font-bold text-purple-600">{geminiEasyStats.reasoningQuality}%</p>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Question Categories - Gemini 3</h2>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} questions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{category.avgScore}%</p>
                    <p className="text-xs text-gray-500">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Performance - Gemini 3</h2>
            <div className="space-y-4">
              {weeklyPerformance.map((week, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-gray-700">{week.week}</span>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-blue-600">{week.score}%</p>
                      <p className="text-xs text-gray-500">score</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{week.accuracy}%</p>
                      <p className="text-xs text-gray-500">accuracy</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Gemini 3 Easy Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Gemini 3 Easy Questions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reasoning</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Evaluated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {geminiEasyQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">{question.question}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {question.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: `${question.score}%`}}></div>
                        </div>
                        <span className="text-sm font-medium">{question.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-medium text-blue-600">{(question.confidence * 100).toFixed(0)}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        question.reasoningQuality === 'Excellent' ? 'bg-green-100 text-green-800' :
                        question.reasoningQuality === 'Good' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {question.reasoningQuality}
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