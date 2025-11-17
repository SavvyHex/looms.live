.PHONY: help up down build logs stop clean env-check

# Detect which compose command is available
COMPOSE_CMD := $(shell command -v docker-compose 2>/dev/null || echo "docker compose")

help:
	@echo "Makefile targets for looms.live:"
	@echo "  make env-check    - Check if .env exists and is configured"
	@echo "  make build        - Build frontend and backend images"
	@echo "  make up           - Build and start services (detached)"
	@echo "  make down         - Stop and remove containers"
	@echo "  make logs         - View logs from all services"
	@echo "  make stop         - Stop services without removing"
	@echo "  make clean        - Remove all containers, volumes, and images"

env-check:
	@if [ ! -f .env ]; then \
		echo "❌ .env file not found. Creating from .env.local..."; \
		if [ -f .env.local ]; then \
			cp .env.local .env; \
			echo "✓ .env created from .env.local"; \
		else \
			echo "❌ Neither .env nor .env.local found. Please create .env with your secrets."; \
			echo "   Example: cp .env.example .env"; \
			exit 1; \
		fi; \
	else \
		echo "✓ .env file found"; \
	fi

build: env-check
	@echo "Building images..."
	$(COMPOSE_CMD) build

up: env-check build
	@echo "Starting services..."
	$(COMPOSE_CMD) up -d
	@echo "✓ Services started!"
	@echo "  Frontend: http://localhost:3000"
	@echo "  Backend:  http://localhost:8001"

down:
	@echo "Stopping services..."
	$(COMPOSE_CMD) down

logs:
	$(COMPOSE_CMD) logs -f

stop:
	$(COMPOSE_CMD) stop

clean: down
	@echo "Removing images and volumes..."
	$(COMPOSE_CMD) down --rmi all --volumes
	@echo "✓ Cleaned up"
