import { Award } from 'lucide-react';

interface BestForTagsProps {
  tags: string[];
  universityName: string;
}

export function BestForTags({ tags, universityName }: BestForTagsProps) {
  const tagColors = [
    'bg-blue-50 text-blue-700 border-blue-200',
    'bg-emerald-50 text-emerald-700 border-emerald-200',
    'bg-purple-50 text-purple-700 border-purple-200',
    'bg-amber-50 text-amber-700 border-amber-200',
    'bg-teal-50 text-teal-700 border-teal-200',
    'bg-indigo-50 text-indigo-700 border-indigo-200',
  ];

  return (
    <div className="card animate-slide-up">
      <div className="card-header flex items-center gap-2">
        <Award className="w-4 h-4 text-amber-500" />
        <h3 className="card-title">Best For</h3>
      </div>
      <div className="card-content">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-transform hover:scale-105 cursor-default ${tagColors[i % tagColors.length]}`}
            >
              Best for {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
