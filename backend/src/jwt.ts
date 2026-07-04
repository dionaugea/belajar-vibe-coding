import { jwt } from '@elysiajs/jwt';
import { env } from './config';

export const jwtSetup = jwt({
  name: 'jwt',
  secret: env.JWT_SECRET,
});
