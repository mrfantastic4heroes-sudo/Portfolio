from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional, Dict
from datetime import datetime
import uuid

class Education(BaseModel):
    degree: str
    institution: str
    period: str
    grade: Optional[str] = None

class Skill(BaseModel):
    name: str
    level: int
    category: str

class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    company: str
    location: str
    period: str
    type: str
    achievements: List[str]
    technologies: Optional[List[str]] = []

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    technologies: List[str]
    period: str
    status: str
    highlights: Optional[List[str]] = []
    github: Optional[str] = "#"
    demo: Optional[str] = "#"

class Certification(BaseModel):
    name: str
    issuer: str
    period: str
    type: str
    description: str

class Personal(BaseModel):
    name: str
    tagline: str
    description: str
    email: str
    phone: str
    location: str
    bio: str
    education: List[Education]

class Skills(BaseModel):
    technical: List[Skill]
    tools: List[str]
    soft: List[str]

class Contact(BaseModel):
    email: str
    phone: str
    location: str
    availability: str
    social: Dict[str, str]

class Portfolio(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    personal: Personal
    skills: Skills
    experience: List[Experience]
    projects: List[Project]
    certifications: List[Certification]
    contact: Contact
    activities: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=1)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=1000)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False
    
    @validator('email')
    def validate_email(cls, v):
        if not v or not v.strip():
            raise ValueError('Email cannot be empty')
        if '@' not in v:
            raise ValueError('Invalid email format')
        return v.strip()
    
    @validator('name', 'subject', 'message')
    def validate_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Field cannot be empty')
        return v.strip()

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=1)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=1000)
    
    @validator('email')
    def validate_email(cls, v):
        if not v or not v.strip():
            raise ValueError('Email cannot be empty')
        if '@' not in v:
            raise ValueError('Invalid email format')
        return v.strip()
    
    @validator('name', 'subject', 'message')
    def validate_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Field cannot be empty')
        return v.strip()