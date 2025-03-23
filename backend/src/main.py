from fastapi import FastAPI
from quiz.router import quiz_router
from videos.router import videos_router

import logging

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI()

# Allow requests from your frontend (Next.js running on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app = FastAPI()

logging.basicConfig(filename='app.log', level=logging.INFO)

@app.get("/")
async def root():
    return {"message": "Hello World!"}



app.include_router(quiz_router, prefix="/quiz", tags=["Quiz"])
app.include_router(videos_router, prefix="/videos", tags=["Videos"])
