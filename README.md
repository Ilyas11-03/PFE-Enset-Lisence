# PF Game Store

A simple full-stack game storefront built with static HTML/CSS/JS frontend pages and a Node.js backend API using Express, Prisma, MySQL, authentication, and Stripe payment support.

## Project overview

- `Pf/frontend/`: Static frontend pages for browsing games, login/signup, promotions, checkout, and game categories.
- `Pf/backend/`: Express API server with user authentication, game listing, cart operations, order creation, and Stripe-based payment processing.
- `Pf/backend/prisma/`: Prisma schema for database models and migration history.
- `Pf/css/`: Additional shared CSS assets used by the frontend.

## Key features

- User registration and login with JWT authentication
- Game catalog and genre-based filtering
- Add-to-cart functionality
- Order creation and total price calculation
- Stripe payment intent processing
- Prisma ORM for MySQL database access
- Seeder script for populating sample games

## Folder structure

- `backend/`
  - `index.js` - main Express API server
  - `server.js` - simple Express static server example for frontend/demo usage
  - `routes/`
    - `userRoutes.js` - signup/login routes
    - `gameRoutes.js` - game listing and promotion routes
    - `cartRoutes.js` - cart creation route (protected)
    - `orderRoutes.js` - create order route (protected)
    - `paymentRoutes.js` - Stripe payment route (protected)
  - `middleware/authenticateToken.js` - JWT verification middleware
  - `prisma/schema.prisma` - database models for User, Game, Cart
  - `seeder.js` - sample game data loader
  - `generateToken.js` - helper script to generate a JWT for testing
- `frontend/`
  - `main.html`, `game.html`, `promotion.html`, `sports.html`, `Hunter.html`, `login.html`, `signin.html`, `checkout.html`, `console.html`, `action.html`
  - `css/` - frontend styles
  - `js/` - frontend scripts
  - `image/` - game artwork and image assets
  - `product.json` - frontend product list data

## Setup

1. Open a terminal in `Pf/Pf/backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env` file:
   ```text
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   JWT_SECRET=your_secret_key
   STRIPE_SECRET_KEY=sk_test_...
   ```
4. Generate Prisma client and run migrations if needed:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
5. Seed sample games:
   ```bash
   node seeder.js
   ```
6. Start the backend server:
   ```bash
   node index.js
   ```

## Usage

- Use the frontend pages in `Pf/frontend/` to browse and interact with the store.
- The backend API is mounted under `/user`, `/game`, `/cart`, `/order`, and `/payment`.
- Protected endpoints require an Authorization header with a valid JWT.

## Notes

- `backend/server.js` is a lightweight demo server for static pages and a sample add-to-cart endpoint.
- `backend/index.js` is the primary API server for authentication, data access, and payment flows.
- The Prisma schema currently defines `User`, `Game`, and `Cart` models. Orders/payments are referenced in routes but require matching Prisma models for full persistence.

## Recommended git ignore

If you want to keep local images or config files out of Git, add appropriate rules to `.gitignore` such as:

```gitignore
node_modules/
.env
frontend/image/
```
