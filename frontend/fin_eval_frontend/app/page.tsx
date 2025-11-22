'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { loadJudgmentData } from '@/lib/judgmentData';

export default function LandingPage() {
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState<'gemini' | 'fin01' | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);

  useEffect(() => {
    async function calculateTotalQuestions() {
      try {
        const [geminiEasy, geminiMedium, geminiHard, fino1Easy, fino1Medium, fino1Hard] = await Promise.all([
          loadJudgmentData('gemini3', 'easy'),
          loadJudgmentData('gemini3', 'medium'),
          loadJudgmentData('gemini3', 'hard'),
          loadJudgmentData('fin_o1', 'easy'),
          loadJudgmentData('fin_o1', 'medium'),
          loadJudgmentData('fin_o1', 'hard'),
        ]);
        
        const total = geminiEasy.length + geminiMedium.length + geminiHard.length + 
                     fino1Easy.length + fino1Medium.length + fino1Hard.length;
        setTotalQuestions(total);
      } catch (err) {
        console.error('Error loading question counts:', err);
        // Fallback to 0 if there's an error
        setTotalQuestions(0);
      }
    }
    
    calculateTotalQuestions();
  }, []);

  const modelCards = [
    {
      title: "Gemini 3",
      description: "Google's advanced language model for financial reasoning evaluation",
      model: "gemini" as const,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      borderColor: "border-blue-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Fin-01-14B",
      description: "Specialized financial reasoning model with 14 billion parameters",
      model: "fin01" as const,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      borderColor: "border-purple-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.126 3.414-1.415 3.414H4.828c-1.541 0-2.684-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ];

  const difficultyCards = [
    {
      title: "Overall Dashboard",
      description: "Comprehensive view of all financial reasoning evaluations",
      difficulty: "overall",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      borderColor: "border-orange-500",
    },
    {
      title: "Easy Questions",
      description: "Basic financial reasoning questions and fundamental concepts",
      difficulty: "easy",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      borderColor: "border-green-500",
    },
    {
      title: "Medium Questions",
      description: "Intermediate financial analysis and calculations",
      difficulty: "medium",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-500",
    },
    {
      title: "Hard Questions",
      description: "Advanced financial modeling and complex valuations",
      difficulty: "hard",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      borderColor: "border-red-500",
    }
  ];

  const handleModelSelect = (model: 'gemini' | 'fin01') => {
    setSelectedModel(model);
  };

  const handleDifficultyNavigation = (difficulty: string) => {
    if (selectedModel) {
      const path = `/dashboards/${selectedModel}/${difficulty}`;
      router.push(path);
    }
  };

  const handleBackToModels = () => {
    setSelectedModel(null);
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">FinEval Model Analytics</span>
                  <span className="block text-orange-600">Benchmark Performance</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Compare performance between Gemini 3 and Fin-01-14B models across different financial reasoning complexity levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Selection Section */}
      {!selectedModel && (
        <div className="py-12 bg-white flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Select a Model to Analyze
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Choose between Gemini 3 and Fin-01-14B to view their performance dashboards.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {modelCards.map((card, index) => (
                <div
                  key={index}
                  className={`relative group bg-white p-8 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 ${card.borderColor} transform hover:scale-105`}
                  onClick={() => handleModelSelect(card.model)}
                >
                  <div className="text-center">
                    <span className={`inline-flex p-4 rounded-lg ${card.bgColor} mb-4`}>
                      <div className={card.textColor}>
                        {card.icon}
                      </div>
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Difficulty Selection Section */}
      {selectedModel && (
        <div className="py-12 bg-white flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={handleBackToModels}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 transition duration-150 ease-in-out mr-4"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Models
                </button>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {selectedModel === 'gemini' ? 'Gemini 3' : 'Fin-01-14B'} Dashboards
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Select a difficulty level to analyze performance metrics and insights.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {difficultyCards.map((card, index) => (
                <div
                  key={index}
                  className={`relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 ${card.borderColor}`}
                  onClick={() => handleDifficultyNavigation(card.difficulty)}
                >
                  <div>
                    <span className={`inline-flex p-3 rounded-lg ${card.bgColor}`}>
                      <div className={card.textColor}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {card.difficulty === 'overall' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                          {card.difficulty === 'easy' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                          {card.difficulty === 'medium' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                          {card.difficulty === 'hard' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                        </svg>
                      </div>
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {card.description}
                    </p>
                  </div>
                  <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Statistics Overview */}
      <div className="bg-gray-50 py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Performance Overview
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">2</div>
              <div className="text-gray-600 mt-2">Models Benchmarked</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-600">{totalQuestions || '...'}</div>
              <div className="text-gray-600 mt-2">Total Questions</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600">3</div>
              <div className="text-gray-600 mt-2">Difficulty Levels</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
