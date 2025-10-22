# Weather Forecast Express

Backend REST API phục vụ ứng dụng thời tiết, xây dựng bằng **Express + TypeScript + Prisma** và sử dụng dữ liệu thời tiết từ **OpenWeather API**.

## 🗂 Cấu trúc chính

- `src/app.ts` – cấu hình express app và middleware (CORS, JSON parser, routes)
- `src/server.ts` – khởi động HTTP server, load biến môi trường qua dotenv
- `src/routes/city.routes.ts` – định nghĩa các endpoint `/api/cities`
- `src/controllers/city.controller.ts` – xử lý request/response
- `src/services/weather.service.ts` – gọi OpenWeather, thao tác Prisma
- `prisma/schema.prisma` – schema cơ sở dữ liệu và định nghĩa model `City`

## ✅ Yêu cầu

- Node.js >= 18
- PostgreSQL (có thể chạy qua Docker)
- Tài khoản và API key từ [OpenWeather](https://openweathermap.org/api)

## ⚙️ Thiết lập & cấu hình

1. Cài phụ thuộc:

   ```powershell
   npm install
   ```

2. Tạo file `.env` trong thư mục `weather-forecast-express/`:

   ```env
   PORT=5001
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/weather_db?schema=public
   OW_API_KEY=your_openweather_api_key
   OW_BASE_URL=https://api.openweathermap.org/data/2.5
   CORS_ORIGIN=http://localhost:5173
   ```

   > **Lưu ý**: Tạo API key miễn phí tại [OpenWeather Dashboard](https://home.openweathermap.org/api_keys). Key mới cần ~10 phút để có hiệu lực.

3. Khởi chạy PostgreSQL (tùy chọn sử dụng docker-compose ở thư mục gốc dự án):

   ```powershell
   docker compose up -d postgres
   ```

4. Khởi tạo Prisma Client và migration:

   ```powershell
   npx prisma generate
   npx prisma migrate dev --name init
   ```

## ▶️ Chạy môi trường development

```powershell
npm run dev
```

Mặc định server sẽ chạy tại `http://localhost:5001`. Cấu hình `nodemon` + `ts-node` cho phép hot reload TypeScript, không cần build trước.

## 📡 Tích hợp với OpenWeather

- `weather.service.ts` sử dụng `OW_API_KEY` và `OW_BASE_URL` để gọi các endpoint:
  - `/weather?q={city}` – lấy thời tiết theo tên thành phố
  - `/weather?id={owmId}` – lấy theo OpenWeather city id
  - `/geo/1.0/direct?q={query}` – geocoding (gợi ý tìm kiếm)
- Kết quả được chuẩn hóa và lưu vào PostgreSQL với schema `City` (bao gồm `lat`, `lon`, `timezone`, `lastWeather`, …).

## 📚 API chính

| Method | Endpoint | Mô tả |
| --- | --- | --- |
| GET | `/api/cities` | Danh sách thành phố đã lưu |
| POST | `/api/cities` (body: `{ name }`) | Lưu thành phố qua OpenWeather và đồng bộ DB |
| DELETE | `/api/cities` (body: `{ name }`) | Gỡ thành phố khỏi danh sách lưu |
| GET | `/api/cities/:id` | Chi tiết thành phố đã lưu (DB id) |
| POST | `/api/cities/:id/refresh` | Lấy thời tiết mới nhất và cập nhật DB |
| GET | `/api/cities/by-name/:name/weather` | Lấy thời tiết trực tiếp (không lưu) |
| GET | `/api/cities/by-id/:owmId/weather` | Lấy thời tiết theo OpenWeather city id |
| GET | `/api/cities/by-coords/weather?lat=..&lon=..` | Lấy thời tiết theo tọa độ |
| GET | `/api/cities/search?query=..` | Gợi ý thành phố qua OpenWeather Geocoding |

## 🧪 Kiểm thử nhanh bằng PowerShell

```powershell
# Lưu thành phố Hồ Chí Minh
Invoke-RestMethod -Method Post -Uri 'http://localhost:5001/api/cities' -ContentType 'application/json' -Body '{"name":"Ho Chi Minh City"}'

# Danh sách thành phố đã lưu
Invoke-RestMethod -Method Get 'http://localhost:5001/api/cities'

# Lấy thời tiết trực tiếp theo tên
Invoke-RestMethod -Method Get 'http://localhost:5001/api/cities/by-name/Hanoi/weather'

# Gợi ý tìm kiếm
Invoke-RestMethod -Method Get 'http://localhost:5001/api/cities/search?query=Ho%20Chi%20Minh'
```

## 🔄 Quy trình phát triển

1. Cập nhật schema Prisma (nếu cần) trong `prisma/schema.prisma`
2. Chạy `npx prisma migrate dev --name <tên_migration>`
3. Chạy `npx prisma generate` để đồng bộ types
4. Viết code service/controller/routes
5. `npm run dev` để kiểm tra thực tế

## 🛠 Troubleshooting

- **401/400 từ OpenWeather**: kiểm tra `OW_API_KEY`, `OW_BASE_URL` và trạng thái gói API.
- **Lỗi `The column City.owmId does not exist`**: đảm bảo đã chạy `npx prisma migrate deploy`/`dev` sau khi pull.
- **CORS trên frontend**: chỉnh `CORS_ORIGIN` trong `.env` cho khớp domain FE.

---

Happy coding! Nếu cần thêm hướng dẫn triển khai production (Dockerfile, CI/CD, logging, rate-limit), có thể mở issue hoặc PR tại kho mã.
