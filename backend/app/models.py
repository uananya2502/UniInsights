from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class University(Base):
    __tablename__ = "universities"

    id = Column(String(50), primary_key=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    location = Column(String(255), nullable=False)
    description = Column(Text)
    established_year = Column(Integer)
    total_students = Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)

    videos = relationship("Video", back_populates="university", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="university", cascade="all, delete-orphan")


class Video(Base):
    __tablename__ = "videos"

    id = Column(String(100), primary_key=True)
    university_id = Column(String(50), ForeignKey("universities.id", ondelete="CASCADE"))
    title = Column(String(500), nullable=False)
    url = Column(Text, nullable=False)
    channel_name = Column(String(255))
    view_count = Column(Integer, default=0)
    comment_count = Column(Integer, default=0)
    published_at = Column(DateTime, default=datetime.utcnow)

    university = relationship("University", back_populates="videos")
    comments = relationship("Comment", back_populates="video", cascade="all, delete-orphan")


class Comment(Base):
    __tablename__ = "comments"

    id = Column(String(100), primary_key=True)
    video_id = Column(String(100), ForeignKey("videos.id", ondelete="CASCADE"))
    university_id = Column(String(50), ForeignKey("universities.id", ondelete="CASCADE"))
    author = Column(String(255))
    text = Column(Text, nullable=False)
    likes = Column(Integer, default=0)
    sentiment = Column(String(20)) # 'positive', 'neutral', 'negative'
    sentiment_score = Column(Float, default=0.0)
    published_at = Column(DateTime, default=datetime.utcnow)

    university = relationship("University", back_populates="comments")
    video = relationship("Video", back_populates="comments")


class SentimentAggregate(Base):
    __tablename__ = "sentiment"

    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(String(50), ForeignKey("universities.id", ondelete="CASCADE"))
    overall_sentiment = Column(String(20))
    sentiment_score = Column(Float)
    positive_pct = Column(Float)
    neutral_pct = Column(Float)
    negative_pct = Column(Float)
    total_videos = Column(Integer)
    total_comments = Column(Integer)
    discussion_period = Column(String(100))


class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(String(50), ForeignKey("universities.id", ondelete="CASCADE"))
    topic_name = Column(String(100), nullable=False)
    volume = Column(Integer, default=0)
    sentiment = Column(String(20))
    trend_direction = Column(String(10)) # 'up', 'down', 'stable'
    percentage_change = Column(Float, default=0.0)


class CommunityDetection(Base):
    __tablename__ = "community_detection"

    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(String(50), ForeignKey("universities.id", ondelete="CASCADE"))
    cluster_id = Column(Integer, nullable=False)
    cluster_name = Column(String(100), nullable=False)
    member_count = Column(Integer, default=0)
    dominant_sentiment = Column(String(20))
    key_phrases = Column(JSON) # JSON array of phrases


class NetworkGraph(Base):
    __tablename__ = "network"

    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(String(50), ForeignKey("universities.id", ondelete="CASCADE"))
    nodes_json = Column(JSON, nullable=False)
    edges_json = Column(JSON, nullable=False)


class Engagement(Base):
    __tablename__ = "engagement"

    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(String(50), ForeignKey("universities.id", ondelete="CASCADE"))
    month = Column(String(20), nullable=False)
    comment_volume = Column(Integer, default=0)
    avg_likes = Column(Float, default=0.0)
    positive_ratio = Column(Float, default=0.0)


class ForecastTimeline(Base):
    __tablename__ = "forecast"

    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(String(50), ForeignKey("universities.id", ondelete="CASCADE"))
    year = Column(Integer, nullable=False)
    major_topic = Column(String(255), nullable=False)
    overall_sentiment = Column(String(20), nullable=False)
    most_discussed_event = Column(Text, nullable=False)
    sentiment_index = Column(Float, default=0.0)


class Comparison(Base):
    __tablename__ = "comparison"

    id = Column(Integer, primary_key=True, index=True)
    univ_a_id = Column(String(50), ForeignKey("universities.id", ondelete="CASCADE"))
    univ_b_id = Column(String(50), ForeignKey("universities.id", ondelete="CASCADE"))
    radar_data = Column(JSON, nullable=False)
