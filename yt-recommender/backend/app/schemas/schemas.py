from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any

class SubmitRequest(BaseModel):
    email: EmailStr = Field(..., description="User email address")
    channelName: str = Field(..., description="YouTube channel name or handle")
    services: List[str] = Field(default_factory=list, description="Optional list of extra services")

class VideoInfo(BaseModel):
    title: str
    description: str
    url: str
    statistics: Dict[str, Any]

class JobStatusResponse(BaseModel):
    job_id: str = Field(..., alias="jobId")
    status: str = Field(..., description="Current job status, e.g., queued, channel_resolved, videos_fetched, completed, failed")
    error: Optional[str] = None
    channelId: Optional[str] = None
    channelName: Optional[str] = None
    videos: Optional[List[VideoInfo]] = None
    aiReport: Optional[Dict[str, Any]] = None  # Changed from str to Dict to support structured analysis


# Authentication Schemas
class UserRegister(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=30)
    password: str = Field(..., min_length=8)
    full_name: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    user_id: str
    email: str
    username: str
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    phone_number: Optional[str] = None
    location: Optional[str] = None
    channel_url: Optional[str] = None
    content_niche: Optional[str] = None
    plan: str
    credits_used: int
    credits_limit: int
    is_verified: bool


class TokenResponse(BaseModel):
    token: str
    user: UserResponse


class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    username: Optional[str] = Field(None, min_length=3, max_length=30)
    phone_number: Optional[str] = None
    location: Optional[str] = None
    channel_url: Optional[str] = None
    content_niche: Optional[str] = None
