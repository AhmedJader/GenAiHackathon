from typing import List

from fastapi import APIRouter, HTTPException
from fastapi.responses import PlainTextResponse
from . import models
import schema
videos_router = APIRouter()

@videos_router.get("/videos/{request_id}", response_model=List[models.Video])
async def get_videos_by_id(request_id: str):
    # run logic using plaintext schema.request_results[request_id]

    # todo
    return [models.Video(title="title", url="url")]
