import path from 'path';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

const DB_PATH = path.join(process.cwd(), 'comments.db');
let dbInstance: Database | null = null;

async function getDB() {
  if (!dbInstance) {
    dbInstance = await open({
      filename: DB_PATH,
      driver: sqlite3.Database
    });
  }
  return dbInstance;
}

export interface FTSComment {
  university: string;
  category: string;
  sentiment: string;
  text: string;
}

export async function searchRawComments(query: string, limit: number = 10): Promise<FTSComment[]> {
  try {
    const db = await getDB();
    
    // Process query to extract meaningful keywords and remove noise
    const keywords = query
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !['what', 'where', 'which', 'how', 'tell', 'about', 'some', 'good', 'bad'].includes(w));
    
    if (keywords.length === 0) return [];
    
    // FTS5 MATCH syntax: match on any of the keywords
    const matchQuery = keywords.join(' OR ');

    // Use bm25() scoring which is built into FTS5 to rank results
    const results = await db.all<FTSComment[]>(`
      SELECT university, category, sentiment, text 
      FROM comments_fts 
      WHERE comments_fts MATCH ? 
      ORDER BY bm25(comments_fts) 
      LIMIT ?
    `, [matchQuery, limit]);

    return results;
  } catch (error) {
    console.error('[SQLite] Search error:', error);
    return [];
  }
}
