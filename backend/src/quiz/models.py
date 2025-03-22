from pydantic import BaseModel

class TestAnswer(BaseModel):
    question_number: int
    user_response: str