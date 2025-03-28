import openai
import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from chatbot import get_project_ideas  


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}

# Define request model for chatbot response
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chatbot_response(request: ChatRequest):
    return {"response": f"You said: {request.message}"}


class ProjectRequest(BaseModel):
    techstack: str

@app.post("/generate_project/")
async def generate_project(request: ProjectRequest):
    ideas = get_project_ideas(request.techstack)
    return {"ideas": ideas} 
