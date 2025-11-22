'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock, AlertTriangle, Star } from 'lucide-react';

export default function Fin01HardDashboard() {
  const router = useRouter();

  const hardQuestions = [
    { id: 1, question: "Calculate the weighted average cost of capital (WACC) for a company with 60% equity at 12% cost and 40% debt at 6% cost, given 25% tax rate", category: "WACC Analysis", score: 58, time: "8.2s", status: "partial", complexity: 5, challenge: "Advanced" },
    { id: 2, question: "Determine the optimal capital structure using Modigliani-Miller theory for a firm with $10M EBITDA and $2M interest expense", category: "Capital Structure", score: 45, time: "12.1s", status: "incorrect", complexity: 5, challenge: "Expert" },
    { id: 3, question: "Calculate the Black-Scholes option price for a call option with S=$50, K=$45, T=6 months, r=5%, σ=25%", category: "Options Pricing", score: 62, time: "15.8s", status: "partial", complexity: 5, challenge: "Advanced" },
    { id: 4, question: "Analyze the impact of a 2% interest rate increase on a bank's net interest margin given duration gap of 3.5 years", category: "Risk Management", score: 51, time: "11.3s", status: "incorrect", complexity: 4, challenge: "Expert" },
    { id: 5, question: "Calculate the present value of a leveraged buyout cash flows: FCFF=$50M for 5 years, terminal value=$200M at 10% WACC", category: "LBO Valuation", score: 67, time: "9.7s", status: "correct", complexity: 4, challenge: "Advanced" }
  ];

  const challengeLevelStats = [
    { level: "Advanced", questions: 15, avgScore: 58, avgTime: "10.2s" },
    { level: "Expert", questions: 8, avgScore: 42, avgTime: "14.8s" },
    { level: "Master", questions: 3, avgScore: 31, avgTime: "18.5s" }
  ];

  const quarterlyPerformance = [
    { quarter: "Q1", score: 52, accuracy: 48 },
    { quarter: "Q2", score: 49, accuracy: 45 },
    { quarter: "Q3", score: 54, accuracy: 51 },
    { quarter: "Q4", score: 56, accuracy: 53 }
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Fin-01-14B - Hard Questions</h1>
          <p className="text-gray-600">Performance on advanced financial reasoning questions</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Average Score</p>
                <p className="text-3xl font-bold text-gray-800">54.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-red-500 text-sm mt-2">+2.8% from last quarter</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Accuracy Rate</p>
                <p className="text-3xl font-bold text-gray-800">51%</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-orange-500 text-sm mt-2">Below target</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg Response Time</p>
                <p className="text-3xl font-bold text-gray-800">11.4s</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-purple-500 text-sm mt-2">Extended thinking time</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Challenge Level</p>
                <p className="text-3xl font-bold text-gray-800">4.6/5</p>
              </div>
              <Star className="w-8 h-8 text-indigo-500" />
            </div>
            <p className="text-indigo-500 text-sm mt-2">Very challenging</p>
          </div>
        </div>

        {/* Quarterly Performance Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quarterly Performance Trends</h2>
          <div className="space-y-4">
            {quarterlyPerformance.map((quarter, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600 font-medium w-20">{quarter.quarter}</span>
                <div className="flex-1 mx-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Score: {quarter.score}%</span>
                    <span>Accuracy: {quarter.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${quarter.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge Level Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Challenge Level Analysis</h2>
          <div className="space-y-4">
            {challengeLevelStats.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">{item.level}</h3>
                  <p className="text-sm text-gray-600">{item.questions} questions attempted</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">{item.avgScore}%</p>
                  <p className="text-sm text-gray-500">avg score</p>
                  <p className="text-xs text-gray-400">{item.avgTime} avg time</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Hard Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Hard Questions</h2>
          <div className="space-y-4">
            {hardQuestions.map((question) => (
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
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < question.complexity ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{question.category}</span>
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">{question.challenge}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span>Score: {question.score}%</span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {question.time}
                    </span>
                  </div>
                  <span className="text-gray-500">Complexity: {question.complexity}/5</span>
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
                Shows understanding of LBO valuation concepts
              </li>
              <li className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Basic grasp of options pricing theory
              </li>
              <li className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Attempts complex multi-step problems
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Critical Areas for Improvement</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-red-600">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Advanced capital structure theory
              </li>
              <li className="flex items-center text-red-600">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Complex derivatives pricing models
              </li>
              <li className="flex items-center text-red-600">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Interest rate risk management
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}