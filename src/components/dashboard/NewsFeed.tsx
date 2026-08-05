import { ExternalLink, Clock } from 'lucide-react';

const mockNews = [
  {
    id: '1',
    title: 'NIRF Rankings 2025: Top Engineering Colleges See Shifts in Positions',
    source: 'Education Times',
    date: '2025-08-01',
    category: 'Rankings',
    excerpt: 'The latest NIRF rankings have been released with notable changes across engineering and management categories.',
  },
  {
    id: '2',
    title: 'IIT Placement Season Concludes with Record-Breaking Offers',
    source: 'Business Standard',
    date: '2025-07-28',
    category: 'Placements',
    excerpt: 'Multiple IITs report strong placement seasons with average packages crossing new milestones.',
  },
  {
    id: '3',
    title: 'New National Education Policy Impact on University Admissions',
    source: 'The Hindu',
    date: '2025-07-25',
    category: 'Policy',
    excerpt: 'Universities across India are adapting their admission processes in accordance with the latest NEP guidelines.',
  },
  {
    id: '4',
    title: 'Government Announces Expansion of Research Funding for Top Institutions',
    source: 'Hindustan Times',
    date: '2025-07-20',
    category: 'Research',
    excerpt: 'A significant increase in research grants has been allocated to institutions with strong publication records.',
  },
  {
    id: '5',
    title: 'Student Satisfaction Survey Reveals Key Areas for Improvement',
    source: 'India Today Education',
    date: '2025-07-15',
    category: 'Student Life',
    excerpt: 'A nationwide survey of 50,000 students highlights infrastructure and hostel quality as primary areas of concern.',
  },
];

export function NewsFeed() {
  return (
    <div className="card animate-slide-up">
      <div className="card-header flex items-center justify-between">
        <div>
          <h3 className="card-title">Current News</h3>
          <p className="text-xs text-slate-400 mt-1">Latest developments in higher education</p>
        </div>
        <span className="badge badge-blue">Live Feed</span>
      </div>
      <div className="card-content">
        <div className="space-y-4">
          {mockNews.map((article) => (
            <div
              key={article.id}
              className="group p-3.5 rounded-lg border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="badge badge-blue text-[10px]">{article.category}</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.date}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
                {article.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-2 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400">{article.source}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
