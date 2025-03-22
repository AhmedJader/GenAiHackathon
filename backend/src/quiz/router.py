from typing import List

from fastapi import APIRouter, HTTPException
from fastapi.responses import PlainTextResponse
from . import models
quiz_router = APIRouter()

# @user_router.get("/", response_model=list[models.User])
# async def get_users():
#     return schemas.a

@quiz_router.post("/weaknesses",  response_class=PlainTextResponse)
async def get_weaknessess(answers: List[models.TestAnswer]):
    # run llm logic
    # run other functions
    

    
    return "dsfdsfdsf"
