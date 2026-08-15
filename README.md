# PgHub - Smart PG Accommodation & Management Platform

**PgHub** is a full-stack, microservices-based web platform designed to streamline the paying guest (PG) experience. It seamlessly connects tenants, property owners, and platform administrators through a secure, feature-rich interface featuring automated tenant support, property management, and centralized logging.

---

## 📸 Application Preview



| Dashboard | Description | 
| :--- | :--- | :---: |
| **Tenant Portal** | Search, filter, and book PG accommodations with real-time availability. | 
| **Owner Portal** | Manage property listings, process booking requests, and view reviews. | 
| **Admin Analytics** | Platform-wide monitoring, user management, and operational analytics. | 
| **AI Support Chatbot** | Conversational assistant for instant tenant queries and guidance. | 

---

## 🛠️ Tech Stack & Architecture

PgHub follows a distributed **Microservices Architecture** where independent services communicate over RESTful APIs:

```text
                          ┌───────────────────────────┐
                          │   Frontend UI (React)     │
                          └─────────────┬─────────────┘
                                        │
                                        ▼
                   ┌─────────────────────────────────────────┐
                   │       Core Service (Spring Boot)        │
                   │  - Security (JWT / RBAC)                │
                   │  - Business Logic & Workflows           │
                   │  - Spring Data JPA + MySQL              │
                   └──────┬──────────────────┬───────────────┘
                          │                  │
        ┌─────────────────┘                  └──────────────────┐
        ▼                                                       ▼
┌───────────────────────────┐                       ┌───────────────────────────┐
│   Gen AI Service (Python) │                       │ Logging Service (.NET)    │
│   - Tenant Support Bot    │                       │ - Centralized Audit Logs  │
└───────────────────────────┘                       └───────────────────────────┘
Core Technologies
Frontend: React.js, Bootstrap / CSS3, HTML5

Core Backend Service: Java, Spring Boot, Spring Security, Spring Data JPA

AI Support Service: Python 

Centralized Logging Service: C#, ASP.NET Core Web API

Database & Media: MySQL, Cloudinary API (Image Management)

Security: JSON Web Tokens (JWT), Role-Based Access Control (RBAC)

✨ Key Features
🏢 Core Application Features
Authentication & Role-Based Access Control (RBAC): Fine-grained security separating Tenant, Owner, and Admin roles protected by JWT tokens.

Real-time Room Availability & Booking: Instant updates on room occupancy and direct booking request workflows.

Property & Media Management: High-performance media uploads hosted on Cloudinary for property listings.

Complaints & Feedback System: Tenant issue logging and verified property reviews.

Admin Dashboard: Platform-wide analytics tracking active users, total bookings, revenue.

🤖 Microservices Integration
Intelligent AI Support Service (Python): An AI-driven conversational agent that provides automated, 24/7 tenant support and handles common platform inquiries.

Centralized Audit & System Logging (.NET Core): A dedicated logging service that ingests system logs, security events, and audit trails across all services via REST APIs.

📁 Repository Structure
Plaintext
pghub/
├── pghub-frontend/          # React Single Page Application (SPA)
├── pghub-core-backend/      # Spring Boot Core Microservice
├── pghub-ai-service/        # Python Gen AI Chatbot Service
├── pghub-logging-service/   # ASP.NET Core Logging Service
└── README.md                # Project Documentation
🚀 Local Setup & Installation
Prerequisites
Ensure you have the following installed on your machine:

Java Development Kit (JDK 17+)

Node.js (v18+) & npm

Python 3.9+

.NET 8.0 SDK

MySQL Server

1. Database Setup
Create a MySQL database named pghub_db.

Configure database credentials in pghub-core-backend/src/main/resources/application.properties:

Properties
spring.datasource.url=jdbc:mysql://localhost:3306/pghub_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

# Cloudinary Config
cloudinary.cloud-name=YOUR_CLOUD_NAME
cloudinary.api-key=YOUR_API_KEY
cloudinary.api-secret=YOUR_API_SECRET

2. Spring Boot Core Service

cd pghub-core-backend
./mvnw clean install
./mvnw spring-boot:run
Runs on http://localhost:8080

3. Python Gen AI Microservice

cd pghub-ai-service
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python app.py
Runs on http://localhost:5000

4. ASP.NET Core Logging Service

cd pghub-logging-service
dotnet restore
dotnet run
Runs on http://localhost:5001

5. Frontend Client

cd pghub-frontend
npm install
npm start
Runs on http://localhost:3000

🔒 Security & Authorization
All API requests to protected endpoints require an Authorization header containing a valid Bearer JWT:

<<<<<<< HEAD
Authorization: Bearer <your_jwt_token>
=======
Authorization: Bearer <your_jwt_token>
>>>>>>> 75472a17d63d000e29f1626162ba28509521a9e8
