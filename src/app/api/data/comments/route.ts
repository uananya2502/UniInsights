import { NextResponse } from 'next/server';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DB_PATH = path.join(process.cwd(), 'comments.db');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const university = searchParams.get('university') || '';
    const category   = searchParams.get('category')  || 'all';
    const sentiment  = searchParams.get('sentiment') || 'all';
    const limit      = Math.min(parseInt(searchParams.get('limit') || '100', 10), 200);

    if (!university) {
      return NextResponse.json({ comments: [], total: 0 });
    }

    const db = await open({ filename: DB_PATH, driver: sqlite3.Database });

    // First: check what columns the table has
    const tableInfo = await db.all(`PRAGMA table_info(comments_fts)`);
    const cols = tableInfo.map((r: {name: string}) => r.name);

    // Build WHERE clause using LIKE (more reliable than FTS MATCH for filtering)
    const conditions: string[] = ['university LIKE ?'];
    const params: (string | number)[] = [`%${university}%`];

    if (category !== 'all' && cols.includes('category')) {
      conditions.push('category LIKE ?');
      params.push(`%${category}%`);
    }
    if (sentiment !== 'all' && cols.includes('sentiment')) {
      conditions.push('sentiment LIKE ?');
      params.push(`%${sentiment}%`);
    }

    params.push(limit);

    const query = `
      SELECT university, category, sentiment, text
      FROM comments_fts
      WHERE ${conditions.join(' AND ')}
      LIMIT ?
    `;

    const rows = await db.all<{university: string; category: string; sentiment: string; text: string}[]>(query, params);
    await db.close();

    return NextResponse.json({ comments: rows, total: rows.length });
  } catch (error) {
    console.error('Comments API error:', error);
    return NextResponse.json({ comments: [], total: 0, error: String(error) }, { status: 500 });
  }
}
