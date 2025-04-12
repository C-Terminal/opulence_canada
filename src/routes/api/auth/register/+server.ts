// src/api/auth/register/+server.ts (for email/password registration)
import { json } from '@sveltejs/kit';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import type { RequestHandler } from './$types';

// Define a schema for registration validation
const registerSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	name: z.string().min(2, 'Name must be at least 2 characters')
});

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		// Validate input
		const result = registerSchema.safeParse(body);
		if (!result.success) {
			return json({ message: result.error.errors[0].message }, { status: 400 });
		}

		const { email, password, name } = result.data;

		// Check if user already exists
		const existingUser = await db.query.usersTable.findFirst({
			where: eq(usersTable.email, email.toLowerCase())
		});

		if (existingUser) {
			return json({ message: 'User with this email already exists' }, { status: 409 });
		}

		// Hash the password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create new user with a UUID as the ID (required for Auth.js)
		const [user] = await db
			.insert(usersTable)
			.values({
				id: randomUUID(), // Generate UUID for Auth.js compatibility
				email: email.toLowerCase(),
				hashedPassword,
				name
			})
			.returning();

		// Return success without exposing the user object
		return json(
			{ message: 'User registered successfully, user details: ' + user },
			{ status: 201 }
		);
	} catch (error) {
		console.error('Registration error:', error);
		return json({ message: 'An error occurred during registration' }, { status: 500 });
	}
};
