import { NextResponse } from 'next/server';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function POST(request: Request) {
  let tmpFile = '';
  try {
    const { text } = await request.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Write a temp Python file to avoid shell escaping issues
    const pyScript = `
import sys, json
sys.stdout.reconfigure(encoding='utf-8')
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()
text = ${JSON.stringify(text)}
scores = analyzer.polarity_scores(text)
compound = scores['compound']
if compound >= 0.05:
    label = 'positive'
elif compound <= -0.05:
    label = 'negative'
else:
    label = 'neutral'
print(json.dumps({
    'compound': round(compound, 4),
    'pos': round(scores['pos'], 4),
    'neu': round(scores['neu'], 4),
    'neg': round(scores['neg'], 4),
    'label': label,
    'score_out_of_10': round((compound + 1) / 2 * 10, 2)
}))
`.trim();

    tmpFile = path.join(os.tmpdir(), `vader_${Date.now()}.py`);
    fs.writeFileSync(tmpFile, pyScript, 'utf-8');

    const result = execSync(`python "${tmpFile}"`, {
      cwd: process.cwd(),
      timeout: 10000,
      env: { ...process.env }
    }).toString().trim();

    const parsed = JSON.parse(result);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('VADER analyze error:', error);
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 });
  } finally {
    if (tmpFile && fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
}
