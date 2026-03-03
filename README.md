# 📝 Blog Writing Platform with AI Suggestions

A full-stack blog writing platform built using Next.js, Spring Boot, MongoDB, and Ollama (DeepSeek-R1).
The application allows users to create, manage, and explore blogs with AI-powered content suggestions, all running locally.

## ✨ Features

🔐 User authentication (Register & Login)

📝 Create, update, and delete blogs

🏠 View all blogs on the home page

👤 Profile section to manage personal blogs

🤖 AI-powered blog content suggestions using DeepSeek-R1

🗄️ MongoDB integration with MongoDB Compass for GUI inspection

## 🧱 Tech Stack
Frontend

Next.js

Tailwind CSS

Backend

Spring Boot

Spring Web

Spring Data MongoDB

Spring AI (Ollama)

Database

MongoDB

MongoDB Compass (GUI)

AI Integration

Ollama

DeepSeek-R1 Model

## 📁 Project Structure
blog-writing-project/
│
├── backend/        # Spring Boot backend
├── frontend/       # Next.js frontend
├── .gitignore
└── README.md
⚙️ Prerequisites

Make sure the following tools are installed on your system:

Java 17+

#Maven

Node.js 18+

MongoDB Server

MongoDB Compass

Ollama

### Verify installations:

java -version
mvn -version
node -v
mongod --version
ollama --version
🗄️ MongoDB Setup (Using MongoDB Compass)

#### Start MongoDB service:

mongod

or on Windows:

net start MongoDB

Open MongoDB Compass

Connect using:

mongodb://localhost:27017

📌 The database and collections are automatically created by Spring Boot.

### 🤖 Ollama Setup (DeepSeek-R1)

Check available models:

ollama list

Pull the model if not present:

ollama pull deepseek-r1

Run the model:

ollama run deepseek-r1

#### ⚠️ Important:
The DeepSeek-R1 model must be running before using AI suggestion features.

Ollama runs on:

http://localhost:11434
🔧 Backend Setup (Spring Boot)

Navigate to backend folder:

cd backend

Configure application.properties:

server.port=8080

spring.data.mongodb.uri=mongodb://localhost:27017/blog_db

spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.model=deepseek-r1

#### Run the backend:

mvn clean install
mvn spring-boot:run

Backend will start at:

http://localhost:8080

#### Swagger UI (if enabled):

http://localhost:8080/swagger-ui.html
🎨 Frontend Setup (Next.js)

#### Navigate to frontend folder:

cd frontend

Create .env.local:

NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

Install dependencies and run:

npm install
npm run dev

Frontend will be available at:

http://localhost:3000
🔄 Application Flow

Open http://localhost:3000

Register a new user

Login to the application

Create and manage blogs

Use AI suggestions for blog content

View all blogs on the Home page

Manage personal blogs in Profile section

Inspect data using MongoDB Compass

### 🔌 Ports Used
Service	Port
Frontend	3000
Backend	8080
MongoDB	27017
Ollama	11434
⚠️ Common Issues & Solutions

MongoDB connection issue

mongod

AI suggestions not working

ollama run deepseek-r1

CORS issue

@CrossOrigin(origins = "http://localhost:3000")
🚀 Local Deployment Summary

This project is deployed locally using Next.js, Spring Boot, MongoDB (with MongoDB Compass), and Ollama running the DeepSeek-R1 model.
All services run on localhost with no cloud dependencies.

### 🔮 Future Enhancements

JWT-based authentication

Role-based access control

Blog search and tagging

Dockerization

Cloud deployment (AWS / Azure)

###👨‍💻 Author

#### Anshuman Awasthi


