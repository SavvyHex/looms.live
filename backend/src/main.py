import os
import logging
import datetime
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse

from .daily_title import load_cache, save_cache, deterministic_title, call_gemini

logger = logging.getLogger("uvicorn.error")

app = FastAPI(title="Looms Daily Title")


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
