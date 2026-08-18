import { NewsFeed } from '@/components/dashboard/NewsFeed';
import { Newspaper, Sparkles } from 'lucide-react';
import { DoodleSparkle, DoodleUnderline } from '@/components/ui/Doodles';

export default function NewsPage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 overflow-y-auto">
      {/* Hero Header Banner */}
      <div className="relative rounded-xl bg-slate-900 text-white p-6 md:p-8 shadow-sm border border-slate-800 animate-fade-in overflow-visible">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Newspaper className="w-3.5 h-3.5 text-blue-400" />
            Live Newspaper Stream
          </div>
          <div className="relative">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Intelligence Feed & National Education News
              <DoodleSparkle className="w-4 h-4 text-blue-400 opacity-90 inline-block" />
            </h1>
          </div>
          <p className="text-slate-300 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
            Real-time breaking headlines, admissions, NIRF rankings, and placement reports directly from Indian Express, The Hindu, HT, TOI & NDTV.
          </p>
        </div>
      </div>

      <NewsFeed />
    </div>
  );
}

