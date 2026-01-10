from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from app.routes import job, auth, test_db

app = FastAPI(title="YT Recommender Backend")

# Add Session Middleware (required for OAuth)
app.add_middleware(
    SessionMiddleware,
    secret_key="your-secret-key-here-change-in-production",  # Change this in production
    max_age=3600,  # Session expires after 1 hour
    same_site="lax",  # Prevents CSRF attacks
    https_only=False  # Set to True in production with HTTPS
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:8000"],  # Frontend + Backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(job.router)
app.include_router(test_db.router, prefix="/api")


# Optional startup/shutdown events can be added here
