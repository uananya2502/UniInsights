import { Award, CheckCircle2 } from 'lucide-react';

interface BestForTagsProps {
  tags: string[];
  universityName: string;
}

export function BestForTags({ tags }: BestForTagsProps) {
  return (
    <div className="card animate-slide-up">
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-600" />
          <h3 className="card-title">Key Highlights & Strengths</h3>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">{tags.length} Accredited Highlights</span>
      </div>
      <div className="card-content">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-50 text-slate-800 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 transition-colors cursor-default"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              Best for {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

