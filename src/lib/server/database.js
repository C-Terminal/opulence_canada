import pg from 'pg';
const { Pool } = pg;

// Create a connection pool to PostgreSQL
export const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'sveltekit_app',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000 // How long a client is allowed to remain idle before being closed
});

// Helper function to execute queries
/**
 * @param {pg.QueryArrayConfig<any>} text
 * @param {any} params
 */
export async function query(text, params) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  
  // Log query execution time in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Executed query', { text, duration, rows: result.rowCount });
  }
  
  return result;
}

// Helper to get a single row
/**
 * @param {pg.QueryArrayConfig<any>} text
 * @param {any} params
 */
export async function getOne(text, params) {
  const result = await query(text, params);
  return result.rows[0];
}

// Helper to get multiple rows
/**
 * @param {pg.QueryArrayConfig<any>} text
 * @param {any} params
 */
export async function getMany(text, params) {
  const result = await query(text, params);
  return result.rows;
}