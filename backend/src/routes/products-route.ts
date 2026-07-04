import { Elysia, t } from 'elysia';
import { createProduct } from '../services/products-service';
import { jwtSetup } from '../jwt';

export const productsRoute = new Elysia()
  .use(jwtSetup)
  .post('/products', async ({ body, jwt, headers, set }) => {
    const authHeader = headers.authorization;
    if (!authHeader) {
      set.status = 401;
      return { error: 'Unauthorized' };
    }
    
    const tokenStr = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    const payload = await jwt.verify(tokenStr);
    if (!payload) {
      set.status = 401;
      return { error: 'Unauthorized' };
    }

    try {
      await createProduct({
        ...body,
        price: body.price.toString()
      } as any);
      // Requirement specifies returning token on success
      return { token: tokenStr };
    } catch (e: any) {
      set.status = 400;
      return { error: e.message };
    }
  }, {
    body: t.Object({
      name: t.String(),
      description: t.String(),
      price: t.Number(),
    })
  });
