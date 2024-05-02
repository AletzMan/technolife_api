import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
	host: process.env.SQL_HOST,
	user: process.env.SQL_USER,
	password: process.env.SQL_PASSWORD,
	database: process.env.SQL_DATABASE,
	port: 5432,
	ssl: true,
})

export { pool }
