import httpx
from typing import List, Dict, Any, Optional
from app.core.config import settings

BASE_URL = "https://www.googleapis.com/youtube/v3"

# Shared HTTP client (singleton)
_client: Optional[httpx.AsyncClient] = None


def get_http_client() -> httpx.AsyncClient:
    global _client
    if _client is None:
        _client = httpx.AsyncClient(
            base_url=BASE_URL,
            timeout=10.0
        )
    return _client


async def resolve_channel(channel_query: str) -> str:
    """
    Resolves a channel name / handle / query to a channel ID.
    """
    client = get_http_client()

    params = {
        "part": "snippet",
        "q": channel_query,
        "type": "channel",
        "maxResults": 1,
        "key": settings.youtube_api_key,
    }

    resp = await client.get("/search", params=params)
    resp.raise_for_status()
    data = resp.json()

    if not data.get("items"):
        raise ValueError("Channel not found")

    return data["items"][0]["snippet"]["channelId"]


async def fetch_latest_videos(
    channel_id: str,
    max_results: int = 10
) -> List[Dict[str, Any]]:
    """
    Fetch latest videos with statistics for a channel.
    """
    client = get_http_client()

    # Get uploads playlist
    resp = await client.get(
        "/channels",
        params={
            "part": "contentDetails",
            "id": channel_id,
            "key": settings.youtube_api_key,
        },
    )
    resp.raise_for_status()
    data = resp.json()

    uploads_playlist = data["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]

    # Get playlist videos
    resp = await client.get(
        "/playlistItems",
        params={
            "part": "snippet,contentDetails",
            "playlistId": uploads_playlist,
            "maxResults": max_results,
            "key": settings.youtube_api_key,
        },
    )
    resp.raise_for_status()
    items = resp.json().get("items", [])

    video_ids = [
        item["contentDetails"]["videoId"]
        for item in items
    ]

    if not video_ids:
        return []

    # Fetch video statistics
    resp = await client.get(
        "/videos",
        params={
            "part": "statistics",
            "id": ",".join(video_ids),
            "key": settings.youtube_api_key,
        },
    )
    resp.raise_for_status()
    stats_map = {
        v["id"]: v["statistics"]
        for v in resp.json().get("items", [])
    }

    # Combine results
    videos = []
    for item in items:
        vid = item["contentDetails"]["videoId"]
        snippet = item["snippet"]

        videos.append({
            "video_id": vid,
            "title": snippet.get("title"),
            "description": snippet.get("description"),
            "published_at": snippet.get("publishedAt"),
            "url": f"https://www.youtube.com/watch?v={vid}",
            "statistics": stats_map.get(vid, {}),
        })

    return videos


async def close_http_client():
    global _client
    if _client:
        await _client.aclose()
        _client = None
