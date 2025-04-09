// src/hooks.server.ts
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import CredentialsProvider from '@auth/core/providers/credentials'; // Import CredentialsProvider
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';
import bcrypt from 'bcrypt'; // Import bcrypt
import { eq } from 'drizzle-orm'; // Import eq for Drizzle queries
import { sequence } from '@sveltejs/kit/hooks';

// ... (Ensure environment variables are checked) ...

const authHandle: Handle = SvelteKitAuth({
    adapter: DrizzleAdapter(db, schema),
    providers: [
        Google({ /* ... */ }),
        // Add CredentialsProvider
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Email & Password',
            // `credentials` is used to generate a form on the sign-in page.
            // You can specify which fields should be submitted. The values are sent to
            // the `authorize` function below (as the first parameter).
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" }
            },
            // The core authorization logic
            async authorize(credentials, req): Promise<schema.User | null> {
                // --- 1. Basic Validation ---
                if (!credentials?.email || !credentials.password) {
                    console.error("Credentials missing email or password");
                    // You can throw an error or return null
                    // Throwing displays a generic error on the sign-in page
                    // Returning null does the same by default
                    return null;
                    // Or throw new Error("Please enter both email and password.");
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                // --- 2. Find User in Database ---
                console.log(`Attempting login for email: ${email}`);
                const user = await db.query.usersTable.findFirst({
                    where: eq(schema.usersTable.email, email.toLowerCase()) // Store/check emails case-insensitively
                });

                if (!user) {
                    console.log(`User not found: ${email}`);
                    // Optionally: use timing attacks resistant comparison, but user not found is common
                    return null; // User not found
                }

                // --- 3. Check if User has a Password (might be OAuth only user) ---
                if (!user.hashedPassword) {
                    console.log(`User ${email} found but has no password set (likely OAuth user).`);
                    // Decide how to handle this:
                    // a) Deny login via credentials
                    return null;
                    // b) Or, potentially redirect to a "set password" flow if desired (more complex)
                }

                // --- 4. Verify Password ---
                const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

                if (!isValidPassword) {
                    console.log(`Invalid password attempt for user: ${email}`);
                    return null; // Passwords don't match
                }

                // --- 5. Return User Object (must match Auth.js expected user structure) ---
                console.log(`Successful credentials login for user: ${email}`);
                // Ensure the returned object has at least id, email, name, image
                // Drizzle's return type 'User' should align if defined correctly
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    emailVerified: user.emailVerified, // Include if needed by session/callbacks
                    image: user.image,
                    hashedPassword: null,
                    // DO NOT RETURN hashedPassword here!
                };
            } // end authorize
        }) // end CredentialsProvider
    ],
    session: {
        strategy: 'database', // 'jwt' is also an option, but database is common with adapters
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        // Use callbacks to control behavior, e.g., add custom data to session/token
        async session({ session, user }) {
            // Add custom properties to the session object
            // Make sure to ONLY expose non-sensitive data here
            if (session.user) {
                session.user.id = user.id; // Add user ID to session
                // session.user.role = user.role; // Example: Add role if defined in your user schema
            }
            return session;
        },
        // async jwt({ token, user, account, profile }) {
        //   // Only needed if session strategy is 'jwt'
        //   // Persist data to the JWT
        //   if (user) {
        //     token.id = user.id;
        //     // token.role = user.role;
        //   }
        //   return token;
        // },
        async signIn({ user, account, profile, email, credentials }) {
            // You can add validation logic here before a user signs in
            // Example: Check if the user's email domain is allowed
            // const isAllowedToSignIn = user.email?.endsWith('@example.com') ?? false;
            // if (isAllowedToSignIn) {
            //   return true // Allow sign in
            // } else {
            //   console.log(`Sign in denied for email: ${user.email}`);
            //   // Return false to deny sign in, or a URL to redirect to
            //   return '/auth/error?error=AccessDenied'
            // }
            console.log(`User signing in: ${user.email} via ${account?.provider}`);
            return true; // Allow sign in by default
        },
        // async redirect({ url, baseUrl }) {
        //   // Allows customizing redirect URLs
        //   return baseUrl // Default behavior
        // }
    },
    pages: {
  // Optional: Customize pages if you don't want the defaults
  //This is a server route!!!!
        signIn: '/auth/signin',
        // signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (Email provider)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave unset if not needed)
    },
    debug: process.env.NODE_ENV === 'development',
}).handle;


const dbHandle: Handle = async ({ event, resolve }) => {
    event.locals.db = db;
    const response = await resolve(event);
    return response;
  };
  
  export const handle = sequence(authHandle, dbHandle);

// export const handle = authHandle;