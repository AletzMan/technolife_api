import { pool } from "../../config/db.js"

export const GetProducts = async (req, res) => {
    const [response] = await pool.query('SELECT * FROM products')
    res.json(response)
}