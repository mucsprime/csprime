# from idlelib import history

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
from pathlib import Path
from uuid import uuid4

# Initialize FastAPI app
app = FastAPI()

# Allow CORS for all origins (for frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Session memory store
chat_sessions = {}

# API keys
GEMINI_API_KEY = ""
SEARCH_API_KEY = ""
SEARCH_ENGINE_ID = ""

class Question(BaseModel):
    query: str

@app.post("/ask")
async def ask_question(q: Question, request: Request):  # ✅ Use FastAPI's Request here
    # Step 1: Search Google
    search_url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": SEARCH_API_KEY,
        "cx": SEARCH_ENGINE_ID,
        "q": q.query,
        "num": 3
    }

    try:
        search_res = requests.get(search_url, params=params)
        search_res.raise_for_status()
        search_data = search_res.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Search API error: {str(e)}")

    if not search_data.get("items"):
        raise HTTPException(status_code=404, detail="No relevant search results found.")

    snippets = [item.get("snippet", "") for item in search_data["items"][:3]]
    context = "\n\n".join(snippets)

    # Step 2: Load JSON knowledge
    json_path = Path("module_info.json")
    with json_path.open() as f:
        maynooth_data = json.load(f)
    json_snippet = json.dumps(maynooth_data, indent=2)

    # Step 3: Manage chat memory
    session_id = request.headers.get("X-Session-ID") or str(uuid4())
    if session_id not in chat_sessions:
        chat_sessions[session_id] = []
    history = chat_sessions[session_id]
    history.append({"role": "user", "text": q.query})

    # Step 4: Construct the prompt
    prompt = (
        f"User asked: {q.query}\n\n"
        f"Here are some relevant search results:\n{context}\n\n"
        f"Here is structured data from Maynooth University:\n{json_snippet}\n\n"
        "Now, using the information above and your own reasoning ability, "
        "give a helpful, clear answer as if you're explaining to a 15-year-old.\n"
        "If something is not directly stated, try to infer it from the context.\n"
        "You are a friendly, smart AI assistant that likes to help students.\n"
        "Here's the chat so far:\n\n"
    )


    for msg in history:
        who = "User" if msg["role"] == "user" else "Assistant"
        prompt += f"{who}: {msg['text']}\n"

    prompt += "\nAssistant:"  # ✅ Correctly placed outside loop

    # Step 5: Call Gemini
    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "temperature": 0.9,
            "topK": 50,
            "topP": 0.95
        }
    }

    try:
        gemini_res = requests.post(gemini_url, headers=headers, json=payload)
        gemini_res.raise_for_status()
        gemini_data = gemini_res.json()
        reply = gemini_data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError, requests.RequestException) as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate response: {str(e)}")

    history.append({"role": "assistant", "text": reply})
    return {"answer": reply, "session_id": session_id}