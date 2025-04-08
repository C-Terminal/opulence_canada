import { auth } from '$lib/server/auth/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { userProfiles, type InsertUser } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';


export async function load() {
	const users = await db.query.usersTable.findMany();
	return users;
}

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const fullName = formData.get('fullName');
    
    // Basic validation
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof fullName !== 'string' ||
      !email ||
      !password ||
      !fullName ||
      password.length < 6
    ) {
      return fail(400, {
        error: 'Invalid input. Password must be at least 6 characters.'
      });
    }
    
    try {
      // Create a new user with Lucia
      const user = await InsertUser({
        key: {
          providerId: 'email', // or "username" or "github" depending on your auth strategy
          providerUserId: email,
          password
        },
        attributes: {
          email
        }
      });
      
      // Create user profile with Drizzle
      await db.insert(userProfiles).values({
        userId: user.userId,
        fullName,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      // Create a new session
      const session = await auth.({
        userId: user.userId,
        attributes: {}
      });
      
      // Set the session cookie
      locals.auth.setSession(session);
      
      // Redirect to the dashboard
      throw redirect(303, '/dashboard');
    } catch (e) {
      console.error(e);
      
      // Check for unique constraint violation
      if (e.code === '23505') {
        return fail(400, {
          error: 'Email already exists'
        });
      }
      
      return fail(500, {
        error: 'An unknown error occurred'
      });
    }
  }
};