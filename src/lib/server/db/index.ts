// src/lib/server/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private'; // Use SvelteKit's env handling
import * as schema from './schema';

if (!env.DATABASE_URL) {
	throw new Error('DATABASE_URL environment variable is not set');
}
// Environment detection
const isProd = process.env.NODE_ENV === 'production';

// Connection string approach (recommended)
const connectionString = isProd
	? process.env.POSTGRES_URL || ''
	: `postgres://${process.env.POSTGRES_USER || 'postgres'}:${process.env.POSTGRES_PASSWORD || 'postgres'}@${process.env.POSTGRES_HOST || 'localhost'}:${process.env.POSTGRES_PORT || '5432'}/${process.env.POSTGRES_DB || 'sveltekit_app'}`;

// Client config with different settings based on environment
const clientOptions = {
	max: isProd ? 3 : 10, // Fewer connections in prod (serverless environment)
	idle_timeout: isProd ? 20 : 30, // Shorter timeouts in prod
	connect_timeout: isProd ? 10 : 30
};

// Create postgres client
const client = postgres(connectionString, clientOptions);

// Create and export drizzle ORM instance
export const db = drizzle(client, { schema });
