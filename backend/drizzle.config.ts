import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: [
    './src/modules/users-module.ts',
    './src/modules/products-module.ts',
    './src/modules/carts-module.ts'
  ],
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
