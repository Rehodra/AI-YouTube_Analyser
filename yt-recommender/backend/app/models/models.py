from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

# Collection names
USER_COLLECTION = "users"
JOB_COLLECTION = "jobs"



class JobDocument(BaseModel):
    job_id: str = Field(..., alias="_id")
    email: str
    channel_name: Optional[str] = None
    channel_id: Optional[str] = None
    services: List[str] = []
    status: str = "queued"
    error: Optional[str] = None
    videos: Optional[List[Dict[str, Any]]] = None
    ai_report: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class UserDocument(BaseModel):
    user_id: str = Field(..., alias="_id")
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    password_hash: Optional[str] = None  # Optional for OAuth users
    
    # Profile
    avatar_url: Optional[str] = None
    avatar_public_id: Optional[str] = None  # For Cloudinary management
    
    # Extended Profile
    phone_number: Optional[str] = None
    location: Optional[str] = None
    channel_url: Optional[str] = None
    content_niche: Optional[str] = None
    
    # OAuth
    oauth_provider: Optional[str] = None  # "google", "github", etc.
    oauth_id: Optional[str] = None

    total_jobs: int = 0
    active_jobs: int = 0

    plan: str = "free"

    credits_used: int = 0
    credits_limit: int = 100

    job_ids: List[str] = []

    is_active: bool = True
    is_verified: bool = False

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
