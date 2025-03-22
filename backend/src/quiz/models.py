from pydantic import BaseModel

class TestAnswer(BaseModel):
    question_number: int
    user_answer: str