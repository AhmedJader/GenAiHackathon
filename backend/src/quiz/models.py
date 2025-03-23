from pydantic import BaseModel, FilePath
from typing import List, Dict, Any

class TestAnswer(BaseModel):
    question_number: int
    user_response: str

class RequestID(BaseModel):
    request_id: str
    
class TestResponse(BaseModel):
    test_answers:List[TestAnswer]
    language: str
