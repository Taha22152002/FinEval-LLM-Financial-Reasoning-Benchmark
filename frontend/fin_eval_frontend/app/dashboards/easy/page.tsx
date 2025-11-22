'use client';

import { useRouter } from 'next/navigation';

export default function EasyDashboard() {
  const router = useRouter();
  
  const easyStats = {
    totalEasyQuestions: 50,
    averageScore: 85.2,
    completedEvaluations: 420,
    pendingEvaluations: 30
  };

  const easyQuestions = [
    {
      id: 1,
      question: "Calculate simple interest on $1000 at 5% for 2 years",
      category: "Interest Calculations",
      score: 92,
      attempts: 15,
      lastEvaluated: "2024-11-21"
    },
    {
      id: 2,
      question: "Find the percentage increase from $50 to $65",
      category: "Percentage Problems",
      score: 88,
      attempts: 12,
      lastEvaluated: "2024-11-21"
    },
    {
      id: 3,
      question: "Convert 0.75 to a percentage",
      category: "Decimal to Percentage",
      score: 95,
      attempts: 18,
      lastEvaluated: "2024-11-20"
    },
    {
      id: 4,
      question: "Calculate total cost of 5 items at $12 each",
      category: "Basic Multiplication",
      score: 98,
      attempts: 20,
      lastEvaluated: "2024-11-20"
    },
    {
      id: 5,
      question: "Find 20% of $150",
      category: "Percentage Calculations",
      score: 85,
      attempts: 14,
      lastEvaluated: "2024-11-19"
    }
  ];

  const categories = [
    { name: "Interest Calculations", count: 12, avgScore: 87 },
    { name: "Percentage Problems", count: 15, avgScore: 89 },
    { name: "Basic Arithmetic", count: 10, avgScore: 93 },
    { name: "Decimal Operations", count: 8, avgScore: 91 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Easy Questions Dashboard</h1>
            <p className="text-lg text-gray-600">Financial reasoning questions with basic complexity</p>
          </div>
          <button
            onClick={() => router.push('/dashboards')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition duration-150 ease-in-out shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboards
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Easy Questions</p>
                <p className="text-3xl font-bold text-green-600">{easyStats.totalEasyQuestions}</p>
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
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-blue-600">{easyStats.averageScore}%</p>
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
                <p className="text-3xl font-bold text-orange-600">{easyStats.completedEvaluations}</p>
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
                <p className="text-3xl font-bold text-gray-600">{easyStats.pendingEvaluations}</p>
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
                    <p className="text-lg font-bold text-green-600">{category.avgScore}%</p>
                    <p className="text-xs text-gray-500">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Questions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Performing Questions</h2>
            <div className="space-y-3">
              {easyQuestions.slice(0, 3).map((question) => (
                <div key={question.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{question.question}</p>
                    <p className="text-xs text-gray-600">{question.category}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-lg font-bold text-green-600">{question.score}%</p>
                    <p className="text-xs text-gray-500">{question.attempts} attempts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Easy Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Easy Questions</h2>
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
                {easyQuestions.map((question) => (
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