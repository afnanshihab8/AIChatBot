import openai
import os
from dotenv import load_dotenv

load_dotenv()  

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_project_ideas(techstack: str):
    prompt = f"Suggest some project ideas for {techstack}."

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "You are an AI that provides project ideas."},
                      {"role": "user", "content": prompt}],
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        return {"error": str(e)}
