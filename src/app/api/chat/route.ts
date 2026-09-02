import { NextResponse } from 'next/server';
import { getChatResponse } from '@/lib/gemini';
import { searchRAG } from '@/lib/rag-store';
import { searchRawComments } from '@/lib/sqlite-search';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    let context = '';
    
    // 1. Vector Search for University Summaries (API caching used to avoid limits)
    try {
      const summaryDocs = await searchRAG(message, 2);
      if (summaryDocs.length > 0) {
        context += '--- UNIVERSITY SUMMARIES ---\n';
        context += summaryDocs.map(doc => doc.content).join('\n\n');
        context += '\n\n';
      }
    } catch (err) {
      console.warn('Vector Search failed:', err);
    }

    // 2. High-Speed SQLite FTS5 Search for Raw Comments (No API usage)
    try {
      const rawComments = await searchRawComments(message, 10);
      if (rawComments.length > 0) {
        context += 'RELEVANT RAW STUDENT COMMENTS\n';
        context += rawComments.map(c => `[${c.university} - ${c.category}] (${c.sentiment}): ${c.text}`).join('\n');
        context += '\n\n';
      }
    } catch (err) {
      console.warn('SQLite FTS5 Search failed:', err);
    }

    if (!context) {
      context = 'No specific database records found. Answer generally based on your knowledge of Indian universities.';
    } else {
      context = 'Here is the most relevant data retrieved from the database to help answer the user:\n\n' + context;
    }

    const response = await getChatResponse(message, context);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
