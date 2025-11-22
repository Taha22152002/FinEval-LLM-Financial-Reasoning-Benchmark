'use client';

import { useRouter } from 'next/navigation';

export default function GeminiOverallDashboard() {
  const router = useRouter();
  
  const geminiStats = {
    totalQuestions: 150,
    easyQuestions: 50,
    mediumQuestions: 60,
    hardQuestions: 40,
    averageScore: 82.1,
    totalEvaluations: 1250,
    modelAccuracy: 78.5,
    reasoningQuality: 85.2
  };

  const recentEvaluations = [
    { id: 1, question: "Q4 Revenue Forecast", difficulty: "Easy", score: 88, date: "2024-11-21", reasoning: "Excellent" },
    { id: 2, question: "Debt-to-Equity Calculation", difficulty: "Medium", score: 76, date: "2024-11-21", reasoning: "Good" },
    { id: 3, question: "Cash Flow Analysis", difficulty: "Hard", score: 65, date: "2024-11-20", reasoning: "Fair" },
    { id: 4, question: "ROI Calculation", difficulty: "Easy", score: 94, date: "2024-11-20", reasoning: "Excellent" },
    { id: 5, question: "Risk Assessment", difficulty: "Medium", score: 79, date: "2024-11-19", reasoning: "Good" }
  ];

  const performanceByDifficulty = [
    { difficulty: "Easy", count: 50, avgScore: 88.5, accuracy: 92 },
    { difficulty: "Medium", count: 60, avgScore: 74.2, accuracy: 76 },
    { difficulty: "Hard", count: 40, avgScore: 62.8, accuracy: 58 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Gemini 3 - Overall Dashboard</h1>
            <p className="text-lg text-gray-600">Comprehensive performance analysis of Google's Gemini 3 model</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/dashboards/gemini')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition duration-150 ease-in-out shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Gemini Dashboards
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Score</p>
                <p className="text-3xl font-bold text-blue-600">{geminiStats.averageScore}%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
                <p className="text-3xl font-bold text-green-600">{geminiStats.modelAccuracy}%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reasoning Quality</p>
                <p className="text-3xl font-bold text-purple-600">{geminiStats.reasoningQuality}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Evaluations</p>
                <p className="text-3xl font-bold text-orange-600">{geminiStats.totalEvaluations}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance by Difficulty */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance by Difficulty</h2>
            <div className="space-y-4">
              {performanceByDifficulty.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.difficulty}</h3>
                    <p className="text-sm text-gray-600">{item.count} questions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">{item.avgScore}%</p>
                    <p className="text-xs text-gray-500">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Navigation</h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/dashboards/gemini/easy')}
                className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition duration-150"
              >
                <span className="text-green-800 font-medium">Easy Questions</span>
                <span className="text-green-600 text-sm">50 questions</span>
              </button>
              <button
                onClick={() => router.push('/dashboards/gemini/medium')}
                className="w-full flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition duration-150"
              >
                <span className="text-yellow-800 font-medium">Medium Questions</span>
                <span className="text-yellow-600 text-sm">60 questions</span>
              </button>
              <button
                onClick={() => router.push('/dashboards/gemini/hard')}
                className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition duration-150"
              >
                <span className="text-red-800 font-medium">Hard Questions</span>
                <span className="text-red-600 text-sm">40 questions</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Evaluations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Gemini 3 Evaluations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reasoning</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentEvaluations.map((evaluation) => (
                  <tr key={evaluation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">{evaluation.question}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        evaluation.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        evaluation.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {evaluation.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: `${evaluation.score}%`}}></div>
                        </div>
                        <span className="text-sm font-medium">{evaluation.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        evaluation.reasoning === 'Excellent' ? 'bg-green-100 text-green-800' :
                        evaluation.reasoning === 'Good' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {evaluation.reasoning}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evaluation.date}</td>
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