from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .seed import seed_database
from .routers import universities, rag_chat, news

app = FastAPI(
    title="UniInsights API",
    description="AI-Powered University Intelligence Platform Backend",
    version="1.0.0"
)

# CORS Middleware for Frontend Communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    seed_database()

app.include_router(universities.router)
app.include_router(rag_chat.router)
app.include_router(news.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "UniInsights Intelligence API",
        "tagline": "Know Your College!",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
