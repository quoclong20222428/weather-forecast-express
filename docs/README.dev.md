# Hướng Dẫn Cài Đặt Môi Trường Development

Hướng dẫn này sẽ giúp bạn thiết lập dự án Weather Forecast Express cho môi trường phát triển local sử dụng Docker Compose.

## Yêu Cầu Trước Khi Bắt Đầu

Trước khi bắt đầu, đảm bảo bạn đã cài đặt các công cụ sau:
- [Node.js](https://nodejs.org/) (phiên bản 18 trở lên)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

## Các Bước Cài Đặt

### 1. Clone Repository

```bash
git clone https://github.com/quoclong20222428/weather-forecast-express.git
cd weather-forecast-express
```

### 2. Cài Đặt Dependencies

```bash
npm install
```

### 3. Cấu Hình Biến Môi Trường

Tạo file `.env` trong thư mục gốc và cấu hình các biến cần thiết:

```env
# Cấu hình PostgreSQL
PG_USER=your_postgres_user
PG_PASSWORD=your_postgres_password
PG_DATABASE=weather_forecast_db

# Database URL cho Prisma
DATABASE_URL=postgresql://${PG_USER}:${PG_PASSWORD}@localhost:5432/${PG_DATABASE}

# Cấu hình Redis
REDIS_HOST=redis
REDIS_PORT=6379

# API Keys
OPENWEATHER_API_KEY=your_openweather_api_key

# Cấu hình Server
PORT=3000
NODE_ENV=development
```

### 4. Khởi Động Docker Services

Khởi động các container PostgreSQL và Redis sử dụng Docker Compose:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Lệnh này sẽ khởi động:
- **PostgreSQL** trên cổng `5432`
- **Redis** trên cổng `6379`

### 5. Chạy Database Migrations

Áp dụng Prisma migrations để thiết lập schema database:

```bash
npx prisma migrate dev
```

### 6. Generate Prisma Client

Tạo Prisma client:

```bash
npx prisma generate
```

### 7. Import Seed Data (Optional)

Để sử dụng tính năng tìm kiếm địa điểm (location search), bạn cần import dữ liệu mẫu vào database:

#### Bước 1: Tải file seed data
Download file `seed_location.ndjson` từ Google Drive:
👉 [Download seed_location.ndjson](https://drive.google.com/file/d/1229nlkpceRMzy3vb1oErkJQ71AQDeVDw/view?usp=sharing)

#### Bước 2: Đặt file vào đúng vị trí
Sau khi tải về, đặt file `seed_location.ndjson` vào thư mục:
```
prisma/seeds/seed_location.ndjson
```

#### Bước 3: Enable unaccent extension
Kết nối vào PostgreSQL và chạy lệnh:
```bash
docker exec -it weather_postgres psql -U your_postgres_user -d weather_forecast_db -c "CREATE EXTENSION IF NOT EXISTS unaccent;"
```

Hoặc chạy trực tiếp trong database client:
```sql
CREATE EXTENSION IF NOT EXISTS unaccent;
```

#### Bước 4: Import data vào database
```bash
npm run seed
```

> **Lưu ý:** File seed data có dung lượng ~535MB chứa hơn 2 triệu địa điểm trên thế giới. Quá trình import có thể mất vài phút.

### 8. Khởi Động Development Server

Chạy ứng dụng ở chế độ development với hot-reload:

```bash
npm run dev
```

Server sẽ khởi động tại `http://localhost:5001`

## 🐳 Docker Configurations

Dự án cung cấp các cấu hình Docker khác nhau cho các giai đoạn phát triển và triển khai:

### Development Configuration

**Files**: `docker-compose.yml`, `docker-compose.dev.yml`, `Dockerfile`

**Sử dụng khi**: Phát triển cục bộ với PostgreSQL và Redis trong containers

**Khởi động**:
```bash
# PowerShell
.\docker.ps1 dev

# Bash/Terminal
docker-compose -f docker-compose.yml up -d
# Hoặc
docker-compose -f docker-compose.dev.yml up -d
```

**Features**:
- ✅ Local PostgreSQL database (port 5432)
- ✅ Local Redis cache (port 6379)
- ✅ Auto-seed dữ liệu location khi khởi động
- ✅ Auto-migrate database schema
- ✅ Hot reload code changes
- ✅ Persistent volumes (`postgres_data`, `redis_data`)
- ✅ Health checks trên tất cả services

**Services**:
```yaml
api:
  - Port: 5001
  - Dockerfile: ./Dockerfile
  - Hot reload: Enabled (nodemon)
  
postgres:
  - Image: postgres:16-alpine
  - Port: 5432
  - Volume: postgres_data (persistent)
  
redis:
  - Image: redis:7-alpine
  - Port: 6379
  - Volume: redis_data (persistent)
```

**Dừng**:
```bash
# PowerShell
.\docker.ps1 dev-down

# Bash/Terminal
docker-compose -f docker-compose.yml down
```

**View logs**:
```bash
# PowerShell
.\docker.ps1 logs-api

# Bash/Terminal
docker-compose -f docker-compose.yml logs -f api
```

---

### Production Configuration

**Files**: `docker-compose.prod.yml`, `Dockerfile.prod`, `docker-entrypoint.prod.sh`

**Sử dụng khi**: Triển khai lên cloud (Render, Azure, AWS) với external managed services

**Features**:
- ✅ API container chỉ (no local postgres/redis)
- ✅ Kết nối external PostgreSQL (Aiven, Supabase, Neon)
- ✅ Kết nối external Redis (Upstash, Redis Cloud)
- ✅ Migration-only (skip auto-seed)
- ✅ Graceful error handling (skip P3005 migration errors)
- ✅ Separate container name, image, network
- ✅ Optimized for cloud platforms

**Environment Variables**:
```env
# External Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# External Redis
REDIS_URL=rediss://default:password@host:port

# Server & Auth
PORT=5001
NODE_ENV=production
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
CLIENT_URL=https://your-frontend.com
CORS_ORIGIN=https://your-frontend.com
```

**Khởi động Local**:
```bash
# PowerShell
.\docker.ps1 prod

# Bash/Terminal
docker-compose -f docker-compose.prod.yml up -d --build
```

**Dừng**:
```bash
# PowerShell
.\docker.ps1 prod-down

# Bash/Terminal
docker-compose -f docker-compose.prod.yml down
```

---

### Docker Management Script (docker.ps1)

PowerShell script để dễ dàng quản lý tất cả Docker operations:

```powershell
# Development
.\docker.ps1 dev              # Start dev (postgres + redis + api)
.\docker.ps1 dev-down         # Stop dev
.\docker.ps1 logs-api         # View API logs
.\docker.ps1 logs-db          # View database logs
.\docker.ps1 logs-redis       # View Redis logs

# Production
.\docker.ps1 prod             # Start prod (api only with external services)
.\docker.ps1 prod-down        # Stop prod

# Database
.\docker.ps1 seed             # Run seed script
.\docker.ps1 migrate          # Run database migrations
.\docker.ps1 backup-db        # Backup database
.\docker.ps1 restore-db       # Restore database

# Management
.\docker.ps1 rebuild          # Rebuild all images
.\docker.ps1 ps               # Show running containers
.\docker.ps1 health           # Check health endpoints
.\docker.ps1 shell-api        # SSH into API container
.\docker.ps1 shell-db         # SSH into DB container
.\docker.ps1 clean            # Remove all containers/images
```

---

### Image Size & Performance

| Config | Image Size | Build Time | Services | Use Case |
|--------|-----------|-----------|----------|----------|
| `Dockerfile` (dev) | 654MB | ~2-3 min | API + DB + Redis | Local development |
| `Dockerfile.prod` (prod) | 654MB | ~2-3 min | API only | Cloud deployment |

**Optimization**:
- Multi-stage build (builder → production)
- Alpine Linux base (node:22-alpine)
- Non-root user execution
- dumb-init process manager
- Health checks & auto-restart

---

### Recommended External Services

**PostgreSQL**:
- Aiven ($15/month, 20GB)
- Supabase (1GB free)
- Neon (512MB free)
- Railway (pay-as-you-go)

**Redis**:
- Upstash (free tier: 256MB, 10K commands/day)
- Redis Cloud (free tier: 30MB)
- Render (with database hosting)

## Các Lệnh Hữu Ích

### Quản Lý Docker

```bash
# Dừng tất cả containers
docker-compose -f docker-compose.dev.yml down

# Xem logs của containers
docker-compose -f docker-compose.dev.yml logs -f

# Khởi động lại containers
docker-compose -f docker-compose.dev.yml restart

# Xóa containers và volumes
docker-compose -f docker-compose.dev.yml down -v
```

### Quản Lý Database

```bash
# Mở Prisma Studio (giao diện quản lý database)
npx prisma studio

# Reset database
npx prisma migrate reset

# Tạo migration mới
npx prisma migrate dev --name ten_migration
```

### Development

```bash
# Chạy ở chế độ development
npm run dev

# Build cho production
npm run build

# Chạy bản build production
npm start

# Chạy linter
npm run lint
```

## Xử Lý Sự Cố

### Cổng Đã Được Sử Dụng

Nếu bạn gặp lỗi xung đột cổng, đảm bảo không có dịch vụ nào khác đang chạy trên cổng 5001, 5432, hoặc 6379.

```powershell
# PowerShell - Kiểm tra process sử dụng port
Get-NetTCPConnection -LocalPort 5001 | Select-Object -Property State, OwningProcess
```

### Lỗi Kết Nối PostgreSQL

Đảm bảo các Docker containers đang chạy:
```bash
docker ps
```

Bạn sẽ thấy `weather_postgres` và `weather_redis` trong danh sách.

### Lỗi Database Migration

Nếu migration thất bại, thử reset database:
```bash
npx prisma migrate reset
```

### Redis Connection Issues

Nếu Redis connection fail:
1. Check Redis container status: `docker logs weather_redis`
2. Verify Redis is listening: `docker exec weather_redis redis-cli ping`
3. Check connection string: `REDIS_URL` trong `.env`

## Cấu Trúc Dự Án

```
weather-forecast-express/
├── prisma/                      # Database schema và migrations
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # Migration files
│   └── seeds/                  # Seed data files
├── src/
│   ├── config/                 # Configuration files
│   │   ├── db.ts              # Database config
│   │   └── passport.ts        # OAuth config
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Express middleware
│   │   ├── auth/              # Authentication middleware
│   │   └── weather/           # Weather cache middleware
│   ├── routes/                 # API routes
│   ├── services/               # Business logic
│   │   ├── auth/              # Auth services
│   │   └── weather/           # Weather services
│   ├── utils/                  # Utility functions
│   │   ├── cacheHelper.ts     # Redis cache utilities
│   │   └── redisClient.ts     # Redis client config
│   ├── app.ts                  # Express app setup
│   └── server.ts               # Server startup
├── Dockerfile                  # Development Dockerfile
├── Dockerfile.prod             # Production Dockerfile
├── docker-compose.yml          # Development docker-compose
├── docker-compose.dev.yml      # Alternate dev config
├── docker-compose.prod.yml     # Production docker-compose
├── docker-entrypoint.sh        # Dev entrypoint (with seed)
├── docker-entrypoint.prod.sh   # Prod entrypoint (migration only)
├── docker.ps1                  # PowerShell management script
├── .env.example                # Environment template
└── package.json                # Dependencies
```

## Bước Tiếp Theo

Sau khi hoàn thành cài đặt:
1. Xem [README.md](../README.md) chính để biết thêm về tài liệu API
2. Khám phá các API endpoints tại `http://localhost:5001`
3. Sử dụng Prisma Studio để xem và quản lý dữ liệu database: `npx prisma studio`

---

Chúc bạn code vui vẻ! 🚀
