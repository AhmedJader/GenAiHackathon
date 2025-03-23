from langchain_ollama.llms import OllamaLLM
from langchain_google_vertexai import VertexAI
from langchain_openai import ChatOpenAI
from langchain_community.document_loaders import PyPDFLoader
from langchain.cache import SQLiteCache
from langchain.globals import set_llm_cache
from langchain_ollama import OllamaEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from typing import List, Dict
from typing import List
from fastapi import APIRouter
from fastapi.responses import PlainTextResponse
import json
import os
import uuid


import schema
from . import models
quiz_router = APIRouter()

@quiz_router.post("/answers", response_model=models.RequestID)
async def post_answers(answers: models.TestResponse):
    # run llm logic using "answers"
    # run other functions
    # make sure everything is non-blocking
    
    
    if answers.language == "English":
        return
    
    if answers.language == "French":
        return

    request_id = str(uuid.uuid4())

    schema.request_results[request_id] = "final thing to send to frontend should go here"    

    return models.RequestID(request_id=request_id)

@quiz_router.get("/answers/{request_id}", response_class=PlainTextResponse)
async def get_answer_by_id(request_id: str):
    res = schema.request_results.get(request_id)
    if res is None:
        return PlainTextResponse("Not Found", status_code=404)
    return res
