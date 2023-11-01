import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.DBPORT ? parseInt(process.env.DBPORT, 10) : 5432;

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: port,
  database: process.env.DATABASE,
});

export default pool;
