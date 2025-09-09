# Portfolio API Contracts

## Overview
This document outlines the API contracts for Albee John's Data Science Portfolio website, detailing the backend endpoints needed to replace mock data with real database operations.

## Mock Data Structure (Current Frontend)
The frontend currently uses mock data from `/app/frontend/src/data/mock.js` with the following structure:

### Personal Information
- name, tagline, description, email, phone, location
- bio, education array, certifications

### Skills
- technical skills with categories (Programming, Analytics, AI/ML)
- tools array, soft skills array

### Experience
- work experience with achievements and technologies

### Projects
- project details with technologies, highlights, status

### Contact
- contact information and social links

## Required Backend Endpoints

### 1. Portfolio Data Management
```
GET /api/portfolio
- Returns complete portfolio data structure
- Response: {personal, skills, experience, projects, contact}

PUT /api/portfolio
- Updates portfolio data (admin functionality)
- Request body: Complete portfolio object
```

### 2. Contact Form
```
POST /api/contact
- Handles contact form submissions
- Request body: {name, email, subject, message}
- Stores in database and returns success response
- Sends email notification (optional)

GET /api/contact/messages
- Returns all contact messages (admin functionality)
- Response: Array of contact messages with timestamps
```

### 3. Skills Management
```
GET /api/skills
- Returns skills data categorized
- Response: {technical, tools, soft}

PUT /api/skills
- Updates skills data
- Request body: Skills object
```

## Database Schema

### Collections:
1. **portfolio** - Single document with all portfolio data
2. **contact_messages** - Contact form submissions
3. **skills** - Skills data (separate for easier management)

## Integration Plan

### Phase 1: Backend Setup
1. Create FastAPI endpoints
2. Set up MongoDB models
3. Implement CRUD operations

### Phase 2: Frontend Integration
1. Replace mock data imports with API calls
2. Update Portfolio.jsx to fetch from backend
3. Implement contact form submission
4. Add error handling and loading states

### Phase 3: Data Migration
1. Move mock data to MongoDB
2. Test all endpoints
3. Ensure seamless frontend-backend integration

## Key Changes Needed

### Frontend Files to Update:
- `/app/frontend/src/components/Portfolio.jsx` - Replace mock data with API calls
- `/app/frontend/src/components/Contact.jsx` - Implement real form submission
- Remove dependency on `/app/frontend/src/data/mock.js`

### Backend Files to Create:
- Portfolio model and endpoints
- Contact message model and endpoints
- Data seeding script for initial portfolio data