# Frontend Project

A modern web application built with Next.js 14, featuring authentication, Redux state management, and a responsive UI using Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (React 18)
- **State Management:** Redux Toolkit with Redux Persist
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **UI Components:** React Icons, React Avatar
- **Notifications:** React Toastify
- **Type Safety:** TypeScript

## Features

- Modern and responsive UI
- Authentication system
- State persistence
- Toast notifications
- Avatar support
- Type-safe development

## Project Structure

```
src/
├── app/          # Next.js app router pages
├── components/   # Reusable UI components
├── hoc/          # Higher-order components
├── store/        # Redux store configuration
└── types.data.ts # TypeScript type definitions
```

## Getting Started

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with required variables.

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Development

The project uses Next.js 14 with the App Router. Key features include:

- TypeScript for type safety
- Tailwind CSS for styling
- Redux Toolkit for state management
- Redux Persist for state persistence
- React Toastify for notifications

## Deployment

The application can be deployed on Vercel or any other platform that supports Next.js applications.

For Vercel deployment:
1. Push your code to a Git repository
2. Import the project to Vercel
3. Configure environment variables
4. Deploy

For detailed deployment instructions, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
