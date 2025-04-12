// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { DrizzleAdapter } from '$lib/server/auth/drizzle-adapter';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
	// Get session token from cookies
	const sessionToken = cookies.get('session');

	let session = null;
	let user = null;

	// Initialize the adapter
	const adapter = DrizzleAdapter();
	if (sessionToken) {
		// Use your adapter to get session and user
		const sessionAndUser = await adapter.getSessionAndUser!(sessionToken);

		if (sessionAndUser && new Date(sessionAndUser.session.expires) > new Date()) {
			// Format session in a clean way for the frontend
			// Removing sensitive data
			const { ...safeUserData } = sessionAndUser.user;

			session = {
				user: safeUserData,
            expires: sessionAndUser.session.expires
			};

			user = safeUserData;
		}
	}

	// If the user is not logged in, redirect them to the sign-in page
	if (!session?.user) {
		// You can store the intended URL to redirect back after login
		// const url = new URL(event.url);
		const redirectTo = `/auth/signin?callbackUrl=${encodeURIComponent('/login')}`;
		throw redirect(302, redirectTo);
	}

	return {
		session,
		user
	};
};
