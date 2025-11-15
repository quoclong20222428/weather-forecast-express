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

**Enterprise-grade Weather Forecast REST API**

Production-ready backend built with Express.js, TypeScript, Prisma ORM, Redis Cache, and OAuth 2.0 Authentication

[Features](#-key-features) • [Get Started](#-installation) • [API Docs](#-api-endpoints) • [Architecture](#-project-structure)

</div>

---

## 📋 Table of Contents

<table align="center">
<tr>
<td width="50%">

### 📖 Overview
- [🎯 Introduction](#-introduction)
- [🚀 Key Features](#-key-features)
- [🛠 Tech Stack](#-tech-stack)
- [🗂 Project Structure](#-project-structure)

### ⚙️ Setup & Configuration
- [✅ Requirements](#-requirements)
- [🔧 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [▶️ Running](#️-running-the-application)

</td>
<td width="50%">

### 🔌 API & Testing
- [📚 API Endpoints](#-api-endpoints)
- [🧪 Testing](#-testing)
- [🔄 Development](#-development-workflow)

### 📚 Documentation
- [🛠 Troubleshooting](#-troubleshooting)
- [📝 Notes](#-notes)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

</td>
</tr>
</table>

---

## 🎯 Introduction

**Weather Forecast Express** is an enterprise-grade REST API designed for modern weather applications. Built with a focus on scalability, security, and performance, it provides a comprehensive set of features for weather data distribution and user management.

### Core Capabilities

**🔐 Authentication & Security**
- OAuth 2.0 Integration (Google, GitHub, Facebook ready)
- JWT-based authentication with httpOnly cookies
- Secure session management and CORS configuration

**🌤️ Weather Data Services**
- Real-time weather conditions by geographic coordinates
- 7-day forecast with temperature ranges
- 5-day hourly forecast (3-hour intervals)
- User-specified saved cities

**🔍 Advanced Features**
- Full-text search across 3.6M+ global locations
- Production-grade Redis caching with anti-avalanche and anti-penetration
- User profile management with cascade deletion
- Real-world data integration from OpenWeather API

**⚙️ Technical Excellence**
- Type-safe development with TypeScript
- PostgreSQL database with Prisma ORM
- Layered architecture for maintainability
- Comprehensive error handling and request logging
- Docker containerization for easy deployment

## 🚀 Key Features

### 🔐 Authentication & Security

**OAuth 2.0 Integration**
- Google OAuth 2.0 authentication
- GitHub OAuth 2.0 authentication  
- Facebook OAuth ready (pending app verification)

**Secure Token Management**
- JWT-based authentication with HS256 signing
- HttpOnly cookies for XSS protection
- SameSite cookie attribute for CSRF protection
- Configurable token expiration (default: 7 days)

**User Account Management**
- Profile retrieval with OAuth provider data
- Secure logout with token invalidation
- Account deletion with cascade cleanup

---

### 🏙️ Saved Cities Management

**City Operations**
- Add cities to favorites with custom names
- Remove cities from saved collections
- Retrieve user-specific city lists
- Automatic duplicate detection and prevention

**Data Isolation**
- User-specific city lists with many-to-many relationships
- Cascade deletion on account removal
- Chronological sorting by save timestamp

---

### 🌤️ Weather Data Services

**Real-time Weather Information**
- Current weather by geographic coordinates (lat/lon)
- Temperature, feels-like, humidity, pressure
- Wind speed, direction, and cloud coverage
- Localized weather descriptions (Vietnamese/English)

**Forecast Services**
- **Daily Forecast**: 7-16 days with min/max temperatures
- **Hourly Forecast**: 5 days at 3-hour intervals
- Precipitation probability and sunrise/sunset times

**Saved Cities Weather**
- Weather data for user's saved cities
- Custom city names override API defaults
- User-specific weather caching

---

### 🔍 Location Search Engine

**High-Performance Search**
- PostgreSQL full-text search across **3.6 million+** global locations
- GIN (Generalized Inverted Index) for optimal query performance
- Sub-second response times regardless of dataset size

**Smart Search Features**
- Cover density ranking algorithm (`ts_rank_cd`)
- Multi-language support (Vietnamese, English)
- Automatic query normalization with `plainto_tsquery`
- ISO 3166-1 alpha-2 country codes

---

### ⚡ Performance Optimization

**Advanced Caching Strategy**
- Redis-based distributed caching layer
- **Anti-cache avalanche**: 20% TTL jitter prevents simultaneous expiration
- **Anti-cache penetration**: Empty marker caching (5-min TTL)
- Write-through cache pattern for data consistency

**Cache Architecture**
```
cities:saved:{userId}                    # User city lists
weather:latlon:{lat}:{lon}               # Weather by coordinates
weather:saved-city:{userId}:{cityId}     # User-specific weather
weather:daily:{lat}:{lon}:cnt{cnt}       # Daily forecasts
weather:hourly:{lat}:{lon}               # Hourly forecasts
```

**Database Optimization**
- GIN indexes for full-text search (100-1000x faster than LIKE)
- B-tree indexes for relational queries
- Optimized query execution plans
- Connection pooling with Prisma Client

---

### 🏗️ Architecture & Design

**Clean Architecture Principles**
- Layered architecture: Routes → Middleware → Controllers → Services → Data
- Modular structure with single responsibility principle
- Index export pattern for clean imports
- Separation of concerns across all layers

**Development Best Practices**
- Type-safe development with TypeScript
- Comprehensive error handling with custom HttpError class
- Request logging with detailed metrics (method, path, status, duration)
- CORS configuration for cross-origin requests
- Environment-based configuration with dotenv

**Containerization**
- Docker Compose orchestration
- Multi-container setup (PostgreSQL, Redis, Node.js App)
- Persistent volume storage for database
- Isolated network communication
- Health checks and restart policies

## 🛠 Tech Stack

### Core Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Runtime** | Node.js | 18+ | JavaScript runtime environment |
| **Language** | TypeScript | 5.9 | Type-safe development |
| **Framework** | Express.js | 5.1 | Fast, unopinionated web framework |

### Authentication & Security

| Technology | Version | Purpose |
|-----------|---------|---------|
| Passport.js | 0.7 | Authentication middleware |
| passport-google-oauth20 | 2.0 | Google OAuth 2.0 strategy |
| passport-github2 | 0.1 | GitHub OAuth 2.0 strategy |
| passport-facebook | 3.0 | Facebook OAuth strategy |
| jsonwebtoken | 9.0 | JWT generation & verification |
| cookie-parser | 1.4 | HTTP cookie parsing |
| bcrypt-ts | 7.1 | Password hashing (future use) |

### Database & ORM

| Technology | Version | Purpose |
|-----------|---------|---------|
| PostgreSQL | 13+ | Relational database |
| Prisma ORM | 6.17 | Type-safe database client |
| pg | 8.16 | PostgreSQL client for Node.js |

### Caching & Performance

| Technology | Version | Purpose |
|-----------|---------|---------|
| Redis | 6+ | In-memory data structure store |
| redis (client) | 5.9 | Redis client for Node.js |

### External APIs

| Service | Purpose |
|---------|---------|
| OpenWeather API | Real-time weather data and geocoding |
| Axios | HTTP client for API requests |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| Docker | Latest | Containerization platform |
| Docker Compose | Latest | Multi-container orchestration |
| nodemon | 3.1 | Auto-restart on file changes |
| ts-node | 10.9 | TypeScript execution engine |
| tsx | 4.19 | Enhanced TypeScript runner |

### Utilities

| Library | Purpose |
|---------|---------|
| dotenv | Environment variable management |
| cors | Cross-Origin Resource Sharing |

## 🗂 Project Structure

### 🏗️ Layered Architecture

The project is organized using **layered architecture** with **modular structure**, where each layer has clear responsibilities:

```
┌─────────────────────────────────────────────────────────┐
│                    📱 CLIENT                            │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP Request
┌──────────────────────▼──────────────────────────────────┐
│                  🛣️ ROUTES LAYER                        │
│           Define endpoints and routing                  │
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

### 📁 Directory Structure

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
└── README.en.md                        # English documentation
```

### 🎯 Code Organization Principles

#### 1. **Layered Architecture**
```
Routes → Middleware → Controllers → Services → Data Access
```
- **Routes**: Define API endpoints
- **Middleware**: Pre/post request processing (cache, logging, validation)
- **Controllers**: Validate input, call services, format response
- **Services**: Business logic, call external APIs
- **Data Access**: Interact with Database and Cache

#### 2. **Modular Structure**
- Each module (city, user, auth...) has its own directory
- Each file contains **1 function** (Single Responsibility)
- `index.ts` files centralize exports (Export Hub Pattern)

#### 3. **Naming Convention**
```
[actionName][Resource].[layer].ts
```
Examples:
- `saveCity.controller.ts` - Controller for saving city
- `getWeatherByLatLon.service.ts` - Service for getting weather by coordinates
- `cacheWeather.ts` - Middleware for caching weather

#### 4. **Import Pattern**
```typescript
// Import from module index (Recommended)
import { saveCity } from "../../services/weather/index.js";

// Or from root index
import { saveCity } from "../../services/index.js";
```

---

## 🔍 PostgreSQL Full-Text Search - Optimized for 3.6M+ Records

The project uses **PostgreSQL Full-Text Search** to search locations with high performance across **3,637,189 global location records**.

### 📊 Database Statistics

- **Total records**: 3,637,189 locations
- **Data size**: ~535 MB (NDJSON format)
- **Coverage**: Global (all countries)
- **Query time**: < 50ms for any search query

### 🚀 Full-Text Search Techniques

#### 1. **tsvector - Text Search Vector**

PostgreSQL converts text into **tsvector** - a special data type optimized for searching:

```sql
-- Example: "Hà Nội, Vietnam" converts to tsvector
to_tsvector('simple', 'Hà Nội, Vietnam')
-- Result: 'hà':1 'nội':2 'vietnam':3
```

#### 2. **GIN Index - Generalized Inverted Index**

GIN Index is the key to high performance:

```sql
CREATE INDEX idx_search_vector_gin 
ON "Location" 
USING GIN (search_vector);
```

**Benefits of GIN Index:**
- ✅ **100-1000x faster** than LIKE/ILIKE queries
- ✅ **Constant time complexity** O(1) for searches
- ✅ **Scalable**: Performance doesn't degrade with millions of records
- ✅ **Space efficient**: Index size smaller than B-tree index

**Performance Comparison:**
| Method | 3.6M Records | Index Type | Avg Time |
|--------|--------------|------------|----------|
| `LIKE '%term%'` | ❌ Full scan | None | ~2000ms |
| `ILIKE 'term%'` | ⚠️ Partial scan | B-tree | ~500ms |
| **Full-Text Search** | ✅ Index scan | **GIN** | **< 50ms** |

#### 3. **Multi-language Support**

The database supports searching in both Vietnamese and English:

```typescript
// Vietnamese with diacritics
searchLocationsFullText("Hồ Chí Minh"); // ✅ Works

// Vietnamese without diacritics  
searchLocationsFullText("Ho Chi Minh"); // ✅ Works (with unaccent extension)

// English
searchLocationsFullText("New York");    // ✅ Works
```

---

## ✅ Requirements

Before getting started, ensure your machine has:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** or **yarn** (bundled with Node.js)
- **PostgreSQL** >= 13.x (can run via Docker)
- **Redis** >= 6.x (can run via Docker)
- **Docker & Docker Compose** (optional, for running PostgreSQL and Redis)
- **OpenWeather Account** and API key ([Free signup](https://openweathermap.org/api))

## 🔧 Installation

### Step 1: Clone repository

```bash
git clone https://github.com/quoclong20222428/weather-forecast-express.git
cd weather-forecast-express
```

### Step 2: Install dependencies

```bash
npm install
```

This will install all required packages including:
- Express, TypeScript, Prisma
- PostgreSQL client (pg)
- Redis client
- Axios and other dependencies

## ⚙️ Configuration

### Step 1: Create environment file (.env)

Create `.env` file in the root directory `weather-forecast-express/`:

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

#### OAuth Setup Guide:

##### 🔵 Google OAuth:
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Select **Web application**
6. Add **Authorized redirect URIs**:
   - `http://localhost:5001/api/auth/google/callback`
   - `http://localhost:5173` (Frontend)
7. Copy **Client ID** and **Client Secret** to `.env`

##### ⚫ GitHub OAuth:
1. Visit [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in details:
   - **Application name**: Weather Forecast App
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5001/api/auth/github/callback`
4. Copy **Client ID** and **Client Secret** to `.env`

#### Getting OpenWeather API Key:

1. Visit [OpenWeather](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to [API Keys Dashboard](https://home.openweathermap.org/api_keys)
4. Create a new API key or copy the existing one
5. Replace `your_openweather_api_key_here` in `.env`

### Step 2: Start PostgreSQL and Redis

#### Using Docker Compose (Recommended):

```bash
docker compose up -d
```

This will start both PostgreSQL and Redis containers.

#### Or install manually:

- **PostgreSQL**: [Download](https://www.postgresql.org/download/)
- **Redis**: [Download](https://redis.io/download)

### Step 3: Configure Database with Prisma

#### 3.1. Generate Prisma Client:

```bash
npx prisma generate
```

#### 3.2. Run migrations to create database schema:

```bash
npx prisma migrate dev --name init
```

Or if migrations already exist:

```bash
npx prisma migrate deploy
```

#### 3.3. (Optional) View database with Prisma Studio:

```bash
npx prisma studio
```

Prisma Studio opens at `http://localhost:5555`.

## ▶️ Running the Application

### Development Mode (with hot reload):

```bash
npm run dev
```

Server runs at: **`http://localhost:5001`**

nodemon + ts-node auto-reload on code changes without rebuild.

### Production Mode:

```bash
# Build TypeScript to JavaScript
npm run build

# Run production server
npm start
```

### Verify server is running:

```bash
# Check root endpoint
curl http://localhost:5001/

# Check weather endpoint
curl 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather'
```

## 📚 API Endpoints

### Base URLs
- **Auth API**: `http://localhost:5001/api/auth`
- **City/Weather API**: `http://localhost:5001/api/cities`

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| **GET** | `/api/auth/google` | Initiate Google OAuth flow | ❌ |
| **GET** | `/api/auth/google/callback` | Google OAuth callback | ❌ |
| **GET** | `/api/auth/github` | Initiate GitHub OAuth flow | ❌ |
| **GET** | `/api/auth/github/callback` | GitHub OAuth callback | ❌ |
| **GET** | `/api/auth/me` | Get current user | ✅ |
| **POST** | `/api/auth/logout` | Logout (delete cookie) | ✅ |
| **DELETE** | `/api/auth/delete-account` | Delete account | ✅ |

### 🌤️ Weather & City Endpoints

| Method | Endpoint | Description | Auth | Cache |
|--------|----------|-------------|------|-------|
| **GET** | `/api/cities/saved` | Get saved cities list | ✅ | ✅ |
| **POST** | `/api/cities/save/:name/:lat/:lon` | Save new city | ✅ | ❌ |
| **DELETE** | `/api/cities/unsave/:cityId` | Delete saved city | ✅ | ❌ |
| **GET** | `/api/cities/saved/:cityId` | Get saved city weather | ✅ | ✅ |
| **GET** | `/api/cities/by-lat-lon/:lat/:lon/weather` | Get weather by coordinates | ❌ | ✅ |
| **GET** | `/api/cities/by-lat-lon/:lat/:lon/weather/daily` | 7-day forecast | ❌ | ✅ |
| **GET** | `/api/cities/by-lat-lon/:lat/:lon/weather/hourly` | Hourly forecast (5 days) | ❌ | ✅ |
| **GET** | `/api/cities/search?q=...` | Search locations | ❌ | ❌ |

---

## 🧪 Testing

### Testing with cURL:

```bash
# Get current user
curl 'http://localhost:5001/api/auth/me' \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get weather by coordinates
curl 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather'

# Daily forecast
curl 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather/daily?cnt=7'

# Hourly forecast
curl 'http://localhost:5001/api/cities/by-lat-lon/21.0285/105.8542/weather/hourly'

# Search locations
curl 'http://localhost:5001/api/cities/search?q=London&limit=5'
```

---

## 🔄 Development Workflow

### Adding new features:

1. **Update Database Schema** (if needed)
   ```bash
   # Edit prisma/schema.prisma
   npx prisma migrate dev --name add_new_feature
   npx prisma generate
   ```

2. **Write Service Layer**
   - Add business logic to `src/services/`
   - Interact with database and external APIs

3. **Create Controller**
   - Add request handlers to `src/controllers/`
   - Validate input and format response

4. **Define Routes**
   - Update `src/routes/` with new endpoints
   - Apply middleware if needed

5. **Test and Debug**
   ```bash
   npm run dev
   ```

### Best Practices:

- ✅ Use TypeScript types for type safety
- ✅ Validate input data before processing
- ✅ Handle errors gracefully
- ✅ Apply caching for infrequently changing data
- ✅ Log requests and errors for debugging
- ✅ Write clean code with comments when needed

## 🛠 Troubleshooting

### OAuth Authentication Issues

#### ❌ OAuth callback not working
```
Cause: Callback URL doesn't match OAuth provider configuration
Solution:
- Google: Check Authorized redirect URIs in Google Cloud Console
  Must include: http://localhost:5001/api/auth/google/callback
- GitHub: Check Authorization callback URL in GitHub OAuth App
  Must include: http://localhost:5001/api/auth/github/callback
```

#### ❌ JWT token invalid or expired
```
Cause: Token expired or JWT_SECRET mismatch
Solution:
- Logout and login again to get new token
- Verify JWT_SECRET in .env hasn't changed
- Check JWT_EXPIRES_IN (default: 7d)
```

### Database Issues

#### ❌ Connection to database failed
```
Cause: PostgreSQL not running or DATABASE_URL incorrect
Solution:
- Check PostgreSQL is running: docker ps
- Verify DATABASE_URL in .env
- Try manual connection: psql -h localhost -U postgres -d weather_db
```

#### ❌ Prisma migration failed
```
Cause: Database schema not synced with migrations
Solution:
- Reset database: npx prisma migrate reset
- Run migrations: npx prisma migrate dev
- Generate Prisma client: npx prisma generate
```

### Redis Issues

#### ❌ Redis connection refused
```bash
# Check Redis is running
docker ps | grep redis

# Restart Redis
docker compose restart redis

# Or run Redis standalone
docker run -d -p 6379:6379 redis:latest
```

### CORS Issues

#### ❌ CORS Error on Frontend
```
Cause: Frontend domain not allowed
Solution:
- Update CORS_ORIGIN in .env
- Restart server after changing .env
- Example: CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

---

## 📝 Notes

### Environment Variables Reference

All important environment variables:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5001 | ❌ |
| `DATABASE_URL` | PostgreSQL connection string | - | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | - | ✅ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | - | ✅ |
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID | - | ✅ |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret | - | ✅ |
| `JWT_SECRET` | Secret key for JWT signing | - | ✅ |
| `JWT_EXPIRES_IN` | JWT token expiration | 7d | ❌ |
| `OW_API_KEY` | OpenWeather API key | - | ✅ |
| `REDIS_URL` | Redis connection URL | redis://localhost:6379 | ❌ |
| `REDIS_HOST` | Redis hostname | localhost | ❌ |
| `REDIS_PORT` | Redis port | 6379 | ❌ |
| `CACHE_TTL` | Cache time-to-live (seconds) | 600 | ❌ |
| `CORS_ORIGIN` | Allowed CORS origins | http://localhost:5173 | ❌ |

### Cache Strategy

- **TTL**: 
  - Weather data: 10 minutes (600 seconds) with randomization (±20 seconds)
  - Cities list: Clear cache on changes
- **Key Formats**: 
  - `cities:saved` - User city lists
  - `weather:latlon:{lat}:{lon}` - Weather by coordinates
  - `weather:saved-city:{id}` - Saved city weather
- **Anti-cache avalanche**: 20% TTL jitter prevents simultaneous expiration
- **Anti-cache penetration**: Empty marker caching (5-min TTL)
- **Write-through pattern**: Database update → clear cache → warm up cache

### Docker Configuration

The project uses Docker Compose to orchestrate 3 services:

1. **PostgreSQL** (Database)
   - Image: `postgres:16-alpine`
   - Port: `5432:5432`
   - Persistent volume: `postgres_data`

2. **Redis** (Cache)
   - Image: `redis:7-alpine`
   - Port: `6379:6379`
   - Persistent volume: `redis_data`

3. **App** (Node.js Application)
   - Build: From local Dockerfile
   - Port: `5001:5001`
   - Depends on: PostgreSQL and Redis

---

## 🚀 Deployment

### Prepare for Production

1. **Build application:**
```bash
npm run build
```

2. **Set production environment variables**

3. **Run database migrations:**
```bash
npx prisma migrate deploy
```

4. **Start production server:**
```bash
npm start
```

### Deploy to Cloud (Heroku, Railway, Render, etc.)

1. Ensure `package.json` has appropriate scripts
2. Add `Procfile` if needed
3. Configure environment variables on the platform
4. Deploy from GitHub repository

---

## 🤝 Contributing

If you want to contribute to this project:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add some amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is distributed under the license specified in the [LICENSE](LICENSE) file.

## 📧 Contact

- **Repository**: [weather-forecast-express](https://github.com/quoclong20222428/weather-forecast-express)
- **Issues**: [GitHub Issues](https://github.com/quoclong20222428/weather-forecast-express/issues)

---

<div align="center">

**⭐ If you find this project useful, please give it a star! ⭐**

Made with ❤️ by [quoclong20222428](https://github.com/quoclong20222428)

</div>
