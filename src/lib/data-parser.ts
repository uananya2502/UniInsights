import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const basePath = path.join(process.cwd());

/* ─── Type Definitions ─── */

export interface UniversityBasic {
  id: string;
  name: string;
}

export interface CategoryScores {
  studentExperience: number;
  infrastructure: number;
  academics: number;
  fees: number;
  hostel: number;
  placement: number;
}

export interface CommentData {
  id: string;
  text: string;
  author: string;
  likes: number;
  date: string;
  category: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface TimelinePoint {
  year: number;
  month: string;
  mentions: number;
  sentiment: number;
  engagement: number;
}

export interface TopicData {
  keyword: string;
  count: number;
  trend: 'rising' | 'stable' | 'declining';
}

export interface UniversityData {
  id: string;
  name: string;
  categoryScores: CategoryScores;
  overallScore: number;
  totalMentions: number;
  totalComments: number;
  totalVideos: number;
  avgLikes: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topComments: CommentData[];
  reputationTimeline: TimelinePoint[];
  trendingTopics: TopicData[];
  bestForTags: string[];
  strengths: string[];
  concerns: string[];
}

/* ─── Caches ─── */
let universityListCache: UniversityBasic[] | null = null;
let fullDataCache: Record<string, UniversityData> | null = null;

/* ─── CSV Parsing ─── */

function parseCSV<T>(filePath: string, maxRows?: number): T[] {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return [];
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const result = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
    preview: maxRows,
  });
  return result.data as T[];
}

/* ─── Deterministic Score Generator ─── */

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededScore(name: string, category: string, min: number, max: number): number {
  const seed = hashString(name + category);
  const normalized = (seed % 1000) / 1000;
  return +(min + normalized * (max - min)).toFixed(1);
}

/* ─── Data Access Functions ─── */

export function getUniversityList(): UniversityBasic[] {
  if (universityListCache) return universityListCache;

  const categories = [
    { file: 'Rankings/rankings_text_cleaned.csv', col: 'university_name' },
    { file: 'academics_information/india_universities_academics_videos.csv', col: 'university_name' },
    { file: 'placement_information/india_universities_placement_videos.csv', col: 'university_name' },
    { file: 'hostel_information/india_universities_hostel_videos.csv', col: 'university_name' },
    { file: 'fees_information/india_universities_fees_videos.csv', col: 'university_name' },
    { file: 'Student_experience_information/india_universities_student_experience_videos.csv', col: 'university_name' },
  ];

  const uniqueNames = new Set<string>();

  for (const cat of categories) {
    try {
      const data = parseCSV<Record<string, string>>(path.join(/*turbopackIgnore: true*/ basePath, cat.file));
      data.forEach(row => {
        const name = row[cat.col];
        if (name && name.trim()) uniqueNames.add(name.trim());
      });
    } catch {
      // Skip missing files
    }
  }

  universityListCache = Array.from(uniqueNames)
    .map((name, idx) => ({ id: `uni-${idx}`, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return universityListCache;
}

function getCommentsForUniversity(universityName: string): CommentData[] {
  const commentFiles = [
    { file: 'Student_experience_information/india_universities_student_experience_comments.csv', category: 'Student Experience' },
    { file: 'academics_information/india_universities_academics_comments.csv', category: 'Academics' },
    { file: 'placement_information/india_universities_placement_comments.csv', category: 'Placement' },
    { file: 'fees_information/india_universities_fees_comments.csv', category: 'Fees' },
    { file: 'hostel_information/india_universities_hostel_comments.csv', category: 'Hostel' },
  ];

  const comments: CommentData[] = [];

  for (const cf of commentFiles) {
    try {
      // Only read first 5000 rows per file for performance
      const data = parseCSV<Record<string, string>>(path.join(/*turbopackIgnore: true*/ basePath, cf.file), 5000);
      const uniComments = data
        .filter(row => row.university_name === universityName && row.comment_text && row.comment_text.length > 20)
        .slice(0, 10)
        .map((row, idx) => {
          const likes = parseInt(row.likes || '0', 10);
          return {
            id: row.comment_id || `comment-${idx}`,
            text: row.comment_text.slice(0, 300),
            author: (row.author_name || 'Anonymous').replace('@', ''),
            likes,
            date: row.comment_date || row.published_at?.split('T')[0] || '2024-01-01',
            category: cf.category,
            sentiment: likes > 5 ? 'positive' as const : likes > 0 ? 'neutral' as const : 'negative' as const,
          };
        });
      comments.push(...uniComments);
    } catch {
      // Skip missing files
    }
  }

  return comments.sort((a, b) => b.likes - a.likes).slice(0, 15);
}

function buildUniversityData(name: string, id: string): UniversityData {
  const scores: CategoryScores = {
    studentExperience: seededScore(name, 'student', 5.0, 9.8),
    infrastructure: seededScore(name, 'infra', 4.5, 9.5),
    academics: seededScore(name, 'acad', 5.5, 9.9),
    fees: seededScore(name, 'fees', 4.0, 9.0),
    hostel: seededScore(name, 'hostel', 4.0, 9.2),
    placement: seededScore(name, 'place', 4.5, 9.7),
  };

  const scoreValues = Object.values(scores);
  const overallScore = +(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length).toFixed(1);

  const topComments = getCommentsForUniversity(name);

  // Build deterministic timeline
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const months = ['Jan', 'Apr', 'Jul', 'Oct'];
  const timeline: TimelinePoint[] = [];
  years.forEach(year => {
    months.forEach(month => {
      timeline.push({
        year,
        month: `${month} ${year}`,
        mentions: seededScore(name, `mentions-${year}-${month}`, 50, 500),
        sentiment: seededScore(name, `sent-${year}-${month}`, 4.0, 9.0),
        engagement: seededScore(name, `eng-${year}-${month}`, 100, 2000),
      });
    });
  });

  // Trending topics
  const topicsList = ['Campus Life', 'Placements', 'Faculty Quality', 'Infrastructure', 'Fees Structure', 'Hostel Food', 'Research', 'Alumni Network', 'Admission Process', 'Extracurriculars'];
  const trendingTopics: TopicData[] = topicsList.map(keyword => ({
    keyword,
    count: seededScore(name, keyword, 20, 500),
    trend: (['rising', 'stable', 'declining'] as const)[hashString(name + keyword) % 3],
  })).sort((a, b) => b.count - a.count);

  // Best-for tags
  const tagOptions = ['Engineering', 'Campus Life', 'Research', 'Management', 'Value for Money', 'Student Community', 'Industry Connections', 'Sports', 'Innovation', 'Arts & Culture'];
  const bestForTags = tagOptions
    .filter((_, i) => hashString(name + i) % 3 === 0)
    .slice(0, 4);
  if (bestForTags.length === 0) bestForTags.push('Overall Excellence');

  // Strengths and concerns
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const labelMap: Record<string, string> = {
    studentExperience: 'Student Experience', infrastructure: 'Infrastructure',
    academics: 'Academics', fees: 'Fees Structure', hostel: 'Hostel & Living',
    placement: 'Placement & Career',
  };
  const strengths = sorted.slice(0, 3).map(([k]) => labelMap[k] || k);
  const concerns = sorted.slice(-2).filter(([, v]) => v < 7.0).map(([k]) => labelMap[k] || k);

  return {
    id,
    name,
    categoryScores: scores,
    overallScore,
    totalMentions: seededScore(name, 'mentions', 500, 8000),
    totalComments: seededScore(name, 'comments', 200, 5000),
    totalVideos: seededScore(name, 'videos', 10, 200),
    avgLikes: seededScore(name, 'likes', 2, 50),
    sentimentBreakdown: {
      positive: seededScore(name, 'pos', 40, 70),
      neutral: seededScore(name, 'neu', 15, 35),
      negative: seededScore(name, 'neg', 5, 25),
    },
    topComments,
    reputationTimeline: timeline,
    trendingTopics,
    bestForTags,
    strengths,
    concerns,
  };
}

export function getAggregatedUniversityData(): Record<string, UniversityData> {
  if (fullDataCache) return fullDataCache;

  const list = getUniversityList();
  const aggregated: Record<string, UniversityData> = {};

  list.forEach(uni => {
    aggregated[uni.name] = buildUniversityData(uni.name, uni.id);
  });

  fullDataCache = aggregated;
  return aggregated;
}

export function getUniversityByName(name: string): UniversityData | null {
  const list = getUniversityList();
  const match = list.find(u => u.name === name);
  if (!match) return null;
  return buildUniversityData(name, match.id);
}

export function getTopUniversities(count: number = 10): UniversityData[] {
  const all = getAggregatedUniversityData();
  return Object.values(all)
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, count);
}
