import { Pool } from "pg";

const cfgFromUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

export const pool = cfgFromUrl
  ? new Pool({ connectionString: cfgFromUrl, ssl: cfgFromUrl.includes("sslmode=require") ? { rejectUnauthorized: false } : false })
  : new Pool({
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB || process.env.POSTGRES_DATABASE,
      ssl: process.env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : false,
    });

export async function connectDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        done BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log("✅ PostgreSQL connecté & prêt");
  } finally {
    client.release();
  }
}

export async function closeDB() {
  await pool.end();
}
