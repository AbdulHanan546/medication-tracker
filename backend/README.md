# Medication Tracker Backend

A Node.js backend API for a medication tracking application. It provides user authentication, medication management, history logging, and email notifications for reminders.

## Features

- User registration and login with JWT authentication
- CRUD operations for medications
- Medication history tracking
- Email notifications for medication reminders
- Cron-based scheduling for reminders

## Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Nodemailer** for email notifications
- **node-cron** for scheduled reminders

## Folder Structure

```
backend/
│
├── package.json
├── server.js                // Entry point
├── .env                     // Environment variables
│
├── config/
│   └── db.js                // MongoDB connection setup
│
├── models/
│   ├── User.js              // User schema
│   ├── Medication.js        // Medication schema
│   └── History.js           // History schema
│
├── controllers/
│   ├── authController.js    // Register/Login logic
│   ├── medicationController.js // CRUD for medications
│   └── historyController.js // Log taken/skipped meds
│
├── routes/
│   ├── authRoutes.js
│   ├── medicationRoutes.js
│   └── historyRoutes.js
│
├── middlewares/
│   ├── authMiddleware.js    // JWT verification
│   └── errorHandler.js
│
├── utils/
│   ├── sendEmail.js         // Nodemailer setup
│   ├── scheduleReminder.js  // node-cron reminder logic
│   └── generateToken.js     // JWT token creation
│
└── logs/
    └── app.log              // Optional logging file
```

## Installation

1. Clone the repository and navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/medication-tracker
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   PORT=5000
   ```

4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication Routes

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login and get JWT |

### Medication Routes (Protected)

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| GET    | `/api/medications`           | Get user’s medications |
| POST   | `/api/medications`           | Add new medication     |
| PUT    | `/api/medications/:id`       | Edit medication        |
| DELETE | `/api/medications/:id`       | Delete medication      |
| PATCH  | `/api/medications/:id/taken` | Mark as taken/skipped  |

### History Routes (Protected)

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| GET    | `/api/history` | Get medication history |
| POST   | `/api/history` | Log a dose manually    |

## Usage

### Register a User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Add a Medication (Include JWT token in Authorization header)

```bash
POST /api/medications
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Aspirin",
  "dosage": "100mg",
  "frequency": "2 times a day",
  "times": ["08:00", "20:00"],
  "notes": "Take with food"
}
```

## Notification System

- Email reminders are sent based on the `times` array in the medication schema.
- The cron job runs every minute to check for due medications.
- Users can set their notification preference in the User model (`email`, `browser`, `none`).

## Deployment

- Deploy to services like Render or Railway.
- Ensure environment variables are set in the deployment platform.
- For production, set `NODE_ENV=production` to disable stack traces in error responses.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the ISC License.
