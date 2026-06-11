from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, default="New Conversation")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    role = Column(String) # 'user' or 'model'
    content = Column(Text)
    is_emergency = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    conversation = relationship("Conversation", back_populates="messages")

class ReportAnalysis(Base):
    __tablename__ = "report_analyses"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    summary = Column(Text)
    key_findings = Column(Text)
    potential_concerns = Column(Text)
    recommended_next_steps = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
