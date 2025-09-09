from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

class PageView(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    page: str
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None
    referrer: Optional[str] = None
    session_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    duration: Optional[int] = None  # time spent on page in seconds
    
class UserInteraction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    action: str  # 'click', 'scroll', 'download', 'form_submit', etc.
    element: Optional[str] = None  # element clicked/interacted with
    page: str
    session_id: Optional[str] = None
    data: Optional[Dict[str, Any]] = None  # additional interaction data
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class AnalyticsSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None
    start_time: datetime = Field(default_factory=datetime.utcnow)
    end_time: Optional[datetime] = None
    total_duration: Optional[int] = None  # total session duration in seconds
    pages_visited: List[str] = []
    interactions_count: int = 0
    is_bounce: bool = False  # single page visit with minimal interaction

class AnalyticsSummary(BaseModel):
    total_views: int
    unique_visitors: int
    popular_pages: List[Dict[str, Any]]
    top_referrers: List[Dict[str, Any]]
    avg_session_duration: float
    bounce_rate: float
    contact_form_submissions: int
    date_range: Dict[str, datetime]

class PageViewCreate(BaseModel):
    page: str
    user_agent: Optional[str] = None
    referrer: Optional[str] = None
    session_id: Optional[str] = None

class UserInteractionCreate(BaseModel):
    action: str
    element: Optional[str] = None
    page: str
    session_id: Optional[str] = None
    data: Optional[Dict[str, Any]] = None