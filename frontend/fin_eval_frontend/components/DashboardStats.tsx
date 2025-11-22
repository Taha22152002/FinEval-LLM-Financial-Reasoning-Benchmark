'use client';

interface Stats {
  totalQuestions: number;
  averageScore: number;
  averageAnswerScore: number;
  averageReasoningScore: number;
  accuracyRate: number;
  correctCount: number;
  incorrectCount: number;
}

interface DashboardStatsProps {
  stats: Stats;
  colorScheme?: 'blue' | 'purple';
}

export default function DashboardStats({ stats, colorScheme = 'blue' }: DashboardStatsProps) {
  const colors = colorScheme === 'blue' 
    ? {
        border: ['border-green-500', 'border-blue-500', 'border-purple-500', 'border-orange-500'],
        bg: ['bg-green-100', 'bg-blue-100', 'bg-purple-100', 'bg-orange-100'],
        text: ['text-green-600', 'text-blue-600', 'text-purple-600', 'text-orange-600'],
      }
    : {
        border: ['border-green-500', 'border-blue-500', 'border-purple-500', 'border-orange-500'],
        bg: ['bg-green-100', 'bg-blue-100', 'bg-purple-100', 'bg-orange-100'],
        text: ['text-green-600', 'text-blue-600', 'text-purple-600', 'text-orange-600'],
      };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${colors.border[0]}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Overall Score</p>
            <p className={`text-3xl font-bold ${colors.text[0]}`}>{stats.averageScore}%</p>
          </div>
          <div className={`${colors.bg[0]} p-3 rounded-full`}>
            <svg className={`w-6 h-6 ${colors.text[0]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${colors.border[1]}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Answer Score</p>
            <p className={`text-3xl font-bold ${colors.text[1]}`}>{stats.averageAnswerScore}%</p>
          </div>
          <div className={`${colors.bg[1]} p-3 rounded-full`}>
            <svg className={`w-6 h-6 ${colors.text[1]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${colors.border[2]}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Reasoning Score</p>
            <p className={`text-3xl font-bold ${colors.text[2]}`}>{stats.averageReasoningScore}%</p>
          </div>
          <div className={`${colors.bg[2]} p-3 rounded-full`}>
            <svg className={`w-6 h-6 ${colors.text[2]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
      </div>

      <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${colors.border[3]}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Questions</p>
            <p className={`text-3xl font-bold ${colors.text[3]}`}>{stats.totalQuestions}</p>
            <p className="text-xs text-gray-500 mt-1">
              {stats.correctCount} correct, {stats.incorrectCount} incorrect
            </p>
          </div>
          <div className={`${colors.bg[3]} p-3 rounded-full`}>
            <svg className={`w-6 h-6 ${colors.text[3]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

