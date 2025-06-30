from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app first
app = FastAPI()

# Add CORS middleware to the app instance
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    query: str


GEMINI_API_KEY = ""
SEARCH_API_KEY = ""
SEARCH_ENGINE_ID = ""

@app.post("/ask")
async def ask_question(q: Question):
    # Step 1: Search Google using Programmable Search Engine
    search_url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": SEARCH_API_KEY,
        "cx": SEARCH_ENGINE_ID,
        "q": q.query,
        "num": 3
    }

    try:
        search_res = requests.get(search_url, params=params)
        search_res.raise_for_status()  # Raise exception for HTTP errors
        search_data = search_res.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Search API error: {str(e)}")

    # Handle no results or missing items
    if not search_data.get("items"):
        raise HTTPException(
            status_code=404,
            detail="No relevant search results found. Try a different query."
        )

    # Combine top 3 results for better context
    snippets = [item.get("snippet", "") for item in search_data["items"][:3]]
    context = "\n\n".join(snippets)

    # Step 2: Generate prompt for Gemini
    prompt = (
        f"User asked: {q.query}\n\n"
        f"Here are some relevant search results:\n{context}\n\n"
        "Please provide a clear, concise explanation in simple terms:"
    )

    # Step 3: Call Gemini API
    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "temperature": 0.7,
            "topK": 40,
            "topP": 0.95
        }
    }

    try:
        gemini_res = requests.post(gemini_url, headers=headers, json=payload)
        gemini_res.raise_for_status()
        gemini_data = gemini_res.json()
        reply = gemini_data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError, requests.RequestException) as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate response: {str(e)}"
        )

    return {"answer": reply}