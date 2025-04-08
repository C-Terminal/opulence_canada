import { lucia_auth } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';


export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Basic validation
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email ||
      !password
    ) {
      return fail(400, {
        error: 'Invalid input'
      });
    }
    
    try {
      // Find the user by key (email and password)
      const key = await lucia_auth.useKey('email', email, password);
      
      // Create a new session
      const session = await lucia.createSession({
        userId: key.userId,
        attributes: {}
      });
      
      // Set the session cookie
      locals.auth.setSession(session);
      
      // Redirect to the dashboard
      throw redirect(303, '/dashboard');
    } catch (e) {
      if (
        e instanceof Error &&
        (e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
      ) {
        return fail(400, {
          error: 'Incorrect email or password'
        });
      }
      
      return fail(500, {
        error: 'An unknown error occurred'
      });
    }
  }
};