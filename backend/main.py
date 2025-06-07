from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
from openai import OpenAI

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

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
    return {"message": "AI Tutor API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "AI Tutor API"}

@app.post("/generate-answer", response_model=TutorResponse)
async def generate_answer(request: TutorRequest):
    try:
        # Check if OpenAI API key is available
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            return TutorResponse(
                answer="Please configure your OpenAI API key in the .env file to use the AI tutor functionality.",
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

DIAGRAM EXAMPLES:
- Flowchart: ```mermaid\nflowchart TD\n    A[Start] --> B[Process]\n    B --> C[End]\n```
- Sequence: ```mermaid\nsequenceDiagram\n    A->>B: Message\n    B-->>A: Response\n```
- Mind Map: ```mermaid\nmindmap\n  root((Topic))\n    Branch1\n    Branch2\n```

Provide a clear, engaging, and educational response that helps the student learn effectively."""
        
        print(f"Making OpenAI API call for question: {request.question}")
        
        # Make API call to OpenAI
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful and knowledgeable AI tutor."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        
        answer = response.choices[0].message.content.strip()
        print(f"OpenAI API response received successfully")
        
        return TutorResponse(
            answer=answer,
            subject=request.subject,
            level=request.level,
            learning_style=request.learning_style,
            language=request.language
        )
        
    except Exception as e:
        print(f"Error in generate_answer: {str(e)}")
        print(f"Error type: {type(e)}")
        
        # Check if it's an OpenAI quota/billing issue
        if "quota" in str(e).lower() or "billing" in str(e).lower() or "429" in str(e):
            return TutorResponse(
                answer=f"""I apologize, but there's an issue with the OpenAI API quota or billing. 

**The issue:** {str(e)}

**To fix this:**
1. Check your OpenAI account billing at https://platform.openai.com/account/billing
2. Ensure you have sufficient credits or an active payment method
3. Your API key might need a paid plan to access GPT models

**Demo Response for your question about {request.subject}:**
This is a sample response showing how the AI tutor would work. The system is configured to provide {request.level}-level explanations using a {request.learning_style} approach in {request.language}.

Your question: "{request.question}"

Once the OpenAI API billing is resolved, you'll receive personalized, detailed responses tailored to your learning preferences.""",
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