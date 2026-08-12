import { NextResponse } from 'next/server';
import { fetchLiveNews } from '@/lib/news-fetcher';

export async function GET() {
  try {
    const articles = await fetchLiveNews();
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch live news' }, { status: 500 });
  }
}
