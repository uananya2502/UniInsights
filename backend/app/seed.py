"""
Seed data generator for UniInsights.
Populates precomputed YouTube social analytics for popular universities.
"""
from sqlalchemy.orm import Session
from .database import Base, engine, SessionLocal
from .models import (
    University, Video, Comment, SentimentAggregate,
    Topic, CommunityDetection, NetworkGraph, Engagement,
    ForecastTimeline, Comparison
)
from datetime import datetime

UNIVERSITIES_DATA = [
    {
        "id": "kiit",
        "name": "KIIT University",
        "slug": "kiit-university",
        "location": "Bhubaneswar, Odisha",
        "description": "Kalinga Institute of Industrial Technology, deemed university known for CSE placements, sprawling infrastructure, and vibrant international campus culture.",
        "established_year": 1992,
        "total_students": "40,000+",
        "snapshot": "Based on 18,400 YouTube comments and 320 videos, students generally appreciate KIIT's campus life, modern sports complex, and CSE placements. However, hostel food quality, strict evening curfews, and fee transparency are recurring concerns in student discussions.",
        "report_card": {
            "placements": "A-",
            "faculty": "A",
            "infrastructure": "A+",
            "hostel": "B",
            "campus_life": "A+",
            "student_satisfaction": "A-"
        },
        "strengths": ["Campus Life & Fest (Kriti)", "CSE Placements & Mass Recruiters", "State-of-the-Art Sports Complex"],
        "concerns": ["Hostel Food Quality", "High Tuition & Miscellaneous Fees", "Strict Attendance & Evening Curfew"],
        "best_for": ["Coding", "Campus Life", "Placements", "Clubs"]
    },
    {
        "id": "srm",
        "name": "SRM Institute of Science and Technology",
        "slug": "srm-ist-kattankulathur",
        "location": "Kattankulathur, Tamil Nadu",
        "description": "Premier private institution renowned for engineering programs, tech fests, global exposure, and diverse student body.",
        "established_year": 1985,
        "total_students": "50,000+",
        "snapshot": "Based on 24,100 YouTube comments and 410 videos, SRM is highly rated for global exposure, active student clubs, and tech events like Milan. Key concerns highlight high living expenses, competitive CSE cohort sizes, and language barrier for north Indian students.",
        "report_card": {
            "placements": "A-",
            "faculty": "B+",
            "infrastructure": "A",
            "hostel": "B-",
            "campus_life": "A+",
            "student_satisfaction": "B+"
        },
        "strengths": ["International Exchange Programs", "Milan Tech Fest & Clubs", "Massive Placement Drives"],
        "concerns": ["Overcrowded Batches in CSE", "High Campus Mess & Room Costs", "Strict Mess Timing Rules"],
        "best_for": ["Global Exposure", "Clubs", "Placements", "Coding"]
    },
    {
        "id": "iit-bombay",
        "name": "IIT Bombay",
        "slug": "iit-bombay",
        "location": "Powai, Mumbai, Maharashtra",
        "description": "Top-ranked institute of national importance famous for cutting-edge research, alumni network, Mood Indigo, and exceptional placements.",
        "established_year": 1958,
        "total_students": "12,000+",
        "snapshot": "Based on 42,500 YouTube comments and 650 videos, IIT Bombay receives overwhelming praise for stellar placements, peer group quality, and Mood Indigo. Concerns mostly center around academic pressure, competitive stress, and aging hostel infrastructure in older hostels.",
        "report_card": {
            "placements": "A+",
            "faculty": "A+",
            "infrastructure": "A",
            "hostel": "B+",
            "campus_life": "A+",
            "student_satisfaction": "A"
        },
        "strengths": ["World-Class Research & Faculty", "Highest Domestic & International Salary Packages", "Mood Indigo & Techfest"],
        "concerns": ["Academic Rigor & Competition Stress", "Older Hostel Renovation Work", "Relative Grading Pressure"],
        "best_for": ["Research", "Coding", "Placements", "Clubs"]
    },
    {
        "id": "iit-madras",
        "name": "IIT Madras",
        "slug": "iit-madras",
        "location": "Chennai, Tamil Nadu",
        "description": "Ranked #1 overall in NIRF for multiple consecutive years, pioneer in deep-tech innovation, research parks, and BS Data Science online degree.",
        "established_year": 1959,
        "total_students": "11,000+",
        "snapshot": "Based on 35,200 YouTube comments and 520 videos, IIT Madras is acclaimed for research output, startup incubation (IITM Research Park), and pristine green campus. Discussions highlight intense workload and challenging semester exams.",
        "report_card": {
            "placements": "A+",
            "faculty": "A+",
            "infrastructure": "A+",
            "hostel": "A-",
            "campus_life": "A",
            "student_satisfaction": "A"
        },
        "strengths": ["NIRF #1 Research Excellence", "Pioneering IITM Research Park", "High Startup Incubation Funding"],
        "concerns": ["Rigorous Curriculum Workload", "Humid Weather Conditions", "High Academic Benchmarks"],
        "best_for": ["Research", "Coding", "Placements"]
    },
    {
        "id": "lpu",
        "name": "Lovely Professional University",
        "slug": "lpu-punjab",
        "location": "Phagwara, Punjab",
        "description": "One of India's largest single-campus private universities with ultra-modern infrastructure, diversity, and massive campus drives.",
        "established_year": 2005,
        "total_students": "35,000+",
        "snapshot": "Based on 29,800 YouTube comments and 480 videos, LPU is celebrated for colossal campus infrastructure, mall-like UniMall, and celebrity visits. Concerns focus on strict 75% attendance policy and wide variance in salary packages across branches.",
        "report_card": {
            "placements": "B+",
            "faculty": "B",
            "infrastructure": "A+",
            "hostel": "B+",
            "campus_life": "A",
            "student_satisfaction": "B+"
        },
        "strengths": ["World-Class Campus & UniMall", "Extensive Sports Facilities", "Mass Recruitment Drives"],
        "concerns": ["Strict 75% Attendance Enforcement", "Variable Package Distribution", "Large Student Population"],
        "best_for": ["Campus Life", "Clubs", "Placements"]
    },
    {
        "id": "bml-munjal",
        "name": "BML Munjal University",
        "slug": "bml-munjal-gurugram",
        "location": "Gurugram, Haryana",
        "description": "Hero Group mentored university focusing on experiential learning, industry immersion, and small batch sizes.",
        "established_year": 2014,
        "total_students": "4,500+",
        "snapshot": "Based on 8,900 YouTube comments and 140 videos, BML Munjal is praised for small student-to-faculty ratio, modern hostels, and Hero Group industry ties. Discussions note growing alumni network as a evolving factor.",
        "report_card": {
            "placements": "B+",
            "faculty": "A-",
            "infrastructure": "A",
            "hostel": "A",
            "campus_life": "B+",
            "student_satisfaction": "A-"
        },
        "strengths": ["Hero Group Industry Mentorship", "Premium Hostel & Dining Facilities", "Experiential Learning Labs"],
        "concerns": ["Higher Tuition Fee Structure", "Developing Alumni Network", "Location Distance from City Center"],
        "best_for": ["Research", "Campus Life", "Coding"]
    }
]

RAG_COMMENTS_DATA = {
    "kiit": [
        {"id": "c1", "author": "Rohan (CSE '24)", "text": "The coding culture in KIIT is super active! We have Society of Computer Scientists and regular hackathons. CSE placements touch 90%+ if you keep CGPA above 8.0.", "likes": 3420, "video": "KIIT Honest Review 2024 - Real Truth", "video_url": "https://youtube.com/watch?v=kiit_sample1", "sentiment": "positive", "score": 0.91},
        {"id": "c2", "author": "Priya Sharma", "text": "Hostel rooms in Kings Palace are modern with attached washrooms, but mess food is average. Food quality in North mess varies every few weeks.", "likes": 1890, "video": "KIIT Hostel Life & Food Vlog", "video_url": "https://youtube.com/watch?v=kiit_sample2", "sentiment": "neutral", "score": 0.15},
        {"id": "c3", "author": "Aman Verma", "text": "Placements for CSE/IT are solid with companies like HighRadius, Deloitte, Amazon, and Accenture. Non-tech branches have fewer options though.", "likes": 1250, "video": "KIIT Placement Reality Check", "video_url": "https://youtube.com/watch?v=kiit_sample3", "sentiment": "positive", "score": 0.82},
        {"id": "c4", "author": "Subhashree N.", "text": "Attendance is strictly 75%. If you fall below 70%, they issue admit card hold letters. Keep track of your attendance on the KIIT SAP portal!", "likes": 980, "video": "KIIT Rules & Campus Secrets", "video_url": "https://youtube.com/watch?v=kiit_sample4", "sentiment": "negative", "score": -0.65},
        {"id": "c5", "author": "Tanmay Tech", "text": "Campus life is unparalleled! The Kriti fest, sports complex, indoor swimming pool, and wifi across campus make college life very enjoyable.", "likes": 2750, "video": "KIIT Campus Tour 4K", "video_url": "https://youtube.com/watch?v=kiit_sample5", "sentiment": "positive", "score": 0.95}
    ],
    "srm": [
        {"id": "s1", "author": "Vikram Adityan", "text": "SRM Kattankulathur campus is huge! High-speed WiFi and incredible lab infrastructure. Placements for CS are plentiful if you stand out.", "likes": 2410, "video": "SRM KTR Life - Worth It?", "video_url": "https://youtube.com/watch?v=srm_sample1", "sentiment": "positive", "score": 0.88},
        {"id": "s2", "author": "Neha Gupta", "text": "Mess food in M-Block hostel is hit or miss. Dosa days are great, but lunch curry needs improvement.", "likes": 1120, "video": "SRM Hostel & Food Experience", "video_url": "https://youtube.com/watch?v=srm_sample2", "sentiment": "negative", "score": -0.42}
    ]
}

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # Check if seeded already
        if db.query(University).filter_by(id="kiit").first():
            return

        for udata in UNIVERSITIES_DATA:
            univ = University(
                id=udata["id"],
                name=udata["name"],
                slug=udata["slug"],
                location=udata["location"],
                description=udata["description"],
                established_year=udata["established_year"],
                total_students=udata["total_students"]
            )
            db.add(univ)

            # Add sentiment aggregate
            sent_agg = SentimentAggregate(
                university_id=udata["id"],
                overall_sentiment="Positive" if "A" in udata["report_card"]["placements"] else "Neutral",
                sentiment_score=0.74 if udata["id"] in ["kiit", "iit-bombay", "iit-madras"] else 0.62,
                positive_pct=68.5,
                neutral_pct=21.0,
                negative_pct=10.5,
                total_videos=320 if udata["id"] == "kiit" else 410,
                total_comments=18400 if udata["id"] == "kiit" else 24100,
                discussion_period="2023 - 2026"
            )
            db.add(sent_agg)

            # Add topics
            topics = [
                Topic(university_id=udata["id"], topic_name="Placements", volume=5400, sentiment="positive", trend_direction="up", percentage_change=14.2),
                Topic(university_id=udata["id"], topic_name="Hostel & Mess", volume=3800, sentiment="negative", trend_direction="down", percentage_change=-6.8),
                Topic(university_id=udata["id"], topic_name="Faculty & Teaching", volume=2900, sentiment="positive", trend_direction="stable", percentage_change=1.5),
                Topic(university_id=udata["id"], topic_name="Campus Life & Fests", volume=4200, sentiment="positive", trend_direction="up", percentage_change=18.0),
                Topic(university_id=udata["id"], topic_name="Fees & Transparency", volume=2100, sentiment="negative", trend_direction="up", percentage_change=8.4)
            ]
            db.add_all(topics)

            # Add Community Detection Clusters
            cd1 = CommunityDetection(
                university_id=udata["id"],
                cluster_id=1,
                cluster_name="CSE Placement & Coding Enthusiasts",
                member_count=7400,
                dominant_sentiment="positive",
                key_phrases=["HighRadius", "Mass Recruiters", "Coding Club", "Hackathons", "8.0+ CGPA"]
            )
            cd2 = CommunityDetection(
                university_id=udata["id"],
                cluster_id=2,
                cluster_name="Hostel Living & Mess Quality Critics",
                member_count=4200,
                dominant_sentiment="negative",
                key_phrases=["Mess Menu", "Night Curfew", "Laundry Service", "WiFi Speed", "AC Hostel Fee"]
            )
            db.add_all([cd1, cd2])

            # Add Network Graph
            net = NetworkGraph(
                university_id=udata["id"],
                nodes_json=[
                    {"id": "Placements", "group": 1, "size": 30},
                    {"id": "CSE", "group": 1, "size": 25},
                    {"id": "Hostels", "group": 2, "size": 20},
                    {"id": "Food Quality", "group": 2, "size": 18},
                    {"id": "Campus Life", "group": 3, "size": 28},
                    {"id": "Fests", "group": 3, "size": 22},
                    {"id": "Attendance Rules", "group": 4, "size": 15}
                ],
                edges_json=[
                    {"source": "Placements", "target": "CSE", "weight": 8},
                    {"source": "Hostels", "target": "Food Quality", "weight": 9},
                    {"source": "Campus Life", "target": "Fests", "weight": 7},
                    {"source": "CSE", "target": "Campus Life", "weight": 4},
                    {"source": "Hostels", "target": "Attendance Rules", "weight": 5}
                ]
            )
            db.add(net)

            # Add Engagement
            for month in ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025"]:
                eng = Engagement(
                    university_id=udata["id"],
                    month=month,
                    comment_volume=1200 + (hash(month) % 600),
                    avg_likes=42.5,
                    positive_ratio=0.72
                )
                db.add(eng)

            # Add Forecast Timeline
            f23 = ForecastTimeline(university_id=udata["id"], year=2023, major_topic="Post-Pandemic Hybrid Classes & Placements", overall_sentiment="Positive", most_discussed_event="Campus reopening & record campus placement drives", sentiment_index=0.68)
            f24 = ForecastTimeline(university_id=udata["id"], year=2024, major_topic="Hostel Upgrades & Tech Fest Revival", overall_sentiment="Positive", most_discussed_event="Annual Tech Fest & Campus Hackathon with 3,000+ coders", sentiment_index=0.75)
            f25 = ForecastTimeline(university_id=udata["id"], year=2025, major_topic="AI Curriculum Integration & Placement Audits", overall_sentiment="Positive", most_discussed_event="Introduction of mandatory AI labs & industry tech partnerships", sentiment_index=0.79)
            f26 = ForecastTimeline(university_id=udata["id"], year=2026, major_topic="Infrastructure Expansion & Global Exchanges", overall_sentiment="Positive", most_discussed_event="Inauguration of new AI Research Center & Sports Arena", sentiment_index=0.82)
            db.add_all([f23, f24, f25, f26])

            # Seed RAG comments & videos
            sample_comments = RAG_COMMENTS_DATA.get(udata["id"], RAG_COMMENTS_DATA["kiit"])
            for idx, c in enumerate(sample_comments):
                v_id = f"vid_{udata['id']}_{idx}"
                v_exists = db.query(Video).filter_by(id=v_id).first()
                if not v_exists:
                    vid = Video(
                        id=v_id,
                        university_id=udata["id"],
                        title=c["video"],
                        url=c["video_url"],
                        channel_name="EduVlog Senior Insights",
                        view_count=45000,
                        comment_count=320
                    )
                    db.add(vid)

                comm = Comment(
                    id=f"c_{udata['id']}_{idx}",
                    video_id=v_id,
                    university_id=udata["id"],
                    author=c["author"],
                    text=c["text"],
                    likes=c["likes"],
                    sentiment=c["sentiment"],
                    sentiment_score=c["score"]
                )
                db.add(comm)

        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
