from typing import List

from fastapi import APIRouter, HTTPException
from . import models
quiz_router = APIRouter()

# @user_router.get("/", response_model=list[models.User])
# async def get_users():
#     return schemas.a

@quiz_router.post("/answers")
async def post_user_answers(answers: List[models.TestAnswer]):
    # run llm logic
    # run other functions
    

    
    return answers
