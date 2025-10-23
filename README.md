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

<table>
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

### Tìm kiếm & Gợi ý
- Tìm kiếm thành phố thông qua OpenWeather Geocoding API
- Gợi ý tự động khi nhập tên thành phố

### Tối ưu hiệu suất
- Cache dữ liệu thời tiết với Redis (TTL: 10 phút)
- Giảm số lượng request tới OpenWeather API
- Tăng tốc độ phản hồi cho người dùng

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
Invoke-RestMethod -Uri 'http://localhost:5001/api/cities' -Method Get
```

## 📡 Tích hợp với OpenWeather API

Dự án sử dụng OpenWeather API để lấy dữ liệu thời tiết thực tế:

### Các API endpoint được sử dụng:

- **`/weather?q={city}`** - Lấy thời tiết theo tên thành phố
- **`/weather?id={owmId}`** - Lấy thời tiết theo OpenWeather City ID
- **`/weather?lat={lat}&lon={lon}`** - Lấy thời tiết theo tọa độ địa lý
- **`/geo/1.0/direct?q={query}`** - Geocoding API (tìm kiếm và gợi ý thành phố)

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
| **GET** | `/api/cities` | Lấy danh sách tất cả thành phố đã lưu | ❌ |
| **POST** | `/api/cities` | Thêm thành phố mới vào danh sách | ❌ |
| **DELETE** | `/api/cities` | Xóa thành phố khỏi danh sách | ❌ |
| **GET** | `/api/cities/:id` | Lấy chi tiết thành phố theo ID | ❌ |
| **POST** | `/api/cities/:id/refresh` | Làm mới dữ liệu thời tiết cho thành phố | ✅ |
| **GET** | `/api/cities/by-name/:name/weather` | Lấy thời tiết theo tên thành phố | ✅ |
| **GET** | `/api/cities/by-id/:owmId/weather` | Lấy thời tiết theo OpenWeather City ID | ✅ |
| **GET** | `/api/cities/by-coords/weather` | Lấy thời tiết theo tọa độ (lat, lon) | ✅ |
| **GET** | `/api/cities/search` | Tìm kiếm và gợi ý thành phố | ❌ |

### Chi tiết endpoints:

#### 1. Lấy danh sách thành phố đã lưu
```http
GET /api/cities
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
    "timezone": 25200,
    "lastWeather": { ... },
    "createdAt": "2025-01-15T10:30:00Z"
  }
]
```

#### 2. Thêm thành phố mới
```http
POST /api/cities
Content-Type: application/json

{
  "name": "Hanoi"
}
```

#### 3. Xóa thành phố
```http
DELETE /api/cities
Content-Type: application/json

{
  "name": "Hanoi"
}
```

#### 4. Lấy thời tiết theo tên thành phố
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

#### 5. Lấy thời tiết theo tọa độ
```http
GET /api/cities/by-coords/weather?lat=21.0285&lon=105.8542
```

#### 6. Tìm kiếm thành phố
```http
GET /api/cities/search?query=Ho%20Chi%20Minh
```

**Response:**
```json
[
  {
    "name": "Ho Chi Minh City",
    "lat": 10.8231,
    "lon": 106.6297,
    "country": "VN",
    "state": "Ho Chi Minh"
  }
]
```

## 🧪 Kiểm thử

### Kiểm thử bằng PowerShell

#### 1. Thêm thành phố Hồ Chí Minh:
```powershell
Invoke-RestMethod -Method Post -Uri 'http://localhost:5001/api/cities' -ContentType 'application/json' -Body '{"name":"Ho Chi Minh City"}'
```

#### 2. Lấy danh sách thành phố đã lưu:
```powershell
Invoke-RestMethod -Method Get -Uri 'http://localhost:5001/api/cities'
```

#### 3. Lấy thời tiết theo tên thành phố:
```powershell
Invoke-RestMethod -Method Get -Uri 'http://localhost:5001/api/cities/by-name/Hanoi/weather'
```

#### 4. Lấy thời tiết theo tọa độ:
```powershell
Invoke-RestMethod -Method Get -Uri 'http://localhost:5001/api/cities/by-coords/weather?lat=21.0285&lon=105.8542'
```

#### 5. Tìm kiếm thành phố:
```powershell
Invoke-RestMethod -Method Get -Uri 'http://localhost:5001/api/cities/search?query=Ho%20Chi%20Minh'
```

#### 6. Xóa thành phố:
```powershell
Invoke-RestMethod -Method Delete -Uri 'http://localhost:5001/api/cities' -ContentType 'application/json' -Body '{"name":"Hanoi"}'
```

### Kiểm thử với cURL (nếu có Git Bash hoặc WSL):

```bash
# Thêm thành phố
curl -X POST http://localhost:5001/api/cities \
  -H "Content-Type: application/json" \
  -d '{"name":"Hanoi"}'

# Lấy thời tiết
curl http://localhost:5001/api/cities/by-name/Hanoi/weather
```

### Kiểm thử với Postman hoặc Thunder Client:

1. Import collection hoặc tạo requests mới
2. Sử dụng các endpoint đã liệt kê ở phía trên
3. Kiểm tra response và status code

### Kiểm tra Redis Cache:

```powershell
# Kết nối Redis CLI (trong Docker)
docker exec -it <redis-container-name> redis-cli

# Xem tất cả keys
KEYS *

# Xem giá trị của một key
GET weather:Hanoi

# Xóa tất cả cache
FLUSHALL
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

- **TTL**: 10 phút (600 giây)
- **Key Format**: `weather:{cityName}` hoặc `weather:coords:{lat},{lon}`
- **Cache Invalidation**: Tự động expire sau TTL
- **Cache Middleware**: Áp dụng cho weather endpoints

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
