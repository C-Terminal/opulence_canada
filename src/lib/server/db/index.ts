// src/lib/server/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private'; // Use SvelteKit's env handling
import * as schema from './schema';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });

// You might export the client too if needed elsewhere, but usually just db
// async function main() {
//   const current_user: typeof schema.usersTable.$inferInsert = {
//     id: 'John',
//     email: 'john@example.com',
//     age: 20,
//     username: 'John Doe',
//   };

//   await db.insert(schema.usersTable).values(current_user);
//   console.log('New user created!');

//   const users = await db.select().from(schema.usersTable);
//   console.log('Getting all users from the database: ', users);

//   await db
//     .update(schema.usersTable)
//     .set({ age: 31 })
//     .where(eq(schema.usersTable.email, current_user.email));
//   console.log('User info updated!');

//   await db
//     .delete(schema.usersTable)
//     .where(eq(schema.usersTable.email, current_user.email));
//   console.log('User deleted!');
// }

// main();
