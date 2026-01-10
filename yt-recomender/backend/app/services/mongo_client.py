from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional, Dict, Any
from bson import ObjectId
from app.core.config import settings

# Global MongoDB client (singleton)
_client: Optional[AsyncIOMotorClient] = None


def get_client() -> AsyncIOMotorClient:
    """
    Returns a shared MongoDB client instance.
    Uses lazy initialization to avoid multiple connections.
    """
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(
            settings.mongodb_uri,
            maxPoolSize=10,
            minPoolSize=1,
            serverSelectionTimeoutMS=30000,  # 30 seconds
            socketTimeoutMS=45000,  # 45 seconds
            connectTimeoutMS=30000,  # 30 seconds
            retryWrites=True,
            retryReads=True,
        )
    return _client


def get_db():
    """
    Returns the application database.
    """
    return get_client()[settings.database_name]


async def create_job(document: Dict[str, Any]) -> str:
    """
    Inserts a job document into the jobs collection.
    Returns the inserted document ID as a string.
    """
    db = get_db()
    result = await db.jobs.insert_one(document)
    return str(result.inserted_id)


async def get_job(job_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieves a job document by its ID.
    Returns the document or None if not found.
    """
    db = get_db()
    try:
        oid = ObjectId(job_id)
    except Exception:
        return None

    job = await db.jobs.find_one({"_id": oid})
    if job:
        job["_id"] = str(job["_id"])
    return job


async def update_job(job_id: str, update_data: Dict[str, Any]) -> bool:
    """
    Updates a job document with the provided data.
    Returns True if the update was successful, False otherwise.
    """
    db = get_db()
    try:
        oid = ObjectId(job_id)
    except Exception:
        return False

    result = await db.jobs.update_one({"_id": oid}, {"$set": update_data})
    return result.modified_count > 0


async def close_client():
    """
    Closes the MongoDB client connection.
    """
    global _client
    if _client is not None:
        _client.close()
        _client = None


# User operations
async def create_user(user_data: Dict[str, Any]) -> str:
    """
    Create a new user document
    Returns the user ID as string
    """
    db = get_db()
    result = await db.users.insert_one(user_data)
    return str(result.inserted_id)


async def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    """
    Get user by email address
    Returns user document or None
    """
    db = get_db()
    user = await db.users.find_one({"email": email})
    if user:
        user["_id"] = str(user["_id"])
    return user


async def get_user_by_username(username: str) -> Optional[Dict[str, Any]]:
    """
    Get user by username
    Returns user document or None
    """
    db = get_db()
    user = await db.users.find_one({"username": username})
    if user:
        user["_id"] = str(user["_id"])
    return user


async def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    """
    Get user by ID
    Returns user document or None
    """
    db = get_db()
    try:
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if user:
            user["_id"] = str(user["_id"])
        return user
    except Exception:
        return None


async def update_user(user_id: str, update_data: Dict[str, Any]) -> bool:
    """
    Update user document
    Supports both $set operations and MongoDB operators like $inc, $push
    Returns True if successful
    """
    db = get_db()
    try:
        # If update_data contains MongoDB operators ($inc, $push, etc.), use it directly
        # Otherwise, wrap it in $set
        if any(key.startswith('$') for key in update_data.keys()):
            update_operation = update_data
        else:
            update_operation = {"$set": update_data}
            
        result = await db.users.update_one(
            {"_id": ObjectId(user_id)},
            update_operation
        )
        return result.modified_count > 0
    except Exception:
        return False


async def delete_user(user_id: str) -> bool:
    """
    Delete user document
    Returns True if successful
    """
    db = get_db()
    try:
        result = await db.users.delete_one({"_id": ObjectId(user_id)})
        return result.deleted_count > 0
    except Exception:
        return False
