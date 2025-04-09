// src/routes/register/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { z } from 'zod'; // Optional: Using Zod for validation

// Optional: Redirect if already logged in
export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth();
    if (session?.user) {
        throw redirect(303, '/'); // Redirect to home or dashboard
    }
    return {};
};

// Optional: Define a schema for validation using Zod
const registerSchema = z.object({
    name: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().trim().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    // confirmPassword: z.string() // Add if you have a confirm password field
})
// .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"], // path of error
// });


export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // --- Optional: Validate with Zod ---
        try {
            registerSchema.parse({ name, email, password });
        } catch (err: any) {
            const errors = err.flatten().fieldErrors;
            return fail(400, { errors, name, email }); // Return validation errors
        }
        // --- End Zod Validation ---

        // --- Basic Manual Validation (if not using Zod) ---
        // if (!name || !email || !password || password.length < 8) {
        //     return fail(400, { error: 'Please fill all fields correctly (password min 8 chars).', name, email });
        // }
        // --- End Manual Validation ---

        const normalizedEmail = email.toLowerCase();

        // --- Check if user already exists ---
        const existingUser = await db.query.usersTable.findFirst({
            where: eq(schema.usersTable.email, normalizedEmail)
        });

        if (existingUser) {
            // Security Note: Avoid confirming *which* field exists (email vs username)
            // Return a generic error
             return fail(400, { error: 'An account with this email already exists.', name, email });
        }

        // --- Hash Password ---
        const saltRounds = 10; // Standard recommendation
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // --- Create User ---
        try {
            await db.insert(schema.usersTable).values({
                // Generate a unique ID (Drizzle/Auth.js adapter might handle this, or use cuid/uuid)
                // If using DrizzleAdapter default, ID generation might be implicit if not provided
                // id: generateCuid(), // Example if you need explicit ID generation
                id: crypto.randomUUID(),
                name: name,
                email: normalizedEmail,
                hashedPassword: hashedPassword,
                // You might set emailVerified to null or handle verification separately
            });

            console.log(`User registered successfully: ${normalizedEmail}`);

        } catch (error) {
            console.error("Error registering user:", error);
             return fail(500, { error: 'Failed to register user. Please try again.', name, email });
        }

        // --- Redirect to login page after successful registration ---
        throw redirect(303, '/auth/signin?message=RegistrationSuccessful');
        // Optionally: Redirect to a "please verify your email" page if implementing verification
        // Optionally: Automatically sign the user in (more complex, might involve manually creating session)
    }
};