.PHONY: help build up down logs clean rebuild dev prod ps health

help: ## Hiển thị hướng dẫn
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Build Docker images
	docker-compose build

up: ## Start services
	docker-compose up -d

down: ## Stop services
	docker-compose down

logs: ## Xem logs
	docker-compose logs -f

logs-api: ## Xem logs của API
	docker-compose logs -f api

logs-db: ## Xem logs của Database
	docker-compose logs -f postgres

ps: ## Xem trạng thái containers
	docker-compose ps

health: ## Kiểm tra health của services
	@echo "=== API Health ==="
	@curl -s http://localhost:5001/health | jq . || echo "API is not responding"
	@echo "\n=== PostgreSQL Health ==="
	@docker exec weather_postgres pg_isready -U ${PG_USER} || echo "PostgreSQL is not ready"
	@echo "\n=== Redis Health ==="
	@docker exec weather_redis redis-cli ping || echo "Redis is not responding"
	@echo "\n=== Container Status ==="
	@docker-compose ps

clean: ## Xóa containers và volumes (CAREFUL!)
	docker-compose down -v
	docker system prune -f

rebuild: ## Rebuild toàn bộ
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d

dev: ## Start development environment
	docker-compose -f docker-compose.dev.yml up -d

dev-down: ## Stop development environment
	docker-compose -f docker-compose.dev.yml down

prod: ## Start production environment
	docker-compose up -d --build

shell-api: ## Truy cập vào API container
	docker exec -it weather_api sh

shell-db: ## Truy cập vào PostgreSQL
	docker exec -it weather_postgres psql -U ${PG_USER} -d ${PG_DATABASE}

shell-redis: ## Truy cập vào Redis
	docker exec -it weather_redis redis-cli

seed: ## Chạy seed manually
	docker exec -it weather_api node dist/seeds/seed.js

migrate: ## Chạy migrations
	docker exec -it weather_api npx prisma migrate deploy

backup-db: ## Backup database
	docker exec weather_postgres pg_dump -U ${PG_USER} ${PG_DATABASE} > backup_$$(date +%Y%m%d_%H%M%S).sql

restore-db: ## Restore database (specify file with FILE=backup.sql)
	docker exec -i weather_postgres psql -U ${PG_USER} ${PG_DATABASE} < $(FILE)

stats: ## Xem resource usage
	docker stats weather_api weather_postgres weather_redis

inspect-api: ## Inspect API image
	docker inspect weather-forecast-api:latest

size: ## Kiểm tra kích thước images
	@echo "=== Image Sizes ==="
	@docker images | grep -E "weather|postgres|redis|SIZE"
