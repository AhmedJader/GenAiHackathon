from langchain_ollama.llms import OllamaLLM
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
from fastapi.responses import JSONResponse
from fastapi import UploadFile, File, Form
from prompts import (prompt_strength, prompt_weakness, 
                     rag_template, trans_template, video_prompt)
import tempfile
import json
import os
import uuid
import schema
import logging
from . import models

set_llm_cache(SQLiteCache(database_path=".langchain.db"))

quiz_router = APIRouter()

path = 'samplequiz.json'
with open(path, 'r') as f:
        sample_data = json.load(f)
        
rag_path = 'Advanced-Functions.pdf'

@quiz_router.post("/answers", response_model=models.RequestID)
async def post_answers(
    language: str = Form(...),
    test_answers: str = Form(...),
    file: UploadFile = File(...)
):

    
    request_id = str(uuid.uuid4())
    
    quiz = Quiz()
    
    # Parse test_answers string to JSON
    parsed_answers = json.loads(test_answers)
    
    quiz_answers = quiz.merge_quiz_with_responses(sample_data, parsed_answers)
    
    # Save PDF temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        content = await file.read()
        tmp.write(content)
        pdf_path = tmp.name
    
    
    if language == "english":
        weaknesses = quiz.get_weaknesses(quiz_answers)
        strengths = quiz.get_strengths(quiz_answers)
        
        retriever = quiz.rag_setup(pdf_path)
        
        strengths_rag = quiz.strength_rag(retriever, strengths)
        learning_path = quiz.learning_path(retriever, weaknesses)
        
        output = {"strengths": strengths_rag,"learning_path": learning_path}
        

    
    elif language == "french":
        weaknesses = quiz.get_weaknesses(quiz_answers)
        strengths = quiz.get_strengths(quiz_answers)
        
        retriever = quiz.rag_setup(rag_path)
        
        strengths_rag = quiz.strength_rag(retriever, strengths)
        learning_path = quiz.learning_path(retriever, weaknesses)
        translated_strengths = quiz.trans_strength(strengths_rag)
        translated_weaknesses = quiz.trans_weakness(learning_path)
        
        output = {"strengths": translated_strengths,"learning_path": translated_weaknesses}
        
    
    schema.request_results[request_id] = output  
    return models.RequestID(request_id=request_id)
        


    

@quiz_router.get("/answers/{request_id}", response_class=PlainTextResponse)
async def get_answer_by_id(request_id: str):
    res = schema.request_results.get(request_id)
    if res is None:
        return PlainTextResponse("Not Found", status_code=404)
    return res







class Quiz:
    def __init__(self):
        self.llm_mathstral = OllamaLLM(model= "mathstral:latest", temperature=0.3)
        self.llm_rag = OllamaLLM(model="gemma", temperature=0.4)
        self.llm_lang = OllamaLLM(model = "stablelm2", temperature= 0)
        self.llm_deepseek = OllamaLLM(model = "deepseek-r1", temperature= 0.2)
        
    def merge_quiz_with_responses(self,quiz_questions: List[Dict], quiz_responses: List[Dict]) -> List[Dict]:
        # First, build a lookup table for responses
        response_lookup = {resp["question_number"]: resp["user_response"] for resp in quiz_responses}
        
        merged = []
        for q in quiz_questions:
            q_num = q["question_number"]
            merged.append({
                "question_number": q_num,
                "question": q["question"],
                "user_response": response_lookup.get(q_num, None)  # or use "" instead of None
            })
        
        return merged


    def get_weaknesses(self, quiz_answers):
        
        prompt_final = prompt_weakness.format(sample_data, quiz_answers)
        res = self.llm_mathstral.invoke(prompt_final)
        logging.info(f"weaknesses: {res}")
        
        return res
    
    def get_strengths(self, quiz_answers):
        
        prompt_final = prompt_strength.format(sample_data, quiz_answers)
        res = self.llm_deepseek.invoke(prompt_final)
        res = res.split("<think>")[1].split("</think>")[1]
        logging.info(f"strengths: {res}")
        return res
    
    
    def rag_setup(self, pdf_path):
        loader = PyPDFLoader(pdf_path)
        docs = loader.load()
        text_splitter=RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=200)
        documents=text_splitter.split_documents(docs)
        embeddings = OllamaEmbeddings(model = 'nomic-embed-text:latest')
        db = Chroma.from_documents(documents,embeddings)
        retriever  =  db.as_retriever()
        return retriever
    
    def strength_rag(self, retriever, res_strength):
        prompt = ChatPromptTemplate.from_template(rag_template)

        # Create a chain 
        doc_chain = create_stuff_documents_chain(self.llm_rag, prompt)
        chain = create_retrieval_chain(retriever, doc_chain)
        
        # User query 
        response = chain.invoke({"input": "Give this student a detailed summary on all the things they did well in the quiz. Use the provided context to analyze what topics from the curriculum they did well in.", "quiz_res": res_strength})

        # Get the Answer only
        final_strength = response['answer']
        
        logging.info(f'Strengths summary RAG: {final_strength}')
        return final_strength
    
    def learning_path(self, retriever, res_weakness):
        
        prompt = ChatPromptTemplate.from_template(rag_template)

        # Create a chain 
        doc_chain = create_stuff_documents_chain(self.llm_rag, prompt)
        chain = create_retrieval_chain(retriever, doc_chain)
        
        # User query 
        response = chain.invoke({"input": "Give this student a detailed learning path that strategises ways to improve their performance.", "quiz_res": res_weakness})

        # Get the Answer only
        final = response['answer']
        
        logging.info(f'Learning Path summary RAG: {final}')
        return final
    
    def trans_strength(self, strengths_rag):
        prompt_lang_strength = trans_template.format(strengths_rag)

        res_lang_strength = self.llm_deepseek.invoke(prompt_lang_strength)
        res_lang_strength = res_lang_strength.split("<think>")[1].split("</think>")[1]
        logging.info(f'Strengths translated: {res_lang_strength}')
        
        return res_lang_strength
    
    def trans_weakness(self, learning_path):
        
        prompt_lang = trans_template.format(learning_path)

        res_lang = self.llm_deepseek.invoke(prompt_lang)
        res_lang = res_lang.split("<think>")[1].split("</think>")[1]
        logging.info(f'Learning Path translated: {res_lang}')
        
        return res_lang
    
    def get_videos(self, learning_path):
        
        video_prompt_final = video_prompt.format(learning_path)

        res_video = self.llm_deepseek.invoke(video_prompt_final)
        res_video = res_video.split("<think>")[1].split("</think>")[1]
        
        return res_video