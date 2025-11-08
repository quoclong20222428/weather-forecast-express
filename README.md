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

### Quản lý thành phố đã lưu
- ✅ **Lưu thành phố**: Thêm thành phố vào danh sách yêu thích (theo lat, lon, name)
- ✅ **Kiểm tra trùng lặp**: Tự động kiểm tra và không cho phép lưu lại thành phố đã tồn tại
- ✅ **Xóa thành phố**: Xóa thành phố khỏi danh sách đã lưu theo ID
- ✅ **Lấy danh sách**: Xem tất cả thành phố đã lưu (sắp xếp theo thời gian cập nhật)
- ✅ **Lấy thời tiết của saved city**: Xem thời tiết của thành phố đã lưu với tên tùy chỉnh

### Dữ liệu thời tiết
- 🌤️ **Theo tọa độ địa lý**: Lấy thời tiết theo latitude/longitude
- � **Dự báo 7 ngày**: Lấy dự báo thời tiết hàng ngày cho 7 ngày tới
- ⏱️ **Dự báo theo giờ**: Lấy dự báo thời tiết 5 ngày với interval 3 giờ
- �💾 **Saved city weather**: Lấy thời tiết của thành phố đã lưu với tên do user đặt (sử dụng ID từ database)

### Tìm kiếm địa điểm (Location Search)
- 🔍 **PostgreSQL Full-Text Search**: Tìm kiếm siêu nhanh với 3.6+ triệu địa điểm toàn cầu
- 🚀 **GIN Index**: Tối ưu hóa query với GIN index trên tsvector
- 🎯 **Ranking Algorithm**: Sử dụng `ts_rank_cd` để xếp hạng kết quả theo độ liên quan
- 🌍 **Multi-language**: Hỗ trợ tìm kiếm tiếng Việt và tiếng Anh
- ⚡ **Sub-second Response**: Trả về kết quả trong vài milliseconds dù có hàng triệu records
- 🔤 **Smart Query Parsing**: Sử dụng `plainto_tsquery` tự động xử lý và chuẩn hóa search terms

### Tối ưu hiệu suất
- ⚡ **Redis Caching**: Cache dữ liệu thời tiết với TTL có randomization
- 🎯 **Smart Cache Keys**: Cache riêng biệt cho từng loại request
  - `weather:latlon:{lat}:{lon}` - Cache theo tọa độ
  - `weather:saved-city:{id}` - Cache riêng cho saved city (sử dụng ID từ database)
  - `weather:daily:{lat}:{lon}:cnt{cnt}` - Cache dự báo 7 ngày
  - `weather:hourly:{lat}:{lon}` - Cache dự báo theo giờ
- 🔄 **Cache Middleware**: Tự động kiểm tra và trả về cache trước khi gọi API
- 📉 **Giảm API Calls**: Giảm thiểu số lượng request tới OpenWeather API
- ⚡ **Fast Response**: Tăng tốc độ phản hồi từ milliseconds
- 🗃️ **Database Indexing**: GIN index cho full-text search, B-tree index cho queries khác

### Kiến trúc & Code Organization
- 🏗️ **Layered Architecture**: Tổ chức theo kiến trúc phân tầng rõ ràng
- 📁 **Modular Structure**: Mỗi module chia thành các file nhỏ, độc lập
- 🎯 **Single Responsibility**: Mỗi file chỉ chịu trách nhiệm cho 1 chức năng
- 🔌 **Index Export Pattern**: File index.ts tập trung để export (giống middleware)
- 🧪 **Easy Testing**: Dễ dàng test từng function riêng biệt
- 👥 **Team-friendly**: Tránh conflict khi nhiều dev làm việc song song

### Docker & Containerization
- 🐳 **Docker Compose**: Orchestration cho PostgreSQL, Redis và App
- 📦 **Multi-container Setup**: Tách biệt services để dễ scale
- 💾 **Volume Persistence**: Dữ liệu database được lưu trữ persistent
- 🌐 **Network Isolation**: Services giao tiếp qua Docker network
- 🚀 **Easy Deployment**: Một lệnh để start tất cả services

### Middleware & Error Handling
- 📝 **Request Logging**: Log chi tiết mọi request (method, path, status, duration)
- ❌ **Centralized Error Handling**: Xử lý lỗi tập trung với HttpError class
- 🔒 **CORS Configuration**: Cấu hình CORS cho cross-origin requests
- 🎭 **404 Handler**: Xử lý route không tồn tại
- ⚡ **Cache Middleware**: Middleware riêng cho từng loại weather request

## 🛠 Công nghệ sử dụng

### Backend Framework & Language
- **Node.js** (v18+) - JavaScript runtime
- **TypeScript** (v5.9) - Type-safe development
- **Express** (v5.1) - Web framework nhanh và linh hoạt

### Database & ORM
- **PostgreSQL** - Hệ quản trị cơ sở dữ liệu quan hệ
- **Prisma** (v6.17) - Modern ORM với type-safety
- **pg** - PostgreSQL client cho Node.js
- **PostgreSQL Full-Text Search** - Tìm kiếm văn bản với tsvector và GIN index

### Caching & Performance
- **Redis** (v5.8) - In-memory caching
- Cache middleware tùy chỉnh cho weather data
- **GIN Index** - Generalized Inverted Index cho full-text search
- **tsvector & tsquery** - PostgreSQL text search types

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

### 🏗️ Kiến trúc phân tầng (Layered Architecture)

Dự án được tổ chức theo **kiến trúc phân tầng** với **modular structure**, mỗi layer có trách nhiệm rõ ràng:

```
┌─────────────────────────────────────────────────────────┐
│                    📱 CLIENT                            │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP Request
┌──────────────────────▼──────────────────────────────────┐
│                  🛣️ ROUTES LAYER                        │
│           Định nghĩa endpoints và routing               │
│              routes/city.routes.ts                      │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│               🎯 MIDDLEWARE LAYER                       │
│        Cache, Logging, Error Handling, CORS             │
│    middleware/cacheWeather, requestLogger, etc.         │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              🎮 CONTROLLERS LAYER                       │
│       Request validation & Response formatting          │
│              controllers/city/*.ts                      │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│               ⚙️ SERVICES LAYER                         │
│         Business logic & External API calls             │
│              services/weather/*.ts                      │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│            💾 DATA ACCESS LAYER                         │
│         Database (Prisma) & Cache (Redis)               │
│         config/db.ts, utils/redisClient.ts              │
└─────────────────────────────────────────────────────────┘
```

### 📁 Cấu trúc chi tiết

```
weather-forecast-express/
├── prisma/
│   ├── schema.prisma                    # Database schema
│   └── migrations/                      # Database migrations
├── src/
│   ├── app.ts                          # Express app configuration
│   ├── server.ts                       # HTTP server entry point
│   │
│   ├── config/
│   │   └── db.ts                       # Prisma client configuration
│   │
│   ├── controllers/                     # 🎮 CONTROLLERS LAYER (Modular)
│   │   ├── city/                       # City module
│   │   │   ├── getSavedCityWeather.controller.ts
│   │   │   ├── getWeatherCityByLatLon.controller.ts
│   │   │   ├── saveCity.controller.ts
│   │   │   ├── unsaveCity.controller.ts
│   │   │   └── index.ts                # 📦 Export hub
│   │   └── index.ts                    # 📦 Root export
│   │
│   ├── middleware/                      # 🎯 MIDDLEWARE LAYER (Modular)
│   │   ├── cacheWeather.ts             # Redis cache middleware
│   │   ├── cacheSavedCities.ts         # Cache for saved cities list
│   │   ├── errorHandler.ts             # Error handling
│   │   ├── httpError.ts                # Custom HTTP error
│   │   ├── notFoundHandler.ts          # 404 handler
│   │   ├── requestLogger.ts            # Request logging
│   │   └── index.ts                    # 📦 Export hub
│   │
│   ├── routes/                          # 🛣️ ROUTES LAYER
│   │   └── city.routes.ts              # API endpoints definition
│   │
│   ├── services/                        # ⚙️ SERVICES LAYER (Modular)
│   │   ├── weather/                    # Weather module
│   │   │   ├── types.ts                # Shared types
│   │   │   ├── utils.ts                # Shared utilities
│   │   │   ├── getWeatherByLatLon.service.ts
│   │   │   ├── saveCity.service.ts
│   │   │   ├── unsaveCity.service.ts
│   │   │   ├── getSavedCities.service.ts
│   │   │   ├── getCityById.service.ts
│   │   │   ├── getSavedCityWeather.service.ts
│   │   │   └── index.ts                # 📦 Export hub
│   │   └── index.ts                    # 📦 Root export
│   │
│   └── utils/                           # 🛠️ UTILITIES
│       └── redisClient.ts              # Redis connection & utilities
│
├── .env                                # Environment variables
├── docker-compose.yml                  # Docker services configuration
├── Dockerfile                          # Docker image configuration
├── nodemon.json                        # Nodemon configuration
├── package.json                        # Dependencies & scripts
├── tsconfig.json                       # TypeScript configuration
└── README.md                           # Project documentation (this file)
```

### 🎯 Nguyên tắc tổ chức code

#### 1. **Layered Architecture (Kiến trúc phân tầng)**
```
Routes → Middleware → Controllers → Services → Data Access
```
- **Routes**: Định nghĩa API endpoints
- **Middleware**: Xử lý trước/sau request (cache, logging, validation)
- **Controllers**: Validate input, gọi services, format response
- **Services**: Business logic, gọi external APIs
- **Data Access**: Tương tác với Database và Cache

#### 2. **Modular Structure (Cấu trúc module)**
- Mỗi module (city, user, auth...) có thư mục riêng
- Mỗi file chỉ chứa **1 function** (Single Responsibility)
- File `index.ts` tập trung để export (Export Hub Pattern)

#### 3. **Naming Convention**
```
[actionName][Resource].[layer].ts
```
Ví dụ:
- `saveCity.controller.ts` - Controller để lưu city
- `getWeatherByLatLon.service.ts` - Service lấy weather theo lat/lon
- `cacheWeather.ts` - Middleware cache cho weather

#### 4. **Import Pattern**
```typescript
// Import từ module index (Recommended)
import { saveCity } from "../../services/weather/index.js";

// Hoặc từ root index
import { saveCity } from "../../services/index.js";
```

### 📋 Mô tả chi tiết các layer

#### 🛣️ **Routes Layer**
- Định nghĩa API endpoints và HTTP methods
- Áp dụng middleware cho từng route
- Kết nối URL với controller handlers

#### 🎯 **Middleware Layer**
- **cacheWeather.ts**: Cache middleware cho weather data (4 types)
- **requestLogger.ts**: Log mọi request với method, path, status, duration
- **errorHandler.ts**: Xử lý lỗi tập trung và format error response
- **httpError.ts**: Custom error class với status code
- **notFoundHandler.ts**: Xử lý 404 Not Found

#### 🎮 **Controllers Layer** (Modular)
Mỗi controller file xử lý **1 endpoint**:
- Validate request data (params, body, query)
- Gọi service layer
- Format và trả về response
- Error handling

#### ⚙️ **Services Layer** (Modular)
Mỗi service file chứa **1 business function**:
- Gọi OpenWeather API
- Thao tác với database qua Prisma
- Xử lý logic nghiệp vụ
- Cache kết quả vào Redis

#### 💾 **Data Access Layer**
- **Prisma ORM**: Type-safe database access
- **Redis Client**: In-memory caching
- Connection management và utilities

### 🎨 Ưu điểm của kiến trúc này

✅ **Separation of Concerns**: Mỗi layer có trách nhiệm rõ ràng  
✅ **Maintainability**: Dễ bảo trì và sửa lỗi  
✅ **Scalability**: Dễ mở rộng thêm features mới  
✅ **Testability**: Dễ dàng viết unit tests cho từng layer  
✅ **Team Collaboration**: Team có thể làm việc song song không conflict  
✅ **Code Reusability**: Services có thể được tái sử dụng  
✅ **Single Responsibility**: Mỗi file chỉ làm 1 việc

---

## 🔍 PostgreSQL Full-Text Search - Tối ưu cho 3.6M+ Records

Dự án sử dụng **PostgreSQL Full-Text Search** để tìm kiếm địa điểm với hiệu suất cao trên **3,637,189 bản ghi** địa điểm toàn cầu.

### 📊 Thống kê Database

- **Tổng số records**: 3,637,189 địa điểm
- **Kích thước data**: ~535 MB (NDJSON format)
- **Phạm vi**: Toàn cầu (tất cả quốc gia)
- **Thời gian query**: < 50ms cho mọi search query

### 🚀 Kỹ thuật Full-Text Search

#### 1. **tsvector - Text Search Vector**

PostgreSQL chuyển đổi text thành **tsvector** - một dạng dữ liệu đặc biệt tối ưu cho tìm kiếm:

```sql
-- Ví dụ: "Hà Nội, Vietnam" được chuyển thành tsvector
to_tsvector('simple', 'Hà Nội, Vietnam')
-- Kết quả: 'hà':1 'nội':2 'vietnam':3
```

**Cấu trúc trong database:**
```sql
model Location {
  id            Int     @id @default(autoincrement())
  display_name  String  @db.Text
  country       String? @db.Char(2)
  lat           Float   @db.DoublePrecision
  lon           Float   @db.DoublePrecision
  search_vector Unsupported("tsvector")? -- Vector cho full-text search
}
```

#### 2. **GIN Index - Generalized Inverted Index**

GIN Index là chìa khóa cho hiệu suất cao:

```sql
CREATE INDEX idx_search_vector_gin 
ON "Location" 
USING GIN (search_vector);
```

**Lợi ích của GIN Index:**
- ✅ **Nhanh hơn 100-1000x** so với LIKE/ILIKE queries
- ✅ **Constant time complexity** O(1) cho việc tìm kiếm
- ✅ **Scalable**: Hiệu suất không giảm khi có hàng triệu records
- ✅ **Space efficient**: Index size nhỏ hơn B-tree index

**So sánh hiệu suất:**
| Method | 3.6M Records | Index Type | Avg Time |
|--------|--------------|------------|----------|
| `LIKE '%term%'` | ❌ Full scan | None | ~2000ms |
| `ILIKE 'term%'` | ⚠️ Partial scan | B-tree | ~500ms |
| **Full-Text Search** | ✅ Index scan | **GIN** | **< 50ms** |

#### 3. **plainto_tsquery - Query Parser**

`plainto_tsquery` tự động chuẩn hóa search terms:

```typescript
// User input: "lâm đồng"
const results = await prisma.$queryRaw`
  SELECT display_name, country, lat, lon
  FROM "Location"
  WHERE search_vector @@ plainto_tsquery('simple', 'lâm đồng')
  LIMIT 8
`;
```

**Ưu điểm:**
- ✅ Tự động loại bỏ stop words
- ✅ Xử lý dấu câu và ký tự đặc biệt
- ✅ Không cần escape hoặc sanitize input
- ✅ Hỗ trợ multi-word queries

#### 4. **ts_rank_cd - Cover Density Ranking**

Xếp hạng kết quả theo độ liên quan với `ts_rank_cd`:

```typescript
const results = await prisma.$queryRaw`
  SELECT 
    display_name,
    country,
    lat,
    lon,
    ts_rank_cd(search_vector, plainto_tsquery('simple', ${term})) as rank
  FROM "Location"
  WHERE search_vector @@ plainto_tsquery('simple', ${term})
  ORDER BY rank DESC
  LIMIT 8
`;
```

**Cover Density Algorithm:**
- Tính toán mật độ từ khóa trong document
- Kết quả có nhiều từ khóa gần nhau → rank cao hơn
- Ưu tiên exact matches

### 📈 Performance Optimization

#### Query Execution Plan

```sql
EXPLAIN ANALYZE
SELECT display_name, country, lat, lon
FROM "Location"
WHERE search_vector @@ plainto_tsquery('simple', 'hanoi')
ORDER BY ts_rank_cd(search_vector, plainto_tsquery('simple', 'hanoi')) DESC
LIMIT 8;

-- Kết quả:
-- Bitmap Index Scan on idx_search_vector_gin
-- Planning Time: 0.5ms
-- Execution Time: 15-50ms
```

#### Indexing Strategy

```sql
-- 1. GIN Index cho full-text search (QUAN TRỌNG NHẤT)
CREATE INDEX idx_search_vector_gin 
ON "Location" USING GIN (search_vector);

-- 2. B-tree index cho prefix search (fallback)
CREATE INDEX idx_display_name_prefix 
ON "Location" (display_name);
```

### 🌍 Multi-language Support

Database hỗ trợ tìm kiếm cả tiếng Việt và tiếng Anh:

```typescript
// Tiếng Việt có dấu
searchLocationsFullText("Hồ Chí Minh"); // ✅ Works

// Tiếng Việt không dấu  
searchLocationsFullText("Ho Chi Minh"); // ✅ Works (với unaccent extension)

// Tiếng Anh
searchLocationsFullText("New York");    // ✅ Works
```

**unaccent Extension:**
```sql
-- Enable extension
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Sử dụng trong query
WHERE unaccent(display_name) ILIKE unaccent('%lam dong%')
```

### 💡 Implementation Example

```typescript
// src/services/weather/searchLocations.service.ts
export async function searchLocationsFullText(
  searchTerm: string,
  limit: number = 8
): Promise<LocationSearchResult[]> {
  const cleanedTerm = searchTerm.trim();
  
  if (!cleanedTerm) return [];

  try {
    const results = await prisma.$queryRaw<LocationSearchResult[]>`
      SELECT 
        display_name,
        country,
        lat,
        lon,
        ts_rank_cd(
          search_vector, 
          plainto_tsquery('simple', ${cleanedTerm})
        ) as rank
      FROM "Location"
      WHERE search_vector @@ plainto_tsquery('simple', ${cleanedTerm})
      ORDER BY rank DESC
      LIMIT ${limit}
    `;

    return results;
  } catch (error) {
    console.error("Full-text search error:", error);
    return fallbackSearch(searchTerm, limit); // ILIKE fallback
  }
}
```

### 📊 Benchmark Results

Test với 3,637,189 records:

| Search Term | Records Found | Response Time | Index Used |
|-------------|---------------|---------------|------------|
| "hanoi" | 1,247 | 18ms | GIN |
| "new york" | 856 | 23ms | GIN |
| "lâm đồng" | 143 | 15ms | GIN |
| "tokyo japan" | 2,341 | 31ms | GIN |
| "paris france" | 1,892 | 27ms | GIN |

**Average Response Time: < 25ms** 🚀

### 🎯 Best Practices

1. ✅ **Always use GIN index** cho tsvector columns
2. ✅ **Use plainto_tsquery** thay vì to_tsquery cho user input
3. ✅ **Use ts_rank_cd** cho better ranking results
4. ✅ **Set appropriate LIMIT** để tránh trả về quá nhiều kết quả
5. ✅ **Implement fallback** với ILIKE nếu full-text search fail
6. ✅ **Monitor index usage** với EXPLAIN ANALYZE

---

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

#### 3.3. (Tùy chọn) Import seed data cho tính năng location search:

##### Bước 1: Tải file seed data
Download file `seed_location.ndjson` từ Google Drive:
👉 [Download seed_location.ndjson](https://drive.google.com/file/d/1229nlkpceRMzy3vb1oErkJQ71AQDeVDw/view?usp=sharing)

##### Bước 2: Đặt file vào thư mục
Sau khi tải về, đặt file vào:
```
prisma/seeds/seed_location.ndjson
```

##### Bước 3: Enable unaccent extension trong PostgreSQL
```powershell
# Nếu dùng Docker
docker exec -it weather_postgres psql -U postgres -d weather_db -c "CREATE EXTENSION IF NOT EXISTS unaccent;"

# Hoặc chạy trực tiếp trong psql
CREATE EXTENSION IF NOT EXISTS unaccent;
```

##### Bước 4: Import data
```powershell
npm run seed
```

> **Lưu ý:** File chứa ~2 triệu địa điểm (535MB), quá trình import có thể mất vài phút. Extension `unaccent` cần thiết để hỗ trợ tìm kiếm tiếng Việt không dấu.

#### 3.4. (Tùy chọn) Xem database với Prisma Studio:

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

# Kiểm tra lấy thời tiết theo tọa độ
Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather' -Method Get
```

## 📡 Tích hợp với OpenWeather API

Dự án sử dụng OpenWeather API để lấy dữ liệu thời tiết thực tế:

### Các API endpoint được sử dụng:

- **`/weather?lat={lat}&lon={lon}`** - Lấy thời tiết theo tọa độ địa lý

### Xử lý dữ liệu:

1. Services gọi OpenWeather API với `OW_API_KEY` theo tọa độ `lat` và `lon`
2. Dữ liệu được chuẩn hóa và validate
3. Kết quả được cache trong Redis (TTL: 10 phút với randomization)
4. Thông tin thành phố được lưu vào PostgreSQL với model `City`
5. Thông tin lưu trữ: `id`, `name`, `lat`, `lon`, `createdAt`, `updatedAt`

## 📚 API Endpoints

### Base URL: `http://localhost:5001/api/cities`

| Method | Endpoint | Mô tả | Cache |
|--------|----------|-------|-------|
| **POST** | `/api/cities` | Lưu thành phố mới (lat, lon, name) | ❌ |
| **DELETE** | `/api/cities/by-id/:id` | Xóa thành phố đã lưu theo ID | ❌ |
| **GET** | `/api/cities/by-id/:id` | Lấy thời tiết của thành phố đã lưu theo ID | ✅ |
| **GET** | `/api/cities/by-lat-lon/:lat/:lon/weather` | Lấy thời tiết theo tọa độ địa lý | ✅ |

### 📋 API Categories

#### 🏙️ **Saved Cities Management**
Quản lý danh sách thành phố đã lưu của user

#### 🌤️ **Weather Data**
Lấy thông tin thời tiết trực tiếp từ OpenWeather API

### Chi tiết endpoints:

---

### 🏙️ Saved Cities Management

#### 1. Lưu thành phố mới
```http
POST /api/cities
```

**Request Body:**
```json
{
  "lat": 21.0285,
  "lon": 105.8542,
  "name": "Hà Nội"
}
```

**Response (201 Created - Thành phố mới):**
```json
{
  "city": {
    "id": 1,
    "name": "Hà Nội",
    "lat": 21.0285,
    "lon": 105.8542
  },
  "message": "Thành phố đã được lưu thành công",
  "alreadyExists": false
}
```

**Response (200 OK - Thành phố đã tồn tại):**
```json
{
  "city": {
    "id": 1,
    "name": "Hà Nội",
    "lat": 21.0285,
    "lon": 105.8542
  },
  "message": "Thành phố đã được lưu trước đó",
  "alreadyExists": true
}
```

**Note:** 
- ✅ Tự động kiểm tra trùng lặp theo `name`, `lat`, `lon`
- ✅ Không cho phép lưu lại nếu đã tồn tại
- ✅ Xóa cache `cities:saved` sau khi lưu thành công

---

#### 2. Xóa thành phố đã lưu
```http
DELETE /api/cities/by-id/:id
```

**Request Body:**
```json
{
  "lat": 21.0285,
  "lon": 105.8542,
  "name": "Hà Nội"
}
```

**Ví dụ:**
```http
DELETE /api/cities/by-id/1
```

**Response (200 OK):**
```json
{
  "message": "Thành phố đã được xóa"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Không tìm thấy thành phố"
}
```

**Note:** Xóa thành phố dựa trên `id` từ database và validate với `lat`, `lon`, `name` để đảm bảo chính xác

---

#### 3. Lấy thời tiết của thành phố đã lưu
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
  "coord": { "lon": 105.8542, "lat": 21.0285 },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "trời quang đãng",
      "icon": "01d"
    }
  ],
  "main": {
    "temp": 28.5,
    "feels_like": 30.2,
    "temp_min": 27.0,
    "temp_max": 30.0,
    "pressure": 1013,
    "humidity": 65
  },
  "name": "Hà Nội",
  "savedCityId": 1
}
```

**Features:**
- ✅ Lấy thời tiết từ OpenWeather API theo `lat`, `lon` của city
- ✅ **Override `name`**: Tên trả về là tên user đặt (từ database), không phải từ API
- ✅ Thêm `savedCityId` để reference
- ✅ Cache với key `weather:saved-city:{id}` (TTL: 10 phút)

**Cache:** ✅ Middleware `cacheSavedCityWeatherMiddleware`

---

### 🌤️ Weather Data (Direct API Calls)

#### 4. Lấy thời tiết theo tọa độ địa lý
```http
GET /api/cities/by-lat-lon/:lat/:lon/weather
```

**Ví dụ:**
```http
GET /api/cities/by-lat-lon/21.0285/105.8542/weather
```

**Response:**
```json
{
  "coord": { "lon": 105.8542, "lat": 21.0285 },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "trời quang đãng",
      "icon": "01d"
    }
  ],
  "main": {
    "temp": 28.5,
    "feels_like": 30.2,
    "temp_min": 27.0,
    "temp_max": 30.0,
    "pressure": 1013,
    "humidity": 65
  },
  "wind": { "speed": 3.5, "deg": 120 },
  "clouds": { "all": 10 },
  "dt": 1642234567,
  "sys": { "country": "VN", "sunrise": 1642200000, "sunset": 1642244000 },
  "timezone": 25200,
  "id": 1581130,
  "name": "Hanoi",
  "cod": 200
}
```

**Features:**
- ✅ Lấy thời tiết theo tọa độ (latitude, longitude)
- ✅ Không cần lưu thành phố trước
- ✅ Cache với key `weather:latlon:{lat}:{lon}` (TTL: 10 phút)
- ✅ Dữ liệu tiếng Việt từ OpenWeather API

**Cache:** ✅ Middleware `cacheWeatherByLatLonMiddleware`

---

### 📊 Response Format

Tất cả endpoints trả về JSON với format nhất quán:

**Success Response:**
```json
{
  "data": { ... },
  "message": "Success message (optional)"
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "statusCode": 400
}
```

### 🔑 HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | OK - Request thành công |
| 201 | Created - Tạo resource thành công |
| 400 | Bad Request - Dữ liệu không hợp lệ |
| 404 | Not Found - Không tìm thấy resource |
| 500 | Internal Server Error - Lỗi server |

---

### 🎯 Cache Strategy

#### Cache Keys Pattern
```
weather:latlon:{lat}:{lon}           # Weather by coordinates
weather:saved-city:{id}              # Weather for saved city (ID từ database)
cities:saved                         # List of saved cities
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
```

#### Cache Behavior
- **TTL**: 10 phút với randomization (±20 giây) để tránh cache stampede
- **Cache Miss**: Nếu không có cache, gọi OpenWeather API và lưu vào cache
- **Cache Hit**: Trả về dữ liệu từ Redis ngay lập tức
- **Cache Invalidation**: 
  - `cities:saved` được xóa khi lưu/xóa city
  - Weather cache tự động expire sau TTL

---

## 🧪 Kiểm thử API

### Kiểm thử bằng PowerShell

#### 1. Lưu thành phố Hà Nội:
```powershell
$body = @{
    lat = 21.0285
    lon = 105.8542
    name = "Hà Nội"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri 'http://localhost:5001/api/cities' -Body $body -ContentType 'application/json'
```

#### 2. Lấy thời tiết của thành phố đã lưu:
```powershell
Invoke-RestMethod -Method Get -Uri 'http://localhost:5001/api/cities/by-id/1'
```

#### 3. Lấy thời tiết theo tọa độ:
```powershell
Invoke-RestMethod -Method Get -Uri 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather'
```

#### 4. Xóa thành phố:
```powershell
$body = @{
    lat = 21.0285
    lon = 105.8542
    name = "Hà Nội"
} | ConvertTo-Json

Invoke-RestMethod -Method Delete -Uri 'http://localhost:5001/api/cities/by-id/1' -Body $body -ContentType 'application/json'
```

### Kiểm thử với cURL (Git Bash / WSL / Linux):

```bash
# Lưu thành phố mới
curl -X POST http://localhost:5001/api/cities \
  -H "Content-Type: application/json" \
  -d '{
    "lat": 21.0285,
    "lon": 105.8542,
    "name": "Hà Nội"
  }'

# Lấy thời tiết của saved city
curl http://localhost:5001/api/cities/by-id/1

# Lấy thời tiết theo tọa độ
curl 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather'

# Xóa thành phố
curl -X DELETE http://localhost:5001/api/cities/by-id/1 \
  -H "Content-Type: application/json" \
  -d '{
    "lat": 21.0285,
    "lon": 105.8542,
    "name": "Hà Nội"
  }'
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

# Xem cache danh sách cities đã lưu
GET cities:saved

# Xem cache thời tiết của saved city theo ID
GET weather:saved-city:1

# Xem cache thời tiết theo tọa độ
GET weather:latlon:21.0285:105.8542

# Kiểm tra TTL còn lại (giây)
TTL weather:saved-city:1

# Xóa một cache key cụ thể
DEL weather:saved-city:1

# Xóa tất cả cache (cẩn thận!)
FLUSHALL

# Kiểm tra số lượng keys
DBSIZE
```

#### Verify cache hoạt động:
```powershell
# Request lần 1 (sẽ gọi OpenWeather API)
Measure-Command { Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-id/1' }

# Request lần 2 trong vòng 10 phút (sẽ lấy từ cache - nhanh hơn)
Measure-Command { Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-id/1' }
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
  id        Int      @id @default(autoincrement())
  name      String
  lat       Float
  lon       Float
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Lưu ý:** Dự án sử dụng `id` tự động tăng từ PostgreSQL để định danh thành phố, không sử dụng `owmId` từ OpenWeather API.

### Cache Strategy

- **TTL**: 
  - Weather data: 10 phút (600 giây) với randomization (±20 giây)
  - Cities list: Xóa cache khi có thay đổi
- **Key Formats**: 
  - `cities:saved` - Cache danh sách thành phố đã lưu
  - `weather:latlon:{lat}:{lon}` - Cache thời tiết theo tọa độ
  - `weather:saved-city:{id}` - Cache thời tiết của saved city (ID từ database)
- **Cache Invalidation**: 
  - Weather: Tự động expire sau TTL
  - Cities list: Xóa khi lưu/xóa thành phố
  - Saved city weather: Tự động expire sau TTL
- **Cache Middleware**: 
  - `cacheWeatherByLatLonMiddleware` - Cache cho `/by-lat-lon/:lat/:lon/weather`
  - `cacheSavedCityWeatherMiddleware` - Cache cho `/by-id/:id`
- **Smart Cache Updates**:
  - Khi tạo city mới: Xóa cache `cities:saved` để refresh danh sách
  - Khi xóa city: Xóa cache `cities:saved` để refresh danh sách
  - Database ID được sử dụng để định danh và cache city
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
