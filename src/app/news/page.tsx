import { NewsFeed } from '@/components/dashboard/NewsFeed';

export default function NewsPage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 overflow-y-auto">
      {/* Hero Header Banner */}
      <div className="relative rounded-xl bg-slate-900 text-white p-6 md:p-8 shadow-sm border border-slate-800 animate-fade-in overflow-visible">
        <div className="relative z-10 space-y-2">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Intelligence Feed & National Education News
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

