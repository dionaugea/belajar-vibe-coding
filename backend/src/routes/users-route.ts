import { Elysia, t } from 'elysia';
import { registerUser, loginUser } from '../services/users-service';
import { jwtSetup } from '../jwt';

export const usersRoute = new Elysia()
  .use(jwtSetup)
  .post('/register', async ({ body, jwt, set }) => {
    try {
      const user = await registerUser(body as any);
      const token = await jwt.sign({ id: user.id });
      return { token };
    } catch (e: any) {
      set.status = 400;
      return { error: e.message };
    }
  }, {
    body: t.Object({
      username: t.String(),
      email: t.String(),
      password: t.String(),
      role: t.Optional(t.Union([t.Literal('admin'), t.Literal('user')])),
    })
  })
  .post('/login', async ({ body, jwt, set }) => {
    try {
      const user = await loginUser(body.username, body.password);
      const token = await jwt.sign({ id: user.id });
      return { token };
    } catch (e: any) {
      set.status = 400;
      return { error: e.message };
    }
  }, {
    body: t.Object({
      username: t.String(),
      password: t.String(),
    })
  });
