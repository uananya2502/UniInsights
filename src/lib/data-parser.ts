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

  const defaultUniversities = [
    'BML Munjal University',
    'IIT Delhi',
    'IIT Bombay',
    'IIT Madras',
    'IIT Kharagpur',
    'IIT Roorkee',
    'IIT Guwahati',
    'IIIT Delhi',
    'BITS Pilani',
    'VIT Vellore',
    'SRM Institute of Science and Technology',
    'Amity University',
    'Anna University',
    'Aligarh Muslim University',
    'Ashoka University',
    'Ahmedabad University',
    'Alliance University',
    'Annamalai University',
    'Amrita Vishwa Vidyapeetham',
    'Manipal Academy of Higher Education',
    'Thapar Institute of Engineering and Technology',
    'Jadavpur University',
    'Chandigarh University',
    'Lovely Professional University',
    'University of Delhi',
    'Jawaharlal Nehru University',
    'Banaras Hindu University',
  ];
  defaultUniversities.forEach(name => uniqueNames.add(name));

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
