// src/lib/server/auth.ts (updated with database adapter)
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Discord from "@auth/core/providers/discord";
import CredentialsProvider from "@auth/core/providers/credentials";
import { env } from "$env/dynamic/private";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { DrizzleAdapter } from "$lib/server/auth/drizzle-adapter";

// Define provider configurations in a type-safe way
export const authProviders = [
  GitHub({
    clientId: env.GITHUB_ID,
    clientSecret: env.GITHUB_SECRET
  }),
  Google({
    clientId: env.GOOGLE_ID,
    clientSecret: env.GOOGLE_SECRET
  }),
  Discord({
    clientId: env.DISCORD_ID,
    clientSecret: env.DISCORD_SECRET
  }),
  CredentialsProvider({
    name: 'Email & Password',
    credentials: {
      email: { label: "Email", type: "email", placeholder: "user@example.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials): Promise<schema.User | null> {
      if (!credentials?.email || !credentials.password) {
        console.error("Credentials missing email or password");
        return null;
      }

      const email = credentials.email as string;
      const password = credentials.password as string;

      console.log(`Attempting login for email: ${email}`);
      const user = await db.query.usersTable.findFirst({
        where: eq(schema.usersTable.email, email.toLowerCase())
      });

      if (!user) {
        console.log(`User not found: ${email}`);
        return null;
      }

      if (!user.hashedPassword) {
        console.log(`User ${email} found but has no password set (likely OAuth user).`);
        return null;
      }

      const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

      if (!isValidPassword) {
        console.log(`Invalid password attempt for user: ${email}`);
        return null;
      }

      console.log(`Successful credentials login for user: ${email}`);
      return user;
    }
  })
];

// Export a list of provider IDs for client-side use
export const availableProviderIds = ["github", "google", "discord", "credentials"];

// Create the Auth.js handler
export const { handle, signIn, signOut } = SvelteKitAuth({
  // Set up the custom adapter for Drizzle ORM
  adapter: DrizzleAdapter(),
  providers: authProviders,
  // Set specific pages for authentication flows
  pages: {
    signIn: '/login',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },
  // The secret should be set to a reasonably long random string.
  secret: env.AUTH_SECRET,
  // Use the database session strategy
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {},
  // Debug in development
  debug: process.env.NODE_ENV === "development",
});