import 'dotenv/config';
import { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}


export default {
  out: './drizzle',
  schema: './src/lib/server/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
// Optional: Enable verbose logging
// verbose: true,
// Optional: Fail if there are non-empty migration folders
// strict: true,

