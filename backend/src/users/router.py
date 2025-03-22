from fastapi import APIRouter, HTTPException
from . import schemas, models
user_router = APIRouter()

@user_router.get("/", response_model=list[models.User])
async def get_users():
    return schemas.a

@user_router.get("/{user_id}", response_model=models.User)
async def get_user(user_id: int):
    user = next((x for x in schemas.a if x.id == user_id ), None)
    if user is None:
        raise HTTPException(
            status_code=404, detail="User not found"
        )
    return user

@user_router.post("/", response_model=models.User)
async def create_user(user: models.User):
    schemas.a.append(user)
    return user