import {  } from '@auth/sveltekit';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    // Redirect logged-in users away from the login page
    const session = await event.locals.getSession();
    if (session?.user) {
        throw redirect(303, '/dashboard'); // Or to '/dashboard' etc.
    }


};

// Note: No `actions` object here. The form POSTs to the endpoint
// handled by Auth.js in hooks.server.ts (/auth/signin/credentials)