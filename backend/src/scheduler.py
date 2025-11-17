import os
import logging
import datetime
from .daily_title import call_gemini, deterministic_title
from .supabase_client import insert_prompt

logger = logging.getLogger("scheduler")


async def generate_and_save_daily_title():
    """
    Background task to generate a daily title at midnight UTC and insert into Supabase.
    Called by APScheduler at midnight.
    """
    today = datetime.datetime.utcnow().date().isoformat()
    logger.info(f"⏰ Running midnight title generation for {today}...")
    
    # Generate title: try Gemini first, then fallback
    prompt = (
        "You are a poet. Generate ONLY a short, evocative poem title (4-7 words). "
        "Examples: \"Silent Harbor\", \"The Silver Thread\", \"Echoes of Tomorrow\". "
        "Generate a new unique title now:"
    )
    
    title = await call_gemini(prompt)
    source = "gemini"
    
    if not title:
        title = deterministic_title(today)
        source = "fallback"
        logger.warning(f"Gemini failed; using fallback: {title}")
    
    # Insert into Supabase
    success = insert_prompt(title, today, source)
    if success:
        logger.info(f"✓ Midnight title generated and saved: \"{title}\" ({source})")
    else:
        logger.error(f"Failed to save title to Supabase: \"{title}\"")
