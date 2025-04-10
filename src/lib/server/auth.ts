// src/lib/server/auth.ts
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Discord from "@auth/core/providers/discord";
import CredentialsProvider from "@auth/core/providers/credentials";
import { env } from "$env/dynamic/private";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db"; // Adjust path to your actual DB setup
import * as schema from "$lib/server/db/schema"; // Adjust path to your schema
import { DrizzleAdapter } from "@auth/drizzle-adapter";

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
    async authorize(credentials, req): Promise<schema.User | null> {
      // --- 1. Basic Validation ---
      if (!credentials?.email || !credentials.password) {
        console.error("Credentials missing email or password");
        return null;
      }

      const email = credentials.email as string;
      const password = credentials.password as string;

      // --- 2. Find User in Database ---
      console.log(`Attempting login for email: ${email}`);
      const user = await db.query.usersTable.findFirst({
        where: eq(schema.usersTable.email, email.toLowerCase())
      });

      if (!user) {
        console.log(`User not found: ${email}`);
        return null;
      }

      // --- 3. Check if User has a Password (might be OAuth only user) ---
      if (!user.hashedPassword) {
        console.log(`User ${email} found but has no password set (likely OAuth user).`);
        return null;
      }

      // --- 4. Verify Password ---
      const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

      if (!isValidPassword) {
        console.log(`Invalid password attempt for user: ${email}`);
        return null;
      }

      // --- 5. Return User Object (must match Auth.js expected user structure) ---
      console.log(`Successful credentials login for user: ${email}`);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        // Don't include hashedPassword in the returned user
        hashedPassword: null
      };
    }
  })
];

// Export a list of provider IDs for client-side use - now including credentials
export const availableProviderIds = ["github", "google", "discord", "credentials"];

// Create the Auth.js handler
export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: DrizzleAdapter(db, schema),
  providers: authProviders,
  // Add other Auth.js options as needed
  session: {
    strategy: 'database', // 'jwt' is also an option, but database is common with adapters
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  // Consider adding these for a more complete implementation
  pages: {
    signIn: "/login",
    // error: '/auth/error',
    // signOut: '/auth/signout',
  },
  callbacks: {
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
    async session({ session, user }) {
      // Add custom properties to the session object
      // Make sure to ONLY expose non-sensitive data here
      if (session.user) {
        session.user.id = user.id; // Add user ID to session
        // session.user.role = user.role; // Example: Add role if defined in your user schema
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});
