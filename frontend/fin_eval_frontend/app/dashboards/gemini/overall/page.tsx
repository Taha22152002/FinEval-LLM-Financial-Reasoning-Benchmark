'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadJudgmentData, calculateStats, type JudgmentData } from '@/lib/judgmentData';
import DashboardStats from '@/components/DashboardStats';

export default function GeminiOverallDashboard() {
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
          loadJudgmentData('gemini3', 'easy'),
          loadJudgmentData('gemini3', 'medium'),
          loadJudgmentData('gemini3', 'hard'),
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-500 border-blue-200"></div>
          <p className="mt-3 text-blue-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error loading data</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Gemini 3 - Overall Dashboard</h1>
            <p className="text-lg text-gray-600">Comprehensive performance analysis</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/dashboards/gemini')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition duration-150 ease-in-out shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Gemini
            </button>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50 transition duration-150 ease-in-out shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              All Models
            </button>
          </div>
        </div>

        <DashboardStats stats={overallStats} colorScheme="blue" />

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
