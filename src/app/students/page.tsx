'use client';

import { useState, useEffect } from 'react';
import { UniversitySearch } from '@/components/dashboard/UniversitySearch';
import { UniversityData } from '@/lib/data-parser';
import { MessageSquare, Calendar } from 'lucide-react';
import { SentimentDashboardView } from '@/components/dashboard/SentimentDashboardView';

export default function StudentsPage() {
  const [selectedUni, setSelectedUni] = useState('BML Munjal University');
  const [data, setData] = useState<UniversityData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedUni) return;
    setLoading(true);
    fetch(`/api/data/universities?name=${encodeURIComponent(selectedUni)}`)
      .then(r => r.ok ? r.json() : null)
      .then(setData)
      .finally(() => setLoading(false));
  }, [selectedUni]);

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Student Voice & Sentiment Analytics
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Empirical natural language sentiment breakdown synthesized across thousands of campus reviews
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <UniversitySearch onSelect={setSelectedUni} selected={selectedUni} />
          
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl text-xs shrink-0">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Last Analyzed</div>
              <div className="text-xs font-black text-slate-800">24 Aug 2026</div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 card bg-white">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
          <span className="text-xs font-bold text-slate-600">Extracting Verified Student Data...</span>
        </div>
      )}

      {!loading && data && (
        <div className="animate-slide-up">
          <SentimentDashboardView data={data} />
        </div>
      )}

      {!loading && !data && (
        <div className="flex flex-col items-center justify-center py-20 text-center card bg-white">
          <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center mb-3">
            <MessageSquare className="w-6 h-6 text-slate-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">Select a Campus to Analyze Student Reviews</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Search for a university above to inspect verified student sentiment and feedback.
          </p>
        </div>
      )}
    </div>
  );
}



