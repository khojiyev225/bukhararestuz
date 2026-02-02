# BUKHARAREST.UZ

Monorepo: Next.js frontend + Express backend.

## Quick Start
1) Copy environment files:
- apps/api/.env.example -> apps/api/.env
- apps/web/.env.example -> apps/web/.env.local

2) Install dependencies:
- npm install

3) Run dev servers:
- npm run dev

Frontend: http://localhost:3000
Backend: http://localhost:4000

## Roles
- admin, manager, delivery, client (role-based access enforced in API)

## Telegram Bot
- Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in apps/api/.env

## Firebase Auth
- Add Firebase web config to apps/web/.env.local
- Add Firebase Admin credentials to apps/api/.env

## Scripts
- npm run dev
- npm run build
- npm run start
- npm run test
