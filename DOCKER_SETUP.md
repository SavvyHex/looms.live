# looms.live – Docker Setup Guide

## Quick Start

1. **Create `.env` from your `.env.local`** (if you haven't already):
   ```bash
   cp .env.local .env
   ```
   Or copy from `.env.example` and fill in your secrets.

2. **Build and start all services**:
   ```bash
   make up
   ```
   This will:
   - Check if `.env` exists (auto-copy from `.env.local` if not)
   - Build frontend and backend images with environment variables injected
   - Start both services in background

3. **Access the app**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8001/daily-title

4. **View logs**:
   ```bash
   make logs
   ```

5. **Stop services**:
   ```bash
   make down
   ```

## Available Make Commands

- `make help` – Show all available targets
- `make env-check` – Verify `.env` is present
- `make build` – Build images
- `make up` – Build and start services (recommended; includes `env-check`)
- `make down` – Stop and remove containers
- `make logs` – Stream logs from all services
- `make stop` – Stop without removing containers
- `make clean` – Remove containers, volumes, and images (hard reset)

## Manual Docker Commands (if not using Make)

If you don't have `make` installed or prefer direct commands:

```bash
# Copy env file if needed
cp .env.local .env

# Build images
docker compose build
# or (legacy docker-compose):
docker-compose build

# Start services
docker compose up -d
# or:
docker-compose up -d

# View logs
docker compose logs -f
# or:
docker-compose logs -f

# Stop
docker compose down
# or:
docker-compose down
```

## Environment Variables

The Makefile and docker-compose setup expect a `.env` file in the repo root with:

```bash
GEMINI_API_KEY=your_gemini_key_here
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
```

- `GEMINI_API_KEY` is passed to both backend and frontend builds.
- `NEXT_PUBLIC_SUPABASE_*` are injected into the Next.js build at compile time (so they appear in static assets).
- Never commit `.env`; it's gitignored.

## Troubleshooting

**"Cannot connect to Docker daemon"**
- Start Docker daemon: `systemctl start docker` (Linux) or open Docker Desktop (macOS/Windows)

**"unknown command: docker compose"**
- You have only the legacy `docker-compose` binary. The Makefile detects this and uses the right command automatically. If running manually, use `docker-compose` instead of `docker compose`.

**Build fails with missing dependencies**
- Ensure your `package.json` and `requirements.txt` are up to date.
- Delete images and rebuild: `make clean && make up`

**Services don't see environment variables**
- Ensure `.env` exists in the repo root (not `frontend/.env.local`).
- Rebuild: `make build`

**NEXT_PUBLIC_* variables not in frontend**
- The Dockerfile receives them as ARG and sets ENV before `npm run build`. If the build still doesn't see them, ensure they're in `.env` before running `make build`.

## Development Workflow

### Local Development (Recommended)
For faster iteration, run services locally without Docker:

```bash
# Terminal 1: Backend
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.main:app --reload --host 0.0.0.0 --port 8001
```

```bash
# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

Then set `DAILY_TITLE_BACKEND_URL=http://localhost:8001` in `frontend/.env.local`.

### Docker Development
To use Docker with hot-reload, you'd need a `docker-compose.override.yml` with bind mounts and `npm run dev` command. The current setup is optimized for production.

## Production Deployment

- Update `DAILY_TITLE_BACKEND_URL` in `docker-compose.yml` or as an environment variable to point to your production backend.
- Ensure all secrets (`GEMINI_API_KEY`, Supabase keys) are set in your deployment platform (Vercel, AWS, etc.).
- Use the Dockerfiles as-is for containerized deployments.

## Next Steps

- Set up Supabase and run migrations: see `frontend/db/` for SQL files.
- Implement verse creation endpoints and integrate with database.
- Add authentication (Supabase Auth or NextAuth).
