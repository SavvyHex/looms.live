import os
import logging
import datetime
from contextlib import asynccontextmanager
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from .daily_title import load_cache, save_cache, deterministic_title, call_gemini
from .scheduler import generate_and_save_daily_title

logger = logging.getLogger("uvicorn.error")

# Initialize scheduler
scheduler = AsyncIOScheduler()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage app startup and shutdown (FastAPI 0.93+)"""
    # Startup: configure and start scheduler
    logger.info("Starting APScheduler...")
    scheduler.add_job(
        generate_and_save_daily_title,
        trigger="cron",
        hour=0,
        minute=0,
        timezone="UTC",
        id="daily_title_generator",
        name="Generate daily title at midnight UTC"
    )
    scheduler.start()
    logger.info("✓ Scheduler started; daily title generation scheduled for 00:00 UTC")
    
    yield
    
    # Shutdown: stop scheduler
    logger.info("Shutting down APScheduler...")
    scheduler.shutdown()


app = FastAPI(title="Looms Daily Title", lifespan=lifespan)


@app.get("/daily-title")
async def get_daily_title():
    try:
        today = datetime.datetime.utcnow().date().isoformat()

        cached = load_cache()
        if cached and cached.get("date") == today:
            logger.info(f"Using cached title from {cached.get('date')}: {cached.get('title')}")
            return JSONResponse({"title": cached.get("title"), "source": "cache"})

        prompt = (
            "You are a poet. Generate ONLY a short, evocative poem title (4-7 words). "
            "Examples: \"Silent Harbor\", \"The Silver Thread\", \"Echoes of Tomorrow\". "
            "Generate a new unique title now:"
        )

        ai_title = await call_gemini(prompt)
        if ai_title:
            save_cache(today, ai_title, "gemini")
            return JSONResponse({"title": ai_title, "source": "gemini"})

        fallback = deterministic_title(today)
        save_cache(today, fallback, "fallback")
        return JSONResponse({"title": fallback, "source": "fallback"})
    except Exception as exc:
        logger.exception("API route error: %s", exc)
        today = datetime.datetime.utcnow().date().isoformat()
        fallback = deterministic_title(today)
        return JSONResponse({"title": fallback, "source": "error-fallback"}, status_code=500)

