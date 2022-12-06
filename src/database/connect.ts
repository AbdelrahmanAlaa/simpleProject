import { createPool } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pools = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
});
const pool = pools.promise();

export default pool;
