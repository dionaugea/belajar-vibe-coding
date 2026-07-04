import { Elysia } from 'elysia';
import { usersRoute } from './routes/users-route';
import { productsRoute } from './routes/products-route';
import { cartsRoute } from './routes/carts-route';

export const app = new Elysia()
  .use(usersRoute)
  .use(productsRoute)
  .use(cartsRoute);
