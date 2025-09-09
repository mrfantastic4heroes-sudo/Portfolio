from pydantic import BaseModel, Field
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
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str