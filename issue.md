# Project Setup Plan: Bun + ElysiaJS + Drizzle + MySQL

## Objective
Set up a new backend project directory using Bun as the runtime, ElysiaJS as the web framework, and Drizzle ORM connected to a MySQL database.

## High-Level Implementation Steps

1. **Initialize the Project**
   - Create a new project folder inside the current directory and navigate into it.
   - Initialize a new Bun project (using `bun init` or the official Elysia Bun template).

2. **Install Dependencies**
   - **Web Framework:** Install `elysia`.
   - **ORM & Database:** Install `drizzle-orm` and a compatible MySQL driver (e.g., `mysql2`).
   - **Dev Tools:** Install `drizzle-kit` as a development dependency for handling database migrations.

3. **Environment Setup**
   - Create a `.env` file to securely store the MySQL database connection string.

4. **Configure Database Connection**
   - Create a database connection utility file.
   - Initialize Drizzle ORM using the MySQL driver and the connection string from the environment variables.

5. **Define Database Schema**
   - Create a schema file and define at least one basic table to verify the setup.
   - Set up the `drizzle.config.ts` file to point to the schema and database credentials for migrations.

6. **Create the Web Server**
   - In the main entry file (e.g., `index.ts`), initialize the Elysia application.
   - Add a basic test route (e.g., `GET /`) to confirm the server is running successfully.
   - Add a route that interacts with the database to verify end-to-end connectivity.

7. **Configure Run Scripts**
   - Update `package.json` with necessary scripts:
     - A script to run the development server with hot-reload (e.g., `bun run --watch`).
     - Scripts to generate and push database migrations using Drizzle Kit.
