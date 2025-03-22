from langchain_ollama.llms import OllamaLLM
from langchain_google_vertexai import VertexAI
from langchain_community.document_loaders import PyPDFLoader
from langchain_ollama import OllamaEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

from vertexai.generative_models import (
    HarmCategory,
    HarmBlockThreshold
)
from prompts import (prompt_strength, prompt_weakness, 
                     rag_template, trans_template, video_prompt)

import json
path = "/Users/yusufmoola/Desktop/Code Demo's/GenAiHackathon/backend/src/samplequiz.json"
path2 = "/Users/yusufmoola/Desktop/Code Demo's/GenAiHackathon/backend/src/sample_answers.json"

with open(path, 'r') as f:
    sample_data = json.load(f)

with open(path2, 'r') as f:
    sample_answers = json.load(f)
    
rag_file = "/Users/yusufmoola/Desktop/Code Demo's/GenAiHackathon/backend/Advanced-Functions.pdf"

safety_settings = {
                HarmCategory.HARM_CATEGORY_UNSPECIFIED: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
}
class LLM:
    def __init__(self):
        self.llm = VertexAI(
            model_name="gemini-1.5-pro-001",
            temperature=.4,
            top_p=0.8,
            top_k=40,
            max_output_tokens=4096,
            verbose=True,
            safety_settings=safety_settings  # Add the safety configuration here
            )



import logging
class Quiz:
    def __init__(self):
        self.llm_base = OllamaLLM(model= "mathstral:latest", temperature=0.3)
        self.llm_strength = OllamaLLM(model = "wizardlm2:7b", temperature= 0.4)
        self.llm_rag = OllamaLLM(model="gemma", temperature=0.4)
        self.llm_lang = OllamaLLM(model = "stablelm2", temperature= 0.2)
        self.llm_video = LLM().llm


    def get_weaknesses(self, quiz_answers):
        
        prompt_final = prompt_weakness.format(sample_data, quiz_answers)
        res = self.llm_base.invoke(prompt_final)
        logging.info(f"weaknesses: {res}")
        
        return res
    
    def get_strengths(self, quiz_answers):
        
        prompt_final = prompt_strength.format(sample_data, quiz_answers)
        res = self.llm_video.invoke(prompt_final)
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

        res_lang_strength = self.llm_lang.invoke(prompt_lang_strength)
        logging.info(f'Strengths translated: {res_lang_strength}')
        
        return res_lang_strength
    
    def trans_weakness(self, learning_path):
        
        prompt_lang = trans_template.format(learning_path)

        res_lang = self.llm_lang.invoke(prompt_lang)
        logging.info(f'Learning Path translated: {res_lang}')
        
        return res_lang
    
    def get_videos(self, learning_path):
        
        video_prompt_final = video_prompt.format(learning_path)

        res_video = self.llm_video.invoke(video_prompt_final)
        
        return res_video
        

def main(sample_answers):
    
    quiz_flow = Quiz()
    print("=====================IntelliEarth Agentic Flow==============================")
    
    weakness = quiz_flow.get_weaknesses(sample_answers)
    strength = quiz_flow.get_strengths(sample_answers)
    retriever = quiz_flow.rag_setup(rag_file)
    strength_rag = quiz_flow.strength_rag(retriever, strength)
    learning_path = quiz_flow.learning_path(retriever, weakness)
    trans_strength = quiz_flow.trans_strength(strength_rag)
    trans_weakness = quiz_flow.trans_weakness(learning_path)
    videos = quiz_flow.get_videos(learning_path)

    print("Weaknesses: ", weakness)
    print('\n\n')
    print("Strengths: ", strength)
    print('\n\n')
    print("Strengths RAG: ", strength_rag)
    print('\n\n')
    print("Learning Path: ", learning_path)
    print('\n\n')
    print("Strengths Translated: ", trans_strength)
    print('\n\n')
    print("Weaknesses Translated: ", trans_weakness)
    print('\n\n')
    print("Videos: ", videos)
 
    
main(sample_answers)