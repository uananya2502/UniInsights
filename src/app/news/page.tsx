import { NewsFeed } from '@/components/dashboard/NewsFeed';

export default function NewsPage() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Intelligence Feed</h1>
        <p className="text-sm text-slate-500 mt-0.5">Latest developments in higher education</p>
      </div>
      <NewsFeed />
    </div>
  );
}
