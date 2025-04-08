import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import pg from 'pg';
import * as schema from '$lib/server/db/schema'; // assuming usersTable is exported from here

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Now schema is passed in here 👇
export const db = drizzle(pool, { schema }); 


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
