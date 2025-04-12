// src/api/auth/session/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { DrizzleAdapter } from '$lib/server/auth/drizzle-adapter';

export const GET: RequestHandler = async ({  cookies }) => {
  try {
    // Get the session token from cookies
    const sessionToken = cookies.get('session');
    
    if (!sessionToken) {
      return json({ authenticated: false }, { status: 401 });
    }

    // Initialize the adapter
    const adapter = DrizzleAdapter();
    // Use the adapter to get session and user data
    const sessionAndUser = await adapter.getSessionAndUser!(sessionToken);
    
    if (!sessionAndUser || new Date(sessionAndUser.session.expires) < new Date()) {
      // Session expired or not found
      return json({ authenticated: false }, { status: 401 });
    }

    // Extract user data (omitting sensitive information)
    const { ...safeUserData } = sessionAndUser.user;
    
    return json({
      authenticated: true,
      user: safeUserData
    });
  } catch (error) {
    console.error('Session error:', error);
    return json({ message: 'An error occurred checking session' }, { status: 500 });
  }
};