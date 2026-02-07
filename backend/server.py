from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import asyncio
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'your-email@example.com')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: str
    message: str

class PortfolioItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    image_url: str
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PortfolioItemCreate(BaseModel):
    title: str
    category: str
    image_url: str
    description: Optional[str] = None


# Routes
@api_router.get("/")
async def root():
    return {"message": "Aaditya Tiwari Portfolio API"}


@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact_submission(input: ContactSubmissionCreate):
    """Handle contact form submissions and send email notification"""
    try:
        # Create contact submission object
        contact_dict = input.model_dump()
        contact_obj = ContactSubmission(**contact_dict)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = contact_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        # Save to database
        _ = await db.contact_submissions.insert_one(doc)
        
        # Send email notification asynchronously (non-blocking)
        if resend.api_key and NOTIFICATION_EMAIL:
            html_content = f"""
            <html>
                <body style="font-family: Arial, sans-serif; color: #333333; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #F9F5F2; padding: 40px; border-radius: 8px;">
                        <h1 style="color: #A67070; font-size: 28px; margin-bottom: 20px;">New Contact Form Submission</h1>
                        <div style="background-color: white; padding: 30px; border-radius: 8px;">
                            <p style="margin: 10px 0;"><strong>Name:</strong> {contact_obj.name}</p>
                            <p style="margin: 10px 0;"><strong>Email:</strong> {contact_obj.email}</p>
                            <p style="margin: 10px 0;"><strong>Phone:</strong> {contact_obj.phone or 'Not provided'}</p>
                            <p style="margin: 10px 0;"><strong>Service:</strong> {contact_obj.service}</p>
                            <p style="margin: 10px 0;"><strong>Message:</strong></p>
                            <p style="margin: 10px 0; padding: 15px; background-color: #F9F5F2; border-radius: 4px;">{contact_obj.message}</p>
                            <p style="margin: 20px 0 0 0; color: #666666; font-size: 14px;">Submitted at: {contact_obj.timestamp.strftime('%B %d, %Y at %I:%M %p')}</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            params = {
                "from": SENDER_EMAIL,
                "to": [NOTIFICATION_EMAIL],
                "subject": f"New Contact Form: {contact_obj.service} - {contact_obj.name}",
                "html": html_content
            }
            
            try:
                await asyncio.to_thread(resend.Emails.send, params)
                logger.info(f"Email notification sent for submission {contact_obj.id}")
            except Exception as e:
                logger.error(f"Failed to send email notification: {str(e)}")
                # Don't fail the request if email fails
        
        return contact_obj
        
    except Exception as e:
        logger.error(f"Error creating contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact submissions"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for submission in submissions:
        if isinstance(submission['timestamp'], str):
            submission['timestamp'] = datetime.fromisoformat(submission['timestamp'])
    
    return submissions


@api_router.post("/portfolio", response_model=PortfolioItem)
async def create_portfolio_item(input: PortfolioItemCreate):
    """Create a new portfolio item"""
    portfolio_dict = input.model_dump()
    portfolio_obj = PortfolioItem(**portfolio_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = portfolio_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    _ = await db.portfolio_items.insert_one(doc)
    return portfolio_obj


@api_router.get("/portfolio", response_model=List[PortfolioItem])
async def get_portfolio_items(category: Optional[str] = None):
    """Get all portfolio items, optionally filtered by category"""
    query = {}
    if category:
        query['category'] = category
    
    items = await db.portfolio_items.find(query, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for item in items:
        if isinstance(item['created_at'], str):
            item['created_at'] = datetime.fromisoformat(item['created_at'])
    
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
