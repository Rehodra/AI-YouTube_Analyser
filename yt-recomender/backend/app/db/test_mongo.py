import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

async def test_connection():
    uri = os.getenv("MONGODB_URI")
    db_name = "yt_recommender"
    print(f"Connecting to: {uri}")
    try:
        client = AsyncIOMotorClient(uri)
        # Check connection
        await client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        
        db = client[db_name]
        result = await db.test_collection.insert_one({"test": "data"})
        print(f"Inserted test document with ID: {result.inserted_id}")
        
        doc = await db.test_collection.find_one({"_id": result.inserted_id})
        print(f"Recovered document: {doc}")
        
        await db.test_collection.delete_one({"_id": result.inserted_id})
        print("Deleted test document.")
        
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(test_connection())
