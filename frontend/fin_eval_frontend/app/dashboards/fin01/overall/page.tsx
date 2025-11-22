'use client';

import { useRouter } from 'next/navigation';

export default function Fin01OverallDashboard() {
  const router = useRouter();
  
  const fin01Stats = {
    totalQuestions: 150,
    easyQuestions: 50,
    mediumQuestions: 60,
    hardQuestions: 40,
    averageScore: 76.8,
    totalEvaluations: 1150,
    modelAccuracy: 74.2,
    reasoningQuality: 81.5,
    financialExpertise: 8.3
  };

  const recentEvaluations = [
    { id: 1, question: "Q4 Revenue Forecast", difficulty: "Easy", score: 83, date: "2024-11-21", reasoning: "Good" },
    { id: 2, question: "Debt-to-Equity Calculation", difficulty: "Medium", score: 69, date: "2024-11-21", reasoning: "Fair" },
    { id: 3, question: "Cash Flow Analysis", difficulty: "Hard", score: 71, date: "2024-11-20", reasoning: "Good" },
    { id: 4, question: "ROI Calculation", difficulty: "Easy", score: 89, date: "2024-11-20", reasoning: "Excellent" },
    { id: 5, question: "Risk Assessment", difficulty: "Medium", score: 73, date: "2024-11-19", reasoning: "Good" }
  ];

  const performanceByDifficulty = [
    { difficulty: "Easy", count: 50, avgScore: 86.2, accuracy: 88 },
    { difficulty: "Medium", count: 60, avgScore: 71.8, accuracy: 73 },
    { difficulty: "Hard", count: 40, avgScore: 65.4, accuracy: 62 }
  ];

  const geminiComparison = [
    { metric: "Overall Score", gemini: 82.1, fin01: 76.8, difference: -5.3 },
    { metric: "Easy Questions", gemini: 88.5, fin01: 86.2, difference: -2.3 },
    { metric: "Medium Questions", gemini: 74.2, fin01: 71.8, difference: -2.4 },
    { metric: "Hard Questions", gemini: 62.8, fin01: 65.4, difference: +2.6 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Fin-01-14B - Overall Dashboard</h1>
            <p className="text-lg text-gray-600">Specialized financial reasoning model performance analysis</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/dashboards/fin01')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 transition duration-150 ease-in-out shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Fin-01 Dashboards
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
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Score</p>
                <p className="text-3xl font-bold text-purple-600">{fin01Stats.averageScore}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
                <p className="text-3xl font-bold text-green-600">{fin01Stats.modelAccuracy}%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reasoning Quality</p>
                <p className="text-3xl font-bold text-blue-600">{fin01Stats.reasoningQuality}%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Financial Expertise</p>
                <p className="text-3xl font-bold text-orange-600">{fin01Stats.financialExpertise}/10</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.126 3.414-1.415 3.414H4.828c-1.541 0-2.684-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance by Difficulty */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Fin-01-14B Performance by Difficulty</h2>
            <div className="space-y-4">
              {performanceByDifficulty.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.difficulty}</h3>
                    <p className="text-sm text-gray-600">{item.count} questions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">{item.avgScore}%</p>
                    <p className="text-xs text-gray-500">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gemini vs Fin-01 Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gemini 3 vs Fin-01-14B Comparison</h2>
            <div className="space-y-4">
              {geminiComparison.map((comparison, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{comparison.metric}</h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-blue-600">{comparison.gemini}%</p>
                      <p className="text-xs text-gray-500">Gemini</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-purple-600">{comparison.fin01}%</p>
                      <p className="text-xs text-gray-500">Fin-01</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-semibold ${
                        comparison.difference > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {comparison.difference > 0 ? '+' : ''}{comparison.difference}%
                      </p>
                      <p className="text-xs text-gray-500">diff</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Navigation - Fin-01-14B</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/dashboards/fin01/easy')}
              className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition duration-150"
            >
              <div className="text-left">
                <span className="text-green-800 font-medium block">Easy Questions</span>
                <span className="text-green-600 text-sm">50 questions • 86.2% avg</span>
              </div>
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => router.push('/dashboards/fin01/medium')}
              className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition duration-150"
            >
              <div className="text-left">
                <span className="text-yellow-800 font-medium block">Medium Questions</span>
                <span className="text-yellow-600 text-sm">60 questions • 71.8% avg</span>
              </div>
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => router.push('/dashboards/fin01/hard')}
              className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition duration-150"
            >
              <div className="text-left">
                <span className="text-red-800 font-medium block">Hard Questions</span>
                <span className="text-red-600 text-sm">40 questions • 65.4% avg</span>
              </div>
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Recent Evaluations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Fin-01-14B Evaluations</h2>
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
                          <div className="bg-purple-600 h-2 rounded-full" style={{width: `${evaluation.score}%`}}></div>
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