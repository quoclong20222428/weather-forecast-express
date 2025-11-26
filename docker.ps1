# Docker Management Script for Windows
# Usage: .\docker.ps1 <command>

param(
    [Parameter(Mandatory=$false)]
    [string]$Command = "help",
    
    [Parameter(Mandatory=$false)]
    [string]$File = ""
)

function Show-Help {
    Write-Host "`nAvailable commands:" -ForegroundColor Cyan
    Write-Host "  build         - Build Docker images" -ForegroundColor Green
    Write-Host "  up            - Start services" -ForegroundColor Green
    Write-Host "  down          - Stop services" -ForegroundColor Green
    Write-Host "  logs          - View all logs" -ForegroundColor Green
    Write-Host "  logs-api      - View API logs" -ForegroundColor Green
    Write-Host "  logs-db       - View Database logs" -ForegroundColor Green
    Write-Host "  ps            - View container status" -ForegroundColor Green
    Write-Host "  health        - Check health of all services" -ForegroundColor Green
    Write-Host "  clean         - Remove containers and volumes (CAREFUL!)" -ForegroundColor Yellow
    Write-Host "  rebuild       - Rebuild everything from scratch" -ForegroundColor Yellow
    Write-Host "  dev           - Start development environment" -ForegroundColor Green
    Write-Host "  dev-down      - Stop development environment" -ForegroundColor Green
    Write-Host "  prod          - Start production environment (API only, external DB/Redis)" -ForegroundColor Green
    Write-Host "  prod-down     - Stop production environment" -ForegroundColor Green
    Write-Host "  shell-api     - Access API container shell" -ForegroundColor Green
    Write-Host "  shell-db      - Access PostgreSQL shell" -ForegroundColor Green
    Write-Host "  shell-redis   - Access Redis CLI" -ForegroundColor Green
    Write-Host "  seed          - Run database seed manually" -ForegroundColor Green
    Write-Host "  migrate       - Run database migrations" -ForegroundColor Green
    Write-Host "  backup-db     - Backup database" -ForegroundColor Green
    Write-Host "  restore-db    - Restore database (use -File parameter)" -ForegroundColor Green
    Write-Host "  stats         - View resource usage" -ForegroundColor Green
    Write-Host "  size          - Check image sizes" -ForegroundColor Green
    Write-Host ""
}

function Build-Images {
    Write-Host "Building Docker images..." -ForegroundColor Cyan
    docker-compose build
}

function Start-Services {
    Write-Host "Starting services..." -ForegroundColor Cyan
    docker-compose up -d
}

function Stop-Services {
    Write-Host "Stopping services..." -ForegroundColor Cyan
    docker-compose down
}

function Show-Logs {
    Write-Host "Showing logs (Ctrl+C to exit)..." -ForegroundColor Cyan
    docker-compose logs -f
}

function Show-ApiLogs {
    Write-Host "Showing API logs (Ctrl+C to exit)..." -ForegroundColor Cyan
    docker-compose logs -f api
}

function Show-DbLogs {
    Write-Host "Showing Database logs (Ctrl+C to exit)..." -ForegroundColor Cyan
    docker-compose logs -f postgres
}

function Show-Status {
    Write-Host "Container status:" -ForegroundColor Cyan
    docker-compose ps
}

function Check-Health {
    Write-Host "`n=== API Health ===" -ForegroundColor Cyan
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5001/health" -UseBasicParsing
        $response.Content | ConvertFrom-Json | ConvertTo-Json
    } catch {
        Write-Host "API is not responding" -ForegroundColor Red
    }
    
    Write-Host "`n=== PostgreSQL Health ===" -ForegroundColor Cyan
    docker exec weather_postgres pg_isready -U $env:PG_USER
    
    Write-Host "`n=== Redis Health ===" -ForegroundColor Cyan
    docker exec weather_redis redis-cli ping
    
    Write-Host "`n=== Container Status ===" -ForegroundColor Cyan
    docker-compose ps
}

function Clean-All {
    Write-Host "WARNING: This will remove all containers and volumes!" -ForegroundColor Yellow
    $confirm = Read-Host "Are you sure? (yes/no)"
    if ($confirm -eq "yes") {
        docker-compose down -v
        docker system prune -f
        Write-Host "Cleanup complete!" -ForegroundColor Green
    } else {
        Write-Host "Cancelled." -ForegroundColor Yellow
    }
}

function Rebuild-All {
    Write-Host "Rebuilding everything from scratch..." -ForegroundColor Cyan
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
}

function Start-Dev {
    Write-Host "Starting development environment..." -ForegroundColor Cyan
    docker-compose -f docker-compose.yml up -d
}

function Stop-Dev {
    Write-Host "Stopping development environment..." -ForegroundColor Cyan
    docker-compose -f docker-compose.yml down
}

function Start-Prod {
    Write-Host "Starting production environment..." -ForegroundColor Cyan
    docker-compose -f docker-compose.prod.yml up -d --build
    Write-Host "`n✅ Production containers started!" -ForegroundColor Green
    Write-Host "`nTo view logs, run:" -ForegroundColor Yellow
    Write-Host "  docker logs weather_api_prod -f" -ForegroundColor Cyan
}

function Stop-Prod {
    Write-Host "Stopping production environment..." -ForegroundColor Cyan
    docker-compose -f docker-compose.prod.yml down
}

function Shell-Api {
    Write-Host "Accessing API container..." -ForegroundColor Cyan
    docker exec -it weather_api sh
}

function Shell-Db {
    Write-Host "Accessing PostgreSQL..." -ForegroundColor Cyan
    docker exec -it weather_postgres psql -U $env:PG_USER -d $env:PG_DATABASE
}

function Shell-Redis {
    Write-Host "Accessing Redis CLI..." -ForegroundColor Cyan
    docker exec -it weather_redis redis-cli
}

function Run-Seed {
    Write-Host "Running database seed..." -ForegroundColor Cyan
    docker exec -it weather_api node dist/seeds/seed.js
}

function Run-Migrate {
    Write-Host "Running database migrations..." -ForegroundColor Cyan
    docker exec -it weather_api npx prisma migrate deploy
}

function Backup-Database {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupFile = "backup_$timestamp.sql"
    Write-Host "Backing up database to $backupFile..." -ForegroundColor Cyan
    docker exec weather_postgres pg_dump -U $env:PG_USER $env:PG_DATABASE > $backupFile
    Write-Host "Backup complete: $backupFile" -ForegroundColor Green
}

function Restore-Database {
    if ([string]::IsNullOrEmpty($File)) {
        Write-Host "Error: Please specify backup file with -File parameter" -ForegroundColor Red
        Write-Host "Example: .\docker.ps1 restore-db -File backup.sql" -ForegroundColor Yellow
        return
    }
    
    if (-not (Test-Path $File)) {
        Write-Host "Error: File '$File' not found!" -ForegroundColor Red
        return
    }
    
    Write-Host "Restoring database from $File..." -ForegroundColor Cyan
    Get-Content $File | docker exec -i weather_postgres psql -U $env:PG_USER $env:PG_DATABASE
    Write-Host "Restore complete!" -ForegroundColor Green
}

function Show-Stats {
    Write-Host "Resource usage (Ctrl+C to exit):" -ForegroundColor Cyan
    docker stats weather_api weather_postgres weather_redis
}

function Show-Size {
    Write-Host "`n=== Image Sizes ===" -ForegroundColor Cyan
    docker images | Select-String -Pattern "weather|postgres|redis|REPOSITORY"
}

# Main command router
switch ($Command.ToLower()) {
    "help" { Show-Help }
    "build" { Build-Images }
    "up" { Start-Services }
    "down" { Stop-Services }
    "logs" { Show-Logs }
    "logs-api" { Show-ApiLogs }
    "logs-db" { Show-DbLogs }
    "ps" { Show-Status }
    "health" { Check-Health }
    "clean" { Clean-All }
    "rebuild" { Rebuild-All }
    "dev" { Start-Dev }
    "dev-down" { Stop-Dev }
    "prod" { Start-Prod }
    "prod-down" { Stop-Prod }
    "shell-api" { Shell-Api }
    "shell-db" { Shell-Db }
    "shell-redis" { Shell-Redis }
    "seed" { Run-Seed }
    "migrate" { Run-Migrate }
    "backup-db" { Backup-Database }
    "restore-db" { Restore-Database }
    "stats" { Show-Stats }
    "size" { Show-Size }
    default {
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Show-Help
    }
}
