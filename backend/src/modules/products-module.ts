import { mysqlTable, int, varchar, text, decimal, datetime } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const products = mysqlTable('products', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});
