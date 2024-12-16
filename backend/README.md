# Luminotech API

Backend API service for Luminotech, built with Node.js, Express, and MongoDB.

## Features

- User Authentication System
  - Signup with email verification
  - Login with JWT authentication
  - Password reset functionality
  - Email verification with OTP
- Security Features
  - JWT token-based authentication
  - Password hashing with bcrypt
  - CORS protection
  - HTTP-only cookies
- Error Handling
  - Global error handling middleware
  - Custom error classes
  - Validation error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Nodemailer for email services
- bcrypt for password hashing

## Project Structure

```
backend/
├── controller/
│   ├── authController.js    # Authentication logic
│   └── errorController.js   # Error handling
├── middlewares/
│   └── isAuthenticated.js   # Authentication middleware
├── model/
│   └── userModel.js        # User schema and model
├── routes/
│   └── userRouters.js      # User routes
├── utils/
│   ├── appError.js         # Custom error class
│   ├── catchAsync.js       # Async error handler
│   ├── email.js           # Email service
│   └── generateOTP.js     # OTP generation
├── app.js                 # Express app configuration
└── server.js             # Server entry point
```

## API Endpoints

### Authentication Routes
- `POST /api/users/signup` - Register a new user
- `POST /api/users/verify` - Verify email with OTP
- `POST /api/users/resend-otp` - Resend verification OTP
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user
- `POST /api/users/forget-password` - Request password reset
- `POST /api/users/reset-password` - Reset password with OTP

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
NODE_ENV=development
```

## Installation & Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with required environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## Error Handling

The API uses a custom error handling system:
- Custom `AppError` class for operational errors
- Global error handling middleware
- Separate development and production error formats

## Security Measures

- CORS configuration for allowed origins
- HTTP-only cookies for JWT storage
- Password hashing before storage
- OTP expiration for security
- Protected routes with JWT verification

## Production Deployment

The API is configured for deployment on Vercel:
- Automatic HTTPS
- Serverless functions
- Environment variable management
- CORS configuration for production

## Development

1. Use `npm run dev` for development with nodemon
2. Follow the error logs in the console
3. Test API endpoints with Postman or similar tools

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request
