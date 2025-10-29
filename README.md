# 🌦️ Weather Forecast Express API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white&style=flat)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white&style=flat)

**Backend REST API mạnh mẽ cho ứng dụng dự báo thời tiết**

Xây dựng với Express + TypeScript + Prisma + Redis, tích hợp OpenWeather API

</div>

---

## 📋 Mục lục

<table align="center">
<tr>
<td width="50%">

### 📖 Tổng quan
- [🎯 Giới thiệu](#-giới-thiệu)
- [🚀 Tính năng](#-tính-năng)
- [🛠 Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [🗂 Cấu trúc dự án](#-cấu-trúc-dự-án)

### ⚙️ Cài đặt & Cấu hình
- [✅ Yêu cầu](#-yêu-cầu)
- [🔧 Cài đặt](#-cài-đặt)
- [⚙️ Cấu hình](#️-cấu-hình)
- [▶️ Chạy ứng dụng](#️-chạy-ứng-dụng)

</td>
<td width="50%">

### 🔌 API & Testing
- [📚 API Endpoints](#-api-endpoints)
- [🧪 Kiểm thử](#-kiểm-thử)
- [🔄 Quy trình phát triển](#-quy-trình-phát-triển)

### 📚 Tài liệu khác
- [🛠 Troubleshooting](#-troubleshooting)
- [📝 Ghi chú](#-ghi-chú)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

</td>
</tr>
</table>

---

## 🎯 Giới thiệu

Weather Forecast Express là một Backend REST API được xây dựng để phục vụ ứng dụng dự báo thời tiết. Dự án cung cấp các endpoint để:

- ✅ Quản lý danh sách thành phố yêu thích
- ✅ Lấy thông tin thời tiết theo tên thành phố, tọa độ địa lý (latitude/longitude)
- ✅ Tìm kiếm và gợi ý thành phố thông qua Geocoding API
- ✅ Cache dữ liệu thời tiết bằng Redis để tối ưu hiệu suất
- ✅ Lưu trữ dữ liệu với PostgreSQL và Prisma ORM
- ✅ Xử lý lỗi tập trung và logging request

## 🚀 Tính năng

### Quản lý thành phố
- Thêm/xóa thành phố vào danh sách yêu thích
- Lấy danh sách tất cả thành phố đã lưu
- Xem chi tiết thông tin thành phố

### Dữ liệu thời tiết
- Lấy thời tiết hiện tại theo tên thành phố
- Lấy thời tiết theo tọa độ địa lý (lat/lon)
- Lấy thời tiết theo OpenWeather City ID
- Làm mới dữ liệu thời tiết cho thành phố đã lưu

### Tối ưu hiệu suất
- **Redis Caching**: Cache dữ liệu thời tiết với TTL 10 phút
- **Smart Cache Keys**: Cache theo tên thành phố, tọa độ, và OpenWeather ID
- **Cache Middleware**: Tự động cache cho tất cả weather endpoints
- **Giảm API Calls**: Giảm thiểu số lượng request tới OpenWeather API
- **Fast Response**: Tăng tốc độ phản hồi từ milliseconds thay vì seconds

### Docker & Containerization
- **Docker Compose**: Orchestration cho PostgreSQL, Redis và App
- **Multi-container Setup**: Tách biệt services để dễ scale
- **Volume Persistence**: Dữ liệu database được lưu trữ persistent
- **Network Isolation**: Services giao tiếp qua Docker network
- **Easy Deployment**: Một lệnh để start tất cả services

### Middleware & Logging
- Request logging với thông tin chi tiết
- Xử lý lỗi tập trung
- Cache middleware cho weather endpoints
- CORS configuration
- Error handling middleware

## 🛠 Công nghệ sử dụng

### Backend Framework & Language
- **Node.js** (v18+) - JavaScript runtime
- **TypeScript** (v5.9) - Type-safe development
- **Express** (v5.1) - Web framework nhanh và linh hoạt

### Database & ORM
- **PostgreSQL** - Hệ quản trị cơ sở dữ liệu quan hệ
- **Prisma** (v6.17) - Modern ORM với type-safety
- **pg** - PostgreSQL client cho Node.js

### Caching & Performance
- **Redis** (v5.8) - In-memory caching
- Cache middleware tùy chỉnh cho weather data

### External APIs
- **OpenWeather API** - Dữ liệu thời tiết và geocoding
- **Axios** - HTTP client

### Development Tools
- **nodemon** - Auto-restart khi code thay đổi
- **ts-node** - TypeScript execution
- **Docker & Docker Compose** - Containerization

### Other Libraries
- **dotenv** - Environment variables management
- **cors** - Cross-Origin Resource Sharing

## 🗂 Cấu trúc dự án

```
weather-forecast-express/
├── prisma/
│   ├── schema.prisma              # Database schema và model definitions
│   └── migrations/                # Database migrations
├── src/
│   ├── app.ts                     # Express app configuration
│   ├── server.ts                  # HTTP server entry point
│   ├── config/
│   │   └── db.ts                  # Prisma client configuration
│   ├── controllers/
│   │   └── city.controller.ts     # Request/Response handlers
│   ├── middleware/
│   │   ├── index.ts               # Middleware exports
│   │   ├── cacheWeather.ts        # Redis cache middleware
│   │   ├── errorHandler.ts        # Error handling middleware
│   │   ├── httpError.ts           # Custom HTTP error class
│   │   ├── notFoundHandler.ts     # 404 handler
│   │   └── requestLogger.ts       # Request logging middleware
│   ├── routes/
│   │   └── city.routes.ts         # API endpoint definitions
│   ├── services/
│   │   └── weather.service.ts     # OpenWeather API & database operations
│   └── utils/
│       └── redisClient.ts         # Redis connection & utilities
├── .env                           # Environment variables (tạo riêng)
├── docker-compose.yml             # Docker services configuration
├── nodemon.json                   # Nodemon configuration
├── package.json                   # Dependencies & scripts
└── tsconfig.json                  # TypeScript configuration
```

### Mô tả các thành phần chính

- **`src/app.ts`** - Cấu hình Express app với các middleware (CORS, JSON parser, routes, error handling)
- **`src/server.ts`** - Khởi động HTTP server, load environment variables
- **`src/routes/city.routes.ts`** - Định nghĩa tất cả các endpoint `/api/cities`
- **`src/controllers/city.controller.ts`** - Xử lý logic request/response
- **`src/services/weather.service.ts`** - Gọi OpenWeather API và thao tác với database
- **`src/middleware/cacheWeather.ts`** - Middleware cache Redis cho weather data
- **`src/utils/redisClient.ts`** - Redis client connection và helper functions
- **`prisma/schema.prisma`** - Schema database và định nghĩa model `City`

## ✅ Yêu cầu

Trước khi bắt đầu, đảm bảo máy tính của bạn đã cài đặt:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** hoặc **yarn** (đi kèm với Node.js)
- **PostgreSQL** >= 13.x (có thể chạy qua Docker)
- **Redis** >= 6.x (có thể chạy qua Docker)
- **Docker & Docker Compose** (tùy chọn, để chạy PostgreSQL và Redis)
- **Tài khoản OpenWeather** và API key ([Đăng ký miễn phí](https://openweathermap.org/api))

## 🔧 Cài đặt

### Bước 1: Clone repository

```powershell
git clone https://github.com/quoclong20222428/weather-forecast-express.git
cd weather-forecast-express
```

### Bước 2: Cài đặt dependencies

```powershell
npm install
```

Lệnh này sẽ cài đặt tất cả các package cần thiết bao gồm:
- Express, TypeScript, Prisma
- PostgreSQL client (pg)
- Redis client
- Axios và các dependencies khác

## ⚙️ Cấu hình

### Bước 1: Tạo file môi trường (.env)

Tạo file `.env` trong thư mục gốc `weather-forecast-express/` với nội dung sau:

```env
# Server Configuration
PORT=5001

# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/weather_db?schema=public

# OpenWeather API Configuration
OW_API_KEY=your_openweather_api_key_here
OW_BASE_URL=https://api.openweathermap.org/data/2.5

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
CACHE_TTL=600

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

#### Hướng dẫn lấy OpenWeather API Key:

1. Truy cập [OpenWeather](https://openweathermap.org/api)
2. Đăng ký tài khoản miễn phí
3. Vào [API Keys Dashboard](https://home.openweathermap.org/api_keys)
4. Tạo API key mới hoặc copy key có sẵn
5. Thay thế `your_openweather_api_key_here` trong file `.env`

> ⚠️ **Lưu ý**: API key mới cần khoảng 10-15 phút để được kích hoạt.

### Bước 2: Khởi động PostgreSQL và Redis

#### Sử dụng Docker Compose (Khuyên dùng):

```powershell
docker compose up -d
```

Lệnh này sẽ khởi động cả PostgreSQL và Redis trong Docker containers.

#### Hoặc cài đặt thủ công:

- **PostgreSQL**: [Download](https://www.postgresql.org/download/)
- **Redis**: [Download](https://redis.io/download) hoặc sử dụng [Redis on Windows](https://github.com/microsoftarchive/redis/releases)

### Bước 3: Cấu hình Database với Prisma

#### 3.1. Generate Prisma Client:

```powershell
npx prisma generate
```

#### 3.2. Chạy migrations để tạo database schema:

```powershell
npx prisma migrate dev --name init
```

Hoặc nếu đã có migrations:

```powershell
npx prisma migrate deploy
```

#### 3.3. (Tùy chọn) Xem database với Prisma Studio:

```powershell
npx prisma studio
```

Prisma Studio sẽ mở tại `http://localhost:5555` cho phép bạn xem và chỉnh sửa dữ liệu.

## ▶️ Chạy ứng dụng

### Development Mode (với hot reload):

```powershell
npm run dev
```

Server sẽ chạy tại: **`http://localhost:5001`**

Cấu hình `nodemon` + `ts-node` cho phép auto-reload khi code thay đổi, không cần build trước.

### Production Mode:

```powershell
# Build TypeScript thành JavaScript
npm run build

# Chạy production server
npm start
```

### Kiểm tra server đang chạy:

```powershell
# Kiểm tra root endpoint
Invoke-RestMethod -Uri 'http://localhost:5001/' -Method Get

# Kiểm tra danh sách cities
Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/all' -Method Get
```

## 📡 Tích hợp với OpenWeather API

Dự án sử dụng OpenWeather API để lấy dữ liệu thời tiết thực tế:

### Các API endpoint được sử dụng:

- **`/weather?q={city}`** - Lấy thời tiết theo tên thành phố
- **`/weather?id={owmId}`** - Lấy thời tiết theo OpenWeather City ID
- **`/weather?lat={lat}&lon={lon}`** - Lấy thời tiết theo tọa độ địa lý

### Xử lý dữ liệu:

1. `weather.service.ts` gọi OpenWeather API với `OW_API_KEY`
2. Dữ liệu được chuẩn hóa và validate
3. Kết quả được cache trong Redis (TTL: 10 phút)
4. Thông tin thành phố được lưu vào PostgreSQL với model `City`
5. Bao gồm: `lat`, `lon`, `timezone`, `country`, `lastWeather`, và nhiều thông tin khác

## 📚 API Endpoints

### Base URL: `http://localhost:5001/api/cities`

| Method | Endpoint | Mô tả | Cache |
|--------|----------|-------|-------|
| **GET** | `/api/cities/all` | Lấy danh sách tất cả thành phố đã lưu | ✅ |
| **POST** | `/api/cities/saved-city/:name/:country/:lat/:lon` | Tạo thành phố mới vào danh sách | ✅ |
| **DELETE** | `/api/cities/by-id/:id` | Xóa thành phố theo ID | ✅ |
| **GET** | `/api/cities/by-id/:id` | Lấy chi tiết thành phố theo ID | ✅ |
| **POST** | `/api/cities/:id/refresh` | Làm mới dữ liệu thời tiết cho thành phố đã lưu | ❌ |
| **GET** | `/api/cities/by-name/:name/weather` | Lấy thời tiết trực tiếp theo tên thành phố | ✅ |
| **GET** | `/api/cities/by-id/:owmId/weather` | Lấy thời tiết trực tiếp theo OpenWeather City ID | ✅ |
| **GET** | `/api/cities/by-lat-lon/:lat/:lon/weather` | Lấy thời tiết trực tiếp theo tọa độ (lat, lon) | ✅ |

### Chi tiết endpoints:

#### 1. Lấy danh sách tất cả thành phố đã lưu
```http
GET /api/cities/all
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Ho Chi Minh City",
    "country": "VN",
    "lat": 10.8231,
    "lon": 106.6297,
    "owmId": 1580578,
    "timezone": 25200,
    "lastWeather": { ... },
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-15T10:30:00Z"
  }
]
```

**Cache:** Dữ liệu được cache với key `cities:all` (TTL: 1 giờ). Cache được tự động cập nhật khi tạo hoặc xóa thành phố.

#### 2. Tạo thành phố mới
```http
POST /api/cities/saved-city/:name/:country/:lat/:lon
```

**Ví dụ:**
```http
POST /api/cities/saved-city/Hanoi/VN/21.0285/105.8542
```

**Response:**
```json
{
  "id": 2,
  "name": "Hanoi",
  "country": "VN",
  "lat": 21.0285,
  "lon": 105.8542,
  "owmId": 0,
  "timezone": 0,
  "lastWeather": null,
  "createdAt": "2025-01-15T11:00:00Z",
  "updatedAt": "2025-01-15T11:00:00Z"
}
```

**Note:** Endpoint này tạo thành phố mới và tự động cập nhật cache `cities:all`.

#### 3. Xóa thành phố theo ID
```http
DELETE /api/cities/by-id/:id
```

**Ví dụ:**
```http
DELETE /api/cities/by-id/2
```

**Response:**
```json
{
  "message": "City deleted successfully",
  "remainingCities": [...]
}
```

**Note:** Endpoint này xóa thành phố, xóa cache `city:{id}`, và cập nhật cache `cities:all`.

#### 4. Lấy chi tiết thành phố theo ID
```http
GET /api/cities/by-id/:id
```

**Ví dụ:**
```http
GET /api/cities/by-id/1
```

**Response:**
```json
{
  "id": 1,
  "name": "Ho Chi Minh City",
  "country": "VN",
  "lat": 10.8231,
  "lon": 106.6297,
  "owmId": 1580578,
  "timezone": 25200,
  "lastWeather": { ... },
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

**Cache:** Dữ liệu được cache với key `city:{id}` (TTL: 10 phút).

#### 5. Làm mới thời tiết cho thành phố đã lưu
```http
POST /api/cities/:id/refresh
```

**Ví dụ:**
```http
POST /api/cities/1/refresh
```

**Response:** Trả về thành phố với dữ liệu thời tiết mới cập nhật trong `lastWeather`.

#### 6. Lấy thời tiết trực tiếp theo tên thành phố
```http
GET /api/cities/by-name/:name/weather
```

**Ví dụ:**
```http
GET /api/cities/by-name/Hanoi/weather
```

**Response:**
```json
{
  "name": "Hanoi",
  "coord": { "lat": 21.0285, "lon": 105.8542 },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "main": {
    "temp": 28.5,
    "feels_like": 30.2,
    "temp_min": 27.0,
    "temp_max": 30.0,
    "pressure": 1012,
    "humidity": 65
  },
  "wind": {
    "speed": 3.5,
    "deg": 120
  },
  "dt": 1705315200,
  "timezone": 25200
}
```

**Cache:** Dữ liệu được cache với key `weather:name:{name}` (TTL: 10 phút).

#### 7. Lấy thời tiết trực tiếp theo OpenWeather City ID
```http
GET /api/cities/by-id/:owmId/weather
```

**Ví dụ:**
```http
GET /api/cities/by-id/1580578/weather
```

**Cache:** Dữ liệu được cache với key `weather:id:{owmId}` (TTL: 10 phút).

#### 8. Lấy thời tiết trực tiếp theo tọa độ
```http
GET /api/cities/by-lat-lon/:lat/:lon/weather
```

**Ví dụ:**
```http
GET /api/cities/by-lat-lon/21.0285/105.8542/weather
```

**Cache:** Dữ liệu được cache với key `weather:latlon:{lat}:{lon}` (TTL: 10 phút).

## 🧪 Kiểm thử

### Kiểm thử bằng PowerShell

#### 1. Tạo thành phố Hồ Chí Minh:
```powershell
Invoke-RestMethod -Method Post -Uri 'http://localhost:5001/api/cities/saved-city/Ho Chi Minh City/VN/10.8231/106.6297'
```

#### 2. Lấy danh sách tất cả thành phố:
```powershell
Invoke-RestMethod -Method Get -Uri 'http://localhost:5001/api/cities/all'
```

#### 3. Lấy chi tiết thành phố theo ID:
```powershell
Invoke-RestMethod -Method Get -Uri 'http://localhost:5001/api/cities/by-id/1'
```

#### 4. Lấy thời tiết theo tên thành phố:
```powershell
Invoke-RestMethod -Method Get -Uri 'http://localhost:5001/api/cities/by-name/Hanoi/weather'
```

#### 5. Lấy thời tiết theo tọa độ:
```powershell
Invoke-RestMethod -Method Get -Uri 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather'
```

#### 6. Lấy thời tiết theo OpenWeather City ID:
```powershell
Invoke-RestMethod -Method Get -Uri 'http://localhost:5001/api/cities/by-id/1581130/weather'
```

#### 7. Làm mới thời tiết cho thành phố đã lưu:
```powershell
Invoke-RestMethod -Method Post -Uri 'http://localhost:5001/api/cities/1/refresh'
```

#### 8. Xóa thành phố theo ID:
```powershell
Invoke-RestMethod -Method Delete -Uri 'http://localhost:5001/api/cities/by-id/1'
```

### Kiểm thử với cURL (nếu có Git Bash hoặc WSL):

```bash
# Tạo thành phố mới
curl -X POST 'http://localhost:5001/api/cities/saved-city/Hanoi/VN/21.0285/105.8542'

# Lấy danh sách tất cả thành phố
curl http://localhost:5001/api/cities/all

# Lấy thời tiết theo tên
curl http://localhost:5001/api/cities/by-name/Hanoi/weather

# Lấy thời tiết theo tọa độ
curl 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather'

# Xóa thành phố theo ID
curl -X DELETE http://localhost:5001/api/cities/by-id/1
```

### Kiểm thử với Postman hoặc Thunder Client:

1. Import collection hoặc tạo requests mới
2. Sử dụng các endpoint đã liệt kê ở phía trên
3. Kiểm tra response và status code

### Kiểm tra Redis Cache:

Redis được sử dụng để cache dữ liệu thời tiết, giúp giảm số lượng API calls và tăng tốc độ response.

#### Kết nối Redis CLI:
```powershell
# Trong Docker container
docker exec -it weather-forecast-express-redis-1 redis-cli

# Hoặc nếu đặt tên khác
docker ps  # Tìm tên container Redis
docker exec -it <redis-container-name> redis-cli
```

#### Các lệnh Redis hữu ích:
```bash
# Xem tất cả cache keys
KEYS *

# Xem cache danh sách cities
GET cities:all

# Xem cache chi tiết city theo ID
GET city:1

# Xem cache thời tiết theo tên thành phố
GET weather:name:Hanoi

# Xem cache thời tiết theo tọa độ
GET weather:latlon:21.0285:105.8542

# Xem cache thời tiết theo OpenWeather ID
GET weather:id:1581130

# Kiểm tra TTL còn lại (giây)
TTL weather:name:Hanoi

# Xóa một cache key cụ thể
DEL weather:name:Hanoi

# Xóa tất cả cache (cẩn thận!)
FLUSHALL

# Kiểm tra số lượng keys
DBSIZE
```

#### Verify cache hoạt động:
```powershell
# Request lần 1 (sẽ gọi OpenWeather API)
Measure-Command { Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-name/Hanoi/weather' }

# Request lần 2 trong vòng 10 phút (sẽ lấy từ cache - nhanh hơn)
Measure-Command { Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-name/Hanoi/weather' }
```

### Docker Management:

#### Quản lý containers:
```powershell
# Xem tất cả containers đang chạy
docker ps

# Xem logs của tất cả services
docker compose logs

# Xem logs của service cụ thể
docker compose logs postgres
docker compose logs redis
docker compose logs app

# Follow logs real-time
docker compose logs -f

# Restart một service
docker compose restart redis
docker compose restart postgres

# Stop tất cả services
docker compose down

# Stop và xóa volumes (cẩn thận - sẽ mất data!)
docker compose down -v

# Start lại services
docker compose up -d
```

#### Kiểm tra resource usage:
```powershell
# Xem CPU/Memory usage của containers
docker stats
```

#### Backup và restore database:
```powershell
# Backup PostgreSQL
docker exec -t weather-forecast-express-postgres-1 pg_dump -U postgres weather_db > backup.sql

# Restore PostgreSQL
Get-Content backup.sql | docker exec -i weather-forecast-express-postgres-1 psql -U postgres -d weather_db
```

## 🔄 Quy trình phát triển

### Thêm tính năng mới:

1. **Cập nhật Database Schema** (nếu cần)
   ```powershell
   # Chỉnh sửa prisma/schema.prisma
   npx prisma migrate dev --name add_new_feature
   npx prisma generate
   ```

2. **Viết Service Layer**
   - Thêm business logic vào `src/services/`
   - Tương tác với database và external APIs

3. **Tạo Controller**
   - Thêm request handlers vào `src/controllers/`
   - Validate input và xử lý response

4. **Định nghĩa Routes**
   - Cập nhật `src/routes/` với endpoints mới
   - Áp dụng middleware nếu cần

5. **Kiểm tra và Debug**
   ```powershell
   npm run dev
   ```

### Best Practices:

- ✅ Sử dụng TypeScript types cho type safety
- ✅ Validate input data trước khi xử lý
- ✅ Xử lý errors một cách graceful
- ✅ Áp dụng cache cho data ít thay đổi
- ✅ Log requests và errors để debug
- ✅ Viết code clean và có comments khi cần

## 🛠 Troubleshooting

### Vấn đề với OpenWeather API

#### ❌ Error 401 Unauthorized:
```
Nguyên nhân: API key không hợp lệ hoặc chưa được kích hoạt
Giải pháp:
- Kiểm tra OW_API_KEY trong file .env
- Đợi 10-15 phút sau khi tạo API key mới
- Verify API key tại OpenWeather Dashboard
```

#### ❌ Error 400 Bad Request:
```
Nguyên nhân: Request parameters không đúng
Giải pháp:
- Kiểm tra tên thành phố có đúng không
- Verify lat/lon coordinates trong phạm vi hợp lệ
- Kiểm tra OW_BASE_URL trong .env
```

### Vấn đề với Database

#### ❌ Error: `The column City.owmId does not exist`:
```powershell
# Chạy lại migrations
npx prisma migrate deploy
# Hoặc
npx prisma migrate dev
# Sau đó generate client
npx prisma generate
```

#### ❌ Error: Connection to database failed:
```
Nguyên nhân: PostgreSQL chưa chạy hoặc DATABASE_URL sai
Giải pháp:
- Kiểm tra PostgreSQL đang chạy: docker ps
- Verify DATABASE_URL trong .env
- Thử kết nối thủ công: psql -h localhost -U postgres -d weather_db
```

### Vấn đề với Redis

#### ❌ Error: Redis connection refused:
```powershell
# Kiểm tra Redis đang chạy
docker ps | findstr redis

# Restart Redis
docker compose restart redis

# Hoặc chạy Redis standalone
docker run -d -p 6379:6379 redis:latest
```

#### ❌ Cache không hoạt động:
```
Nguyên nhân: Redis không kết nối được
Giải pháp:
- Kiểm tra REDIS_HOST và REDIS_PORT trong .env
- Verify Redis container đang chạy
- Test connection: redis-cli ping
```

### Vấn đề với CORS

#### ❌ CORS Error trên Frontend:
```
Nguyên nhân: Frontend domain không được allow
Giải pháp:
- Cập nhật CORS_ORIGIN trong .env
- Restart server sau khi thay đổi .env
- Ví dụ: CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### Vấn đề khác

#### ❌ Port 5001 đã được sử dụng:
```powershell
# Tìm process đang dùng port 5001
netstat -ano | findstr :5001

# Kill process (thay <PID> bằng số process ID)
taskkill /PID <PID> /F

# Hoặc đổi PORT trong .env
PORT=5002
```

#### ❌ TypeScript build errors:
```powershell
# Xóa dist và node_modules
Remove-Item -Recurse -Force dist, node_modules

# Cài lại dependencies
npm install

# Build lại
npm run build
```

## 📝 Ghi chú

### Environment Variables

Tất cả các biến môi trường quan trọng:

| Variable | Mô tả | Mặc định | Bắt buộc |
|----------|-------|----------|----------|
| `PORT` | Port server chạy | 5001 | ❌ |
| `DATABASE_URL` | PostgreSQL connection string | - | ✅ |
| `OW_API_KEY` | OpenWeather API key | - | ✅ |
| `OW_BASE_URL` | OpenWeather base URL | https://api.openweathermap.org/data/2.5 | ✅ |
| `REDIS_HOST` | Redis hostname | localhost | ❌ |
| `REDIS_PORT` | Redis port | 6379 | ❌ |
| `REDIS_PASSWORD` | Redis password | - | ❌ |
| `CACHE_TTL` | Cache time-to-live (seconds) | 600 | ❌ |
| `CORS_ORIGIN` | Allowed CORS origins | http://localhost:5173 | ❌ |

### Database Schema

Model `City` trong Prisma:

```prisma
model City {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  country     String?
  lat         Float
  lon         Float
  timezone    Int?
  owmId       Int?     @unique
  lastWeather Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Cache Strategy

- **TTL**: 
  - Weather data: 10 phút (600 giây)
  - Cities list: 1 giờ (3600 giây)
  - City details: 10 phút (600 giây)
- **Key Formats**: 
  - `cities:all` - Cache danh sách tất cả thành phố
  - `city:{id}` - Cache chi tiết thành phố theo ID
  - `weather:name:{cityName}` - Cache thời tiết theo tên thành phố
  - `weather:latlon:{lat}:{lon}` - Cache thời tiết theo tọa độ
  - `weather:id:{owmId}` - Cache thời tiết theo OpenWeather City ID
- **Cache Invalidation**: 
  - Weather: Tự động expire sau TTL
  - Cities list: Tự động cập nhật khi tạo/xóa thành phố (transaction)
  - City details: Tự động xóa khi thành phố bị delete
  - Manual refresh: Endpoint `/api/cities/:id/refresh` để cập nhật thời tiết
- **Cache Middleware**: 
  - `cacheWeatherByCityNameMiddleware` - Cache cho `/by-name/:name/weather`
  - `cacheWeatherByLatLonMiddleware` - Cache cho `/by-lat-lon/:lat/:lon/weather`
  - `cacheWeatherByCityIdMiddleware` - Cache cho `/by-id/:owmId/weather`
  - `cacheCityByIdMiddleware` - Cache cho `/by-id/:id`
- **Smart Cache Updates**:
  - Khi tạo city mới: Transaction đảm bảo DB update và cache update đồng bộ
  - Khi xóa city: Transaction xóa DB, xóa cache chi tiết, và cập nhật cache danh sách
  - Prisma Transaction đảm bảo data consistency
- **Redis Configuration**:
  - Host: Configurable via `REDIS_HOST` (default: localhost)
  - Port: Configurable via `REDIS_PORT` (default: 6379)
  - Password: Optional via `REDIS_PASSWORD`
  - Connection pooling và retry logic

### Docker Configuration

Dự án sử dụng Docker Compose để orchestrate 3 services chính:

#### Services:
1. **PostgreSQL** (Database)
   - Image: `postgres:16-alpine`
   - Port: `5432:5432`
   - Volume: `postgres_data` (persistent storage)
   - Environment: `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`

2. **Redis** (Cache)
   - Image: `redis:7-alpine`
   - Port: `6379:6379`
   - Volume: `redis_data` (persistent storage)
   - Configuration: Optimized for caching

3. **App** (Node.js Application)
   - Build: From local Dockerfile
   - Port: `5001:5001`
   - Depends on: PostgreSQL và Redis
   - Volumes: Source code mounting cho development
   - Environment: Loaded từ `.env` file

#### Docker Compose Features:
- **Health Checks**: Đảm bảo services sẵn sàng trước khi start app
- **Restart Policy**: Auto-restart on failure
- **Network**: Isolated Docker network cho inter-service communication
- **Volumes**: Persistent data storage cho database và cache

## 🚀 Deployment

### Chuẩn bị Production

1. **Build ứng dụng:**
```powershell
npm run build
```

2. **Set production environment variables**

3. **Chạy migrations:**
```powershell
npx prisma migrate deploy
```

4. **Start production server:**
```powershell
npm start
```

### Deploy lên Cloud (Heroku, Railway, Render, etc.)

1. Ensure `package.json` có scripts phù hợp
2. Add `Procfile` nếu cần
3. Configure environment variables trên platform
4. Deploy từ GitHub repository

## 🤝 Contributing

Nếu bạn muốn đóng góp vào dự án:

1. Fork repository
2. Tạo branch mới: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add some amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Mở Pull Request

## 📄 License

Dự án này được phân phối dưới giấy phép được chỉ định trong file [LICENSE](LICENSE).

## 📧 Liên hệ

- **Repository**: [weather-forecast-express](https://github.com/quoclong20222428/weather-forecast-express)
- **Issues**: [GitHub Issues](https://github.com/quoclong20222428/weather-forecast-express/issues)

---

<div align="center">

**⭐ Nếu bạn thấy dự án hữu ích, hãy cho một star nhé! ⭐**

Made with ❤️ by [quoclong20222428](https://github.com/quoclong20222428)

</div>
