import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("Database URL is not defined in .env file");
}

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    }
});

pool.on('connect', () => {
    console.log(`Connected to Supabase`);
});

pool.on('error', (error: Error) => {
    console.log(`Error connecting to Supabase: ${error.message}`);
});

export default pool;