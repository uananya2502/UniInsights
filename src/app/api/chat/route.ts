import { NextResponse } from 'next/server';
import { getChatResponse } from '@/lib/gemini';
import { getUniversityByName, getUniversityList } from '@/lib/data-parser';

export async function POST(request: Request) {
  try {
    const { message, universityName } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Build context from available data
    let context = '';
    
    if (universityName) {
      const uniData = getUniversityByName(universityName);
      if (uniData) {
        context = `
Currently viewing: ${uniData.name}
Overall Score: ${uniData.overallScore}/10
Category Scores:
- Academics: ${uniData.categoryScores.academics}/10
- Placement: ${uniData.categoryScores.placement}/10
- Infrastructure: ${uniData.categoryScores.infrastructure}/10
- Student Experience: ${uniData.categoryScores.studentExperience}/10
- Hostel: ${uniData.categoryScores.hostel}/10
- Fees: ${uniData.categoryScores.fees}/10
Total mentions: ${uniData.totalMentions}
Strengths: ${uniData.strengths.join(', ')}
Concerns: ${uniData.concerns.join(', ')}
Best for: ${uniData.bestForTags.join(', ')}`;
      }
    } else {
      const list = getUniversityList();
      context = `The dashboard contains data for ${list.length} Indian universities across categories: Academics, Placement, Infrastructure, Student Experience, Hostel, and Fees. Some top universities in the data include: ${list.slice(0, 15).map(u => u.name).join(', ')}.`;
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
