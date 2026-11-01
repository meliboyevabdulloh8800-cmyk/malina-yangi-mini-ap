# Malina — 50 ekranli Telegram Mini App starter

React + TypeScript frontend, NestJS REST API, PostgreSQL + Prisma.

## Talablar
Node.js 20+, npm, Docker Desktop.

## Ishga tushirish
1. PostgreSQL: `docker compose up -d postgres`
2. Backend terminali: `cd backend && cp .env.example .env && npm install && npx prisma generate && npx prisma db push && npm run start:dev`
3. Frontend terminali: `cd frontend && npm install && npm run dev`
4. Brauzer: http://localhost:5173 ; API: http://localhost:3000/api/health

50 ekran chap menyuda mavjud. Hozir UI navigatsiyasi va umumiy ekran shablonlari ishlaydi; real to‘lov provayderlari, SMS, AI, media storage, push va production autentifikatsiya kalitlari bilan alohida integratsiya qilinishi kerak. To‘lov tugmalari demo, haqiqiy pul yechmaydi.

Telegram: BotFather'da Mini App URL sifatida HTTPS frontend manzilini belgilang. Bot token faqat backend `.env` da saqlanadi.
