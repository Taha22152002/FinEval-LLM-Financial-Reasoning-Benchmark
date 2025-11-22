'use client';

import { useRouter } from 'next/navigation';

export default function Fin01Dashboard() {
  const router = useRouter();

  const difficultyCards = [
    {
      title: "Overall Dashboard",
      description: "Comprehensive view of all Fin-01-14B evaluations",
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

  const handleDifficultyNavigation = (difficulty: string) => {
    router.push(`/dashboards/fin01/${difficulty}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Models
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Fin-01-14B Dashboards</h1>
          <p className="text-lg text-gray-600">Select a difficulty level to analyze Fin-01-14B performance metrics and insights.</p>
        </div>

        {/* Difficulty Selection */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {difficultyCards.map((card, index) => (
            <div
              key={index}
              className={`relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-500 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 ${card.borderColor}`}
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
  );
}

