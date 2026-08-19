import { Award } from 'lucide-react';
import { DoodleSparkle } from '@/components/ui/Doodles';

interface BestForTagsProps {
  tags: string[];
  universityName: string;
}

export function BestForTags({ tags }: BestForTagsProps) {
  return (
    <div className="card animate-slide-up">
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Award className="w-4 h-4 text-blue-700" />
          </div>
          <h3 className="card-title text-slate-900">Key Highlights & Strengths</h3>
        </div>
        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{tags.length} Accredited Highlights</span>
      </div>
      <div className="card-content">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-slate-50/80 text-slate-800 border border-slate-200/90 hover:border-blue-400 hover:bg-blue-50/60 hover:text-blue-800 hover:shadow-2xs transition-all cursor-default"
            >
              Best for {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


