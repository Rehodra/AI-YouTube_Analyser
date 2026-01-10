import asyncio
from app.services.youtube import resolve_channel, fetch_latest_videos
from app.services.ai import analyse
from app.services.mongo_client import create_job, get_job, update_job
from uuid import uuid4

async def process_job(job_id: str):
    """Orchestrates the workflow for a given job.
    Updates the MongoDB document after each step.
    """
    # Step 1: Resolve channel
    job = await get_job(job_id)
    if not job:
        return
    try:
        channel_id = await resolve_channel(job["channel_name"])
        await update_job(job_id, {
            "channel_id": channel_id,
            "status": "channel_resolved",
            "updated_at": asyncio.get_event_loop().time(),
        })
    except Exception as e:
        await update_job(job_id, {"status": "failed", "error": str(e)})
        return

    # Step 2: Fetch videos
    try:
        videos = await fetch_latest_videos(channel_id)
        await update_job(job_id, {"videos": videos, "status": "videos_fetched"})
    except Exception as e:
        await update_job(job_id, {"status": "failed", "error": str(e)})
        return

    # Step 3: AI analysis
    try:
        # Fetch updated job to get services
        job = await get_job(job_id)
        services = job.get("services", [])
        
        report = await analyse(videos, services=services)
        await update_job(job_id, {"ai_report": report, "status": "completed"})
    except Exception as e:
        await update_job(job_id, {"status": "failed", "error": str(e)})
        return
