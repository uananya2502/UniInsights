import { NextResponse } from 'next/server';
import { getUniversityList, getAggregatedUniversityData, getTopUniversities } from '@/lib/data-parser';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const detail = searchParams.get('detail');
    const name = searchParams.get('name');
    const top = searchParams.get('top');

    if (name) {
      const allData = getAggregatedUniversityData();
      const uni = allData[name];
      if (!uni) {
        return NextResponse.json({ error: 'University not found' }, { status: 404 });
      }
      return NextResponse.json(uni);
    }

    if (top) {
      const count = parseInt(top, 10) || 10;
      const topUnis = getTopUniversities(count);
      return NextResponse.json(topUnis);
    }

    if (detail === 'true') {
      const data = getAggregatedUniversityData();
      return NextResponse.json(Object.values(data));
    }

    const list = getUniversityList();
    return NextResponse.json(list);
  } catch (error) {
    console.error('Error fetching university data:', error);
    return NextResponse.json({ error: 'Failed to load university data' }, { status: 500 });
  }
}
