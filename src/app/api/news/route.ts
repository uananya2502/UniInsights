import { NextResponse } from 'next/server';
import { fetchLiveNews } from '@/lib/news-fetcher';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const articles = await fetchLiveNews();
    return NextResponse.json(articles, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch live news' }, { status: 500 });
  }
}

