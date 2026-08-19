export const campusImageMap: Record<string, string> = {
  'BML Munjal University': '/bml-munjal-campus.jpg',
  'IIT Delhi': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  'IIT Bombay': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  'IIT Madras': 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
  'BITS Pilani': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
  'VIT Vellore': 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
  'SRM Institute of Science and Technology': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  'Delhi University': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
};


export const DEFAULT_CAMPUS_IMAGE = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80';

export function getCampusImageUrl(universityName: string): string {
  if (!universityName) return DEFAULT_CAMPUS_IMAGE;
  
  // Exact match
  if (campusImageMap[universityName]) {
    return campusImageMap[universityName];
  }

  // Fuzzy keyword match
  const lower = universityName.toLowerCase();
  if (lower.includes('bml') || lower.includes('munjal')) return campusImageMap['BML Munjal University'];
  if (lower.includes('iit delhi')) return campusImageMap['IIT Delhi'];
  if (lower.includes('iit bombay')) return campusImageMap['IIT Bombay'];
  if (lower.includes('iit madras')) return campusImageMap['IIT Madras'];
  if (lower.includes('bits') || lower.includes('pilani')) return campusImageMap['BITS Pilani'];
  if (lower.includes('vit')) return campusImageMap['VIT Vellore'];
  if (lower.includes('srm')) return campusImageMap['SRM Institute of Science and Technology'];

  return DEFAULT_CAMPUS_IMAGE;
}
