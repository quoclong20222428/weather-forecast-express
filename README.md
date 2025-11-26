# 🌦️ Weather Forecast Express API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white&style=flat)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white&style=flat)
![Passport](https://img.shields.io/badge/Passport-34E27A?logo=passport&logoColor=white&style=flat)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat)

**API Dự báo thời tiết cấp doanh nghiệp**

Backend production-ready được xây dựng với Express.js, TypeScript, Prisma ORM, Redis Cache và xác thực OAuth 2.0

[Tính năng](#-tính-năng-chính) • [Bắt đầu nhanh](#-cài-đặt) • [Tài liệu API](#-api-endpoints) • [Kiến trúc](#-cấu-trúc-dự-án)

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

**Weather Forecast Express** là một API REST cấp doanh nghiệp được thiết kế cho các ứng dụng thời tiết hiện đại. Được xây dựng với sự chú trọng đến khả năng mở rộng, bảo mật và hiệu suất, nó cung cấp một bộ tính năng toàn diện cho phân phối dữ liệu thời tiết và quản lý người dùng.

### Khả năng cốt lõi

**🔐 Xác thực & Bảo mật**
- Tích hợp OAuth 2.0 (Google, GitHub, Facebook sẵn sàng)
- Xác thực dựa trên JWT với cookies httpOnly
- Quản lý phiên an toàn và cấu hình CORS

**🌤️ Dịch vụ dữ liệu thời tiết**
- Điều kiện thời tiết hiện tại theo tọa độ địa lý
- Dự báo 7 ngày với các dải nhiệt độ
- Dự báo hàng giờ 5 ngày (khoảng 3 giờ)
- Thành phố đã lưu do người dùng chỉ định

**🔍 Tính năng nâng cao**
- Tìm kiếm địa điểm toàn văn bản trên 3.6M+ vị trí toàn cầu
- Lưu trữ Redis cấp sản xuất với chống tấn công lũ cache và chống thâm nhập
- Quản lý hồ sơ người dùng với xóa tầng vCASCADE
- Tích hợp dữ liệu thực tế từ OpenWeather API

**⚙️ Sự xuất sắc kỹ thuật**
- Phát triển an toàn kiểu với TypeScript
- Cơ sở dữ liệu PostgreSQL với Prisma ORM
- Kiến trúc phân tầng để dễ bảo trì
- Xử lý lỗi toàn diện và ghi nhật ký yêu cầu
- Đóng gói Docker để triển khai dễ dàng

## 🚀 Tính năng chính

### 🔐 Xác thực & Bảo mật

**Tích hợp OAuth 2.0**
- Xác thực Google OAuth 2.0
- Xác thực GitHub OAuth 2.0  
- Facebook OAuth sẵn sàng (chờ xác minh ứng dụng)

**Quản lý Token an toàn**
- Xác thực dựa trên JWT với ký tên HS256
- Cookies HttpOnly để bảo vệ chống XSS
- Thuộc tính cookie SameSite để bảo vệ CSRF
- Thời hạn token có thể cấu hình (mặc định: 7 ngày)

**Quản lý tài khoản người dùng**
- Truy xuất hồ sơ với dữ liệu nhà cung cấp OAuth
- Đăng xuất an toàn với vô hiệu hóa token
- Xóa tài khoản với dọn dẹp tầng vCASCADE

---

### 🏙️ Quản lý thành phố đã lưu

**Các hoạt động thành phố**
- Thêm thành phố vào yêu thích với tên tùy chỉnh
- Xóa thành phố khỏi các bộ sưu tập đã lưu
- Lấy danh sách thành phố dành riêng cho người dùng
- Phát hiện trùng lặp tự động và phòng ngừa

**Cô lập dữ liệu**
- Danh sách thành phố dành riêng cho người dùng với quan hệ nhiều-nhiều
- Xóa tầng vCASCADE khi xóa tài khoản
- Sắp xếp theo thứ tự thời gian theo dấu thời gian lưu

---

### 🌤️ Dịch vụ dữ liệu thời tiết

**Thông tin thời tiết thực tế**
- Thời tiết hiện tại theo tọa độ địa lý (lat/lon)
- Nhiệt độ, giác, độ ẩm, áp suất
- Tốc độ gió, hướng và phủ mây
- Mô tả thời tiết bản địa hóa (Tiếng Việt/Tiếng Anh)

**Dịch vụ dự báo**
- **Dự báo hàng ngày**: 7-16 ngày với các nhiệt độ tối thiểu/tối đa
- **Dự báo hàng giờ**: 5 ngày với các khoảng 3 giờ
- Xác suất mưa và thời gian mọc/lặn mặt trời

**Thời tiết thành phố đã lưu**
- Dữ liệu thời tiết cho các thành phố đã lưu của người dùng
- Tên thành phố tùy chỉnh ghi đè các giá trị mặc định của API
- Lưu vào bộ nhớ đệm thời tiết dành riêng cho người dùng

---

### 🔍 Công cụ tìm kiếm địa điểm

**Tìm kiếm hiệu suất cao**
- Tìm kiếm toàn văn bản PostgreSQL trên **3,6 triệu+** vị trí toàn cầu
- GIN (Chỉ mục đảo chiều tổng hợp) để tối ưu hóa hiệu suất truy vấn
- Thời gian phản hồi dưới giây bất kể kích thước tập dữ liệu

**Tính năng tìm kiếm thông minh**
- Thuật toán xếp hạng mật độ bìa (`ts_rank_cd`)
- Hỗ trợ đa ngôn ngữ (Tiếng Việt, Tiếng Anh)
- Bình thường hóa truy vấn tự động với `plainto_tsquery`
- Mã quốc gia ISO 3166-1 alpha-2

---

### ⚡ Tối ưu hóa hiệu suất

**Chiến lược lưu vào bộ nhớ đệm nâng cao**
- Lớp lưu vào bộ nhớ đệm phân tán dựa trên Redis
- **Chống sự cố lũ bộ nhớ đệm**: Sự rộn ràng TTL 20% ngăn chặn hết hạn đồng thời
- **Chống thâm nhập bộ nhớ đệm**: Lưu vào bộ nhớ đệm dấu trống (TTL 5 phút)
- Mô hình bộ nhớ đệm viết xuyên suốt để nhất quán dữ liệu

**Kiến trúc bộ nhớ đệm**
```
cities:saved:{userId}                    # Danh sách thành phố người dùng
weather:latlon:{lat}:{lon}               # Thời tiết theo tọa độ
weather:saved-city:{userId}:{cityId}     # Thời tiết dành riêng cho người dùng
weather:daily:{lat}:{lon}:cnt{cnt}       # Dự báo hàng ngày
weather:hourly:{lat}:{lon}               # Dự báo hàng giờ
```

**Tối ưu hóa cơ sở dữ liệu**
- Chỉ mục GIN cho tìm kiếm toàn văn bản (nhanh hơn 100-1000x so với LIKE)
- Chỉ mục B-tree cho các truy vấn quan hệ
- Kế hoạch thực hiện truy vấn được tối ưu hóa
- Kết nối nhóm với Prisma Client

---

### 🏗️ Kiến trúc & Thiết kế

**Nguyên tắc kiến trúc sạch**
- Kiến trúc phân tầng: Tuyến đường → Middleware → Bộ điều khiển → Dịch vụ → Dữ liệu
- Cấu trúc module có nguyên tắc trách nhiệm duy nhất
- Mô hình xuất khẩu chỉ mục để nhập sạch
- Tách biệt mối quan tâm trên tất cả các tầng

**Thực tiễn phát triển tốt nhất**
- Phát triển an toàn kiểu với TypeScript
- Xử lý lỗi toàn diện với lớp HttpError tùy chỉnh
- Ghi nhật ký yêu cầu với số liệu chi tiết (phương pháp, đường dẫn, trạng thái, khoảng thời gian)
- Cấu hình CORS cho các yêu cầu gốc chéo
- Cấu hình dựa trên môi trường với dotenv

**Đóng gói**
- Sắp xếp hợp soạn Docker
- Thiết lập nhiều container (PostgreSQL, Redis, Ứng dụng Node.js)
- Lưu trữ khối lượng bền vững cho cơ sở dữ liệu
- Liên lạc mạng bị cô lập
- Kiểm tra sức khỏe và chính sách khởi động lại

## 🛠 Công nghệ sử dụng

### Công nghệ cốt lõi

| Danh mục | Công nghệ | Phiên bản | Mục đích |
|----------|-----------|----------|---------|
| **Thời gian chạy** | Node.js | 18+ | Môi trường thực thi JavaScript |
| **Ngôn ngữ** | TypeScript | 5.9 | Phát triển an toàn kiểu |
| **Framework** | Express.js | 5.1 | Framework web nhanh, linh hoạt |

### Xác thực & Bảo mật

| Công nghệ | Phiên bản | Mục đích |
|-----------|----------|---------|
| Passport.js | 0.7 | Middleware xác thực |
| passport-google-oauth20 | 2.0 | Chiến lược Google OAuth 2.0 |
| passport-github2 | 0.1 | Chiến lược GitHub OAuth 2.0 |
| passport-facebook | 3.0 | Chiến lược Facebook OAuth |
| jsonwebtoken | 9.0 | Tạo & xác minh JWT |
| cookie-parser | 1.4 | Phân tích cú pháp cookie HTTP |
| bcrypt-ts | 7.1 | Hashing mật khẩu (sử dụng tương lai) |

### Cơ sở dữ liệu & ORM

| Công nghệ | Phiên bản | Mục đích |
|-----------|----------|---------|
| PostgreSQL | 13+ | Cơ sở dữ liệu quan hệ |
| Prisma ORM | 6.17 | Khách hàng cơ sở dữ liệu an toàn kiểu |
| pg | 8.16 | Khách hàng PostgreSQL cho Node.js |

### Bộ nhớ đệm & Hiệu suất

| Công nghệ | Phiên bản | Mục đích |
|-----------|----------|---------|
| Redis | 6+ | Cửa hàng cấu trúc dữ liệu trong bộ nhớ |
| redis (client) | 5.9 | Khách hàng Redis cho Node.js |

### API bên ngoài

| Dịch vụ | Mục đích |
|---------|---------|
| API OpenWeather | Dữ liệu thời tiết thực tế và định địa chỉ |
| Axios | Khách hàng HTTP cho các yêu cầu API |

### Công cụ phát triển

| Công cụ | Phiên bản | Mục đích |
|---------|----------|---------|
| Docker | Mới nhất | Nền tảng container hóa |
| Docker Compose | Mới nhất | Sắp xếp các container |
| nodemon | 3.1 | Khởi động lại tự động khi thay đổi tệp |
| ts-node | 10.9 | Công cụ thực thi TypeScript |
| tsx | 4.19 | Trình chạy TypeScript được cải tiến |

### Tiện ích

| Thư viện | Mục đích |
|---------|---------|
| dotenv | Quản lý biến môi trường |
| cors | Chia sẻ tài nguyên gốc chéo |

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
│   │   ├── db.ts                       # Prisma client configuration
│   │   └── passport.ts                 # Passport OAuth strategies
│   │
│   ├── controllers/                     # 🎮 CONTROLLERS LAYER (Modular)
│   │   ├── auth/                       # Auth module
│   │   │   ├── signIn.controller.ts    # OAuth sign-in handler
│   │   │   ├── signUp.controller.ts    # OAuth sign-up handler
│   │   │   ├── googleCallback.controller.ts
│   │   │   ├── githubCallback.controller.ts
│   │   │   ├── logout.controller.ts
│   │   │   ├── getMe.controller.ts
│   │   │   ├── deleteAccount.controller.ts
│   │   │   └── index.ts                # 📦 Export hub
│   │   ├── city/                       # City module
│   │   │   ├── getSavedCityWeather.controller.ts
│   │   │   ├── getWeatherCityByLatLon.controller.ts
│   │   │   ├── getDailyWeather.controller.ts
│   │   │   ├── getDailyHourWeather.controller.ts
│   │   │   ├── saveCity.controller.ts
│   │   │   ├── unsaveCity.controller.ts
│   │   │   ├── listCities.controller.ts
│   │   │   ├── searchLocations.controller.ts
│   │   │   └── index.ts                # 📦 Export hub
│   │   └── index.ts                    # 📦 Root export
│   │
│   ├── middleware/                      # 🎯 MIDDLEWARE LAYER (Modular)
│   │   ├── auth/
│   │   │   └── authMiddleware.ts       # JWT authentication middleware
│   │   ├── weather/
│   │   │   ├── cacheWeather.ts         # Cache weather by lat/lon
│   │   │   ├── cacheSavedCities.ts     # Cache saved cities list
│   │   │   ├── cacheCityById.ts        # Cache city by ID
│   │   │   ├── cacheDailyWeather.ts    # Cache daily forecast
│   │   │   ├── cacheDailyHourWeather.ts # Cache hourly forecast
│   │   │   └── index.ts                # 📦 Export hub
│   │   ├── errorHandler.ts             # Error handling
│   │   ├── httpError.ts                # Custom HTTP error
│   │   ├── notFoundHandler.ts          # 404 handler
│   │   ├── requestLogger.ts            # Request logging
│   │   └── index.ts                    # 📦 Export hub
│   │
│   ├── routes/                          # 🛣️ ROUTES LAYER
│   │   ├── auth.routes.ts              # OAuth & user endpoints
│   │   └── city.routes.ts              # Weather & city endpoints
│   │
│   ├── services/                        # ⚙️ SERVICES LAYER (Modular)
│   │   ├── auth/                       # Auth services
│   │   │   ├── findOrCreateUser.service.ts
│   │   │   ├── generateToken.service.ts
│   │   │   ├── deleteUser.service.ts
│   │   │   └── index.ts                # 📦 Export hub
│   │   ├── weather/                    # Weather module
│   │   │   ├── types.ts                # Shared types
│   │   │   ├── utils.ts                # Shared utilities
│   │   │   ├── getWeatherByLatLon.service.ts
│   │   │   ├── getDailyWeather.service.ts
│   │   │   ├── getDailyHourWeather.service.ts
│   │   │   ├── saveCity.service.ts
│   │   │   ├── unsaveCity.service.ts
│   │   │   ├── getSavedCities.service.ts
│   │   │   ├── getCityById.service.ts
│   │   │   ├── getSavedCityWeather.service.ts
│   │   │   ├── searchLocations.service.ts
│   │   │   └── index.ts                # 📦 Export hub
│   │   └── index.ts                    # 📦 Root export
│   │
│   └── utils/                           # 🛠️ UTILITIES
│       ├── redisClient.ts              # Redis connection & utilities
│       └── cacheHelper.ts              # Unified cache utility (anti-avalanche & anti-penetration)
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

# OAuth Configuration - Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5001/api/auth/google/callback

# OAuth Configuration - GitHub
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5001/api/auth/github/callback

# OAuth Configuration - Facebook (Optional)
# FACEBOOK_APP_ID=your_facebook_app_id
# FACEBOOK_APP_SECRET=your_facebook_app_secret
# FACEBOOK_CALLBACK_URL=http://localhost:5001/api/auth/facebook/callback

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# OpenWeather API Configuration
OW_API_KEY=your_openweather_api_key_here
OW_BASE_URL=https://api.openweathermap.org/data/2.5

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
CACHE_TTL=600

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Frontend URL (for OAuth redirects)
FRONTEND_URL=http://localhost:5173
```

#### Hướng dẫn cấu hình OAuth:

##### 🔵 Google OAuth Setup:
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Chọn **Web application**
6. Thêm **Authorized redirect URIs**:
   - `http://localhost:5001/api/auth/google/callback`
   - `http://localhost:5173` (Frontend)
7. Copy **Client ID** và **Client Secret** vào `.env`

##### ⚫ GitHub OAuth Setup:
1. Truy cập [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Điền thông tin:
   - **Application name**: Weather Forecast App
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5001/api/auth/github/callback`
4. Copy **Client ID** và **Client Secret** vào `.env`

##### 🔷 Facebook OAuth Setup (Optional):
1. Truy cập [Facebook Developers](https://developers.facebook.com/)
2. Tạo app mới với loại **Consumer**
3. Thêm **Facebook Login** product
4. Cấu hình **Valid OAuth Redirect URIs**:
   - `http://localhost:5001/api/auth/facebook/callback`
5. Yêu cầu:
   - App icon (1024x1024)
   - Privacy Policy URL
   - Terms of Service URL
6. Copy **App ID** và **App Secret** vào `.env`

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

## 🐳 Docker & Container Configuration

Dự án cung cấp 3 cách cấu hình Docker khác nhau cho các giai đoạn khác nhau:

### 1️⃣ Development Environment (Local Development)

**File**: `docker-compose.yml` và `Dockerfile`

Sử dụng khi phát triển ứng dụng cục bộ với PostgreSQL và Redis trong containers.

**Features**:
- ✅ Local PostgreSQL database với persistent volume
- ✅ Local Redis cache với persistent volume
- ✅ Auto-seed dữ liệu khi khởi động lần đầu
- ✅ Hot reload khi code thay đổi
- ✅ Isolated Docker network

**Khởi động**:
```powershell
# Sử dụng PowerShell script
.\docker.ps1 dev

# Hoặc Docker Compose trực tiếp
docker-compose -f docker-compose.yml up -d
```

**Dừng**:
```powershell
.\docker.ps1 dev-down
# Hoặc
docker-compose -f docker-compose.yml down
```

**Services**:
```yaml
- api:5001         # Node.js Express application
- postgres:5432    # PostgreSQL database (postgres_data volume)
- redis:6379       # Redis cache (redis_data volume)
```

---

### 2️⃣ Alternate Development Environment

**File**: `docker-compose.dev.yml`

Cấu hình thay thế nếu cần khác biệt với main development setup.

**Khởi động**:
```powershell
docker-compose -f docker-compose.dev.yml up -d
```

---

### 3️⃣ Production Environment (Cloud Deployment)

**Files**: `docker-compose.prod.yml`, `Dockerfile.prod`, `docker-entrypoint.prod.sh`

Sử dụng khi triển khai lên cloud platforms (Render, Azure, AWS, etc) với external managed services.

**Features**:
- ✅ API container chỉ (no local postgres/redis)
- ✅ Kết nối tới external PostgreSQL (Aiven, Supabase)
- ✅ Kết nối tới external Redis (Upstash)
- ✅ Không auto-seed (dữ liệu đã seeded trong external DB)
- ✅ Migration-only startup (không chạy seed script)
- ✅ Separate network (`weather_prod_network`) để tránh conflict
- ✅ Khác image name (`weather-forecast-api-prod:latest`)

**Khởi động Local**:
```powershell
# Cần set .env.prod trước
.\docker.ps1 prod

# Hoặc Docker Compose trực tiếp
docker-compose -f docker-compose.prod.yml up -d --build
```

**Dừng**:
```powershell
.\docker.ps1 prod-down
# Hoặc
docker-compose -f docker-compose.prod.yml down
```

**Environment Variables Cần Set**:
```env
# External Database (Aiven, Supabase, Neon)
DATABASE_URL="postgresql://user:password@host:port/dbname"

# External Redis (Upstash)
REDIS_URL="rediss://default:password@host:port"

# Server
PORT=5001
NODE_ENV=production

# OAuth & API Keys
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
OW_API_KEY=...
JWT_SECRET=...
CLIENT_URL=...
```

---

### Docker Image Sizes & Performance

| Configuration | Image Size | Build Time | Use Case |
|---|---|---|---|
| `Dockerfile` (dev) | 654MB | ~2-3 min | Local development |
| `Dockerfile.prod` (prod) | 654MB | ~2-3 min | Cloud deployment |

Both use multi-stage builds (Alpine Linux) để tối ưu hóa kích thước.

---

### Docker Management Script

**File**: `docker.ps1` (PowerShell)

PowerShell script quản lý tất cả Docker operations:

```powershell
# Development
.\docker.ps1 dev              # Start dev environment
.\docker.ps1 dev-down         # Stop dev environment
.\docker.ps1 rebuild          # Rebuild dev image

# Production
.\docker.ps1 prod             # Start prod environment  
.\docker.ps1 prod-down        # Stop prod environment

# Other commands
.\docker.ps1 logs-api         # View API logs
.\docker.ps1 ps               # Show running containers
.\docker.ps1 health           # Check health endpoints
.\docker.ps1 clean            # Clean up all containers/images
.\docker.ps1 seed             # Run seed data script
.\docker.ps1 migrate          # Run database migrations
```

---

### External Services Configuration

#### PostgreSQL Options:
- **Aiven**: Managed PostgreSQL ($15/month)
- **Supabase**: 1GB free tier
- **Neon**: 512MB free tier
- **Railway**: Pay-as-you-go

#### Redis Options:
- **Upstash**: Free tier (10K commands/day, 256MB data)
- **Redis Cloud**: Free tier (30MB)
- **Render**: Built-in Redis with DB hosting

---

### Connecting to External Services

**1. Get connection strings from provider**
2. **Set environment variables on cloud platform**:
   - Render: Render Dashboard → Environment
   - Azure: Web App → Configuration → Application Settings
   - Railway: Project → Variables
3. **Deploy image from Docker Hub**
4. **Verify connectivity**:
   ```powershell
   curl https://your-app-url/health
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

### Base URLs
- **Auth API**: `http://localhost:5001/api/auth`
- **City/Weather API**: `http://localhost:5001/api/cities`

### 🔐 Authentication Endpoints

| Method | Endpoint | Mô tả | Auth Required |
|--------|----------|-------|---------------|
| **GET** | `/api/auth/google` | Khởi tạo Google OAuth flow | ❌ |
| **GET** | `/api/auth/google/callback` | Google OAuth callback | ❌ |
| **GET** | `/api/auth/github` | Khởi tạo GitHub OAuth flow | ❌ |
| **GET** | `/api/auth/github/callback` | GitHub OAuth callback | ❌ |
| **GET** | `/api/auth/me` | Lấy thông tin user hiện tại | ✅ |
| **POST** | `/api/auth/logout` | Đăng xuất (xóa cookie) | ✅ |
| **DELETE** | `/api/auth/delete-account` | Xóa tài khoản | ✅ |

### 🌤️ Weather & City Endpoints

| Method | Endpoint | Mô tả | Auth Required | Cache |
|--------|----------|-------|---------------|-------|
| **GET** | `/api/cities/saved` | Lấy danh sách cities đã lưu | ✅ | ✅ |
| **POST** | `/api/cities/save/:name/:lat/:lon` | Lưu city mới | ✅ | ❌ |
| **DELETE** | `/api/cities/unsave/:cityId` | Xóa city đã lưu | ✅ | ❌ |
| **GET** | `/api/cities/saved/:cityId` | Lấy thời tiết của saved city | ✅ | ✅ |
| **GET** | `/api/cities/by-lat-lon/:lat/:lon/weather` | Lấy thời tiết theo tọa độ | ❌ | ✅ |
| **GET** | `/api/cities/by-lat-lon/:lat/:lon/weather/daily` | Dự báo 7 ngày | ❌ | ✅ |
| **GET** | `/api/cities/by-lat-lon/:lat/:lon/weather/hourly` | Dự báo theo giờ (5 ngày) | ❌ | ✅ |
| **GET** | `/api/cities/search?q=...` | Tìm kiếm địa điểm | ❌ | ❌ |

### 📋 API Categories

#### 🔐 **Authentication & User Management**
Quản lý đăng nhập OAuth và thông tin user

#### 🏙️ **Saved Cities Management**
Quản lý danh sách thành phố đã lưu của user (yêu cầu authentication)

#### 🌤️ **Weather Data**
Lấy thông tin thời tiết trực tiếp từ OpenWeather API (public endpoints)

---

### 🔐 Authentication & User Management

#### 1. Google OAuth Login
```http
GET /api/auth/google
```

**Mô tả**: Redirect user đến Google OAuth consent screen

**Flow**:
1. User click "Sign in with Google"
2. Redirect đến `/api/auth/google`
3. Google xác thực user
4. Callback về `/api/auth/google/callback`
5. Server tạo JWT và set httpOnly cookie
6. Redirect về frontend với `?success=true`

**Response**: Redirect to Google OAuth

---

#### 2. Google OAuth Callback
```http
GET /api/auth/google/callback
```

**Mô tả**: Xử lý callback từ Google sau khi user đăng nhập

**Success Response**:
- Set cookie `auth_token` (httpOnly, 7 days)
- Redirect: `http://localhost:5173/?success=true`

**Error Response**:
- Redirect: `http://localhost:5173/?success=false`

---

#### 3. GitHub OAuth Login
```http
GET /api/auth/github
```

**Mô tả**: Redirect user đến GitHub OAuth authorization

**Flow**: Tương tự Google OAuth

---

#### 4. GitHub OAuth Callback
```http
GET /api/auth/github/callback
```

**Mô tả**: Xử lý callback từ GitHub sau khi user đăng nhập

**Success Response**:
- Set cookie `auth_token` (httpOnly, 7 days)
- Redirect: `http://localhost:5173/?success=true`

---

#### 5. Get Current User (Get Me)
```http
GET /api/auth/me
```

**Headers**:
```
Cookie: auth_token=<jwt_token>
// OR
Authorization: Bearer <jwt_token>
```

**Response (200 OK)**:
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "John Doe",
    "email": "john@example.com",
    "avatar": "https://lh3.googleusercontent.com/...",
    "provider": "google",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (401 Unauthorized)**:
```json
{
  "error": "Unauthorized - No token provided"
}
```

**Note**: Token được đọc từ cookie (ưu tiên) hoặc Authorization header

---

#### 6. Logout
```http
POST /api/auth/logout
```

**Headers**:
```
Cookie: auth_token=<jwt_token>
```

**Response (200 OK)**:
```json
{
  "message": "Logged out successfully"
}
```

**Behavior**:
- Xóa cookie `auth_token`
- Client nên redirect về trang login

---

#### 7. Delete Account
```http
DELETE /api/auth/delete-account
```

**Headers**:
```
Cookie: auth_token=<jwt_token>
```

**Response (200 OK)**:
```json
{
  "message": "Account deleted successfully"
}
```

**Behavior**:
- Xóa user khỏi database
- Cascade delete: Tất cả saved cities của user cũng bị xóa
- Xóa cookie `auth_token`

**Error Response (401 Unauthorized)**:
```json
{
  "error": "Unauthorized"
}
```

---

### 🏙️ Saved Cities Management

#### 1. Lấy danh sách cities đã lưu
```http
GET /api/cities/saved
```

**Headers**:
```
Cookie: auth_token=<jwt_token>
```

**Response (200 OK)**:
```json
{
  "cities": [
    {
      "id": 1,
      "name": "Hà Nội",
      "lat": 21.0285,
      "lon": 105.8542,
      "savedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "Sài Gòn",
      "lat": 10.8231,
      "lon": 106.6297,
      "savedAt": "2024-01-14T08:20:00.000Z"
    }
  ]
}
```

**Response (200 OK - Empty list)**:
```json
{
  "cities": []
}
```

**Features**:
- ✅ User-specific: Chỉ trả về cities của user hiện tại
- ✅ Sorted by `savedAt` DESC (mới nhất trước)
- ✅ Cache với key `cities:saved:{userId}` (TTL: 10 phút)
- ✅ Anti-penetration: Cache empty list với marker { __empty: true }

**Cache**: ✅ Middleware `cacheSavedCitiesMiddleware`

---

#### 2. Lưu thành phố mới
```http
POST /api/cities/save/:name/:lat/:lon
```

**Headers**:
```
Cookie: auth_token=<jwt_token>
```

**URL Parameters**:
- `name` (string): Tên thành phố
- `lat` (number): Latitude
- `lon` (number): Longitude

**Ví dụ**:
```http
POST /api/cities/save/Hà Nội/21.0285/105.8542
```

**Response (201 Created - Thành phố mới)**:
```json
{
  "city": {
    "id": 1,
    "name": "Hà Nội",
    "lat": 21.0285,
    "lon": 105.8542,
    "savedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "City saved successfully"
}
```

**Response (200 OK - Thành phố đã tồn tại)**:
```json
{
  "city": {
    "id": 1,
    "name": "Hà Nội",
    "lat": 21.0285,
    "lon": 105.8542,
    "savedAt": "2024-01-10T08:00:00.000Z"
  },
  "message": "City already saved"
}
```

**Features**:
- ✅ Tự động kiểm tra trùng lặp theo `userId`, `lat`, `lon`
- ✅ Tạo City mới nếu chưa tồn tại trong bảng City
- ✅ Tạo UserCity relation (many-to-many)
- ✅ Write-Through cache: Insert DB → Delete cache → Warm up cache
- ✅ Cache invalidation: Xóa `cities:saved:{userId}` sau khi lưu

**Error Response (401 Unauthorized)**:
```json
{
  "error": "Unauthorized"
}
```

---

#### 3. Xóa thành phố đã lưu
```http
DELETE /api/cities/unsave/:cityId
```

**Headers**:
```
Cookie: auth_token=<jwt_token>
```

**URL Parameters**:
- `cityId` (number): ID của city cần xóa

**Ví dụ**:
```http
DELETE /api/cities/unsave/1
```

**Response (200 OK)**:
```json
{
  "message": "City unsaved successfully"
}
```

**Response (404 Not Found)**:
```json
{
  "error": "City not found or not saved by user"
}
```

**Features**:
- ✅ Xóa UserCity relation (không xóa City khỏi bảng City)
- ✅ Verify ownership: Chỉ xóa được city của chính user
- ✅ Write-Through cache: Delete DB → Delete cache → Warm up cache
- ✅ Cache invalidation: 
  - Xóa `cities:saved:{userId}`
  - Xóa pattern `weather:saved-city:{userId}:{cityId}`

**Error Response (401 Unauthorized)**:
```json
{
  "error": "Unauthorized"
}
```

---

#### 4. Lấy thời tiết của thành phố đã lưu
```http
GET /api/cities/saved/:cityId
```

**Headers**:
```
Cookie: auth_token=<jwt_token>
```

**URL Parameters**:
- `cityId` (number): ID của saved city

**Ví dụ**:
```http
GET /api/cities/saved/1
```

**Response (200 OK)**:
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
  "name": "Hà Nội",
  "savedCityId": 1,
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (404 Not Found)**:
```json
{
  "error": "City not found or not saved by user"
}
```

**Features**:
- ✅ Verify ownership: Chỉ lấy được weather của city thuộc về user
- ✅ **Override `name`**: Tên trả về là tên user đặt (từ database)
- ✅ Thêm `savedCityId` và `userId` để reference
- ✅ Cache với key `weather:saved-city:{userId}:{cityId}` (TTL: 10 phút + jitter)
- ✅ Anti-penetration: Cache empty với marker { __empty: true }

**Cache**: ✅ Middleware `cacheSavedCityWeatherMiddleware`

**Error Response (401 Unauthorized)**:
```json
{
  "error": "Unauthorized"
}
```

---

### 🌤️ Weather Data (Public Endpoints)

#### 5. Lấy thời tiết theo tọa độ địa lý
```http
GET /api/cities/by-lat-lon/:lat/:lon/weather
```

**URL Parameters**:
- `lat` (number): Latitude
- `lon` (number): Longitude

**Ví dụ**:
```http
GET /api/cities/by-lat-lon/21.0285/105.8542/weather
```

**Response (200 OK)**:
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

**Features**:
- ✅ Public endpoint (không cần authentication)
- ✅ Lấy thời tiết theo tọa độ (latitude, longitude)
- ✅ Cache với key `weather:latlon:{lat}:{lon}` (TTL: 10 phút + jitter)
- ✅ Dữ liệu tiếng Việt từ OpenWeather API
- ✅ Anti-penetration: Cache empty với marker { __empty: true }

**Cache**: ✅ Middleware `cacheWeatherMiddleware`

**Error Response (404 Not Found)**:
```json
{
  "error": "Weather data not found for this location"
}
```

---

#### 6. Dự báo thời tiết 7 ngày
```http
GET /api/cities/by-lat-lon/:lat/:lon/weather/daily
```

**URL Parameters**:
- `lat` (number): Latitude
- `lon` (number): Longitude

**Query Parameters** (optional):
- `cnt` (number): Số ngày dự báo (default: 7, max: 16)

**Ví dụ**:
```http
GET /api/cities/by-lat-lon/21.0285/105.8542/weather/daily?cnt=7
```

**Response (200 OK)**:
```json
{
  "city": {
    "id": 1581130,
    "name": "Hanoi",
    "coord": { "lon": 105.8542, "lat": 21.0285 },
    "country": "VN",
    "timezone": 25200
  },
  "cnt": 7,
  "list": [
    {
      "dt": 1642320000,
      "sunrise": 1642286400,
      "sunset": 1642329600,
      "temp": {
        "day": 28.5,
        "min": 22.0,
        "max": 30.0,
        "night": 23.5,
        "eve": 27.0,
        "morn": 22.5
      },
      "feels_like": { "day": 30.2, "night": 24.0, "eve": 28.5, "morn": 23.0 },
      "pressure": 1013,
      "humidity": 65,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "trời quang đãng",
          "icon": "01d"
        }
      ],
      "speed": 3.5,
      "deg": 120,
      "clouds": 10,
      "pop": 0.2
    }
    // ... 6 ngày tiếp theo
  ]
}
```

**Features**:
- ✅ Public endpoint
- ✅ Dự báo 7-16 ngày (default: 7)
- ✅ Nhiệt độ theo thời điểm: sáng, ngày, tối, đêm
- ✅ Thông tin chi tiết: áp suất, độ ẩm, tốc độ gió, mây
- ✅ Cache với key `weather:daily:{lat}:{lon}:cnt{cnt}` (TTL: 10 phút + jitter)
- ✅ Anti-penetration: Cache empty marker

**Cache**: ✅ Middleware `cacheDailyWeatherMiddleware`

---

#### 7. Dự báo thời tiết theo giờ (5 ngày)
```http
GET /api/cities/by-lat-lon/:lat/:lon/weather/hourly
```

**URL Parameters**:
- `lat` (number): Latitude
- `lon` (number): Longitude

**Ví dụ**:
```http
GET /api/cities/by-lat-lon/21.0285/105.8542/weather/hourly
```

**Response (200 OK)**:
```json
{
  "city": {
    "id": 1581130,
    "name": "Hanoi",
    "coord": { "lon": 105.8542, "lat": 21.0285 },
    "country": "VN",
    "timezone": 25200
  },
  "cnt": 40,
  "list": [
    {
      "dt": 1642320000,
      "main": {
        "temp": 28.5,
        "feels_like": 30.2,
        "temp_min": 27.0,
        "temp_max": 30.0,
        "pressure": 1013,
        "humidity": 65
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "trời quang đãng",
          "icon": "01d"
        }
      ],
      "clouds": { "all": 10 },
      "wind": { "speed": 3.5, "deg": 120 },
      "pop": 0.2,
      "dt_txt": "2024-01-15 12:00:00"
    }
    // ... 39 interval tiếp theo (mỗi 3 giờ)
  ]
}
```

**Features**:
- ✅ Public endpoint
- ✅ Dự báo 5 ngày với interval 3 giờ (40 data points)
- ✅ Thời gian chính xác với `dt_txt`
- ✅ Xác suất mưa (precipitation) với `pop`
- ✅ Cache với key `weather:hourly:{lat}:{lon}` (TTL: 10 phút + jitter)
- ✅ Anti-penetration: Cache empty marker

**Cache**: ✅ Middleware `cacheDailyHourWeatherMiddleware`

---

#### 8. Tìm kiếm địa điểm
```http
GET /api/cities/search?q=<search_term>
```

**Query Parameters**:
- `q` (string, required): Từ khóa tìm kiếm
- `limit` (number, optional): Số kết quả tối đa (default: 8)

**Ví dụ**:
```http
GET /api/cities/search?q=Hà Nội&limit=5
```

**Response (200 OK)**:
```json
{
  "results": [
    {
      "display_name": "Hà Nội, VN",
      "country": "VN",
      "lat": 21.0285,
      "lon": 105.8542,
      "rank": 0.9876
    },
    {
      "display_name": "Hà Nội, Thái Bình, VN",
      "country": "VN",
      "lat": 20.5333,
      "lon": 106.3333,
      "rank": 0.7543
    }
  ],
  "count": 2
}
```

**Response (200 OK - No results)**:
```json
{
  "results": [],
  "count": 0
}
```

**Features**:
- ✅ Public endpoint
- ✅ Full-text search với PostgreSQL (3.6M+ records)
- ✅ GIN index - sub-second response time
- ✅ Ranking algorithm với `ts_rank_cd`
- ✅ Multi-language: Tiếng Việt & English
- ✅ Smart query parsing với `plainto_tsquery`
- ✅ No cache (real-time search)

**Error Response (400 Bad Request)**:
```json
{
  "error": "Search query is required"
}
```

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
cities:saved:{userId}                    # List of saved cities (user-specific)
weather:latlon:{lat}:{lon}               # Weather by coordinates
weather:saved-city:{userId}:{cityId}     # Weather for saved city (user-specific)
weather:daily:{lat}:{lon}:cnt{cnt}       # Daily forecast (7-16 days)
weather:hourly:{lat}:{lon}               # Hourly forecast (5 days, 3-hour interval)
```

#### Cache Architecture

##### 🛡️ **Anti-Cache Avalanche (Chống cache đồng loạt expire)**
**Problem**: Khi nhiều cache keys cùng expire một lúc → đồng loạt request tới database/API → server quá tải

**Solution**: TTL Jitter (Random TTL)
```typescript
// src/utils/cacheHelper.ts
function getTTLWithJitter(baseTTL: number): number {
  const jitterPercent = 0.2; // 20% randomization
  const jitter = baseTTL * jitterPercent * Math.random();
  return Math.floor(baseTTL + jitter);
}

// Example: Base TTL = 600s → Actual TTL = 600-720s (random)
```

**Benefits**:
- ✅ Cache expires phân tán trong khoảng thời gian
- ✅ Giảm spike requests đến API/database
- ✅ Tránh thundering herd problem

##### 🔒 **Anti-Cache Penetration (Chống truy vấn giả)**
**Problem**: User request dữ liệu không tồn tại → cache miss → query database → không có data → không cache → lặp lại vòng lặp

**Solution**: Empty Marker Caching
```typescript
// src/utils/cacheHelper.ts
const CACHE_EMPTY_MARKER = { __empty: true };
const CACHE_EMPTY_TTL = 300; // 5 minutes

// Khi không tìm thấy data, cache empty marker
async function setEmptyCache(key: string): Promise<void> {
  await redisClient.setEx(
    key,
    CACHE_EMPTY_TTL,
    JSON.stringify(CACHE_EMPTY_MARKER)
  );
}
```

**Benefits**:
- ✅ Cache kết quả "không tìm thấy" để tránh query lại
- ✅ TTL ngắn (5 phút) để không ảnh hưởng khi data được tạo mới
- ✅ Giảm database load từ malicious requests

##### 🔄 **Write-Through Cache Pattern**
**Workflow**: Update DB → Delete old cache → Warm up new cache

**Example** (Save City):
```typescript
// 1. Insert vào database
const userCity = await prisma.userCity.create({...});

// 2. Delete old cache
await deleteCache(`cities:saved:${userId}`);

// 3. Warm up cache (optional, tăng tốc request tiếp theo)
await getSavedCities(userId); // Tự động cache lại
```

**Benefits**:
- ✅ Data luôn consistent giữa DB và cache
- ✅ Không có stale cache
- ✅ Cache được warm up ngay sau khi update

#### Cache Behavior

##### Cache Miss Flow:
```
Request → Middleware check cache → Cache MISS
  → Controller → Service query API/DB
  → Save to cache (with jitter TTL)
  → Return response
```

##### Cache Hit Flow:
```
Request → Middleware check cache → Cache HIT
  → Return cached data immediately
  → (Skip controller & service)
```

##### Empty Data Flow:
```
Request → Middleware check cache → Cache MISS
  → Service query API/DB → No data found
  → Cache empty marker (5 min TTL)
  → Return 404 / empty array
  
Next request (within 5 min):
Request → Middleware check cache → Found CACHE_EMPTY_MARKER
  → Return 404 / empty array immediately
  → (Skip API/DB query)
```

#### Cache TTL Configuration

| Cache Type | Base TTL | Jitter Range | Total Range |
|------------|----------|--------------|-------------|
| Weather data | 600s (10 min) | 20% (120s) | 600-720s |
| Daily forecast | 600s | 20% | 600-720s |
| Hourly forecast | 600s | 20% | 600-720s |
| Saved cities list | 600s | 20% | 600-720s |
| Empty marker | 300s (5 min) | 0% | 300s |

#### Cache Invalidation Strategy

##### Manual Invalidation (Write-Through):
- **Save city**: Delete `cities:saved:{userId}` → Warm up
- **Unsave city**: Delete `cities:saved:{userId}` + pattern `weather:saved-city:{userId}:{cityId}` → Warm up

##### Automatic Expiration:
- Weather cache tự động expire sau TTL
- Empty marker tự động expire sau 5 minutes

##### Pattern Deletion:
```typescript
// Delete all weather cache for a specific saved city
await deleteCacheByPattern(`weather:saved-city:${userId}:${cityId}`);
```

#### Cache Utilities

##### `src/utils/cacheHelper.ts` - Unified Cache Helper

```typescript
// Get from cache with empty marker handling
const data = await getFromCache<WeatherData>(cacheKey);
if (data === CACHE_EMPTY_MARKER) {
  return null; // Empty marker found
}
if (data) {
  return data; // Cache hit
}
// Cache miss - query API/DB

// Set to cache with jitter
await setToCache(cacheKey, weatherData, 600);

// Cache empty result
await setEmptyCache(cacheKey);

// Delete single key
await deleteCache(cacheKey);

// Delete by pattern
await deleteCacheByPattern(`weather:saved-city:${userId}:*`);
```

#### Middleware Cache Layers

| Middleware | Cache Key Pattern | Return on EMPTY | Return on HIT |
|------------|-------------------|-----------------|---------------|
| `cacheSavedCitiesMiddleware` | `cities:saved:{userId}` | `[]` | Cached list |
| `cacheWeatherMiddleware` | `weather:latlon:{lat}:{lon}` | 404 | Cached weather |
| `cacheSavedCityWeatherMiddleware` | `weather:saved-city:{userId}:{cityId}` | 404 | Cached weather |
| `cacheDailyWeatherMiddleware` | `weather:daily:{lat}:{lon}:cnt{cnt}` | 404 | Cached forecast |
| `cacheDailyHourWeatherMiddleware` | `weather:hourly:{lat}:{lon}` | 404 | Cached forecast |
| `cacheCityByIdMiddleware` | `cities:saved:{userId}` | 404 | Found city |

#### Redis Configuration
- **Host**: Configurable via `REDIS_HOST` (default: localhost)
- **Port**: Configurable via `REDIS_PORT` (default: 6379)
- **Password**: Optional via `REDIS_PASSWORD`
- **URL**: `REDIS_URL=redis://localhost:6379`
- **Connection**: Singleton pattern với retry logic
- **Serialization**: JSON.stringify/parse cho objects

---

## 🧪 Kiểm thử API

### 🔐 Testing OAuth Flow

#### Flow 1: Google OAuth
```powershell
# Bước 1: Mở browser và truy cập
Start-Process "http://localhost:5001/api/auth/google"

# Bước 2: Đăng nhập với Google account
# Google sẽ redirect về: http://localhost:5173/?success=true

# Bước 3: Cookie `auth_token` đã được set (check DevTools)
# Bây giờ có thể gọi authenticated endpoints
```

#### Flow 2: GitHub OAuth
```powershell
# Tương tự Google OAuth
Start-Process "http://localhost:5001/api/auth/github"
```

### 🔑 Testing với Authentication Token

#### Option 1: Sử dụng Cookie (Recommended)
```powershell
# Sau khi login, browser tự động gửi cookie
# Trong PowerShell, cần extract cookie từ browser

# Lấy token từ browser DevTools → Application → Cookies
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Tạo session với cookie
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$cookie = New-Object System.Net.Cookie("auth_token", $token, "/", "localhost")
$session.Cookies.Add("http://localhost:5001", $cookie)

# Sử dụng session cho các requests
Invoke-RestMethod -Uri 'http://localhost:5001/api/auth/me' -WebSession $session
```

#### Option 2: Sử dụng Authorization Header
```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri 'http://localhost:5001/api/auth/me' -Headers $headers
```

### Kiểm thử bằng PowerShell

#### 🔐 Authentication Endpoints

##### 1. Get Current User:
```powershell
# Với cookie session
Invoke-RestMethod -Uri 'http://localhost:5001/api/auth/me' -WebSession $session

# Với Authorization header
Invoke-RestMethod -Uri 'http://localhost:5001/api/auth/me' -Headers @{
    "Authorization" = "Bearer $token"
}
```

##### 2. Logout:
```powershell
Invoke-RestMethod -Method Post -Uri 'http://localhost:5001/api/auth/logout' -WebSession $session
```

##### 3. Delete Account:
```powershell
Invoke-RestMethod -Method Delete -Uri 'http://localhost:5001/api/auth/delete-account' -WebSession $session
```

#### 🏙️ Saved Cities Endpoints (Authenticated)

##### 1. Lấy danh sách cities đã lưu:
```powershell
Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/saved' -WebSession $session
```

##### 2. Lưu thành phố Hà Nội:
```powershell
Invoke-RestMethod -Method Post `
  -Uri 'http://localhost:5001/api/cities/save/Hà Nội/21.0285/105.8542' `
  -WebSession $session
```

##### 3. Lấy thời tiết của saved city:
```powershell
# Giả sử cityId = 1
Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/saved/1' -WebSession $session
```

##### 4. Xóa thành phố:
```powershell
Invoke-RestMethod -Method Delete `
  -Uri 'http://localhost:5001/api/cities/unsave/1' `
  -WebSession $session
```

#### 🌤️ Weather Endpoints (Public - No Auth)

##### 1. Lấy thời tiết theo tọa độ:
```powershell
Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather'
```

##### 2. Dự báo 7 ngày:
```powershell
Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather/daily?cnt=7'
```

##### 3. Dự báo theo giờ:
```powershell
Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather/hourly'
```

##### 4. Tìm kiếm địa điểm:
```powershell
$query = [System.Web.HttpUtility]::UrlEncode("Hà Nội")
Invoke-RestMethod -Uri "http://localhost:5001/api/cities/search?q=$query&limit=5"
```

### Kiểm thử với cURL (Git Bash / WSL / Linux):

#### 🔐 Authentication

```bash
# Get current user (với cookie)
curl http://localhost:5001/api/auth/me \
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"

# Get current user (với Authorization header)
curl http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Logout
curl -X POST http://localhost:5001/api/auth/logout \
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"

# Delete account
curl -X DELETE http://localhost:5001/api/auth/delete-account \
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"
```

#### 🏙️ Saved Cities (Authenticated)

```bash
# Lấy danh sách cities
curl http://localhost:5001/api/cities/saved \
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"

# Lưu thành phố mới
curl -X POST 'http://localhost:5001/api/cities/save/Hà Nội/21.0285/105.8542' \
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"

# Lấy thời tiết của saved city
curl http://localhost:5001/api/cities/saved/1 \
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"

# Xóa thành phố
curl -X DELETE http://localhost:5001/api/cities/unsave/1 \
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"
```

#### 🌤️ Weather (Public)

```bash
# Lấy thời tiết theo tọa độ
curl 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather'

# Dự báo 7 ngày
curl 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather/daily?cnt=7'

# Dự báo theo giờ
curl 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather/hourly'

# Tìm kiếm địa điểm
curl 'http://localhost:5001/api/cities/search?q=Hà%20Nội&limit=5'
```

### Kiểm thử với Postman hoặc Thunder Client:

1. Import collection hoặc tạo requests mới
2. Sử dụng các endpoint đã liệt kê ở phía trên
3. Kiểm tra response và status code

### Kiểm tra Redis Cache:

Redis được sử dụng để cache dữ liệu thời tiết với **anti-avalanche** và **anti-penetration** mechanisms.

#### Kết nối Redis CLI:
```powershell
# Trong Docker container
docker exec -it weather-forecast-express-redis-1 redis-cli

# Hoặc nếu đặt tên khác
docker ps  # Tìm tên container Redis
docker exec -it <redis-container-name> redis-cli
```

#### Cache Keys Reference:
```bash
# User-specific saved cities list
cities:saved:{userId}

# Weather by coordinates (public)
weather:latlon:{lat}:{lon}

# Saved city weather (user-specific)
weather:saved-city:{userId}:{cityId}

# Daily forecast
weather:daily:{lat}:{lon}:cnt{cnt}

# Hourly forecast
weather:hourly:{lat}:{lon}
```

#### Các lệnh Redis hữu ích:
```bash
# Xem tất cả cache keys
KEYS *

# Xem cache danh sách cities của user cụ thể
GET cities:saved:550e8400-e29b-41d4-a716-446655440000

# Xem cache thời tiết của saved city
GET weather:saved-city:550e8400-e29b-41d4-a716-446655440000:1

# Xem cache thời tiết theo tọa độ
GET weather:latlon:21.0285:105.8542

# Xem cache dự báo 7 ngày
GET weather:daily:21.0285:105.8542:cnt7

# Xem cache dự báo theo giờ
GET weather:hourly:21.0285:105.8542

# Kiểm tra TTL còn lại (giây)
TTL weather:latlon:21.0285:105.8542

# Kiểm tra empty marker
GET weather:latlon:99.9999:99.9999
# Kết quả: {"__empty":true} nếu location không tồn tại

# Xóa một cache key cụ thể
DEL weather:latlon:21.0285:105.8542

# Xóa tất cả cache của user (pattern)
EVAL "return redis.call('del', unpack(redis.call('keys', ARGV[1])))" 0 "cities:saved:550e8400-*"

# Xóa tất cả cache (cẩn thận!)
FLUSHALL

# Kiểm tra số lượng keys
DBSIZE

# Monitor real-time commands
MONITOR
```

#### Verify cache mechanisms:

##### 1️⃣ Anti-Avalanche (TTL Jitter):
```powershell
# Request nhiều lần và check TTL
1..5 | ForEach-Object {
    Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather' | Out-Null
    docker exec weather-forecast-express-redis-1 redis-cli TTL "weather:latlon:21.0285:105.8542"
}

# Kết quả mong đợi: TTL khác nhau mỗi lần (600-720s)
# Ví dụ: 612s, 687s, 645s, 701s, 623s
```

##### 2️⃣ Anti-Penetration (Empty Marker):
```powershell
# Request location không tồn tại
Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-lat-lon/99.9999/99.9999/weather'

# Check cache đã được set với empty marker
docker exec weather-forecast-express-redis-1 redis-cli GET "weather:latlon:99.9999:99.9999"
# Kết quả: {"__empty":true}

# Check TTL của empty marker (5 phút = 300s)
docker exec weather-forecast-express-redis-1 redis-cli TTL "weather:latlon:99.9999:99.9999"
# Kết quả: ~300s
```

##### 3️⃣ Write-Through Cache:
```powershell
# Lưu city mới
Invoke-RestMethod -Method Post `
  -Uri 'http://localhost:5001/api/cities/save/Test City/10.0/20.0' `
  -WebSession $session

# Verify cache đã bị xóa và warm up lại
docker exec weather-forecast-express-redis-1 redis-cli GET "cities:saved:YOUR_USER_ID"
# Kết quả: Danh sách cities mới với "Test City"
```

#### Verify cache performance:
```powershell
# Request lần 1 (cache MISS - gọi OpenWeather API)
Measure-Command { 
    Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather' 
}
# Kết quả: ~500-1000ms (tùy network)

# Request lần 2 trong vòng 10 phút (cache HIT - lấy từ Redis)
Measure-Command { 
    Invoke-RestMethod -Uri 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather' 
}
# Kết quả: ~10-50ms (nhanh hơn 10-100x)
```

#### Monitor cache statistics:
```bash
# Trong Redis CLI
INFO stats

# Xem cache hit/miss ratio
# keyspace_hits: Số lần cache hit
# keyspace_misses: Số lần cache miss
# Hit rate = hits / (hits + misses)
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

### Vấn đề với OAuth Authentication

#### ❌ Error: OAuth callback không hoạt động
```
Nguyên nhân: Callback URL không khớp với cấu hình trên OAuth provider
Giải pháp:
- Google: Kiểm tra Authorized redirect URIs trong Google Cloud Console
  Phải có: http://localhost:5001/api/auth/google/callback
- GitHub: Kiểm tra Authorization callback URL trong GitHub OAuth App
  Phải có: http://localhost:5001/api/auth/github/callback
- Facebook: Kiểm tra Valid OAuth Redirect URIs
  Phải có: http://localhost:5001/api/auth/facebook/callback
```

#### ❌ Error: JWT token invalid hoặc expired
```
Nguyên nhân: Token đã hết hạn hoặc JWT_SECRET không khớp
Giải pháp:
- Logout và login lại để lấy token mới
- Kiểm tra JWT_SECRET trong .env không thay đổi
- Kiểm tra JWT_EXPIRES_IN (default: 7d)
- Verify token tại https://jwt.io
```

#### ❌ Error: Cookie không được set sau OAuth login
```
Nguyên nhân: CORS hoặc SameSite cookie policy
Giải pháp:
- Kiểm tra CORS_ORIGIN trong .env khớp với frontend URL
- Verify cookie settings trong browser DevTools
- Đảm bảo backend và frontend cùng domain (localhost) trong dev
- Check httpOnly, SameSite settings trong passport.ts
```

#### ❌ Error: "Unauthorized - No token provided"
```
Nguyên nhân: Request không có token trong cookie hoặc header
Giải pháp:
- Kiểm tra cookie 'auth_token' đã được set chưa (DevTools → Application → Cookies)
- Hoặc thêm Authorization header: "Bearer YOUR_JWT_TOKEN"
- Đảm bảo đã login thành công trước
- Verify middleware authMiddleware đang hoạt động
```

#### ❌ Facebook OAuth: "App Not Setup: This app is still in development mode"
```
Nguyên nhân: Facebook app chưa được publish hoặc thiếu requirements
Giải pháp:
- Thêm app icon (1024x1024)
- Thêm Privacy Policy URL
- Thêm Terms of Service URL
- Verify business settings
- Hoặc tạm thời comment Facebook OAuth code
```

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

#### ❌ Error: Prisma migration failed
```
Nguyên nhân: Database schema không sync với migrations
Giải pháp:
- Reset database: npx prisma migrate reset
- Chạy lại migrations: npx prisma migrate dev
- Generate Prisma client: npx prisma generate
```

#### ❌ Error: Foreign key constraint violation
```
Nguyên nhân: Xóa user/city khi còn relations
Giải pháp:
- Cascade delete đã được config trong schema
- Verify onDelete: Cascade trong @relation
- Check UserCity relations trước khi xóa
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
- Kiểm tra REDIS_URL, REDIS_HOST, REDIS_PORT trong .env
- Verify Redis container đang chạy
- Test connection: redis-cli ping (kết quả: PONG)
- Check logs: docker logs <redis-container-name>
```

#### ❌ Cache không expire (TTL không hoạt động):
```
Nguyên nhân: TTL không được set hoặc set sai
Giải pháp:
- Verify cacheHelper.ts đang sử dụng setEx() thay vì set()
- Check TTL: redis-cli TTL <cache-key>
- Kết quả -1 = không expire, -2 = key không tồn tại, >0 = còn lại X giây
```

#### ❌ Empty marker không hoạt động:
```
Nguyên nhân: Middleware không kiểm tra CACHE_EMPTY_MARKER
Giải pháp:
- Verify middleware check: if (data === CACHE_EMPTY_MARKER)
- Check empty marker được cache: GET <cache-key> → {"__empty":true}
- Ensure CACHE_EMPTY_TTL = 300s (5 minutes)
```

### Vấn đề với CORS

#### ❌ CORS Error trên Frontend:
```
Nguyên nhân: Frontend domain không được allow
Giải pháp:
- Cập nhật CORS_ORIGIN trong .env
- Restart server sau khi thay đổi .env
- Ví dụ: CORS_ORIGIN=http://localhost:3000,http://localhost:5173
- Check credentials: true trong CORS config
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
| **Server** ||||
| `PORT` | Port server chạy | 5001 | ❌ |
| **Database** ||||
| `DATABASE_URL` | PostgreSQL connection string | - | ✅ |
| **OAuth - Google** ||||
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | - | ✅ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | - | ✅ |
| `GOOGLE_CALLBACK_URL` | Google OAuth callback URL | http://localhost:5001/api/auth/google/callback | ❌ |
| **OAuth - GitHub** ||||
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID | - | ✅ |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret | - | ✅ |
| `GITHUB_CALLBACK_URL` | GitHub OAuth callback URL | http://localhost:5001/api/auth/github/callback | ❌ |
| **OAuth - Facebook** ||||
| `FACEBOOK_APP_ID` | Facebook App ID | - | ❌ |
| `FACEBOOK_APP_SECRET` | Facebook App Secret | - | ❌ |
| `FACEBOOK_CALLBACK_URL` | Facebook OAuth callback | http://localhost:5001/api/auth/facebook/callback | ❌ |
| **JWT** ||||
| `JWT_SECRET` | Secret key for JWT signing | - | ✅ |
| `JWT_EXPIRES_IN` | JWT token expiration | 7d | ❌ |
| **OpenWeather API** ||||
| `OW_API_KEY` | OpenWeather API key | - | ✅ |
| `OW_BASE_URL` | OpenWeather base URL | https://api.openweathermap.org/data/2.5 | ✅ |
| **Redis** ||||
| `REDIS_URL` | Redis connection URL | redis://localhost:6379 | ❌ |
| `REDIS_HOST` | Redis hostname | localhost | ❌ |
| `REDIS_PORT` | Redis port | 6379 | ❌ |
| `REDIS_PASSWORD` | Redis password | - | ❌ |
| `CACHE_TTL` | Cache time-to-live (seconds) | 600 | ❌ |
| **Frontend** ||||
| `CORS_ORIGIN` | Allowed CORS origins | http://localhost:5173 | ❌ |
| `FRONTEND_URL` | Frontend URL for redirects | http://localhost:5173 | ❌ |

### Database Schema

#### Models Overview:

##### 1. **User Model** (OAuth Authentication)
```prisma
model User {
  id           String             @id @default(uuid())
  username     String
  email        String             @unique
  avatar       String?            // Profile picture URL from OAuth provider
  provider     String             // "google" | "github" | "facebook"
  providerId   String             @map("provider_id") // OAuth provider user ID
  createdAt    DateTime           @default(now()) @map("created_at")

  savedCities  UserCity[]         // Many-to-many relation

  @@unique([provider, providerId])
  @@map("users")
}
```

**Features**:
- ✅ UUID primary key (không dùng auto-increment)
- ✅ Email unique constraint
- ✅ Composite unique trên `provider` + `providerId`
- ✅ Avatar URL từ OAuth provider
- ✅ Cascade delete: Xóa user → xóa tất cả UserCity relations

##### 2. **City Model**
```prisma
model City {
  id           Int      @id @default(autoincrement())
  name         String
  lat          Float
  lon          Float
  
  savedByUsers UserCity[]  // Many-to-many relation
}
```

**Features**:
- ✅ Shared city repository (nhiều user có thể lưu cùng 1 city)
- ✅ Không xóa City khi unsave (chỉ xóa UserCity relation)

##### 3. **UserCity Model** (Many-to-Many Junction Table)
```prisma
model UserCity {
  userId       String
  cityId       Int
  savedAt      DateTime @default(now()) @map("saved_at")
  
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  city         City     @relation(fields: [cityId], references: [id], onDelete: Cascade)
  
  @@id([userId, cityId])        // Composite primary key
  @@map("user_cities")
}
```

**Features**:
- ✅ Composite primary key: `userId` + `cityId` → không duplicate
- ✅ `savedAt` timestamp để track khi nào user lưu
- ✅ Cascade delete: Xóa user hoặc city → xóa relation
- ✅ Cho phép: 1 user lưu nhiều cities, 1 city được lưu bởi nhiều users

##### 4. **Location Model** (Full-Text Search)
```prisma
model Location {
  id           Int                      @id @default(autoincrement())
  display_name String                   @db.Text
  country      String?                  @db.Char(2)     // ISO country code
  lat          Float                    @db.DoublePrecision
  lon          Float                    @db.DoublePrecision
  search_vector Unsupported("tsvector")? // PostgreSQL tsvector

  @@index([display_name], map: "idx_display_name_prefix")
  @@index([search_vector], type: Gin, map: "idx_search_vector_gin")
}
```

**Features**:
- ✅ 3.6M+ địa điểm toàn cầu
- ✅ GIN index trên `search_vector` cho full-text search
- ✅ B-tree index trên `display_name` làm fallback
- ✅ Country code ISO 3166-1 alpha-2

#### Database Relationships:

```
User (1) ←→ (N) UserCity (N) ←→ (1) City
│                                    
└─ id (UUID)                        
└─ email (unique)                   
└─ provider + providerId (unique)   

UserCity:
└─ userId + cityId (composite PK)
└─ savedAt (timestamp)

City:
└─ id (auto-increment)
└─ name, lat, lon

Location: (Standalone, no relations)
└─ search_vector (GIN indexed)
```

#### Example Queries:

##### Lấy tất cả cities của user:
```typescript
const cities = await prisma.userCity.findMany({
  where: { userId: "user-uuid" },
  include: { city: true },
  orderBy: { savedAt: 'desc' }
});
```

##### Kiểm tra user đã lưu city chưa:
```typescript
const exists = await prisma.userCity.findUnique({
  where: {
    userId_cityId: {
      userId: "user-uuid",
      cityId: 123
    }
  }
});
```

##### Tìm hoặc tạo city:
```typescript
const city = await prisma.city.upsert({
  where: {
    // Custom logic: check by lat/lon
    lat_lon: { lat, lon }
  },
  update: {},
  create: { name, lat, lon }
});
```

**Lưu ý**: Dự án sử dụng `userId` (UUID) và `cityId` để định danh, không sử dụng `owmId` từ OpenWeather API.

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
