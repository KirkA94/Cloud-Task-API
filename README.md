# Cloud Task API

> 🚧 Project currently in active development.

Cloud Task API is a RESTful task management backend built with Spring Boot and Java.  
This project demonstrates clean backend architecture using a layered design pattern and RESTful principles.

The goal of this project is to strengthen backend engineering fundamentals and prepare for production-style application development.

---

## 🚀 Tech Stack

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Maven
- Lombok
- (Database integration configurable)

---

## 🏗 Architecture

This project follows a layered architecture pattern:
src/main/java/com/kirkaustin/cloudtaskapi
│
├── controller # REST controllers (API endpoints)
├── service # Business logic layer
├── repository # Data access layer
├── model # Domain models (JPA entities)
└── CloudTaskApiApplication.java


### Layer Responsibilities

- **Controller** → Handles HTTP requests & responses  
- **Service** → Contains business logic  
- **Repository** → Handles database interaction  
- **Model** → Represents application domain objects  

This structure mirrors production-style backend systems.

---

## 📌 Current Features

- Create a task
- Retrieve all tasks
- Retrieve a task by ID
- RESTful endpoint structure
- Constructor-based dependency injection
- Clean separation of concerns

---
