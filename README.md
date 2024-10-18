# Patient Health Dashboard

This is a full-stack application designed for managing patient health data and handling prior authorization workflows. Healthcare providers can view patient information, submit prior authorization requests, and manage related data through a responsive dashboard.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Patient Dashboard**: View and manage patient data with filtering and searching capabilities.
- **Prior Authorization Form**: Submit prior authorization requests for selected patients.
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS.
- **Authentication**: Basic JWT authentication for healthcare providers.
- **Performance Optimization**: Pagination for patient lists and optimized API calls.
- **Documentation**: Clear setup and API documentation.
- **Testing**: Unit tests for API routes and frontend components.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Axios, React Library
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Render

## Project Structure

```
patient-health-dashboard/

                                    Server

├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # Database connection configuration
│   │   ├── controllers/
│   │   │   ├── authController.js           # Authentication logic
│   │   │   ├── authorizationController.js   # Prior authorization logic
│   │   │   └── patientController.js         # Patient data logic
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js     # Middleware for authentication
│   │   │   └── rateLimiter.js        # Rate limiting middleware
│   │   ├── models/
│   │   │   ├── Authorization.js   # Authorization request schema
│   │   │   ├── Patient.js         # Patient schema
│   │   │   └── User.js            # User schema
│   │   ├── routes/
│   │   │   ├── authorizationRoutes.js   # Routes for authorization
│   │   │   ├── authRoutes.js            # Routes for authentication
│   │   │   └── patientRoutes.js          # Routes for patients
│   │   ├── app.js            # Express app setup
│   │   └── index.js          # Entry point for the backend server
│   ├── .env                # Environment variables
│   ├── JWTSecretGenerator.js  # Helper to generate JWT secrets
│   ├── package-lock.json
│   └── package.json
│

                                    Client
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── AUth/
│   │   │   │   ├── Login.js          # Login component
│   │   │   │   └── Signup.js         # Signup component
│   │   │   ├── Authorization/
│   │   │   │   ├── CreateAuthorization.js  # Component for creating authorization requests
│   │   │   │   └── GetAuthorizationList.js # Component for listing authorizations
│   │   │   ├── Patients/
│   │   │   │   ├── AddPatient.js      # Component for adding new patients
│   │   │   │   ├── PatientDetail.js   # Component for viewing patient details
│   │   │   │   └── PatientList.js     # Component for listing patients
│   │   │   └── Dashboard.js           # Main dashboard component
│   │   ├── Shared/
│   │   │   └── Navbar.js              # Navbar component
│   │   ├── App.css                    # Main CSS file
│   │   ├── App.js                     # Main App component
│   │   ├── App.test.js                # Unit tests for App component
│   │   ├── index.css                  # Global CSS styles
│   │   ├── index.js                   # Entry point for the React app
│   │   └── reportWebVitals.js         # Web vitals reporting
│   ├── .env                          # Environment variables for the frontend
│   ├── .gitignore
│   ├── package-lock.json
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
```

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed (version 20 or later).
2. **MongoDB**: Set up a MongoDB database. You can use MongoDB Atlas for a cloud solution or install MongoDB locally.
3. **Git**: Version control system to clone the repository.

### Cloning the Repository

```bash
git clone https://github.com/itsRkator/patient-health-monitoring-system.git
cd patient-health-monitoring-system
```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your API base URL in `.env`:

   ```plaintext
   REACT_APP_BACKEND_URL=<SERVER HOST URL>
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd ../backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB connection string and any other necessary configurations:

   ```plaintext
   MONGODB_URI=<Your MongoDB Connection String>
   PORT=5000
   JWT_SECRET=<Your JWT Secret>
   JWT_REFRESH_SECRET=<Your JWT Refresh Secret>
   ```

## Running the Application

### Start the Backend

1. Navigate to the backend directory (if not already there):

   ```bash
   cd backend
   ```

2. Start the backend server:

   ```bash
   npm run start:dev // seamless: Auto restart after saving new changes
   ```

   OR

   ```
   npm run start // Require to restart after new changes
   ```

### Start the Frontend

1. Navigate to the frontend directory (if not already there):

   ```bash
   cd ../frontend
   ```

2. Start the frontend development server:

   ```bash
   npm start
   ```

Your application should now be running at `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend.

## API Endpoints

### Route Structure

- **Authentication Routes** (`/api/auth`)

  - `POST /api/auth/login`: Calls the `login` function.
  - `POST /api/auth/register`: Calls the `signup` function.
  - `POST /api/auth/refresh`: Calls the `refresh` function.

- **Patient Routes** (`/api/patients`)

  - `GET /api/patients`: Calls the `getPatients` function (requires authentication).
  - `GET /api/patients/:id`: Calls the `getPatientDetails` function (requires authentication).
  - `POST /api/patients`: Calls the `addNewPatient` function (requires authentication).
  - `PUT /api/patients/:id`: Calls the `updatePatientDetails` function (requires authentication).
  - `DELETE /api/patients/:id`: Calls the `deletePatient` function (requires authentication).

- **Authorization Routes** (`/api/authorization`)
  - `POST /api/authorization`: Calls the `createAUthorization` function (requires authentication).
  - `GET /api/authorization/:patientId`: Calls the `getAuthorization` function (requires authentication).
  - `PUT /api/authorization/:id`: Calls the `updateAuthorization` function (requires authentication).

## Testing

To run the tests for both frontend and backend, use the following commands:

### Backend Tests

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Run the tests:

   ```bash
   npm test
   ```

### Frontend Tests

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Run the tests:

   ```bash
   npm test
   ```

#### NOTE: Test cases are not covered yet.

## Deployment

### Deploying the Backend

1. Create an account on any preferred cloud provider platform i.e GCP, AWS etc. and install the corresponding CLI.
2. Follow the deployment Guide for both `Frontend` and `Backend` corresponding to the chosen cloud platform.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
