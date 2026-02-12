# User Management REST API

## Overview
A production-grade User Management REST API built with Node.js, Express, TypeScript, and MongoDB. This project follows a strict 3-Layer Architecture (Controllers -> Services -> Repositories) and demonstrates best practices in security, observability, and scalability.

## 🚀 Features
- **Architecture**: Clean 3-Layer Architecture using Dependency Injection principles.
- **Security**: 
    - Rate Limiting (Prevent Brute Force/DDoS)
    - Helmet (Secure HTTP Headers)
    - Data Sanitization
    - JWT Authentication
- **Observability**: Structured JSON logging using Winston.
- **Documentation**: Auto-generated Swagger/OpenAPI documentation.
- **Validation**: Strict input validation using Zod.
- **Resilience**: Graceful shutdown handling.
- **Deployment**: Docker and Docker Compose ready.

## 🛠️ Tech Stack
- **Runtime**: Node.js v20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Tools**: Docker, Swagger, Winston, Zod

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Docker (Optional)

### Local Setup
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd user-management-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/user-management-db
   JWT_SECRET=your_super_secret_key
   NODE_ENV=development
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### 🐳 Docker Setup
Run the entire stack (App + MongoDB) with a single command:
```bash
docker-compose up --build
```

## 📚 API Documentation
Once the server is running, visit the Swagger UI to explore and test endpoints:
**http://localhost:3000/api-docs**

## 🧪 Testing
You can test the API using the provided `requests.http` file (requires VS Code REST Client) or via Curl:

**Register User:**
```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullName": "John Doe", "email": "john@example.com", "password": "password123"}'
```

## 📁 Project Structure
```text
src/
├── config/           # Configuration files
├── controllers/      # Route handlers (Request/Response logic)
├── middlewares/      # Express middlewares (Error, Validation, Auth, RateLimit)
├── models/           # Mongoose models and interfaces
├── repositories/     # Data access layer
├── routes/           # Route definitions
├── services/         # Business logic
├── types/            # Global type definitions
├── utils/            # Utility functions (Logger, DB, Swagger)
├── app.ts            # Express app setup
└── server.ts         # Server entry point
```
