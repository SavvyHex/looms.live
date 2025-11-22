import os
import json
import logging
from pathlib import Path
from typing import Optional, Dict
import datetime
import asyncio

import httpx

logger = logging.getLogger("daily_title")
logger.setLevel(logging.DEBUG)

# Cache file path: <repo>/backend/.cache/daily-title.json
BASE_DIR = Path(__file__).resolve().parents[1]
CACHE_FILE = BASE_DIR / ".cache" / "daily-title.json"


def ensure_cache_dir() -> None:
    CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)


def load_cache() -> Optional[Dict[str, str]]:
    try:
        if CACHE_FILE.exists():
            return json.loads(CACHE_FILE.read_text(encoding="utf-8"))
    except Exception as exc:
        logger.exception("Failed to load cache: %s", exc)
    return None


def save_cache(date: str, title: str, source: str) -> None:
    try:
        ensure_cache_dir()
        CACHE_FILE.write_text(json.dumps({"date": date, "title": title, "source": source}, indent=2), encoding="utf-8")
    except Exception as exc:
        logger.exception("Failed to save cache: %s", exc)


def seconds_until_next_midnight() -> int:
    now = datetime.datetime.utcnow()
    tomorrow = datetime.datetime(year=now.year, month=now.month, day=now.day) + datetime.timedelta(days=1)
    # midnight in UTC of next day
    tomorrow_midnight = datetime.datetime(tomorrow.year, tomorrow.month, tomorrow.day, tzinfo=datetime.timezone.utc)
    delta = tomorrow_midnight - now.replace(tzinfo=datetime.timezone.utc)
    return int(delta.total_seconds())


def hash_string(s: str) -> int:
    # FNV-1a 32-bit
    h = 2166136261
    for ch in s:
        h ^= ord(ch)
        h = (h * 16777619) & 0xFFFFFFFF
    return h


def seeded_rng(seed: int):
    s = seed & 0xFFFFFFFF

    def rand():
        nonlocal s
        s = ( (s * 1664525) + 1013904223 ) & 0xFFFFFFFF
        return s / 4294967296.0

    return rand


def deterministic_title(date_str: str) -> str:
    seed = hash_string(date_str + "|looms.title.v1")
    rand = seeded_rng(seed)

    adjectives = ['Silent', 'Silver', 'Hidden', 'Lonely', 'Golden', 'Wandering', 'Broken', 'Electric', 'Velvet', 'Fickle']
    nouns = ['Lantern', 'Harbor', 'Garden', 'Clock', 'Letter', 'River', 'Carousel', 'Shadow', 'Tide', 'Thread']
    places = ['the Night', 'the Quiet', 'the Sea', 'an Empty Room', 'the Margin', 'the Edge', 'the Dawn', 'the Archive', 'the Roof', 'the Attic']

    def pick(arr):
        return arr[int(rand() * len(arr))]

    a = pick(adjectives)
    n = pick(nouns)
    p = pick(places)

    formats = [f"{a} {n}", f"The {a} {n}", f"{n} of {p}"]
    return formats[int(rand() * len(formats))]


async def call_gemini(prompt: str) -> Optional[str]:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        logger.warning("GEMINI_API_KEY not set; using fallback generator.")
        return None

    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"

    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "temperature": 0.9,
            "maxOutputTokens": 100,
            "candidateCount": 1,
        },
        "systemInstruction": {
            "parts": [{"text": "You are a concise poetry title generator. Output ONLY the title, nothing else."}]
        }
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(endpoint, json=payload)
            if resp.status_code != 200:
                logger.error("Gemini API error: %s %s", resp.status_code, resp.text)
                return None
            data = resp.json()
            # Mirror the access pattern from the TypeScript implementation
            try:
                candidates = data.get("candidates") or []
                if candidates and candidates[0].get("content") and candidates[0]["content"].get("parts"):
                    text = candidates[0]["content"]["parts"][0].get("text", "").strip()
                    clean = text.strip('"\'')
                    logger.info(f"✓ Generated title via Gemini: \"{clean}\"")
                    return clean
            except Exception:
                logger.exception("Unexpected Gemini response format: %s", data)
                return None
    except Exception as exc:
        logger.exception("Gemini API call failed: %s", exc)
        return None

    logger.warning("Gemini returned no usable content.")
    return None
