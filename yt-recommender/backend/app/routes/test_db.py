from fastapi import APIRouter
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

router = APIRouter(tags=["Database Test"])

@router.get("/db-test")
async def db_test():
    """Test database connection and list all collections"""
    try:
        # Create a client and get database
        client = AsyncIOMotorClient(settings.mongodb_uri)
        db = client[settings.database_name]
        
        # Test connection
        await client.admin.command('ping')
        
        # List collections
        collections = await db.list_collection_names()
        
        return {
            "status": "connected",
            "database": settings.database_name,
            "collections": collections
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
    finally:
        client.close()
