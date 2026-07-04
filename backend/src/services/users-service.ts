import { eq } from 'drizzle-orm';
import { db } from '../modules/db-module';
import { users } from '../modules/users-module';
import * as bcrypt from 'bcryptjs';

export const registerUser = async (data: typeof users.$inferInsert) => {
  const existingUser = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
  if (existingUser.length > 0) {
    throw new Error('email has been registered');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  const [result] = await db.insert(users).values({
    ...data,
    password: hashedPassword,
    role: data.role || 'user',
  });
  
  // Fetch the inserted user to get the id
  const newUser = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
  return newUser[0];
};

export const loginUser = async (username: string, password: string) => {
  const foundUsers = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (foundUsers.length === 0) {
    throw new Error('username or password is wrong');
  }

  const user = foundUsers[0];
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    throw new Error('username or password is wrong');
  }

  return user;
};
