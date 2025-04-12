// src/lib/server/auth/drizzle-adapter.ts
import type { Adapter } from '@auth/core/adapters';
import { and, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { usersTable, accountsTable, sessions, verificationTokens } from '$lib/server/db/schema'; // Adjust import path as needed


export function DrizzleAdapter(): Adapter {
	return {
		async createUser(userData) {
			const [user] = await db
				.insert(usersTable)
				.values({
					id: userData.id,
					name: userData.name,
					email: userData.email,
					emailVerified: userData.emailVerified,
					image: userData.image
				})
				.returning();
			return user;
		},

		async getUser(id) {
			const user = await db.query.usersTable.findFirst({
				where: eq(usersTable.id, id)
			});
			return user || null;
		},

		async getUserByEmail(email) {
			const user = await db.query.usersTable.findFirst({
				where: eq(usersTable.email, email)
			});
			return user || null;
		},

		async getUserByAccount({ providerAccountId, provider }) {
			const account = await db.query.accountsTable.findFirst({
				where: and(
					eq(accountsTable.providerAccountId, providerAccountId),
					eq(accountsTable.provider, provider)
				),
				with: {
					user: true
				}
			});
			return account?.user || null;
		},

		async updateUser({ id, ...userData }) {
			const [user] = await db
				.update(usersTable)
				.set(userData)
				.where(eq(usersTable.id, id))
				.returning();
			return user;
		},

		async deleteUser(userId) {
			const [user] = await db.delete(usersTable).where(eq(usersTable.id, userId)).returning();
			return user;
		},

		// async linkAccount(accountData) {
		// 	await db.insert(accountsTable).values({
      
		// 		userId: accountData.userId,
		// 		provider: accountData.provider,
		// 		providerAccountId: accountData.providerAccountId,
		// 		type: accountData.type,
		// 		access_token: accountData.access_token,
		// 		expires_at: accountData.expires_at,
		// 		refresh_token: accountData.refresh_token,
		// 		id_token: accountData.id_token,
		// 		scope: accountData.scope,
		// 		session_state: accountData.session_state,
		// 		token_type: accountData.token_type
        

		// 	});
		// },

		async unlinkAccount({ providerAccountId, provider }) {
			await db
				.delete(accountsTable)
				.where(
					and(
						eq(accountsTable.providerAccountId, providerAccountId),
						eq(accountsTable.provider, provider)
					)
				);
		},

		async createSession(sessionData) {
			const [session] = await db
				.insert(sessions)
				.values({
					userId: sessionData.userId,
					sessionToken: sessionData.sessionToken,
					expires: sessionData.expires
				})
				.returning();
			return session;
		},

		async getSessionAndUser(sessionToken) {
			const session = await db.query.sessions.findFirst({
				where: eq(sessions.sessionToken, sessionToken),
				with: {
					user: true
				}
			});

			if (!session) return null;

			return {
				session,
				user: session.user
			};
		},

		async updateSession(sessionData) {
			const [session] = await db
				.update(sessions)
				.set({
					expires: sessionData.expires
				})
				.where(eq(sessions.sessionToken, sessionData.sessionToken))
				.returning();
			return session;
		},

		async deleteSession(sessionToken) {
			const [session] = await db
				.delete(sessions)
				.where(eq(sessions.sessionToken, sessionToken))
				.returning();
			return session;
		},

		async createVerificationToken(verificationToken) {
			const [token] = await db
				.insert(verificationTokens)
				.values({
					identifier: verificationToken.identifier,
					token: verificationToken.token,
					expires: verificationToken.expires
				})
				.returning();
			return token;
		},

		async useVerificationToken({ identifier, token }) {
			const [verificationToken] = await db
				.delete(verificationTokens)
				.where(
					and(eq(verificationTokens.identifier, identifier), eq(verificationTokens.token, token))
				)
				.returning();
			return verificationToken || null;
		}
	};
}
