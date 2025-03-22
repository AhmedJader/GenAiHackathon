from pydantic import BaseModel

class Video(BaseModel):
    title: str
    url: str
