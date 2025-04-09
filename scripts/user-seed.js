import { db, pool } from '../src/lib/server/db/index.js';
import { usersTable, userProfiles, posts } from '../src/lib/server/db/schema.js';
import { v4 as uuidv4 } from 'uuid';
import { lucia } from '../src/lib/server/lucia.js';

async function seed() {
  try {
    console.log('Seeding database...');

    // Create test admin user with Lucia
    const adminUserId = uuidv4();
    const adminPassword = 'admin123';

    // Create user with Lucia (for correct password hashing)
    await lucia.createUser({
      userId: adminUserId,
      key: {
        providerId: 'email',
        providerUserId: 'admin@example.com',
        password: adminPassword,
      },
      attributes: {
        email: 'admin@example.com',
      },
    });

    // Insert admin profile using Drizzle
    await db.insert(userProfiles).values({
      userId: adminUserId,
      fullName: 'Admin User',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create regular test user with Lucia
    const testUserId = uuidv4();
    const testPassword = 'password123';

    await lucia.createUser({
      userId: testUserId,
      key: {
        providerId: 'email',
        providerUserId: 'user@example.com',
        password: testPassword,
      },
      attributes: {
        email: 'user@example.com',
      },
    });

    // Insert test user profile using Drizzle
    await db.insert(userProfiles).values({
      userId: testUserId,
      fullName: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Insert some sample posts
    await db.insert(posts).values([
      {
        title: 'Getting Started with SvelteKit',
        content: 'SvelteKit is a framework for building web applications of all sizes...',
        published: true,
        authorId: adminUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Using Drizzle ORM with SvelteKit',
        content: 'Drizzle is a TypeScript ORM that works great with SvelteKit...',
        published: true,
        authorId: adminUserId, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Draft Post',
        content: 'This is a draft post that is not published yet.',
        published: false,
        authorId: testUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await pool.end();
  }
}

seed().catch(console.error);