from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Tutor API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-pro')
else:
    model = None

class TutorRequest(BaseModel):
    subject: str
    level: str
    learning_style: str
    language: str
    question: str

class TutorResponse(BaseModel):
    answer: str
    subject: str
    level: str
    learning_style: str
    language: str

@app.get("/")
async def root():
    return {"message": "AI Tutor API is running with Gemini!"}

@app.get("/health")
async def health_check():
    status = "healthy"
    if not GEMINI_API_KEY:
        status = "configured_without_key"
    return {"status": status, "service": "AI Tutor API", "model": "gemini-1.5-pro"}

@app.post("/generate-answer", response_model=TutorResponse)
async def generate_answer(request: TutorRequest):
    try:
        if not GEMINI_API_KEY or not model:
            return TutorResponse(
                answer="Please configure your GEMINI_API_KEY in the .env file to use the AI tutor functionality.",
                subject=request.subject,
                level=request.level,
                learning_style=request.learning_style,
                language=request.language
            )
        
        # Construct the prompt based on user inputs
        prompt = f"""You are an expert AI tutor. Please provide a comprehensive answer to the following question based on these specifications:

Subject: {request.subject}
Level: {request.level}
Learning Style: {request.learning_style}
Language: {request.language}

Question: {request.question}

Please tailor your response to:
- Match the {request.level} level of understanding
- Use a {request.learning_style} approach to explanation
- Respond in {request.language}
- Focus on the {request.subject} subject area

IMPORTANT FORMATTING REQUIREMENTS:
- Use proper markdown formatting with clear headings (##, ###)
- Put ALL code examples in code blocks using ```language syntax
- Structure your response with clear sections
- Use bullet points and numbered lists where appropriate
- Make the content visually organized and easy to follow
- When helpful for visual learners, include diagrams using ```mermaid syntax
- Use diagrams for: flowcharts, process flows, algorithms, data structures, concepts, etc.
- **MERMAID DIAGRAM SIMPLICITY:** Keep text inside diagrams extremely simple. Use short, single-word labels if possible.
- **AVOID SPECIAL CHARACTERS:** Do NOT use parentheses, quotes, or any special characters inside diagram text. For example, instead of `A[Node (with details)]`, use `A[NodeWithDetails]`. This is critical to prevent rendering errors.

DIAGRAM EXAMPLES:
- Flowchart: ```mermaid\nflowchart TD\n    A[Start] --> B[Process]\n    B --> C[End]\n```
- Sequence: ```mermaid\nsequenceDiagram\n    A->>B: Message\n    B-->>A: Response\n```
- Mind Map: ```mermaid\nmindmap\n  root((Topic))\n    Branch1\n    Branch2\n```

Provide a clear, engaging, and educational response that helps the student learn effectively."""
        
        print(f"Making Gemini API call for question: {request.question}")
        
        # Make API call to Gemini
        response = model.generate_content(prompt)
        
        answer = response.text
        print(f"Gemini API response received successfully")
        
        return TutorResponse(
            answer=answer,
            subject=request.subject,
            level=request.level,
            learning_style=request.learning_style,
            language=request.language
        )
        
    except Exception as e:
        print(f"Error in generate_answer: {str(e)}")
        
        # Handle specific Gemini errors if needed
        if "400" in str(e) or "API key" in str(e):
             return TutorResponse(
                answer=f"""I apologize, but there's an issue with the Gemini API key. 

**The issue:** {str(e)}

**To fix this:**
1. Get a valid API key from Google AI Studio (https://aistudio.google.com/)
2. Update your .env file with GEMINI_API_KEY=your_key_here
3. Restart the backend server""",
                subject=request.subject,
                level=request.level,
                learning_style=request.learning_style,
                language=request.language
            )
        
        raise HTTPException(status_code=500, detail=f"Error generating answer: {str(e)}")

@app.get("/subjects")
async def get_subjects():
    return {
        "subjects": [
            "Mathematics",
            "Science",
            "Physics",
            "Chemistry",
            "Biology",
            "Computer Science",
            "History",
            "Geography",
            "Literature",
            "Economics",
            "Psychology",
            "Philosophy",
            "Art",
            "Music",
            "Language Learning",
            "Other"
        ]
    }

@app.get("/levels")
async def get_levels():
    return {
        "levels": [
            "Beginner",
            "Elementary",
            "Intermediate",
            "Advanced",
            "Expert"
        ]
    }

@app.get("/learning-styles")
async def get_learning_styles():
    return {
        "learning_styles": [
            "Visual (diagrams, charts, images)",
            "Auditory (verbal explanations)",
            "Kinesthetic (hands-on, practical)",
            "Reading/Writing (text-based)",
            "Logical (step-by-step reasoning)",
            "Social (group discussions)",
            "Solitary (self-study)"
        ]
    }

@app.get("/languages")
async def get_languages():
    return {
        "languages": [
            "English",
            "Spanish",
            "French",
            "German",
            "Italian",
            "Portuguese",
            "Chinese",
            "Japanese",
            "Korean",
            "Arabic",
            "Hindi",
            "Russian",
            "Other"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 