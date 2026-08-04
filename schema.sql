-- PostgreSQL Database Schema for UniInsights Intelligence Platform
-- Includes pgvector extension support for semantic RAG search

CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Universities Table
CREATE TABLE IF NOT EXISTS universities (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url TEXT,
    established_year INT,
    total_students VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Videos Table (YouTube Discussions)
CREATE TABLE IF NOT EXISTS videos (
    id VARCHAR(100) PRIMARY KEY,
    university_id VARCHAR(50) REFERENCES universities(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    url TEXT NOT NULL,
    channel_name VARCHAR(255),
    view_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE
);

-- 3. Comments Table with Vector Embeddings for RAG
CREATE TABLE IF NOT EXISTS comments (
    id VARCHAR(100) PRIMARY KEY,
    video_id VARCHAR(100) REFERENCES videos(id) ON DELETE CASCADE,
    university_id VARCHAR(50) REFERENCES universities(id) ON DELETE CASCADE,
    author VARCHAR(255),
    text TEXT NOT NULL,
    likes INT DEFAULT 0,
    sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    sentiment_score FLOAT DEFAULT 0.0,
    published_at TIMESTAMP WITH TIME ZONE,
    embedding vector(384) -- 384 dimensions for all-MiniLM-L6-v2 embeddings
);

-- 4. Sentiment Aggregates
CREATE TABLE IF NOT EXISTS sentiment (
    id SERIAL PRIMARY KEY,
    university_id VARCHAR(50) REFERENCES universities(id) ON DELETE CASCADE,
    overall_sentiment VARCHAR(20),
    sentiment_score FLOAT, -- -1.0 to 1.0
    positive_pct FLOAT,
    neutral_pct FLOAT,
    negative_pct FLOAT,
    total_videos INT,
    total_comments INT,
    discussion_period VARCHAR(100)
);

-- 5. Topics Modeling Table
CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,
    university_id VARCHAR(50) REFERENCES universities(id) ON DELETE CASCADE,
    topic_name VARCHAR(100) NOT NULL,
    volume INT DEFAULT 0,
    sentiment VARCHAR(20),
    trend_direction VARCHAR(10) CHECK (trend_direction IN ('up', 'down', 'stable')),
    percentage_change FLOAT DEFAULT 0.0
);

-- 6. Community Detection Table
CREATE TABLE IF NOT EXISTS community_detection (
    id SERIAL PRIMARY KEY,
    university_id VARCHAR(50) REFERENCES universities(id) ON DELETE CASCADE,
    cluster_id INT NOT NULL,
    cluster_name VARCHAR(100) NOT NULL,
    member_count INT DEFAULT 0,
    dominant_sentiment VARCHAR(20),
    key_phrases TEXT[]
);

-- 7. Network Graph Table (Social Discussion Network)
CREATE TABLE IF NOT EXISTS network (
    id SERIAL PRIMARY KEY,
    university_id VARCHAR(50) REFERENCES universities(id) ON DELETE CASCADE,
    nodes_json JSONB NOT NULL,
    edges_json JSONB NOT NULL
);

-- 8. Engagement & Virality Analysis
CREATE TABLE IF NOT EXISTS engagement (
    id SERIAL PRIMARY KEY,
    university_id VARCHAR(50) REFERENCES universities(id) ON DELETE CASCADE,
    month VARCHAR(20) NOT NULL,
    comment_volume INT DEFAULT 0,
    avg_likes FLOAT DEFAULT 0.0,
    positive_ratio FLOAT DEFAULT 0.0
);

-- 9. Reputation Forecasting & Timeline (2023 - 2026)
CREATE TABLE IF NOT EXISTS forecast (
    id SERIAL PRIMARY KEY,
    university_id VARCHAR(50) REFERENCES universities(id) ON DELETE CASCADE,
    year INT NOT NULL,
    major_topic VARCHAR(255) NOT NULL,
    overall_sentiment VARCHAR(20) NOT NULL,
    most_discussed_event TEXT NOT NULL,
    sentiment_index FLOAT DEFAULT 0.0
);

-- 10. University Comparison Precomputed Data
CREATE TABLE IF NOT EXISTS comparison (
    id SERIAL PRIMARY KEY,
    univ_a_id VARCHAR(50) REFERENCES universities(id) ON DELETE CASCADE,
    univ_b_id VARCHAR(50) REFERENCES universities(id) ON DELETE CASCADE,
    radar_data JSONB NOT NULL
);

-- Index for vector search performance
CREATE INDEX IF NOT EXISTS comments_embedding_idx ON comments USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
