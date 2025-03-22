from fastapi import FastAPI
import logging

from src.users.router import user_router

app = FastAPI()

logging.basicConfig(filename='app.log', level=logging.INFO)

@app.get("/")
async def root():
    return {"message": "Hello World!"}


app.include_router(user_router, prefix="/users", tags=["User"])