'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Fin01EasyDashboard() {
  const router = useRouter();

  const easyQuestions = [
    { id: 1, question: "Calculate simple interest on $1000 at 5% for 2 years", category: "Basic Interest", score: 95, time: "2.1s", status: "correct" },
    { id: 2, question: "What is 15% of $200?", category: "Percentage", score: 88, time: "1.8s", status: "correct" },
    { id: 3, question: "Convert 0.75 to percentage", category: "Conversion", score: 92, time: "1.5s", status: "correct" },
    { id: 4, question: "Calculate total amount after adding 8% tax to $50", category: "Tax Calculation", score: 85, time: "2.3s", status: "correct" },
    { id: 5, question: "Find 25% discount on $80 item", category: "Discount", score: 90, time: "1.9s", status: "correct" }
  ];

  const weeklyPerformance = [
    { week: "Week 1", score: 82, accuracy: 85 },
    { week: "Week 2", score: 86, accuracy: 88 },
    { week: "Week 3", score: 89, accuracy: 91 },
    { week: "Week 4", score: 87, accuracy: 89 }
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Fin-01-14B - Easy Questions</h1>
          <p className="text-gray-600">Performance on basic financial reasoning questions</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Average Score</p>
                <p className="text-3xl font-bold text-gray-800">84.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-green-500 text-sm mt-2">+3.2% from last week</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Accuracy Rate</p>
                <p className="text-3xl font-bold text-gray-800">86%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-blue-500 text-sm mt-2">Above target</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Response Time</p>
                <p className="text-3xl font-bold text-gray-800">1.9s</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-purple-500 text-sm mt-2">Fast response</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Confidence Score</p>
                <p className="text-3xl font-bold text-gray-800">91%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-orange-500 text-sm mt-2">High confidence</p>
          </div>
        </div>

        {/* Weekly Performance Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Weekly Performance</h2>
          <div className="space-y-4">
            {weeklyPerformance.map((week, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600 font-medium w-24">{week.week}</span>
                <div className="flex-1 mx-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Score: {week.score}%</span>
                    <span>Accuracy: {week.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${week.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Easy Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Easy Questions</h2>
          <div className="space-y-4">
            {easyQuestions.map((question) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 flex-1">{question.question}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    question.status === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {question.status === 'correct' ? 'Correct' : 'Incorrect'}
                  </span>
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
                Excellent at basic percentage calculations
              </li>
              <li className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Fast response times on simple conversions
              </li>
              <li className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                High accuracy on tax calculations
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Areas for Improvement</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-orange-600">
                <TrendingUp className="w-5 h-5 mr-2" />
                Multi-step discount calculations
              </li>
              <li className="flex items-center text-orange-600">
                <TrendingUp className="w-5 h-5 mr-2" />
                Compound interest basics
              </li>
              <li className="flex items-center text-orange-600">
                <TrendingUp className="w-5 h-5 mr-2" />
                Currency conversion accuracy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}