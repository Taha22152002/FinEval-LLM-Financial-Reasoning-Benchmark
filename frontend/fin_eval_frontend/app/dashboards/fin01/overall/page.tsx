'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadJudgmentData, calculateStats, type JudgmentData } from '@/lib/judgmentData';
import DashboardStats from '@/components/DashboardStats';

export default function Fin01OverallDashboard() {
  const router = useRouter();
  const [easyData, setEasyData] = useState<JudgmentData[]>([]);
  const [mediumData, setMediumData] = useState<JudgmentData[]>([]);
  const [hardData, setHardData] = useState<JudgmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [easy, medium, hard] = await Promise.all([
          loadJudgmentData('fin_o1', 'easy'),
          loadJudgmentData('fin_o1', 'medium'),
          loadJudgmentData('fin_o1', 'hard'),
        ]);
        setEasyData(easy);
        setMediumData(medium);
        setHardData(hard);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const easyStats = calculateStats(easyData);
  const mediumStats = calculateStats(mediumData);
  const hardStats = calculateStats(hardData);
  
  const allData = [...easyData, ...mediumData, ...hardData];
  const overallStats = calculateStats(allData);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-purple-500 border-purple-200"></div>
          <p className="mt-3 text-purple-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error loading data</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboards/fin01')}
            className="flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Fin-01-14B Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Fin-01-14B - Overall Dashboard</h1>
          <p className="text-gray-600">Comprehensive performance analysis</p>
        </div>

        <DashboardStats stats={overallStats} colorScheme="purple" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Easy Questions</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total: {easyStats.totalQuestions}</p>
              <p className="text-sm text-gray-600">Average Score: <span className="font-bold text-green-600">{easyStats.averageScore}%</span></p>
              <p className="text-sm text-gray-600">Answer Score: <span className="font-bold">{easyStats.averageAnswerScore}%</span></p>
              <p className="text-sm text-gray-600">Reasoning Score: <span className="font-bold">{easyStats.averageReasoningScore}%</span></p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Medium Questions</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total: {mediumStats.totalQuestions}</p>
              <p className="text-sm text-gray-600">Average Score: <span className="font-bold text-yellow-600">{mediumStats.averageScore}%</span></p>
              <p className="text-sm text-gray-600">Answer Score: <span className="font-bold">{mediumStats.averageAnswerScore}%</span></p>
              <p className="text-sm text-gray-600">Reasoning Score: <span className="font-bold">{mediumStats.averageReasoningScore}%</span></p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Hard Questions</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total: {hardStats.totalQuestions}</p>
              <p className="text-sm text-gray-600">Average Score: <span className="font-bold text-red-600">{hardStats.averageScore}%</span></p>
              <p className="text-sm text-gray-600">Answer Score: <span className="font-bold">{hardStats.averageAnswerScore}%</span></p>
              <p className="text-sm text-gray-600">Reasoning Score: <span className="font-bold">{hardStats.averageReasoningScore}%</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
