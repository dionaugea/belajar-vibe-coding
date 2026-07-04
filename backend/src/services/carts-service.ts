import { eq } from 'drizzle-orm';
import { db } from '../modules/db-module';
import { carts } from '../modules/carts-module';
import { products } from '../modules/products-module';

export const addToCart = async (userId: number, productId: number, quantity: number) => {
  const existingProduct = await db.select().from(products).where(eq(products.id, productId)).limit(1);
  if (existingProduct.length === 0) {
    throw new Error('product not found');
  }

  await db.insert(carts).values({
    userId,
    productId,
    quantity,
  });
  
  return true;
};

export const viewCart = async (userId: number) => {
  const cartItems = await db.select({
    id: carts.id,
    quantity: carts.quantity,
    product: {
      id: products.id,
      name: products.name,
      price: products.price,
    }
  })
  .from(carts)
  .innerJoin(products, eq(carts.productId, products.id))
  .where(eq(carts.userId, userId));
  
  return cartItems;
};
