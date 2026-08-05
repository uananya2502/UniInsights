'use client';

import { ThumbsUp, Calendar } from 'lucide-react';
import { CommentData } from '@/lib/data-parser';

interface StudentVoiceProps {
  comments: CommentData[];
}

export function StudentVoice({ comments }: StudentVoiceProps) {
  const sentimentColor = {
    positive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    neutral: 'bg-slate-50 text-slate-600 border-slate-200',
    negative: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="card animate-slide-up">
      <div className="card-header flex items-center justify-between">
        <div>
          <h3 className="card-title">Student Voice</h3>
          <p className="text-xs text-slate-400 mt-1">Top student comments and feedback</p>
        </div>
        <span className="badge badge-blue">{comments.length} reviews</span>
      </div>
      <div className="card-content">
        {comments.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">No student reviews available for this university.</p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {comments.slice(0, 8).map((comment) => (
              <div
                key={comment.id}
                className="p-3.5 rounded-lg border border-slate-100 hover:border-slate-200 bg-white hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-slate-700">{comment.author}</span>
                  </div>
                  <span className={`badge text-[10px] border ${sentimentColor[comment.sentiment]}`}>
                    {comment.sentiment}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-2 line-clamp-3">
                  {comment.text}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    {comment.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {comment.date}
                  </span>
                  <span className="badge badge-blue text-[10px]">{comment.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
