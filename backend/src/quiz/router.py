from typing import List
import uuid

from fastapi import APIRouter
from fastapi.responses import PlainTextResponse

import schema
from . import models
quiz_router = APIRouter()

@quiz_router.post("/answers", response_model=models.RequestID)
async def post_answers(answers: List[models.TestResponse]):
    # run llm logic using "answers"
    # run other functions
    # make sure everything is non-blocking

    request_id = str(uuid.uuid4())

    schema.request_results[request_id] = "final thing to send to frontend should go here"    

    return models.RequestID(request_id=request_id)

@quiz_router.get("/answers/{request_id}", response_class=PlainTextResponse)
async def get_answer_by_id(request_id: str):
    res = schema.request_results.get(request_id)
    if res is None:
        return PlainTextResponse("Not Found", status_code=404)
    return res
