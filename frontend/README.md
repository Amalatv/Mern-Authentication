# Luminotech Frontend

Modern, responsive frontend for Luminotech built with Next.js 13 and TypeScript.

## Features

- Modern Authentication System
  - User registration with email verification
  - Login with JWT
  - Password reset functionality
  - OTP verification system
- Responsive Design
  - Mobile-first approach
  - Modern UI components
  - Smooth animations
- State Management
  - Redux Toolkit for global state
  - Persistent auth state
- Form Handling
  - Input validation
  - Error handling
  - Loading states

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Redux Toolkit
- Axios for API calls
- TailwindCSS for styling
- React Icons
- React Toastify for notifications

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── verify/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   └── page.tsx
│   ├── components/
│   │   └── Nav.tsx
│   ├── store/
│   │   ├── store.ts
│   │   └── authSlice.ts
│   ├── types/
│   │   └── data.ts
│   └── server.ts
├── public/
└── tailwind.config.js
```

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_BACKEND_URL=your_api_url
```

## Installation & Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` with required variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## Features in Detail

### Authentication Flow

1. **Signup**
   - Form validation
   - Email verification process
   - Success/error notifications

2. **Email Verification**
   - OTP input system
   - Resend OTP functionality
   - Auto-navigation

3. **Login**
   - Credential validation
   - Persistent session
   - Protected routes

4. **Password Reset**
   - Email verification
   - OTP verification
   - New password setup

### State Management

- Redux store configuration
- Persistent auth state
- Type-safe actions

### UI Components

- Responsive navigation
- Form components
- Loading states
- Toast notifications

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000)
3. Make changes and see live updates

## Building for Production

1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## Deployment

The frontend is configured for deployment on Vercel:
- Automatic deployments
- Environment variable management
- Edge functions support
- API routes optimization

## Best Practices

- TypeScript for type safety
- Component-based architecture
- Responsive design patterns
- Error boundary implementation
- Performance optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request
