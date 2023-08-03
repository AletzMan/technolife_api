import { createPool } from 'mysql2/promise'


export const pool = createPool({
    host: 'aws.connect.psdb.cloud',
    user: 'ch6fqd8kcfc1xfqenh7p',
    password: 'pscale_pw_OsPE1hUG8OUsoEvwAr49r1OBTyJSDkP97wXxH9UodmQ',
    database: 'expressdb',
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




