# Customer Management System

## Overview
This is a full-stack Customer Management System developed using **Spring Boot (Backend)** and **React JS (Frontend)**.

The system allows users to:
- Create customers
- Update customer details
- Delete customers
- View customers in a table
- Upload Excel files for bulk customer creation

---

##  Technologies Used

### Backend
- Java 17 (compatible with Java 8 concepts)
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- MySQL / MariaDB

### Frontend
- React JS
- Axios
- CSS

### Testing
- JUnit

---

## Features

### Customer Management
- Add Customer (Name, DOB, NIC)
- NIC is unique
- Update Customer
- Delete Customer
- View all customers

### Mobile Numbers
- Supports multiple mobile numbers per customer

### Bulk Upload
- Upload Excel file to insert large number of customers
- Batch processing implemented for performance

### Database Design
- Customers
- Mobile Numbers (1:N)
- Addresses (Optional)
- Family Members (Customer-to-Customer relationship)
- City & Country (Master Data)

---

## Project Structure
backend/
├── controller/
├── service/
├── repository/
├── model/
├── dto/

frontend/
├── src/
├── App.js
├── App.css


---

## Setup Instructions

### Backend
1. Navigate to backend folder:
cd backend
2. Run the application:
http://localhost:8080


---

### Frontend
1. Navigate to frontend folder:
cd frontend

2. Install dependencies:
npm install

3. Run React app:
npm start

4. Open browser:
http://localhost:3000


---

## Database Setup

Run the provided SQL file:
database.sql

This will create:
- Tables
- Relationships
- Sample data

---

## API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /api/customers | Get all customers |
| POST | /api/customers | Add customer |
| PUT | /api/customers/{id} | Update customer |
| DELETE | /api/customers/{id} | Delete customer |
| POST | /api/excel/upload | Upload Excel |

---

## Performance Consideration
- Excel upload uses batch saving (100 records per batch)
- Prevents memory overflow for large files (up to 1,000,000 records)

---

## Testing

Run tests using:
mvn test
---

## Notes
- Optional fields like Address and Family Members are supported in backend
- UI currently focuses on core functionality
- System is designed to be easily extendable

---

## Author
Piyumi Jayathilake

---

## Status
✔ Completed core requirements  
✔ Ready for submission  