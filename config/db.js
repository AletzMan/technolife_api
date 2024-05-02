import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()


export const pool = createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
})

await pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("DATABASE CONNECTION WAS CLOSED")
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("DATABASE HAS TO MANY CONNECTIONS")
        }
        if (err.code === "ECONNREFUSED") {
            console.error("DATABASE CONNECTION WAS REFUSED")
        }
    }
    if (connection) connection.release()
    console.log("DB is Connected")
    return
})




