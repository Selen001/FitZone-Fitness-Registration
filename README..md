
# FitZone – Fitness Class Registration System

## 1. Project Overview
FitZone is a web-based fitness class registration system. Users can view available fitness classes and register for them. Administrators can manage fitness classes and participant registrations through a dashboard.

## 2. Technologies Used
- Frontend: React.js, Vite, HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- ODM: Mongoose
- API Testing: Postman (VS Code extension)
- Libraries: Axios, React Router, Lucide React

## 3. Main Features
- View available fitness classes.
- Search and filter fitness classes.
- Register participants for fitness classes.
- View registration details.
- Confirm or cancel registrations.
- Delete registrations.
- Add, view, edit and delete fitness classes.
- Dashboard with class and registration statistics.
- Form validation and error messages.
- Prevent duplicate confirmed registrations.
- Check class capacity before registration.
- Prevent deleting classes with confirmed registrations.

## 4. Database Details
Database Name: fitzone

Collections:
- fitnessclasses
- registrations

FitnessClass fields:
- title
- category
- description
- trainer
- duration
- price
- date
- time
- capacity
- image
- level

Registration fields:
- participantName
- email
- phone
- fitnessClass
- status

## 5. REST API Endpoints

### Fitness Classes
| Method | Endpoint | Operation |
|---|---|---|
| POST | /api/classes | Add class |
| GET | /api/classes | Get all classes |
| GET | /api/classes/:id | Get class by ID |
| PUT | /api/classes/:id | Update class |
| DELETE | /api/classes/:id | Delete class |

### Registrations
| Method | Endpoint | Operation |
|---|---|---|
| POST | /api/registrations | Add registration |
| GET | /api/registrations | Get all registrations |
| GET | /api/registrations/:id | Get registration by ID |
| PUT | /api/registrations/:id | Update registration |
| DELETE | /api/registrations/:id | Delete registration |

## 6. How to Run the Project

### Start Backend
Open a terminal:
```bash
cd server
npm install
npm run dev
```

### Start Frontend
Open another terminal:
```bash
cd client
npm install
npm run dev
```

Make sure MongoDB Community Server is running.

### Environment Configuration
Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fitzone
```

Frontend URL: http://localhost:5173

Backend URL: http://localhost:5000

## 7. Conclusion
FitZone provides a simple and effective platform for managing fitness classes and participant registrations using the MERN stack.
