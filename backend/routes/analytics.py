from fastapi import APIRouter, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorClient
from models.analytics import (
    PageView, UserInteraction, AnalyticsSession, AnalyticsSummary,
    PageViewCreate, UserInteractionCreate
)
import os
from datetime import datetime, timedelta
from typing import Optional
from collections import defaultdict
import json

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.post("/analytics/pageview")
async def track_page_view(request: Request, page_view_data: PageViewCreate):
    """Track a page view"""
    try:
        # Get client IP
        client_ip = request.client.host
        if 'x-forwarded-for' in request.headers:
            client_ip = request.headers['x-forwarded-for'].split(',')[0].strip()
        
        page_view = PageView(
            **page_view_data.dict(),
            ip_address=client_ip
        )
        
        page_view_dict = page_view.dict()
        result = await db.page_views.insert_one(page_view_dict)
        
        if not result.inserted_id:
            raise HTTPException(status_code=400, detail="Failed to track page view")
        
        return {"message": "Page view tracked successfully", "id": page_view.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analytics/interaction")
async def track_user_interaction(request: Request, interaction_data: UserInteractionCreate):
    """Track a user interaction"""
    try:
        interaction = UserInteraction(**interaction_data.dict())
        interaction_dict = interaction.dict()
        
        result = await db.user_interactions.insert_one(interaction_dict)
        
        if not result.inserted_id:
            raise HTTPException(status_code=400, detail="Failed to track interaction")
        
        return {"message": "Interaction tracked successfully", "id": interaction.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analytics/summary")
async def get_analytics_summary(days: Optional[int] = 30):
    """Get analytics summary for the specified period"""
    try:
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Total page views
        total_views = await db.page_views.count_documents({
            "timestamp": {"$gte": start_date, "$lte": end_date}
        })
        
        # Unique visitors (based on IP + User Agent combination)
        unique_visitors_pipeline = [
            {"$match": {"timestamp": {"$gte": start_date, "$lte": end_date}}},
            {"$group": {
                "_id": {"ip": "$ip_address", "ua": "$user_agent"},
                "count": {"$sum": 1}
            }},
            {"$count": "unique_visitors"}
        ]
        
        unique_visitors_result = await db.page_views.aggregate(unique_visitors_pipeline).to_list(1)
        unique_visitors = unique_visitors_result[0]["unique_visitors"] if unique_visitors_result else 0
        
        # Popular pages
        popular_pages_pipeline = [
            {"$match": {"timestamp": {"$gte": start_date, "$lte": end_date}}},
            {"$group": {
                "_id": "$page",
                "views": {"$sum": 1},
                "unique_visitors": {"$addToSet": "$ip_address"}
            }},
            {"$project": {
                "page": "$_id",
                "views": 1,
                "unique_visitors": {"$size": "$unique_visitors"}
            }},
            {"$sort": {"views": -1}},
            {"$limit": 10}
        ]
        
        popular_pages = await db.page_views.aggregate(popular_pages_pipeline).to_list(10)
        
        # Top referrers
        referrers_pipeline = [
            {"$match": {
                "timestamp": {"$gte": start_date, "$lte": end_date},
                "referrer": {"$ne": None, "$ne": ""}
            }},
            {"$group": {
                "_id": "$referrer",
                "count": {"$sum": 1}
            }},
            {"$project": {
                "referrer": "$_id",
                "count": 1
            }},
            {"$sort": {"count": -1}},
            {"$limit": 10}
        ]
        
        top_referrers = await db.page_views.aggregate(referrers_pipeline).to_list(10)
        
        # Average session duration (mock calculation for now)
        avg_session_duration = 120.5  # This would need proper session tracking
        
        # Bounce rate (mock calculation)
        bounce_rate = 0.35  # 35% bounce rate
        
        # Contact form submissions
        contact_submissions = await db.contact_messages.count_documents({
            "created_at": {"$gte": start_date, "$lte": end_date}
        })
        
        summary = AnalyticsSummary(
            total_views=total_views,
            unique_visitors=unique_visitors,
            popular_pages=popular_pages,
            top_referrers=top_referrers,
            avg_session_duration=avg_session_duration,
            bounce_rate=bounce_rate,
            contact_form_submissions=contact_submissions,
            date_range={
                "start": start_date,
                "end": end_date
            }
        )
        
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analytics/page-views")
async def get_page_views(
    page: Optional[str] = None,
    days: Optional[int] = 7,
    limit: Optional[int] = 100
):
    """Get page views with optional filtering"""
    try:
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        query = {"timestamp": {"$gte": start_date, "$lte": end_date}}
        if page:
            query["page"] = page
        
        page_views = await db.page_views.find(
            query, 
            {"_id": 0}
        ).sort("timestamp", -1).limit(limit).to_list(limit)
        
        return page_views
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analytics/interactions")
async def get_user_interactions(
    action: Optional[str] = None,
    page: Optional[str] = None,
    days: Optional[int] = 7,
    limit: Optional[int] = 100
):
    """Get user interactions with optional filtering"""
    try:
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        query = {"timestamp": {"$gte": start_date, "$lte": end_date}}
        if action:
            query["action"] = action
        if page:
            query["page"] = page
        
        interactions = await db.user_interactions.find(
            query,
            {"_id": 0}
        ).sort("timestamp", -1).limit(limit).to_list(limit)
        
        return interactions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analytics/dashboard")
async def get_analytics_dashboard():
    """Get comprehensive analytics dashboard data"""
    try:
        # Get data for last 30 days
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=30)
        
        # Daily page views for the last 30 days
        daily_views_pipeline = [
            {"$match": {"timestamp": {"$gte": start_date, "$lte": end_date}}},
            {"$group": {
                "_id": {
                    "year": {"$year": "$timestamp"},
                    "month": {"$month": "$timestamp"},
                    "day": {"$dayOfMonth": "$timestamp"}
                },
                "views": {"$sum": 1},
                "unique_visitors": {"$addToSet": "$ip_address"}
            }},
            {"$project": {
                "date": {
                    "$dateFromParts": {
                        "year": "$_id.year",
                        "month": "$_id.month",
                        "day": "$_id.day"
                    }
                },
                "views": 1,
                "unique_visitors": {"$size": "$unique_visitors"}
            }},
            {"$sort": {"date": 1}}
        ]
        
        daily_views = await db.page_views.aggregate(daily_views_pipeline).to_list(30)
        
        # Top interactions
        top_interactions_pipeline = [
            {"$match": {"timestamp": {"$gte": start_date, "$lte": end_date}}},
            {"$group": {
                "_id": "$action",
                "count": {"$sum": 1}
            }},
            {"$project": {
                "action": "$_id",
                "count": 1
            }},
            {"$sort": {"count": -1}},
            {"$limit": 10}
        ]
        
        top_interactions = await db.user_interactions.aggregate(top_interactions_pipeline).to_list(10)
        
        # Recent contact messages
        recent_contacts = await db.contact_messages.find(
            {"created_at": {"$gte": start_date, "$lte": end_date}},
            {"_id": 0, "message": 0}  # Exclude message content for privacy
        ).sort("created_at", -1).limit(5).to_list(5)
        
        dashboard_data = {
            "summary": await get_analytics_summary(30),
            "daily_views": daily_views,
            "top_interactions": top_interactions,
            "recent_contacts": recent_contacts,
            "last_updated": datetime.utcnow()
        }
        
        return dashboard_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))