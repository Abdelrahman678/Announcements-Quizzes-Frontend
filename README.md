# Coligo - Announcements & Quizzes Dashboard

A responsive dashboard application built with React, TypeScript, and Material-UI that displays announcements and quizzes from a backend API.

## Features

- View recent announcements and quizzes
- Responsive design that works on all screen sizes
- Multi-language support (English & Arabic)
- Clean and modern UI with Material-UI components

## Project Structure

```
src/
├── components/         # Reusable UI components
├── contexts/           # React contexts (e.g., authentication)
├── i18n/               # Internationalization setup
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Key Implementation Notes

### 1. Authentication Approach

As per the project requirements, the application implements a simplified authentication flow:

- **No username/password required** - The login is simulated for demonstration purposes
- **Authentication state** is managed in the frontend only
- **Backend authentication endpoints** were implemented but are not used in this frontend to keep the demo simple
- The `AuthContext` manages the login/logout state

### 2. API Implementation

The frontend currently implements read-only functionality:

- **Quizzes** - Fetches and displays all available quizzes
- **Announcements** - Fetches and displays all announcements

**Note on CRUD Operations:**
The application currently only implements read operations (GET) for the following reasons:

- No role-based access control (RBAC) is implemented (as per my understanding of the task requirements)
- Without admin/user roles, we can't properly secure create/update/delete operations
- The UI would differ significantly between admin and user roles
- The assignment focused on displaying data rather than data manipulation

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Dependencies

- React 18
- TypeScript
- Material-UI (MUI)
- React Router
- i18next (for internationalization)
- Axios (for API requests)

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request
