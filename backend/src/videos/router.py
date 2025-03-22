from typing import List

from fastapi import APIRouter, HTTPException
from fastapi.responses import PlainTextResponse
from . import models
import schema
videos_router = APIRouter()

@videos_router.get("/videos/{request_id}", response_class=PlainTextResponse)
async def get_videos_by_id(request_id: str):
    # run logic using plaintext schema.request_results.get(request_id) remember to check if it is None

    # todo
    return ""
