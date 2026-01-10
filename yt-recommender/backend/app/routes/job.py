from fastapi import APIRouter, BackgroundTasks, HTTPException
from uuid import uuid4
from app.schemas.schemas import SubmitRequest, JobStatusResponse
from app.services.mongo_client import create_job, get_job, update_job, get_user_by_email, update_user
from app.core.worker import process_job

router = APIRouter(tags=["Submit Job"])

@router.post("/submit", response_model=dict, status_code=202)
async def submit_job(request: SubmitRequest, background: BackgroundTasks):
    # Create initial job document
    try:
        job_doc = {
            "email": request.email,
            "channel_name": request.channelName,
            "services": request.services,
            "status": "queued",
            "created_at": None,
            "updated_at": None,
        }
        job_id = await create_job(job_doc)
        
        # Update user's job counters
        user = await get_user_by_email(request.email)
        if user:
            await update_user(user["_id"], {
                "$inc": {"total_jobs": 1, "active_jobs": 1},
                "$push": {"job_ids": job_id}
            })
        
        # Kick off background processing
        background.add_task(process_job, job_id)
        return {"jobId": job_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create job: {str(e)}")

@router.get("/job/{job_id}", response_model=JobStatusResponse)
async def get_job_status(job_id: str):
    try:
        job = await get_job(job_id)
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        return {
            "jobId": job_id,
            "status": job.get("status"),
            "error": job.get("error"),
            "channelId": job.get("channel_id"),
            "channelName": job.get("channel_name"),
            "videos": job.get("videos"),
            "aiReport": job.get("ai_report"),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get job status: {str(e)}")
