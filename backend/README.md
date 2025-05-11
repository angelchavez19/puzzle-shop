# 🧩 Puzzle Shop Backend

This is the backend API for Puzzle Shop — an eCommerce platform focused on selling Rubik's cubes, mechanical puzzles, and brain teasers. Built using NestJS, Mongoose, and JWT-based authentication with access and refresh tokens.

## 🚀 Tech Stack

- ⚙️ NestJS (TypeScript)
- 🧬 MongoDB with Mongoose
- 🔐 JWT authentication (access + refresh tokens)
- 🍪 Cookie-based secure storage (httpOnly for refresh tokens)
- 📦 RESTful API structure

---

## 🔐 Authentication

The backend uses a stateless access/refresh token system:

- access_token: short-lived (e.g. 15 min), sent in Authorization header.
- refresh_token: long-lived (e.g. 7 days), sent via httpOnly secure cookie.
- You can refresh tokens via a POST /auth/refresh endpoint.

---

## 🛠️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/angelchavez19/puzzle-shop.git
cd puzzle-shop
cd backend
```

1. Install dependencies:

```bash
npm install
```

1. Create your .env file (or use a config service) with:

```env
# App Configuration

PORT=8000

```

1. Run the project:

```bash
npm run start:dev
```

---

## ✅ Features

- 🔐 Secure authentication with JWT
- 🧩 Product catalog with categories, filters & pagination
- 📝 Reviews and star ratings per product
- 💳 Discounts and coupon support
- 🛒 Cart & checkout system
- 📦 Order history per user
- 🌐 API ready for frontend consumption
