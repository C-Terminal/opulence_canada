// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
    // event.locals.getSession() is provided by the Auth.js SvelteKit adapter hook
    const session = await event.locals.auth();

    return {
        session: session, // Pass the session down to page/layout components
    };
};