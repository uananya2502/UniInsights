'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { UniversitySearch } from '@/components/dashboard/UniversitySearch';
import { UniversityReportCard } from '@/components/dashboard/UniversityReportCard';
import { StrengthsConcerns } from '@/components/dashboard/StrengthsConcerns';
import { ReputationTimeline } from '@/components/dashboard/ReputationTimeline';
import { StudentVoice } from '@/components/dashboard/StudentVoice';
import { TrendingDiscussions } from '@/components/dashboard/TrendingDiscussions';
import { BestForTags } from '@/components/dashboard/BestForTags';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { UniversityData } from '@/lib/data-parser';
import { Building2 } from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialUni = searchParams.get('university') || '';
  const [selectedUni, setSelectedUni] = useState<string>(initialUni);
  const [data, setData] = useState<UniversityData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedUni) return;
    setLoading(true);
    fetch(`/api/data/universities?name=${encodeURIComponent(selectedUni)}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [selectedUni]);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Select a university to explore detailed analytics</p>
        </div>
        <UniversitySearch onSelect={setSelectedUni} selected={selectedUni} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-500">Loading university data...</p>
          </div>
        </div>
      )}

      {/* Data View */}
      {!loading && data && (
        <div className="space-y-6">
          {/* Stats Row */}
          <StatsCards
            totalMentions={data.totalMentions}
            totalComments={data.totalComments}
            totalVideos={data.totalVideos}
            avgLikes={data.avgLikes}
          />

          {/* Report Card */}
          <UniversityReportCard data={data} />

          {/* Best For Tags */}
          <BestForTags tags={data.bestForTags} universityName={data.name} />

          {/* Timeline + Strengths */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ReputationTimeline data={data.reputationTimeline} universityName={data.name} />
            </div>
            <div>
              <StrengthsConcerns data={data} />
            </div>
          </div>

          {/* Student Voice + Trending */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StudentVoice comments={data.topComments} />
            <TrendingDiscussions topics={data.trendingTopics} />
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !data && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <Building2 className="w-7 h-7 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">No University Selected</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Use the search bar above to select a university and explore its comprehensive data analytics.
          </p>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
