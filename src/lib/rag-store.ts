import fs from 'fs';
import path from 'path';
import { generateEmbedding } from './gemini';
import { getUniversityList, getUniversityByName } from './data-parser';

export interface RAGDocument {
  id: string;
  universityName: string;
  content: string;
  embedding: number[];
}

let store: RAGDocument[] = [];
let isInitialized = false;

const CACHE_FILE = path.join(process.cwd(), '.rag-cache.json');

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Format a university into a rich text chunk for RAG
function formatUniversityForRAG(uniName: string): string | null {
  const uniData = getUniversityByName(uniName);
  if (!uniData) return null;

  return `
University: ${uniData.name}
Overall Score: ${uniData.overallScore}/10
Scores - Academics: ${uniData.categoryScores.academics}, Placement: ${uniData.categoryScores.placement}, Infrastructure: ${uniData.categoryScores.infrastructure}, Experience: ${uniData.categoryScores.studentExperience}, Hostel: ${uniData.categoryScores.hostel}, Fees: ${uniData.categoryScores.fees}
Strengths: ${uniData.strengths.join(', ')}
Concerns: ${uniData.concerns.join(', ')}
Best for: ${uniData.bestForTags.join(', ')}
Top Comments:
${uniData.topComments.map(c => `- [${c.category} / ${c.sentiment}] ${c.text}`).join('\n')}
  `.trim();
}

export async function initRAGStore() {
  if (isInitialized) return;

  // Try to load from cache
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cacheData = fs.readFileSync(CACHE_FILE, 'utf-8');
      store = JSON.parse(cacheData);
      console.log(`[RAG] Loaded ${store.length} documents from cache.`);
      isInitialized = true;
      return;
    }
  } catch (error) {
    console.warn('[RAG] Failed to load cache, will regenerate.', error);
  }

  console.log('[RAG] Initializing store and generating embeddings... This may take a moment.');
  const universities = getUniversityList();
  
  // To avoid hitting rate limits immediately, we'll process in small batches with delays
  const newStore: RAGDocument[] = [];
  
  for (let i = 0; i < universities.length; i++) {
    const uni = universities[i];
    const content = formatUniversityForRAG(uni.name);
    if (!content) continue;

    try {
      // Small delay to prevent 429 Too Many Requests
      if (i > 0) await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`[RAG] Generating embedding for ${uni.name} (${i + 1}/${universities.length})`);
      const embedding = await generateEmbedding(content);
      
      newStore.push({
        id: `uni-${i}`,
        universityName: uni.name,
        content,
        embedding
      });
    } catch (error) {
      console.error(`[RAG] Failed to embed ${uni.name}:`, error);
      // If we hit quota, break out and use what we have so far
      if (error instanceof Error && error.message.includes('429')) {
        console.warn('[RAG] API Quota exceeded. Saving partial store to cache.');
        break;
      }
    }
  }

  store = newStore;
  isInitialized = true;

  // Save to cache
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(store, null, 2));
    console.log(`[RAG] Saved ${store.length} documents to cache.`);
  } catch (error) {
    console.error('[RAG] Failed to save cache:', error);
  }
}

export async function searchRAG(query: string, topK: number = 3): Promise<RAGDocument[]> {
  // Ensure initialized
  if (!isInitialized) {
    await initRAGStore();
  }

  if (store.length === 0) {
    console.warn('[RAG] Store is empty. Cannot search.');
    return [];
  }

  try {
    console.log(`[RAG] Embedding user query: "${query}"`);
    const queryEmbedding = await generateEmbedding(query);
    
    // Calculate similarities
    const results = store.map(doc => ({
      doc,
      score: cosineSimilarity(queryEmbedding, doc.embedding)
    }));

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, topK).map(r => r.doc);
  } catch (error) {
    console.error('[RAG] Search failed:', error);
    return [];
  }
}
