from fastapi import APIRouter, HTTPException
from . import models
quiz_router = APIRouter()

# @user_router.get("/", response_model=list[models.User])
# async def get_users():
#     return schemas.a

@quiz_router.get("/weaknesses", response_model=models.User)
async def get_user_weaknesses(user_id: int):
    user = next((x for x in schemas.a if x.id == user_id ), None)
    if user is None:
        raise HTTPException(
            status_code=404, detail="User not found"
        )
    # run llm using 1: {questionName, userAnswer}


    return user