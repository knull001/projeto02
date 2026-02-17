# RolêMatch

## Overview
RolêMatch is a social meetup platform built with React, TypeScript, and Vite. It connects people for real-world social experiences in public places. The app uses Supabase as a backend-as-a-service for authentication, database, and realtime features.

## Recent Changes
- 2026-02-16: Initial Replit setup - created missing src/ directory with full app source code
- 2026-02-16: Configured Vite for Replit (port 5000, allowedHosts: true)
- 2026-02-16: Set up workflow and deployment configuration

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite 5
- **UI**: shadcn/ui + Tailwind CSS + Radix UI + Lucide icons
- **Backend**: Supabase (auth, PostgreSQL, realtime)
- **State**: TanStack Query v5 + React Context
- **Routing**: React Router v6
- **PWA**: vite-plugin-pwa

## Project Architecture
```
src/
├── app/              # Root App component with providers and routing
├── components/ui/    # shadcn/ui components (Button, Card, Input, etc.)
├── contexts/         # React Contexts (AuthContext)
├── integrations/     # External integrations (Supabase client)
├── lib/              # Utility functions (cn helper)
├── pages/            # Page components (Home, Login, Register, NotFound)
└── index.css         # Global styles with Tailwind and CSS variables
```

## Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon/public key

## Running
- Dev server: `npx vite --host 0.0.0.0 --port 5000`
- Build: `npm run build`
- Preview: `npm run preview`

## User Preferences
- Language: Portuguese (Brazilian) for UI text
- Dark mode support via CSS variables
