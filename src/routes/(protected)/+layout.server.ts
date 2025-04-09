// src/routes/(protected)/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.auth();

    // If the user is not logged in, redirect them to the sign-in page
    if (!session?.user) {
        // You can store the intended URL to redirect back after login
        const redirectTo = `/auth/signin?callbackUrl=${encodeURIComponent(event.url.pathname)}`;
        throw redirect(302, redirectTo);
    }

    // If logged in, return the session data (optional, could inherit from root layout)
    // Returning it here ensures components within (protected) always have it without relying solely on root layout load
    return {
        session: session
    };
};