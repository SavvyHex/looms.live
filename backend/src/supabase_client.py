import os
import logging
from supabase import create_client

logger = logging.getLogger("supabase_client")

# Initialize Supabase client
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    logger.info("✓ Supabase client initialized")
else:
    supabase = None
    logger.warning("⚠ Supabase credentials not set; database operations disabled")


def insert_prompt(prompt_text: str, prompt_day: str, source: str = "system") -> bool:
    """
    Insert a new prompt into the Supabase prompts table.
    
    Args:
        prompt_text: The prompt text
        prompt_day: Date in YYYY-MM-DD format
        source: Source of the prompt (e.g., 'system', 'gemini', 'fallback')
    
    Returns:
        True if successful, False otherwise
    """
    if not supabase:
        logger.warning("Supabase not configured; skipping prompt insert")
        return False
    
    try:
        result = supabase.table("prompts").insert({
            "prompt_text": prompt_text,
            "prompt_day": prompt_day,
            "source": source
        }).execute()
        logger.info(f"✓ Inserted prompt: {prompt_text[:50]}... for {prompt_day}")
        return True
    except Exception as exc:
        logger.exception(f"Failed to insert prompt: {exc}")
        return False
