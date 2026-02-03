# BUKHARA REST

Buxoro milliy taomlari restorani uchun to‘liq funksional web platforma.

## Tech Stack
- Frontend: Next.js + React + Tailwind
- Backend: NestJS + PostgreSQL + Prisma
- Auth: JWT + Role-based access
- Bots: Telegram Bot API (3 bot)

## Project Structure
- apps/web — Frontend
- apps/api — Backend
- apps/bots — Telegram botlar
- packages/shared — Umumiy turlar
- infra — Docker Compose (PostgreSQL)

## Ishga tushirish

### 1) PostgreSQL
- infra/docker-compose.yml mavjud. Postgresni ishga tushiring.

### 2) Backend
- apps/api/.env.example ni apps/api/.env ga nusxalang va to‘ldiring.
- Prisma migrate va generate:
	- `npm run prisma:generate --workspace apps/api`
	- `npm run prisma:migrate --workspace apps/api`
- `npm run dev:api`

### 3) Frontend
- apps/web/.env.example ni apps/web/.env ga nusxalang.
- `npm run dev:web`

### 4) Telegram botlar
- apps/bots/.env.example ni apps/bots/.env ga nusxalang.
- Bot tokenlarni kiriting va BOT_API_KEY ni API bilan bir xil qiling.
- `npm run dev:bots`

## Rollar
- ADMIN: to‘liq boshqaruv
- MANAGER: buyurtma/bron va menyu
- COURIER: yetkazib berish
- CLIENT: oddiy mijoz

Admin foydalanuvchi `POST /users` orqali manager/courier yaratishi mumkin (JWT talab qilinadi).

## Asosiy imkoniyatlar
- Ro‘yxatdan o‘tish / Kirish
- Menyu, buyurtma, bron
- Admin panel, courier panel, manager panel
- AI Analytics endpointlar
- Telegram botlar sinxron menyu
