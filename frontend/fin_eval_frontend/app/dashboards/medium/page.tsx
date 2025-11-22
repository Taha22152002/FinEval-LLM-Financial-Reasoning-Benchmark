'use client';

import { useRouter } from 'next/navigation';

export default function MediumDashboard() {
  const router = useRouter();
  
  const mediumStats = {
    totalMediumQuestions: 60,
    averageScore: 72.8,
    completedEvaluations: 380,
    pendingEvaluations: 45
  };

  const mediumQuestions = [
    {
      id: 1,
      question: "Calculate the debt-to-equity ratio given total assets of $500,000 and total liabilities of $200,000",
      category: "Financial Ratios",
      score: 78,
      attempts: 8,
      lastEvaluated: "2024-11-21",
      complexity: "Moderate"
    },
    {
      id: 2,
      question: "Determine the present value of an annuity paying $1,000 annually for 5 years at 6% discount rate",
      category: "Time Value of Money",
      score: 65,
      attempts: 6,
      lastEvaluated: "2024-11-21",
      complexity: "Moderate"
    },
    {
      id: 3,
      question: "Analyze the impact of a 10% increase in variable costs on break-even point",
      category: "Cost Analysis",
      score: 71,
      attempts: 9,
      lastEvaluated: "2024-11-20",
      complexity: "Moderate"
    },
    {
      id: 4,
      question: "Calculate working capital given current assets of $150,000 and current liabilities of $80,000",
      category: "Working Capital",
      score: 82,
      attempts: 7,
      lastEvaluated: "2024-11-20",
      complexity: "Moderate"
    },
    {
      id: 5,
      question: "Evaluate ROI for a project with initial investment of $50,000 and annual returns of $12,000",
      category: "Investment Analysis",
      score: 68,
      attempts: 5,
      lastEvaluated: "2024-11-19",
      complexity: "Moderate"
    }
  ];

  const categories = [
    { name: "Financial Ratios", count: 15, avgScore: 74 },
    { name: "Time Value of Money", count: 12, avgScore: 69 },
    { name: "Cost Analysis", count: 18, avgScore: 73 },
    { name: "Working Capital", count: 8, avgScore: 78 },
    { name: "Investment Analysis", count: 7, avgScore: 71 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Medium Questions Dashboard</h1>
            <p className="text-lg text-gray-600">Financial reasoning questions with moderate complexity</p>
          </div>
          <button
            onClick={() => router.push('/dashboards')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-600 bg-white hover:bg-yellow-50 transition duration-150 ease-in-out shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboards
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Medium Questions</p>
                <p className="text-3xl font-bold text-yellow-600">{mediumStats.totalMediumQuestions}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-blue-600">{mediumStats.averageScore}%</p>
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
                <p className="text-3xl font-bold text-orange-600">{mediumStats.completedEvaluations}</p>
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
                <p className="text-3xl font-bold text-gray-600">{mediumStats.pendingEvaluations}</p>
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
                    <p className="text-lg font-bold text-yellow-600">{category.avgScore}%</p>
                    <p className="text-xs text-gray-500">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance Trends</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-sm font-medium text-gray-700">Week 1</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                  <span className="text-sm font-bold text-yellow-600">68%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-sm font-medium text-gray-700">Week 2</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                  <span className="text-sm font-bold text-yellow-600">72%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-sm font-medium text-gray-700">Week 3</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-sm font-bold text-yellow-600">75%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-sm font-medium text-gray-700">Week 4</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '73%'}}></div>
                  </div>
                  <span className="text-sm font-bold text-yellow-600">73%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Medium Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Medium Questions</h2>
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
                {mediumQuestions.map((question) => (
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