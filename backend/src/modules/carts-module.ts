import { mysqlTable, int, datetime } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const carts = mysqlTable('carts', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('user_id').notNull(),
  productId: int('product_id').notNull(),
  quantity: int('quantity').notNull(),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});
