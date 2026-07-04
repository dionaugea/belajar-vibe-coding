# Backend Implementation Plan

This document contains detailed planning and step-by-step instructions for implementing the backend application. Follow these instructions precisely.

## 1. Database Schema
Create the following database tables using Drizzle ORM.

### 1.1 `users`
- `id`: int auto increment primary key
- `username`: varchar(255) not null unique
- `email`: varchar(255) not null unique
- `password`: varchar(255) not null (must be hashed/decrypted using bcrypt)
- `role`: enum('admin', 'user') not null
- `created_at`: timestamp not null default current_timestamp

### 1.2 `products`
- `id`: int auto increment primary key
- `name`: varchar(255) not null
- `description`: text not null
- `price`: decimal(10, 2) not null
- `created_at`: datetime not null default current_timestamp
- `updated_at`: datetime not null

### 1.3 `carts`
- `id`: int auto increment primary key
- `user_id`: int not null
- `product_id`: int not null
- `quantity`: int not null
- `created_at`: datetime not null default current_timestamp
- `updated_at`: datetime not null

---

## 2. Folder and File Structure
You must structure the `src` folder exactly as follows:

1. `src/routes/` - Contains routing for Elysia.js (e.g., `users-route.ts`)
2. `src/services/` - Contains application business logic (e.g., `users-service.ts`)
3. `src/modules/` - Contains database connection and Drizzle schema (e.g., `users-module.ts`)
4. `src/app.ts` - Contains the core Elysia.js application setup
5. `src/jwt.ts` - Contains JWT authentication setup and logic
6. `src/index.ts` - Contains the server entry point (starts the listener)
7. `src/config.ts` - Contains configuration variables

---

## 3. API Endpoints
Implement the following APIs. Pay close attention to the input, logic, and response formats.

### 3.1 New User Registration
- **Input**: `username`, `email`, `password`
- **Return**: `token`
- **Response (Error)**: `email has been registered`
- **Response (OK)**: `token`

### 3.2 User Login
- **Input**: `username`, `password`
- **Return**: `token`
- **Response (Error)**: `username or password is wrong`
- **Response (OK)**: `token`

### 3.3 New Product
- **Input**: `name`, `description`, `price`
- **Return**: `token`
- **Response (Error)**: `product already exists`
- **Response (OK)**: `token`

### 3.4 Add Product to Cart
- **Input**: `product_id`, `quantity`
- **Return**: `token`
- **Response (Error)**: `product not found`
- **Response (OK)**: `token`

### 3.5 View User Cart
- **Input**: `token`
- **Return**: `cart items`
- **Response (Error)**: `user not found`
- **Response (OK)**: `cart items`

---

## 4. Step-by-Step Implementation Guide

Follow these steps sequentially to build the application:

### Step 1: Project Initialization & Dependencies
1. Initialize the project (if not already done).
2. Install necessary dependencies: `elysia`, `@elysiajs/jwt`, `drizzle-orm`, `drizzle-kit`, the respective database driver, and `bcrypt`.

### Step 2: Configuration & Database Setup
1. Create `src/config.ts` to load environment variables.
2. In `src/modules/`, set up the database connection.
3. In `src/modules/`, define the Drizzle schemas for `users`, `products`, and `carts` based on section 1.
4. Run Drizzle migrations to ensure the database tables are created.

### Step 3: Utilities Setup
1. Set up JWT handling in `src/jwt.ts`.
2. Implement utility functions for `bcrypt` (password hashing and comparison) either in a utility file or within the relevant services.

### Step 4: Implement Services (Business Logic)
1. Create `src/services/users-service.ts` to handle checking existing emails/usernames, hashing passwords, saving the user, and verifying login credentials.
2. Create `src/services/products-service.ts` to check if a product exists and to create new products.
3. Create `src/services/carts-service.ts` to handle checking product existence, appending to the cart, and retrieving the cart based on user ID.

### Step 5: Implement Routes (API Endpoints)
1. Create `src/routes/users-route.ts`. Validate inputs and wire up the registration and login routes to `users-service.ts`. Generate the JWT token on success.
2. Create `src/routes/products-route.ts`. Add authentication middleware, validate inputs, and wire up the create product route.
3. Create `src/routes/carts-route.ts`. Add authentication middleware, validate inputs, and wire up the add-to-cart and view-cart routes.

### Step 6: Assemble the Application
1. In `src/app.ts`, instantiate the Elysia application.
2. Register the JWT plugin from `src/jwt.ts`.
3. Register all your route handlers from `src/routes/`.
4. Ensure global error handling matches the requested text (e.g. `email has been registered`, `username or password is wrong`).

### Step 7: Server Entry Point
1. In `src/index.ts`, import the app from `src/app.ts`.
2. Start the server (e.g., `app.listen(3000)`).
3. Test all the endpoints thoroughly.
