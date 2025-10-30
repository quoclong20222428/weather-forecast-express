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

### 7. Khởi Động Development Server

Chạy ứng dụng ở chế độ development với hot-reload:

```bash
npm run dev
```

Server sẽ khởi động tại `http://localhost:3000`

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

Nếu bạn gặp lỗi xung đột cổng, đảm bảo không có dịch vụ nào khác đang chạy trên cổng 3000, 5432, hoặc 6379.

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

## Cấu Trúc Dự Án

```
weather-forecast-express/
├── prisma/              # Database schema và migrations
├── src/
│   ├── config/          # Các file cấu hình
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── docker-compose.dev.yml  # Cấu hình Docker cho development
└── package.json         # Dependencies của dự án
```

## Bước Tiếp Theo

Sau khi hoàn thành cài đặt:
1. Xem [README.md](./README.md) chính để biết thêm về tài liệu API
2. Khám phá các API endpoints tại `http://localhost:3000`
3. Sử dụng Prisma Studio để xem và quản lý dữ liệu database: `npx prisma studio`

---

Chúc bạn code vui vẻ! 🚀
