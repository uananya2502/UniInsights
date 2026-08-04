from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/news", tags=["Education News"])

class NewsArticle(BaseModel):
    id: str
    headline: str
    summary: str
    source: str
    published_date: str
    category: str
    url: str

MOCK_EDUCATION_NEWS = [
    {
        "id": "news_1",
        "headline": "UGC Releases Updated Guidelines for AI and Cyber Security Degrees in Indian Universities",
        "summary": "The University Grants Commission (UGC) has issued new frameworks incorporating practical AI labs, hands-on internships, and industry certification into undergraduate Computer Science curricula.",
        "source": "Education Times",
        "published_date": "2026-08-01",
        "category": "Curriculum",
        "url": "https://ugc.gov.in/news/ai-cybersecurity-guidelines"
    },
    {
        "id": "news_2",
        "headline": "NIRF 2026 Engineering Rankings: IIT Madras and IIT Bombay Retain Top Spots",
        "summary": "The Ministry of Education released the NIRF 2026 Rankings, highlighting research output, graduation outcome, and campus diversity as key differentiating factors.",
        "source": "The Indian Express",
        "published_date": "2026-07-28",
        "category": "Rankings",
        "url": "https://indianexpress.com/education/nirf-rankings-2026"
    },
    {
        "id": "news_3",
        "headline": "Tech Hiring Rebounds: Tier-1 & Tier-2 Engineering Colleges Report 25% Increase in Pre-Placement Offers",
        "summary": "Core tech firms and global capability centers (GCCs) have scaled up early campus hiring, focusing heavily on full-stack development, cloud computing, and AI engineering.",
        "source": "Economic Times Tech",
        "published_date": "2026-07-25",
        "category": "Placements",
        "url": "https://economictimes.indiatimes.com/tech/pors-2026"
    },
    {
        "id": "news_4",
        "headline": "National Entrance Exams (JEE Main & GATE) to Feature Adaptive Computer-Based Testing",
        "summary": "Testing agencies announce modernized examination centers with enhanced digital security, real-time analytics, and faster scorecard releases.",
        "source": "NDTV Education",
        "published_date": "2026-07-20",
        "category": "Admissions",
        "url": "https://ndtv.com/education/jee-gate-testing-updates"
    }
]

@router.get("", response_model=List[NewsArticle])
def get_education_news():
    return MOCK_EDUCATION_NEWS
