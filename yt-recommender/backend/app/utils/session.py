from datetime import datetime, timedelta
from typing import Optional, Dict
from bson import ObjectId
import app.services.mongo_client as mongodb
from app.models.models import USER_COLLECTION


class SessionManager:
    """Manage user sessions and track active sessions."""
    
    def __init__(self):
        self._active_sessions: Dict[str, datetime] = {}
    
    async def create_session(self, user_id: str) -> str:
        """
        Create a new session for a user.
        
        Args:
            user_id: The user's ID
            
        Returns:
            Session ID (same as user_id for simplicity)
        """
        self._active_sessions[user_id] = datetime.utcnow()
        return user_id
    
    async def validate_session(self, user_id: str) -> bool:
        """
        Validate if a session is still active.
        
        Args:
            user_id: The user's ID
            
        Returns:
            True if session is valid, False otherwise
        """
        if user_id not in self._active_sessions:
            return False
        
        # Check if user still exists in database
        try:
            user = await mongodb.get_db()[USER_COLLECTION].find_one(
                {"_id": ObjectId(user_id)}
            )
            return user is not None and user.get("is_active", True)
        except Exception:
            return False
    
    async def refresh_session(self, user_id: str):
        """
        Refresh a user's session timestamp.
        
        Args:
            user_id: The user's ID
        """
        if user_id in self._active_sessions:
            self._active_sessions[user_id] = datetime.utcnow()
    
    async def end_session(self, user_id: str):
        """
        End a user's session.
        
        Args:
            user_id: The user's ID
        """
        if user_id in self._active_sessions:
            del self._active_sessions[user_id]
    
    async def cleanup_expired_sessions(self, max_age_hours: int = 24):
        """
        Remove sessions older than max_age_hours.
        
        Args:
            max_age_hours: Maximum age of sessions in hours
        """
        cutoff = datetime.utcnow() - timedelta(hours=max_age_hours)
        expired = [
            user_id for user_id, timestamp in self._active_sessions.items()
            if timestamp < cutoff
        ]
        for user_id in expired:
            del self._active_sessions[user_id]
    
    def get_active_session_count(self) -> int:
        """Get the number of active sessions."""
        return len(self._active_sessions)


# Global session manager instance
session_manager = SessionManager()
