import { Elysia, t } from 'elysia';
import { addToCart, viewCart } from '../services/carts-service';
import { jwtSetup } from '../jwt';

export const cartsRoute = new Elysia()
  .use(jwtSetup)
  .post('/cart', async ({ body, jwt, headers, set }) => {
    const authHeader = headers.authorization;
    if (!authHeader) {
      set.status = 401;
      return { error: 'Unauthorized' };
    }
    
    const tokenStr = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    const payload = await jwt.verify(tokenStr);
    if (!payload || !payload.id) {
      set.status = 401;
      return { error: 'user not found' };
    }

    try {
      await addToCart(Number(payload.id), body.product_id, body.quantity);
      return { token: tokenStr };
    } catch (e: any) {
      set.status = 400;
      return { error: e.message };
    }
  }, {
    body: t.Object({
      product_id: t.Number(),
      quantity: t.Number(),
    })
  })
  .get('/cart', async ({ jwt, headers, set }) => {
    const authHeader = headers.authorization;
    if (!authHeader) {
      set.status = 401;
      return { error: 'Unauthorized' };
    }
    
    const tokenStr = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    const payload = await jwt.verify(tokenStr);
    if (!payload || !payload.id) {
      set.status = 401;
      return { error: 'user not found' };
    }

    try {
      const items = await viewCart(Number(payload.id));
      return items;
    } catch (e: any) {
      set.status = 400;
      return { error: e.message };
    }
  });
