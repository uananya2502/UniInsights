from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import (
    University, SentimentAggregate, Topic,
    CommunityDetection, NetworkGraph, Engagement,
    ForecastTimeline, Comment, Video, Comparison
)
from ..seed import UNIVERSITIES_DATA, RAG_COMMENTS_DATA

router = APIRouter(prefix="/api/universities", tags=["Universities"])

@router.get("")
def get_all_universities(db: Session = Depends(get_db)):
    univs = db.query(University).all()
    if not univs:
        # Fallback to in-memory seed list if db query is empty
        return [
            {
                "id": u["id"],
                "name": u["name"],
                "slug": u["slug"],
                "location": u["location"],
                "description": u["description"],
                "established_year": u["established_year"],
                "total_students": u["total_students"]
            } for u in UNIVERSITIES_DATA
        ]
    return univs

@router.get("/{univ_id}")
def get_university_dashboard(univ_id: str, db: Session = Depends(get_db)):
    univ_id_clean = univ_id.lower()
    # Find matching seed profile
    seed_item = next((u for u in UNIVERSITIES_DATA if u["id"] == univ_id_clean or u["slug"] == univ_id_clean), None)
    if not seed_item:
        seed_item = UNIVERSITIES_DATA[0] # Default fallback to KIIT if not found

    # Query aggregates from DB
    sent = db.query(SentimentAggregate).filter_by(university_id=seed_item["id"]).first()
    topics = db.query(Topic).filter_by(university_id=seed_item["id"]).all()
    community = db.query(CommunityDetection).filter_by(university_id=seed_item["id"]).all()
    network = db.query(NetworkGraph).filter_by(university_id=seed_item["id"]).first()
    forecast = db.query(ForecastTimeline).filter_by(university_id=seed_item["id"]).order_by(ForecastTimeline.year.asc()).all()
    engagement = db.query(Engagement).filter_by(university_id=seed_item["id"]).all()

    top_comments = RAG_COMMENTS_DATA.get(seed_item["id"], RAG_COMMENTS_DATA["kiit"])

    return {
        "university": {
            "id": seed_item["id"],
            "name": seed_item["name"],
            "slug": seed_item["slug"],
            "location": seed_item["location"],
            "description": seed_item["description"],
            "established_year": seed_item["established_year"],
            "total_students": seed_item["total_students"]
        },
        "snapshot": {
            "text": seed_item["snapshot"],
            "overall_sentiment": sent.overall_sentiment if sent else "Positive",
            "total_videos": sent.total_videos if sent else 320,
            "total_comments": sent.total_comments if sent else 18400,
            "discussion_period": sent.discussion_period if sent else "2023 - 2026",
            "positive_pct": sent.positive_pct if sent else 68.5,
            "neutral_pct": sent.neutral_pct if sent else 21.0,
            "negative_pct": sent.negative_pct if sent else 10.5
        },
        "report_card": seed_item["report_card"],
        "strengths": seed_item["strengths"],
        "concerns": seed_item["concerns"],
        "best_for": seed_item["best_for"],
        "topics": [
            {
                "name": t.topic_name,
                "volume": t.volume,
                "sentiment": t.sentiment,
                "trend": t.trend_direction,
                "change": t.percentage_change
            } for t in topics
        ] if topics else [
            {"name": "Placements", "volume": 5400, "sentiment": "positive", "trend": "up", "change": 14.2},
            {"name": "Hostel & Mess", "volume": 3800, "sentiment": "negative", "trend": "down", "change": -6.8},
            {"name": "Faculty", "volume": 2900, "sentiment": "positive", "trend": "stable", "change": 1.5},
            {"name": "Campus Life", "volume": 4200, "sentiment": "positive", "trend": "up", "change": 18.0}
        ],
        "top_student_voices": top_comments,
        "timeline": [
            {
                "year": f.year,
                "major_topic": f.major_topic,
                "overall_sentiment": f.overall_sentiment,
                "most_discussed_event": f.most_discussed_event,
                "sentiment_index": f.sentiment_index
            } for f in forecast
        ] if forecast else [
            {"year": 2023, "major_topic": "Post-Pandemic Placements", "overall_sentiment": "Positive", "most_discussed_event": "Record campus placement drives"},
            {"year": 2024, "major_topic": "Tech Fest Revival", "overall_sentiment": "Positive", "most_discussed_event": "Annual Tech Fest with 3000+ coders"},
            {"year": 2025, "major_topic": "AI Curriculum Integration", "overall_sentiment": "Positive", "most_discussed_event": "Mandatory AI labs launched"},
            {"year": 2026, "major_topic": "Infrastructure Expansion", "overall_sentiment": "Positive", "most_discussed_event": "Inauguration of modern sports complex"}
        ],
        "community_detection": [
            {
                "cluster_name": c.cluster_name,
                "member_count": c.member_count,
                "dominant_sentiment": c.dominant_sentiment,
                "key_phrases": c.key_phrases
            } for c in community
        ] if community else [],
        "network": {
            "nodes": network.nodes_json if network else [],
            "edges": network.edges_json if network else []
        }
    }

@router.get("/compare/head-to-head")
def compare_universities(
    univ_a: str = Query("kiit", description="First University ID"),
    univ_b: str = Query("srm", description="Second University ID"),
    db: Session = Depends(get_db)
):
    a_data = next((u for u in UNIVERSITIES_DATA if u["id"] == univ_a.lower()), UNIVERSITIES_DATA[0])
    b_data = next((u for u in UNIVERSITIES_DATA if u["id"] == univ_b.lower()), UNIVERSITIES_DATA[1])

    def grade_to_score(grade: str) -> int:
        mapping = {"A+": 95, "A": 90, "A-": 85, "B+": 80, "B": 75, "B-": 70, "C+": 65, "C": 60}
        return mapping.get(grade, 75)

    radar_metrics = [
        {"subject": "Placements", "A": grade_to_score(a_data["report_card"]["placements"]), "B": grade_to_score(b_data["report_card"]["placements"]), "fullMark": 100},
        {"subject": "Faculty", "A": grade_to_score(a_data["report_card"]["faculty"]), "B": grade_to_score(b_data["report_card"]["faculty"]), "fullMark": 100},
        {"subject": "Infrastructure", "A": grade_to_score(a_data["report_card"]["infrastructure"]), "B": grade_to_score(b_data["report_card"]["infrastructure"]), "fullMark": 100},
        {"subject": "Hostel", "A": grade_to_score(a_data["report_card"]["hostel"]), "B": grade_to_score(b_data["report_card"]["hostel"]), "fullMark": 100},
        {"subject": "Campus Life", "A": grade_to_score(a_data["report_card"]["campus_life"]), "B": grade_to_score(b_data["report_card"]["campus_life"]), "fullMark": 100},
        {"subject": "Satisfaction", "A": grade_to_score(a_data["report_card"]["student_satisfaction"]), "B": grade_to_score(b_data["report_card"]["student_satisfaction"]), "fullMark": 100}
    ]

    return {
        "univ_a": {
            "id": a_data["id"],
            "name": a_data["name"],
            "location": a_data["location"],
            "report_card": a_data["report_card"],
            "strengths": a_data["strengths"],
            "concerns": a_data["concerns"]
        },
        "univ_b": {
            "id": b_data["id"],
            "name": b_data["name"],
            "location": b_data["location"],
            "report_card": b_data["report_card"],
            "strengths": b_data["strengths"],
            "concerns": b_data["concerns"]
        },
        "radar_data": radar_metrics
    }
