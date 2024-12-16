# Luminotech - Full Stack Authentication System

A modern, secure authentication system built with Next.js 13 and Node.js. Features email verification, OTP-based password reset, and JWT authentication.

![Luminotech Logo](https://res.cloudinary.com/dehuas3qw/image/upload/v1734300125/luminotech2_hkfq18.svg)

## Features

- 🔐 **Secure Authentication**
  - Email & Password Registration
  - Email Verification with OTP
  - JWT-based Authentication
  - Password Reset System
  
- 🎨 **Modern UI/UX**
  - Responsive Design
  - Clean User Interface
  - Loading States
  - Toast Notifications
  
- 🛡️ **Security**
  - HTTP-only Cookies
  - Password Hashing
  - CORS Protection
  - JWT Token Management

- 📱 **User Experience**
  - Form Validation
  - Error Handling
  - Persistent Sessions
  - Smooth Navigation

## Tech Stack

### Frontend
- Next.js 13 (App Router)
- TypeScript
- Redux Toolkit with Redux Persist
- TailwindCSS
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- Nodemailer
- bcrypt

## Project Structure

```
luminotech/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── signup/
│   │   │   │   ├── verify/
│   │   │   │   └── forgot-password/
│   │   │   └── page.tsx
│   │   ├── components/
│   │   ├── store/
│   │   └── types/
│   └── public/
│
├── backend/
│   ├── controller/
│   ├── middlewares/
│   ├── model/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
```

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/Amalatv/Mern-Authentication.git
cd Mern-Authentication
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

4. Set up Environment Variables

Backend (.env):
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

Frontend (.env.local):
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api
```

5. Start Development Servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## API Endpoints

### Authentication Routes
```
POST /api/users/signup      - Register new user
POST /api/users/verify     - Verify email with OTP
POST /api/users/resend-otp - Resend verification OTP
POST /api/users/login      - Login user
POST /api/users/logout     - Logout user
POST /api/users/forget-password - Request password reset
POST /api/users/reset-password  - Reset password with OTP
```

## Authentication Flow

1. **Registration**
   - User submits registration form
   - Backend creates user and sends OTP email
   - Frontend redirects to verification page

2. **Email Verification**
   - User enters OTP received in email
   - Backend verifies OTP and marks email as verified
   - User is automatically logged in

3. **Login**
   - User enters credentials
   - Backend validates and sends JWT token
   - Frontend stores token and user data

4. **Password Reset**
   - User requests password reset
   - Backend sends OTP to email
   - User verifies OTP and sets new password

## Security Measures

- Passwords hashed using bcrypt
- JWT stored in HTTP-only cookies
- CORS protection
- Rate limiting on sensitive routes
- Input validation and sanitization
- Secure headers with Helmet
- OTP expiration for verification codes

## Deployment

### Backend Deployment (Vercel)
1. Push code to GitHub
2. Create new Vercel project
3. Configure environment variables
4. Deploy

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Create new Vercel project
3. Set environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js Documentation
- Express.js Documentation
- MongoDB Documentation
- Vercel Platform
- TailwindCSS Community
