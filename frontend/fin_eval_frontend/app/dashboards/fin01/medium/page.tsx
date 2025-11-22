'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock, BarChart3 } from 'lucide-react';

export default function Fin01MediumDashboard() {
  const router = useRouter();

  const mediumQuestions = [
    { id: 1, question: "Calculate compound interest on $5000 at 6% annually for 3 years", category: "Compound Interest", score: 78, time: "3.2s", status: "correct", complexity: 3 },
    { id: 2, question: "Determine the present value of $1000 received in 5 years at 8% discount rate", category: "Present Value", score: 72, time: "4.1s", status: "correct", complexity: 4 },
    { id: 3, question: "Calculate the debt-to-equity ratio for a company with $2M assets and $800K liabilities", category: "Financial Ratios", score: 65, time: "3.8s", status: "partial", complexity: 3 },
    { id: 4, question: "Find the future value of monthly $200 payments at 5% annual rate for 2 years", category: "Annuities", score: 69, time: "4.5s", status: "correct", complexity: 4 },
    { id: 5, question: "Calculate ROI for an investment that returned $1500 from initial $1200", category: "ROI Analysis", score: 83, time: "2.9s", status: "correct", complexity: 2 }
  ];

  const complexityAnalysis = [
    { level: "Low Complexity (1-2)", questions: 12, avgScore: 85 },
    { level: "Medium Complexity (3-4)", questions: 18, avgScore: 71 },
    { level: "High Complexity (5)", questions: 5, avgScore: 58 }
  ];

  const monthlyTrends = [
    { month: "Jan", score: 68, accuracy: 72 },
    { month: "Feb", score: 71, accuracy: 75 },
    { month: "Mar", score: 69, accuracy: 73 },
    { month: "Apr", score: 73, accuracy: 77 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboards/fin01')}
            className="flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Fin-01-14B Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Fin-01-14B - Medium Questions</h1>
          <p className="text-gray-600">Performance on intermediate financial reasoning questions</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Average Score</p>
                <p className="text-3xl font-bold text-gray-800">69.8%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-yellow-500 text-sm mt-2">+1.8% from last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Accuracy Rate</p>
                <p className="text-3xl font-bold text-gray-800">71%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-orange-500 text-sm mt-2">Needs improvement</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Response Time</p>
                <p className="text-3xl font-bold text-gray-800">3.7s</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-purple-500 text-sm mt-2">Reasonable speed</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Complexity Score</p>
                <p className="text-3xl font-bold text-gray-800">3.2/5</p>
              </div>
              <BarChart3 className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-red-500 text-sm mt-2">Medium complexity</p>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Performance Trends</h2>
          <div className="space-y-4">
            {monthlyTrends.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600 font-medium w-20">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Score: {month.score}%</span>
                    <span>Accuracy: {month.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${month.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complexity Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Complexity Analysis</h2>
          <div className="space-y-4">
            {complexityAnalysis.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">{item.level}</h3>
                  <p className="text-sm text-gray-600">{item.questions} questions attempted</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">{item.avgScore}%</p>
                  <p className="text-sm text-gray-500">avg score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Medium Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Medium Questions</h2>
          <div className="space-y-4">
            {mediumQuestions.map((question) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 flex-1">{question.question}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      question.status === 'correct' ? 'bg-green-100 text-green-800' : 
                      question.status === 'partial' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {question.status === 'correct' ? 'Correct' : question.status === 'partial' ? 'Partial' : 'Incorrect'}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      Complexity: {question.complexity}/5
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{question.category}</span>
                  <div className="flex items-center space-x-4">
                    <span>Score: {question.score}%</span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {question.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Strengths</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Good understanding of basic compound interest
              </li>
              <li className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Solid ROI calculation abilities
              </li>
              <li className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Reasonable response times for complexity
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Areas for Improvement</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-orange-600">
                <TrendingUp className="w-5 h-5 mr-2" />
                Present value calculations need work
              </li>
              <li className="flex items-center text-orange-600">
                <TrendingUp className="w-5 h-5 mr-2" />
                Financial ratio interpretations
              </li>
              <li className="flex items-center text-orange-600">
                <TrendingUp className="w-5 h-5 mr-2" />
                Multi-step annuity calculations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}