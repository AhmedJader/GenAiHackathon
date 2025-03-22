from pydantic import BaseModel
from typing import List, Dict, Any

class TestAnswer(BaseModel):
    question_number: int
    user_response: str

class RequestID(BaseModel):
    request_id: str
