// import {  } from '@auth/sveltekit';
// import { redirect } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async (event) => {
//     // Redirect logged-in users away from the login page
//     const session = await event.locals.getSession();
//     if (session?.user) {
//         throw redirect(303, '/'); // Or to '/dashboard' etc.
//     }

//     // Fetch providers and CSRF token on the server
//     // getProviders() safely retrieves provider info without secrets
//     const providers = await getProviders();
//     const csrfToken = await getCsrfToken(event);

//     return {
//         providers: providers ? Object.values(providers) : [], // Pass as an array
//         csrfToken: csrfToken,
//     };
// };

// // Note: No `actions` object here. The form POSTs to the endpoint
// // handled by Auth.js in hooks.server.ts (/auth/signin/credentials)