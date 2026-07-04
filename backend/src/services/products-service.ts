import { eq } from 'drizzle-orm';
import { db } from '../modules/db-module';
import { products } from '../modules/products-module';

export const createProduct = async (data: typeof products.$inferInsert) => {
  const existingProduct = await db.select().from(products).where(eq(products.name, data.name)).limit(1);
  if (existingProduct.length > 0) {
    throw new Error('product already exists');
  }

  await db.insert(products).values(data);
  const newProduct = await db.select().from(products).where(eq(products.name, data.name)).limit(1);
  return newProduct[0];
};

export const getProducts = async () => {
  return await db.select().from(products);
};
