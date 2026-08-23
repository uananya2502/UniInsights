export const DEFAULT_CAMPUS_IMAGE = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';

export const campusImageMap: Record<string, string> = {
  'BML Munjal University': '/bml-munjal-campus.jpg',
  'IIT Delhi': '/iit-delhi-campus.jpg',
  'IIT Bombay': '/iit-bombay-campus.jpg',
  'IIT Madras': 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',

  'IIT Kharagpur': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
  'IIT Roorkee': 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80',
  'IIT Guwahati': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  'IIIT Delhi': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  'BITS Pilani': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
  'VIT Vellore': 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
  'SRM Institute of Science and Technology': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  'University of Delhi': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  'Delhi University': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  'Jawaharlal Nehru University': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
  'Jawaharlal Nehru University (JNU)': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
  'Banaras Hindu University': 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80',
  'Banaras Hindu University (BHU)': 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80',
  'Jadavpur University': 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
  'Manipal Academy of Higher Education': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  'Thapar Institute of Engineering and Technology': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  'Chandigarh University': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  'Lovely Professional University': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
  'Amity University': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  'Ashoka University': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  'Ahmedabad University': 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
  'Alliance University': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
  'Aligarh Muslim University': 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80',
  'Aligarh Muslim University (AMU)': 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80',
  'Anna University': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  'Annamalai University': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  'Amrita Vishwa Vidyapeetham': 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
};

export function getCampusImageUrl(universityName: string): string {
  if (!universityName) return campusImageMap['BML Munjal University'];

  // 1. Direct exact match
  if (campusImageMap[universityName]) {
    return campusImageMap[universityName];
  }

  // 2. Keyword & Alias Fuzzy Matching
  const lower = universityName.toLowerCase();

  if (lower.includes('bml') || lower.includes('munjal')) return campusImageMap['BML Munjal University'];
  if (lower.includes('delhi') && lower.includes('technology')) return campusImageMap['IIT Delhi'];
  if (lower.includes('iit delhi') || lower.includes('iit-delhi')) return campusImageMap['IIT Delhi'];
  if (lower.includes('bombay') || lower.includes('iit-bombay')) return campusImageMap['IIT Bombay'];
  if (lower.includes('madras') || lower.includes('iit-madras')) return campusImageMap['IIT Madras'];
  if (lower.includes('kharagpur') || lower.includes('iit-kharagpur')) return campusImageMap['IIT Kharagpur'];
  if (lower.includes('roorkee') || lower.includes('iit-roorkee')) return campusImageMap['IIT Roorkee'];
  if (lower.includes('guwahati') || lower.includes('iit-guwahati')) return campusImageMap['IIT Guwahati'];
  if (lower.includes('iiit delhi') || lower.includes('iiit-delhi') || lower.includes('indraprastha institute')) return campusImageMap['IIIT Delhi'];
  if (lower.includes('bits') || lower.includes('pilani')) return campusImageMap['BITS Pilani'];
  if (lower.includes('vellore') || lower.includes('vit')) return campusImageMap['VIT Vellore'];
  if (lower.includes('srm')) return campusImageMap['SRM Institute of Science and Technology'];
  if (lower.includes('delhi university') || lower.includes('university of delhi') || lower === 'du') return campusImageMap['University of Delhi'];
  if (lower.includes('jnu') || lower.includes('jawaharlal nehru')) return campusImageMap['Jawaharlal Nehru University'];
  if (lower.includes('bhu') || lower.includes('banaras hindu')) return campusImageMap['Banaras Hindu University'];
  if (lower.includes('jadavpur')) return campusImageMap['Jadavpur University'];
  if (lower.includes('manipal') || lower.includes('mahe')) return campusImageMap['Manipal Academy of Higher Education'];
  if (lower.includes('thapar')) return campusImageMap['Thapar Institute of Engineering and Technology'];
  if (lower.includes('chandigarh university') || lower.includes('cuchd')) return campusImageMap['Chandigarh University'];
  if (lower.includes('lovely') || lower.includes('lpu')) return campusImageMap['Lovely Professional University'];
  if (lower.includes('amity')) return campusImageMap['Amity University'];
  if (lower.includes('ashoka')) return campusImageMap['Ashoka University'];
  if (lower.includes('ahmedabad')) return campusImageMap['Ahmedabad University'];
  if (lower.includes('alliance')) return campusImageMap['Alliance University'];
  if (lower.includes('amu') || lower.includes('aligarh')) return campusImageMap['Aligarh Muslim University'];
  if (lower.includes('anna university')) return campusImageMap['Anna University'];
  if (lower.includes('annamalai')) return campusImageMap['Annamalai University'];
  if (lower.includes('amrita')) return campusImageMap['Amrita Vishwa Vidyapeetham'];

  return DEFAULT_CAMPUS_IMAGE;
}
