'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadJudgmentData, calculateStats, type JudgmentData } from '@/lib/judgmentData';
import DashboardStats from '@/components/DashboardStats';
import DashboardTable from '@/components/DashboardTable';

export default function Fin01MediumDashboard() {
  const router = useRouter();
  const [data, setData] = useState<JudgmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const judgmentData = await loadJudgmentData('fin_o1', 'medium');
        setData(judgmentData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const stats = calculateStats(data);

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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Fin-01-14B - Medium Questions</h1>
          <p className="text-gray-600">Intermediate financial reasoning performance</p>
        </div>

        <DashboardStats stats={stats} colorScheme="purple" />
        <DashboardTable data={data} modelName="Fin-01-14B - Medium" />
      </div>
    </div>
  );
}
