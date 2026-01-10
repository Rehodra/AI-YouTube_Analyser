import cloudinary
import cloudinary.uploader
from app.core.config import settings
from typing import Optional

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.cloudinary_cloud_name,
    api_key=settings.cloudinary_api_key,
    api_secret=settings.cloudinary_api_secret
)


async def upload_avatar(file_content: bytes, user_id: str) -> dict:
    """
    Upload user avatar to Cloudinary
    Returns dict with url and public_id
    """
    try:
        result = cloudinary.uploader.upload(
            file_content,
            folder="avatars",
            public_id=f"user_{user_id}",
            overwrite=True,
            resource_type="image",
            transformation=[
                {"width": 400, "height": 400, "crop": "fill", "gravity": "face"},
                {"quality": "auto"},
                {"fetch_format": "auto"}
            ]
        )
        return {
            "url": result.get("secure_url"),
            "public_id": result.get("public_id")
        }
    except Exception as e:
        raise Exception(f"Failed to upload avatar: {str(e)}")


async def delete_avatar(public_id: str) -> bool:
    """
    Delete avatar from Cloudinary
    Returns True if successful
    """
    try:
        result = cloudinary.uploader.destroy(public_id)
        return result.get("result") == "ok"
    except Exception as e:
        raise Exception(f"Failed to delete avatar: {str(e)}")
