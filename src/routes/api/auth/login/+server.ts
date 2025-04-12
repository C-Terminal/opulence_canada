// src/api/auth/login/+server.ts
import { json } from '@sveltejs/kit';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import type { RequestHandler } from './$types';
import { serialize } from 'cookie';
import { DrizzleAdapter } from '$lib/server/auth/drizzle-adapter';
// Import your adapter (adjust the path as needed)

// Define a schema for login validation
const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(1, 'Password is required')
});

// Define session duration (30 days in seconds)
const SESSION_DURATION = 60 * 60 * 24 * 30;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		// Validate input
		const result = loginSchema.safeParse(body);
		if (!result.success) {
			return json({ message: result.error.errors[0].message }, { status: 400 });
		}

		const { email, password } = result.data;

		// Find user by email
		const user = await db.query.usersTable.findFirst({
			where: eq(usersTable.email, email.toLowerCase())
		});

		// Check if user exists
		if (!user) {
			return json({ message: 'Invalid email or password' }, { status: 401 });
		}

		// Verify password
		if (user.hashedPassword === null) {
			return json({ message: 'Invalid email or password' }, { status: 401 });
		}

		const passwordValid = await bcrypt.compare(password, user.hashedPassword);

        if(passwordValid) console.log("confirmed password");
		// Generate session token
		const sessionToken = randomUUID();
		const expires = new Date(Date.now() + SESSION_DURATION * 1000);

		const adapter = DrizzleAdapter();
		// Use your adapter to create a session
		const session = await adapter.createSession!({
			userId: user.id,
			sessionToken,
			expires
		});

		console.log('Session created:', session);

		// Create a session cookie
		const cookie = serialize('session', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: SESSION_DURATION
		});

		// Return success with user info (excluding sensitive data)
		const { ...safeUserData } = user;

		return json(
			{
				success: true,
				user: safeUserData
			},
			{
				status: 200,
				headers: {
					'Set-Cookie': cookie
				}
			}
		);
	} catch (error) {
		console.error('Login error:', error);
		return json({ message: 'An error occurred during login' }, { status: 500 });
	}
};
