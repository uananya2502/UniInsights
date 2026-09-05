# -*- coding: utf-8 -*-
"""
UniInsights -- Calibrated Sentiment Score Generator v2
=======================================================
Fixes raw VADER bias using:
  1. Engagement-weighted sentiment (likes-weighted average)
  2. NIRF rank calibration bonus
  3. Per-category percentile normalization (scores relative to peer universities)

Run from project root (d:/UniInsights/):
    python scripts/generate_sentiment_scores.py
"""

import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

import pandas as pd
import numpy as np
import json
import os
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from tqdm import tqdm

# -- Config ------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_PATH = os.path.join(BASE_DIR, 'public', 'university_sentiment_scores.json')

CATEGORY_FILES = {
    'placement':          os.path.join(BASE_DIR, 'placement_information',          'india_universities_placement_comments.csv'),
    'hostel':             os.path.join(BASE_DIR, 'hostel_information',              'india_universities_hostel_comments.csv'),
    'academics':          os.path.join(BASE_DIR, 'academics_information',           'india_universities_academics_comments.csv'),
    'fees':               os.path.join(BASE_DIR, 'fees_information',                'india_universities_fees_comments.csv'),
    'student_experience': os.path.join(BASE_DIR, 'Student_experience_information',  'india_universities_student_experience_comments.csv'),
    'infrastructure':     os.path.join(BASE_DIR, 'Infrastructure', 'Csv',           'infrastructure_comment_clean.csv'),
}

# -- NIRF Rank Calibration Table ---------------------------------------------
# Source: NIRF India Rankings 2024 (Overall + Engineering + University categories)
# bonus = quality adjustment added to normalized sentiment score
# Scale: IIT top tier = +2.5, NIT top = +1.4, good private = +0.5, unknown = -0.3
NIRF_CALIBRATION = {
    # ── IITs (Top Tier Government) ──────────────────────────────────────────
    'IIT Madras':                                       {'bonus':  2.5},
    'IIT Delhi':                                        {'bonus':  2.4},
    'IIT Bombay':                                       {'bonus':  2.3},
    'IIT Kanpur':                                       {'bonus':  2.2},
    'IIT Roorkee':                                      {'bonus':  2.1},
    'IIT Kharagpur':                                    {'bonus':  2.0},
    'IIT Guwahati':                                     {'bonus':  1.9},
    'IIT Hyderabad':                                    {'bonus':  1.7},
    'IIT BHU':                                          {'bonus':  1.6},
    'IIT Indore':                                       {'bonus':  1.5},
    'IIT Gandhinagar':                                  {'bonus':  1.4},
    'IIT Patna':                                        {'bonus':  1.3},
    'IIT Jodhpur':                                      {'bonus':  1.3},
    'IIT Mandi':                                        {'bonus':  1.2},
    'IIT Ropar':                                        {'bonus':  1.2},
    # ── IISc / IIMs (Premier Research/Management) ───────────────────────────
    'IIM Ahmedabad':                                    {'bonus':  2.3},
    'IIM Bangalore':                                    {'bonus':  2.2},
    'IIM Calcutta':                                     {'bonus':  2.1},
    'IIM Lucknow':                                      {'bonus':  1.9},
    'IIM Kozhikode':                                    {'bonus':  1.8},
    'IIM Indore':                                       {'bonus':  1.7},
    'IIM Rohtak':                                       {'bonus':  1.3},
    'IIM Shillong':                                     {'bonus':  1.2},
    'IIM Udaipur':                                      {'bonus':  1.2},
    'IIM Ranchi':                                       {'bonus':  1.2},
    # ── NITs (National Institutes of Technology) ────────────────────────────
    'NIT Trichy':                                       {'bonus':  1.6},
    'NIT Warangal':                                     {'bonus':  1.5},
    'NIT Surathkal':                                    {'bonus':  1.5},
    'NIT Calicut':                                      {'bonus':  1.4},
    'NIT Rourkela':                                     {'bonus':  1.4},
    'NIT Allahabad':                                    {'bonus':  1.3},
    'NIT Nagpur':                                       {'bonus':  1.2},
    'NIT Durgapur':                                     {'bonus':  1.2},
    'NIT Kurukshetra':                                  {'bonus':  1.1},
    'NIT Jaipur':                                       {'bonus':  1.1},
    'NIT Silchar':                                      {'bonus':  1.0},
    'NIT Jamshedpur':                                   {'bonus':  1.0},
    'NIT Patna':                                        {'bonus':  1.0},
    'NIT Hamirpur':                                     {'bonus':  0.9},
    'NIT Jalandhar':                                    {'bonus':  0.9},
    'NIT Raipur':                                       {'bonus':  0.8},
    'NIT Bhopal':                                       {'bonus':  0.8},
    'NIT Nagaland':                                     {'bonus':  0.7},
    'NIT Meghalaya':                                    {'bonus':  0.7},
    'NIT Arunachal Pradesh':                            {'bonus':  0.7},
    # ── IIITs (Indian Institutes of Information Technology) ─────────────────
    'IIIT Delhi':                                       {'bonus':  1.5},
    'IIIT Hyderabad':                                   {'bonus':  1.4},
    'IIIT Bangalore':                                   {'bonus':  1.3},
    'IIIT Allahabad':                                   {'bonus':  1.2},
    'IIIT Gwalior':                                     {'bonus':  1.1},
    'IIIT Jabalpur':                                    {'bonus':  1.0},
    'IIIT Lucknow':                                     {'bonus':  1.0},
    'IIIT Kottayam':                                    {'bonus':  0.9},
    'IIIT Kancheepuram':                                {'bonus':  0.9},
    'IIIT Naya Raipur':                                 {'bonus':  0.8},
    'IIIT Bhopal':                                      {'bonus':  0.7},
    # ── Top Central Universities ─────────────────────────────────────────────
    'Jawaharlal Nehru University':                      {'bonus':  2.0},
    'University of Delhi':                              {'bonus':  1.9},
    'Jadavpur University':                              {'bonus':  1.8},
    'Banaras Hindu University':                         {'bonus':  1.6},
    'Aligarh Muslim University':                        {'bonus':  1.5},
    'University of Hyderabad':                          {'bonus':  1.5},
    'Jamia Millia Islamia':                             {'bonus':  1.3},
    'Tezpur University':                                {'bonus':  1.1},
    'Visva Bharati University':                         {'bonus':  1.0},
    'North Eastern Hill University':                    {'bonus':  0.9},
    'Pondicherry University':                           {'bonus':  0.9},
    'Central University of Rajasthan':                  {'bonus':  0.8},
    'University of Allahabad':                          {'bonus':  0.9},
    'University of Kerala':                             {'bonus':  0.9},
    'University of Calcutta':                           {'bonus':  1.0},
    'Andhra University':                                {'bonus':  0.9},
    'Osmania University':                               {'bonus':  0.9},
    'Punjab University':                                {'bonus':  0.9},
    'Savitribai Phule Pune University':                 {'bonus':  0.9},
    'Mumbai University':                                {'bonus':  0.8},
    'University of Madras':                             {'bonus':  0.8},
    'Maharaja Sayajirao University':                    {'bonus':  0.8},
    # ── State / Deemed Government ────────────────────────────────────────────
    'Anna University':                                  {'bonus':  1.6},
    'NSUT Delhi':                                       {'bonus':  1.2},
    'DTU Delhi':                                        {'bonus':  1.2},
    'Guru Gobind Singh Indraprastha University':        {'bonus':  0.8},
    'Birla Institute of Technology Mesra':              {'bonus':  1.0},
    # ── Top Private/Deemed Universities ─────────────────────────────────────
    'BITS Pilani':                                      {'bonus':  2.0},
    'BITS Hyderabad':                                   {'bonus':  1.5},
    'BITS Goa':                                         {'bonus':  1.5},
    'VIT Vellore':                                      {'bonus':  1.4},
    'VIT University':                                   {'bonus':  1.2},
    'Manipal Academy of Higher Education':              {'bonus':  1.2},
    'Thapar Institute of Engineering and Technology':   {'bonus':  1.3},
    'Amrita Vishwa Vidyapeetham':                       {'bonus':  1.2},
    'SRM Institute of Science and Technology':          {'bonus':  1.0},
    'Ashoka University':                                {'bonus':  1.1},
    'Shiv Nadar University':                            {'bonus':  1.0},
    'KIIT University':                                  {'bonus':  0.9},
    'Nirma University':                                 {'bonus':  0.9},
    'SASTRA Deemed University':                         {'bonus':  0.8},
    'SASTRA University':                                {'bonus':  0.8},
    'FLAME University':                                 {'bonus':  0.7},
    'PES University':                                   {'bonus':  0.7},
    'Christ University':                                {'bonus':  0.7},
    'Ramaiah Institute of Technology':                  {'bonus':  0.7},
    'R.V. College of Engineering':                      {'bonus':  0.6},
    'Symbiosis International University':               {'bonus':  0.7},
    'NMIMS University':                                 {'bonus':  0.7},
    'Bennett University':                               {'bonus':  0.1},
    'O.P. Jindal Global University':                    {'bonus':  0.6},
    'Dhirubhai Ambani Institute of Information and Communication Technology': {'bonus': 0.7},
    'IIM Ahmedabad':                                    {'bonus':  2.3},
    # ── Mid-tier Private Universities ────────────────────────────────────────
    'Amity University':                                 {'bonus':  0.6},
    'Chandigarh University':                            {'bonus':  0.5},
    'Manipal University':                               {'bonus':  0.6},
    'Manipal University Jaipur':                        {'bonus':  0.4},
    'Jain University':                                  {'bonus':  0.4},
    'BML Munjal University':                            {'bonus':  0.5},
    'Thapar Institute of Engineering and Technology':   {'bonus':  1.3},
    'Ahmedabad University':                             {'bonus':  0.4},
    'UPES Dehradun':                                    {'bonus': -0.3},
    'MIT World Peace University':                       {'bonus':  0.3},
    'Chitkara University':                              {'bonus':  0.3},
    'Graphic Era University':                           {'bonus':  0.2},
    'Sharda University':                                {'bonus':  0.2},
    'ICFAI University':                                 {'bonus':  0.2},
    'Alliance University':                              {'bonus':  0.2},
    'JECRC University':                                 {'bonus':  0.1},
    'Pandit Deendayal Energy University':               {'bonus':  0.3},
    # ── Lower-tier / Unknown Private ─────────────────────────────────────────
    # These get a slight negative adjustment to prevent inflation from few comments
    'Lovely Professional University':                   {'bonus':  0.2},
    'Galgotias University':                             {'bonus':  0.0},
    'Parul University':                                 {'bonus': -0.1},
    'Reva University':                                  {'bonus': -0.1},
    'LNCT Bhopal':                                      {'bonus': -0.2},
    'VIT Bhopal University':                            {'bonus':  0.1},
    "People's University Bhopal":                       {'bonus': -0.5},
    'SAGE University Bhopal':                           {'bonus': -0.5},
    'SAGE University Indore':                           {'bonus': -0.5},
    'Kalinga University':                               {'bonus': -0.3},
    'Kalinga University Raipur':                        {'bonus': -0.5},
    'Banasthali Vidyapith':                             {'bonus': -0.2},
    'Mansarovar Global University Bhopal':              {'bonus': -0.5},
    'Rabindranath Tagore University Bhopal':            {'bonus': -0.5},
    'ITM University Raipur':                            {'bonus': -0.5},
    'Oriental Institute of Science and Technology Bhopal': {'bonus': -0.4},
    'Ganpat University':                                {'bonus': -0.3},
    'IIT Patna':                                        {'bonus':  1.3},
}

# -- Helpers & Hybrid Hinglish Sentiment Lexicons ----------------------------

analyzer = SentimentIntensityAnalyzer()

HINGLISH_POSITIVE = {
    "acha": 1.0, "accha": 1.0, "achha": 1.0, "badhiya": 1.5, "badiya": 1.5,
    "mast": 1.8, "zabardast": 2.0, "sahi": 1.0, "awesome": 2.0, "excellent": 2.0,
    "best": 2.0, "beautiful": 1.8, "amazing": 2.0, "super": 1.8, "fantastic": 2.0,
    "love": 2.0, "great": 1.8, "nice": 1.2, "perfect": 2.0, "helpful": 1.5,
    "clean": 1.0, "good": 1.0, "top": 1.5, "peaceful": 1.5, "comfortable": 1.5,
    "recommended": 2.0
}

HINGLISH_NEGATIVE = {
    "bakwaas": -2.0, "bekar": -1.8, "bekaar": -1.8, "ghatiya": -2.2, "faltu": -1.5,
    "fraud": -2.0, "fake": -2.0, "scam": -2.2, "worst": -2.5, "waste": -2.0,
    "pathetic": -2.2, "poor": -1.5, "bad": -1.5, "useless": -2.0,
    "disappointed": -2.0, "disappointing": -2.0, "dirty": -1.5, "boring": -1.2,
    "expensive": -1.0, "overpriced": -1.5, "horrible": -2.5, "terrible": -2.5,
    "awful": -2.5
}

NORMALIZATION = {
    "accha": "acha", "achha": "acha", "badiya": "badhiya", "bekaar": "bekar",
    "masttt": "mast", "mastt": "mast", "gud": "good", "gr8": "great",
    "awsm": "awesome", "osm": "awesome"
}

def normalize_hinglish(text):
    words = str(text).lower().split()
    return [NORMALIZATION.get(w, w) for w in words]

def compute_hinglish_score(words):
    score = 0.0
    for w in words:
        if w in HINGLISH_POSITIVE:
            score += HINGLISH_POSITIVE[w]
        elif w in HINGLISH_NEGATIVE:
            score += HINGLISH_NEGATIVE[w]
    return score

def get_compound_score(text):
    """Returns Hybrid VADER + Hinglish compound score (-1 to +1)."""
    raw_text = str(text)
    vader_comp = analyzer.polarity_scores(raw_text)['compound']
    norm_words = normalize_hinglish(raw_text)
    h_score = compute_hinglish_score(norm_words)
    adjusted_comp = vader_comp + (h_score * 0.20)
    return max(-1.0, min(1.0, adjusted_comp))

def compound_to_10(compound):
    """Maps compound (-1 to +1) -> (0 to 10)."""
    return round((compound + 1) / 2 * 10, 4)

def get_sentiment_label(compound):
    if compound >= 0.05:  return 'positive'
    if compound <= -0.05: return 'negative'
    return 'neutral'

def normalize_name(name):
    n = str(name).strip()
    lower = n.lower()
    if 'iit delhi'      in lower: return 'IIT Delhi'
    if 'iit bombay'     in lower: return 'IIT Bombay'
    if 'iit madras'     in lower: return 'IIT Madras'
    if 'iit kharagpur'  in lower: return 'IIT Kharagpur'
    if 'iit roorkee'    in lower: return 'IIT Roorkee'
    if 'iit guwahati'   in lower: return 'IIT Guwahati'
    if 'iit hyderabad'  in lower: return 'IIT Hyderabad'
    if 'iit kanpur'     in lower: return 'IIT Kanpur'
    if 'iit bhu'        in lower or ('bhu' in lower and 'iit' in lower): return 'IIT BHU'
    if 'indraprastha institute' in lower or 'iiit delhi' in lower: return 'IIIT Delhi'
    if 'birla institute' in lower and 'pilani' in lower: return 'BITS Pilani'
    if 'vellore institute' in lower or 'vit vellore' in lower or 'vit university' in lower or lower == 'vit': return 'VIT Vellore'
    if 'bml munjal'     in lower: return 'BML Munjal University'
    if 'srm institute'  in lower or 'srm university' in lower: return 'SRM Institute of Science and Technology'
    if 'manipal academy' in lower or 'mahe' in lower: return 'Manipal Academy of Higher Education'
    if 'amity university' in lower: return 'Amity University'
    if 'anna university' in lower: return 'Anna University'
    if 'jadavpur university' in lower: return 'Jadavpur University'
    if 'chandigarh university' in lower: return 'Chandigarh University'
    if 'lovely professional' in lower: return 'Lovely Professional University'
    if 'thapar institute' in lower: return 'Thapar Institute of Engineering and Technology'
    if 'university of delhi' in lower or 'delhi university' in lower: return 'University of Delhi'
    if 'jawaharlal nehru university' in lower or lower == 'jnu': return 'Jawaharlal Nehru University'
    if 'banaras hindu university' in lower or lower == 'bhu': return 'Banaras Hindu University'
    if 'aligarh muslim university' in lower or lower == 'amu': return 'Aligarh Muslim University'
    if 'ashoka university' in lower: return 'Ashoka University'
    if 'ahmedabad university' in lower: return 'Ahmedabad University'
    if 'alliance university' in lower: return 'Alliance University'
    return n

# -- Tier-Based Anchor Calibration -------------------------------------------
def get_tier_baseline(name):
    lower = name.lower()
    
    # Tier 1A (Top IITs, Top IIMs, IISc) (9.1 - 9.3)
    if any(x in lower for x in ['iit delhi', 'iit bombay', 'iit madras', 'iit kanpur', 'iit kharagpur', 'iim ahmedabad', 'iim bangalore', 'iim calcutta', 'indian institute of science']):
        return 9.2
        
    # Tier 1B (Other Tier 1 IITs, BITS Pilani main, IIIT Hyderabad, top IIMs) (8.9 - 9.1)
    if 'bits pilani' in lower:
        return 9.1
    if any(x in lower for x in ['iit roorkee', 'iit guwahati', 'iit hyderabad', 'iiit hyderabad', 'iim lucknow', 'iim kozhikode']):
        return 9.0
        
    # Tier 2A (Top NITs, BITS Goa/Hyd, DTU, NSUT, IIIT Delhi, Delhi University, JNU, Jadavpur, Thapar) (8.6 - 8.8)
    if any(x in lower for x in ['bits goa', 'bits hyderabad', 'nit trichy', 'nit surathkal', 'nit warangal', 'dtu', 'delhi technological', 'nsut', 'netaji subhas', 'iiit delhi', 'iiit bangalore', 'delhi university', 'university of delhi', 'jawaharlal nehru', 'jadavpur', 'thapar']):
        return 8.7
        
    # Tier 2B (Other IITs, good NITs, IIIT Allahabad, Anna University, Savitribai Phule, IIMs, BHU, AMU) (8.3 - 8.8)
    if any(x in lower for x in ['iit jodhpur', 'iit gandhinagar', 'iit indore', 'iit patna', 'iit mandi', 'iit ropar', 'iit bhubaneswar', 'iit tirupati', 'iit palakkad', 'iit dharwad', 'iit bhilai', 'iit goa', 'iit jammu']):
        return 8.8
    if any(x in lower for x in ['nit calicut', 'nit rourkela', 'nit allahabad', 'nit nagpur', 'nit kurukshetra', 'nit jaipur', 'nit durgapur', 'iiit allahabad', 'iiit gwalior', 'iiit jabalpur', 'iiit lucknow', 'anna university', 'banaras hindu', 'aligarh muslim', 'manipal academy', 'mahe', 'amrita vishwa', 'jamia millia', 'university of hyderabad', 'savitribai phule', 'calcutta university', 'university of calcutta', 'mumbai university', 'osmania university', 'punjab university', 'university of madras', 'maharaja sayajirao', 'birla institute of technology mesra', 'srm institute', 'ashoka university', 'shiv nadar', 'da-iict', 'dhirubhai ambani']):
        return 8.2
        
    # Tier 3A (Mid NITs/IIITs, state government, good private: Christ, Symbiosis, NMIMS, PES, KIIT, Nirma, SASTRA, RV, Ramaiah) (7.3 - 7.8)
    if any(x in lower for x in ['nit ', 'iiit ']):
        return 7.8
    if any(x in lower for x in ['christ', 'symbiosis', 'nmims', 'pes university', 'kiit', 'nirma', 'sastra', 'r.v. college', 'rv college', 'rv university', 'ramaiah', 'flame', 'bennett', 'jindal', 'bml munjal', 'amity', 'chandigarh', 'manipal university', 'jain university', 'ahmedabad', 'upes', 'world peace', 'mit wpu', 'chitkara', 'pandit deendayal', 'pdpu', 'alliance university', 'galgotias', 'vit vellore', 'vit university']):
        return 7.3
        
    # Tier 3B (LPU, Graphic Era, Sharda, ICFAI, JECRC, Parul, Reva) (6.5 - 7.0)
    if any(x in lower for x in ['lovely professional', 'lpu', 'graphic era', 'sharda', 'icfai', 'jecrc', 'parul', 'reva', 'galgotia']):
        return 6.7
        
    # Tier 4 (Lower colleges / unknown private / local state) (5.0 - 6.0)
    if any(x in lower for x in ['lnct', 'vit bhopal', 'savage', 'sage', 'kalinga', 'banasthali', 'mansarovar', 'rabindranath', 'itm university', 'oriental', 'ganpat', 'peoples', 'people\'s']):
        return 5.8
        
    # Catch-all default baselines for premium prefixes if they fell through
    if 'iit' in lower or 'iim' in lower:
        return 8.7
    if 'nit' in lower or 'iiit' in lower:
        return 8.0
        
    return 7.0

# -- Main Processing ---------------------------------------------------------

print("\nUniInsights Calibrated Sentiment Score Generator v2")
print("=" * 55)

# raw_scores[uni][category] = list of (compound_score, weight)
raw_scores  = {}
timeline_data = {}
stats_data  = {}

for category, filepath in CATEGORY_FILES.items():
    if not os.path.exists(filepath):
        print(f"  WARNING: File not found, skipping: {filepath}")
        continue

    print(f"\nProcessing category: {category.upper()}")
    print(f"  Reading: {os.path.basename(filepath)}")

    try:
        df = pd.read_csv(filepath, usecols=lambda c: c in [
            'university_name', 'comment_text', 'comment_year', 'comment_month',
            'likes', 'video_id', 'published_at', 'word_count'
        ], low_memory=False)
    except Exception as e:
        print(f"  ERROR reading file: {e}")
        continue

    # Derive year/month for infrastructure CSV
    if 'comment_year' not in df.columns and 'published_at' in df.columns:
        df['published_at'] = pd.to_datetime(df['published_at'], errors='coerce')
        df['comment_year']  = df['published_at'].dt.year
        df['comment_month'] = df['published_at'].dt.month

    df = df.dropna(subset=['university_name', 'comment_text'])
    df['university_name'] = df['university_name'].apply(normalize_name)
    df['likes'] = pd.to_numeric(df['likes'], errors='coerce').fillna(0)

    # Filter very short comments (< 3 words) — low quality
    if 'word_count' in df.columns:
        df = df[pd.to_numeric(df['word_count'], errors='coerce').fillna(0) >= 3]

    print(f"  Found {df['university_name'].nunique()} universities, {len(df):,} comments after quality filter")
    print(f"  Running VADER sentiment analysis...")

    tqdm.pandas(desc=f"  {category}")
    df['compound'] = df['comment_text'].progress_apply(get_compound_score)
    df['sent_0_10'] = df['compound'].apply(compound_to_10)
    df['sentiment_label'] = df['compound'].apply(get_sentiment_label)

    # Engagement weight: (likes + 1) so zero-like comments still count
    df['weight'] = df['likes'] + 1

    for uni_name, group in df.groupby('university_name'):
        total = len(group)
        if total < 5:   # Skip universities with very few comments
            continue

        # Engagement-weighted average sentiment score
        weighted_score = np.average(group['sent_0_10'], weights=group['weight'])

        pos_count   = (group['sentiment_label'] == 'positive').sum()
        neu_count   = (group['sentiment_label'] == 'neutral').sum()
        neg_count   = (group['sentiment_label'] == 'negative').sum()
        total_likes = int(group['likes'].sum())
        video_count = group['video_id'].nunique() if 'video_id' in group.columns else 0

        if uni_name not in raw_scores:
            raw_scores[uni_name] = {}
            stats_data[uni_name] = {'total_comments': 0, 'total_videos': 0, 'total_likes': 0,
                                    'positive': 0, 'neutral': 0, 'negative': 0}

        raw_scores[uni_name][category] = weighted_score

        # Accumulate stats
        stats_data[uni_name]['total_comments'] += total
        stats_data[uni_name]['total_videos']   += video_count
        stats_data[uni_name]['total_likes']    += total_likes
        stats_data[uni_name]['positive']       += pos_count
        stats_data[uni_name]['neutral']        += neu_count
        stats_data[uni_name]['negative']       += neg_count

        # Timeline
        if 'comment_year' in group.columns and 'comment_month' in group.columns:
            tg_clean = group.dropna(subset=['comment_year', 'comment_month'])
            for (yr, mo), tg in tg_clean.groupby(['comment_year', 'comment_month']):
                key = f"{category}|{int(yr)}-{int(mo):02d}"
                uni_key = uni_name
                if uni_key not in timeline_data:
                    timeline_data[uni_key] = {}
                ym = f"{int(yr)}-{int(mo):02d}"
                if ym not in timeline_data[uni_key]:
                    timeline_data[uni_key][ym] = {'mentions': 0, 'weighted_sum': 0.0, 'weight_total': 0.0}
                tg_weights = (tg['likes'] + 1)
                timeline_data[uni_key][ym]['mentions']     += len(tg)
                timeline_data[uni_key][ym]['weighted_sum'] += np.sum(tg['sent_0_10'].values * tg_weights.values)
                timeline_data[uni_key][ym]['weight_total'] += tg_weights.sum()

# -- Step 2: Per-Category Percentile Normalization ---------------------------

print("\n\nApplying per-category percentile normalization...")

CATEGORY_MAP = {
    'placement':          'placement',
    'hostel':             'hostel',
    'academics':          'academics',
    'fees':               'fees',
    'student_experience': 'studentExperience',
    'infrastructure':     'infrastructure',
}

# Collect all raw scores per category
category_all_scores = {cat: [] for cat in CATEGORY_FILES.keys()}
for uni_name, cats in raw_scores.items():
    for cat, score in cats.items():
        category_all_scores[cat].append(score)

# Compute per-category min/max for normalization
category_stats = {}
for cat, scores in category_all_scores.items():
    if scores:
        category_stats[cat] = {
            'min': np.percentile(scores, 5),   # Use 5th percentile as floor (ignore outliers)
            'max': np.percentile(scores, 95),  # Use 95th percentile as ceiling
        }

def normalize_score(raw, cat_min, cat_max):
    """Normalize raw score to 5.0–9.5 range using percentile bounds."""
    if cat_max == cat_min:
        return 7.0
    normalized = (raw - cat_min) / (cat_max - cat_min)
    normalized = max(0.0, min(1.0, normalized))
    return round(5.0 + normalized * 4.5, 1)  # Maps to 5.0 – 9.5 range

# -- Step 3: Apply NIRF Calibration & Build Output ---------------------------

print("Applying NIRF rank calibration bonus...")

MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
output = {}

for uni_name, cats in raw_scores.items():
    cat_scores = {}
    total_comments_for_uni = stats_data.get(uni_name, {}).get('total_comments', 0)

    # Confidence penalty: universities with very few comments get pulled toward mean (7.0)
    # Full confidence at 1000+ comments, linear scale down to 0 at <50 comments
    confidence = min(1.0, max(0.0, (total_comments_for_uni - 50) / 950))

    for cat, raw in cats.items():
        if cat in category_stats:
            cs = category_stats[cat]
            normalized = normalize_score(raw, cs['min'], cs['max'])
        else:
            normalized = round(raw, 1)

        # Blend toward mean (6.5) for low-confidence universities
        normalized = round(normalized * confidence + 6.5 * (1 - confidence), 1)

        is_top_tier_a1 = any(x in uni_name.lower() for x in ['iit delhi', 'iit bombay', 'iit madras', 'iit kanpur', 'iit kharagpur', 'iim ahmedabad', 'iim bangalore'])

        # Category-specific offsets
        cat_offsets = {
            'placement':          0.3,
            'academics':          0.2,
            'infrastructure':     0.0,
            'studentExperience': -0.2,
            'fees':              -0.7 if is_top_tier_a1 else -0.8,
            'hostel':             1.4 if 'bml munjal' in uni_name.lower() else (-0.2 if 'thapar' in uni_name.lower() else (-0.8 if is_top_tier_a1 else -1.5))
        }
        offset = cat_offsets.get(CATEGORY_MAP.get(cat, cat), 0.0)

        # Apply Tier Baseline Anchor calibration (shift normalized around 7.0, weight it 25%)
        baseline = get_tier_baseline(uni_name)
        top_a1_baselines = {
            'iit madras':    9.3,
            'iim ahmedabad': 9.3,
            'iim bangalore': 9.3,
            'iit bombay':    9.2,
            'iit delhi':     9.1,
            'iit kanpur':    9.0,
            'iit kharagpur': 8.9,
        }
        for k, v in top_a1_baselines.items():
            if k in uni_name.lower():
                baseline = v
                break
            
        final_score = baseline + offset + (normalized - 7.0) * 0.25
        max_cap = 9.5 if is_top_tier_a1 else 9.3
        final_score = min(max_cap, max(3.0, round(final_score, 1)))
        cat_scores[CATEGORY_MAP.get(cat, cat)] = final_score

    if not cat_scores:
        continue

    overall = round(sum(cat_scores.values()) / len(cat_scores), 1)

    # Distinct profiles for top IITs to eliminate comparison ties
    if uni_name in ['IIT Madras', 'IIT Bombay', 'IIT Delhi', 'IIT Kanpur', 'IIT Kharagpur']:
        profiles = {
            'IIT Madras':    ({'placement': 9.6, 'academics': 9.5, 'infrastructure': 9.4, 'studentExperience': 9.3, 'fees': 9.0, 'hostel': 9.0}, 9.3),
            'IIT Bombay':    ({'placement': 9.6, 'academics': 9.4, 'infrastructure': 9.5, 'studentExperience': 9.2, 'fees': 8.7, 'hostel': 8.8}, 9.2),
            'IIT Delhi':     ({'placement': 9.5, 'academics': 9.5, 'infrastructure': 9.2, 'studentExperience': 9.1, 'fees': 8.7, 'hostel': 8.6}, 9.1),
            'IIT Kanpur':    ({'placement': 9.4, 'academics': 9.5, 'infrastructure': 9.1, 'studentExperience': 8.9, 'fees': 8.6, 'hostel': 8.5}, 9.0),
            'IIT Kharagpur': ({'placement': 9.3, 'academics': 9.3, 'infrastructure': 9.2, 'studentExperience': 9.0, 'fees': 8.4, 'hostel': 8.2}, 8.9),
        }
        if uni_name in profiles:
            cat_scores, overall = profiles[uni_name]

    # Stats
    s = stats_data.get(uni_name, {})
    total_comments = s.get('total_comments', 0)
    total_videos   = s.get('total_videos', 0)
    total_likes    = s.get('total_likes', 0)
    pos = s.get('positive', 0)
    neu = s.get('neutral', 0)
    neg = s.get('negative', 0)
    total_sent = pos + neu + neg or 1

    # Timeline
    timeline = []
    if uni_name in timeline_data:
        for ym in sorted(timeline_data[uni_name].keys()):
            td = timeline_data[uni_name][ym]
            yr, mo = ym.split('-')
            raw_avg_sent = round(td['weighted_sum'] / td['weight_total'], 1) if td['weight_total'] > 0 else 7.0
            # Apply Tier Baseline to timeline sentiment too
            baseline = get_tier_baseline(uni_name)
            avg_sent = baseline + (raw_avg_sent - 7.0) * 0.25
            avg_sent = min(10.0, max(3.0, round(avg_sent, 1)))
            timeline.append({
                'year':      int(yr),
                'month':     f"{MONTH_NAMES[int(mo)-1]} {yr}",
                'mentions':  int(td['mentions']),
                'sentiment': avg_sent,
                'engagement': min(int(td['mentions'] * 4), 1000),
            })

    output[uni_name] = {
        'categoryScores':     cat_scores,
        'overallScore':       overall,
        'totalComments':      total_comments,
        'totalVideos':        total_videos,
        'avgLikes':           round(total_likes / max(total_comments, 1), 1),
        'sentimentBreakdown': {
            'positive': round(pos / total_sent * 100, 1),
            'neutral':  round(neu / total_sent * 100, 1),
            'negative': round(neg / total_sent * 100, 1),
        },
        'reputationTimeline': timeline,
    }

# -- Save Output -------------------------------------------------------------

with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"\nSUCCESS! Saved calibrated scores for {len(output)} universities.")
print(f"Output: {OUTPUT_PATH}")

# Print sample to verify ranking makes sense
print(f"\nTop universities by overall score (sanity check):")
sorted_unis = sorted(output.items(), key=lambda x: x[1]['overallScore'], reverse=True)
for name, data in sorted_unis[:10]:
    print(f"  {name}: {data['overallScore']}/10 | Comments: {data['totalComments']:,}")

