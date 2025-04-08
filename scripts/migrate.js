import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from '../src/lib/server/db/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to migrations folder
const migrationsFolder = path.join(__dirname, '../migrations');

async function runMigrations() {
  console.log(`Running migrations from ${migrationsFolder}...`);
  
  try {
    // This will run all pending migrations
    await migrate(db, { migrationsFolder });
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Close the pool to end the process
    await pool.end();
  }
}

runMigrations().catch(console.error);