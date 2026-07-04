export const env = {
  DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/backend_db',
  JWT_SECRET: process.env.JWT_SECRET || 'my_super_secret_jwt_key_123!',
};
