'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { UniversitySearch } from '@/components/dashboard/UniversitySearch';
import { UniversityReportCard } from '@/components/dashboard/UniversityReportCard';
import { StrengthsConcerns } from '@/components/dashboard/StrengthsConcerns';
import { ReputationTimeline } from '@/components/dashboard/ReputationTimeline';
import { BestForTags } from '@/components/dashboard/BestForTags';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { DoodleSparkle } from '@/components/ui/Doodles';
import { UniversityData } from '@/lib/data-parser';

import { Building2, ShieldCheck, Search } from 'lucide-react';



function DashboardContent() {
  const searchParams = useSearchParams();
  const initialUni = searchParams.get('university') || '';
  const [selectedUni, setSelectedUni] = useState<string>(initialUni || 'BML Munjal University');

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
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto overflow-y-auto">
      {/* Splash Hero Banner */}
      <div className="relative rounded-xl bg-slate-900 text-white p-6 md:p-8 shadow-sm border border-slate-800 animate-fade-in overflow-visible">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
                UniInsights
              </h2>
            </div>
            <p className="text-slate-300 text-sm md:text-base font-medium max-w-xl">
              Know Your Campus. Choose with Confidence.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <UniversitySearch onSelect={setSelectedUni} selected={selectedUni} />
          </div>
        </div>
      </div>


      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-500">Retrieving university intelligence metrics...</p>
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




        </div>
      )}

      {/* Empty State */}
      {!loading && !data && (
        <div className="flex flex-col items-center justify-center py-16 text-center card bg-white">
          <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center mb-3">
            <Building2 className="w-6 h-6 text-slate-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">Select a Campus to View Report Card</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Search above for any Indian university e.g., IIT Delhi, BITS Pilani, or Amity University to inspect performance metrics.
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
        <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}

