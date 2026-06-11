from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database, ai_service
import json
import pdfplumber
import io

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="AI Medical Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "AI Medical Assistant API is running"}

# --- Chat Endpoints ---

@app.post("/api/chat", response_model=schemas.Message)
def chat(request: schemas.ChatRequest, db: Session = Depends(get_db)):
    if request.conversation_id:
        conversation = db.query(models.Conversation).filter(models.Conversation.id == request.conversation_id).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        # Create a new conversation
        title = " ".join(request.message.split()[:5]) + "..."
        conversation = models.Conversation(title=title)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    # Save user message
    user_msg = models.Message(
        conversation_id=conversation.id,
        role="user",
        content=request.message
    )
    db.add(user_msg)
    db.commit()

    # Prepare history for Gemini
    # Gemini expects history as: [{'role': 'user', 'parts': ['hello']}, {'role': 'model', 'parts': ['hi']}]
    messages = db.query(models.Message).filter(models.Message.conversation_id == conversation.id).order_by(models.Message.created_at).all()
    history = []
    for msg in messages[:-1]: # Exclude the current message we just added
        history.append({
            "role": "user" if msg.role == "user" else "model",
            "parts": [msg.content]
        })

    # Get AI response
    response_text, is_emergency = ai_service.get_chat_response(history, request.message)

    # Save AI message
    ai_msg = models.Message(
        conversation_id=conversation.id,
        role="model",
        content=response_text,
        is_emergency=is_emergency
    )
    db.add(ai_msg)
    db.commit()
    db.refresh(ai_msg)

    return ai_msg

@app.get("/api/conversations", response_model=List[schemas.Conversation])
def get_conversations(db: Session = Depends(get_db)):
    return db.query(models.Conversation).order_by(models.Conversation.updated_at.desc()).all()

@app.get("/api/conversations/{conversation_id}", response_model=schemas.Conversation)
def get_conversation(conversation_id: int, db: Session = Depends(get_db)):
    conversation = db.query(models.Conversation).filter(models.Conversation.id == conversation_id).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation


# --- Analysis Endpoints ---

@app.post("/api/analyze/report", response_model=schemas.ReportAnalysis)
async def analyze_report_endpoint(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported for report analysis")

    content = await file.read()
    
    # Extract text from PDF
    extracted_text = ""
    try:
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page in pdf.pages:
                extracted_text += page.extract_text() + "\n"
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read PDF: {str(e)}")

    if not extracted_text.strip():
         raise HTTPException(status_code=400, detail="Could not extract text from PDF")

    # Call AI Service
    json_response_str = ai_service.analyze_report(extracted_text)
    
    try:
        data = json.loads(json_response_str)
        analysis = models.ReportAnalysis(
            filename=file.filename,
            summary=data.get("summary", "Summary generation failed."),
            key_findings=data.get("key_findings", ""),
            potential_concerns=data.get("potential_concerns", ""),
            recommended_next_steps=data.get("recommended_next_steps", "")
        )
        db.add(analysis)
        db.commit()
        db.refresh(analysis)
        return analysis
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse AI response")


@app.post("/api/analyze/image")
async def analyze_image_endpoint(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Only JPG and PNG images are supported")
    
    content = await file.read()
    
    # Call AI Service
    observation = ai_service.analyze_image(content, file.content_type)
    
    return {"filename": file.filename, "observation": observation}
