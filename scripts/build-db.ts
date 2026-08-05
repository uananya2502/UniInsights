import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const BASE_DIR = path.join(process.cwd(), '..'); // Assuming script runs from project root
const DB_PATH = path.join(process.cwd(), 'comments.db');

const commentFiles = [
  { file: 'Student_experience_information/india_universities_student_experience_comments.csv', category: 'Student Experience' },
  { file: 'academics_information/india_universities_academics_comments.csv', category: 'Academics' },
  { file: 'placement_information/india_universities_placement_comments.csv', category: 'Placement' },
  { file: 'fees_information/india_universities_fees_comments.csv', category: 'Fees' },
  { file: 'hostel_information/india_universities_hostel_comments.csv', category: 'Hostel' },
];

async function buildDatabase() {
  console.log('Opening SQLite database...');
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  console.log('Creating FTS5 virtual table...');
  await db.exec(`DROP TABLE IF EXISTS comments_fts`);
  await db.exec(`
    CREATE VIRTUAL TABLE comments_fts USING fts5(
      university, category, sentiment, text
    )
  `);

  let totalInserted = 0;

  for (const cf of commentFiles) {
    const fullPath = path.join(process.cwd(), cf.file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      continue;
    }

    console.log(`Parsing ${cf.file}...`);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const parsed = Papa.parse<Record<string, string>>(fileContent, { header: true, skipEmptyLines: true });
    
    const rows = parsed.data;
    console.log(`Found ${rows.length} rows in ${cf.category}. Inserting...`);

    // Use a transaction for bulk insert speed
    await db.exec('BEGIN TRANSACTION');
    const stmt = await db.prepare(`INSERT INTO comments_fts (university, category, sentiment, text) VALUES (?, ?, ?, ?)`);

    for (const row of rows) {
      const university = row.university_name;
      const text = row.comment_text;
      const sentiment = row.sentiment || 'neutral';
      
      if (university && text && text.trim().length > 10) {
        await stmt.run([university.trim(), cf.category, sentiment, text.trim()]);
        totalInserted++;
      }
    }

    await stmt.finalize();
    await db.exec('COMMIT');
    console.log(`Completed ${cf.category}.`);
  }

  console.log(`\nDatabase built successfully! Total comments indexed: ${totalInserted}`);
  await db.close();
}

buildDatabase().catch(console.error);
