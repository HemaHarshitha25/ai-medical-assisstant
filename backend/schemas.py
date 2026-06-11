from pydantic import BaseModel
from typing import List, Optional
import datetime

class MessageBase(BaseModel):
    role: str
    content: str

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: int
    conversation_id: int
    is_emergency: bool
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class ConversationBase(BaseModel):
    title: str

class ConversationCreate(ConversationBase):
    pass

class Conversation(ConversationBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    messages: List[Message] = []

    class Config:
        from_attributes = True

class ReportAnalysisBase(BaseModel):
    filename: str
    summary: str
    key_findings: str
    potential_concerns: str
    recommended_next_steps: str

class ReportAnalysisCreate(ReportAnalysisBase):
    pass

class ReportAnalysis(ReportAnalysisBase):
    id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None
