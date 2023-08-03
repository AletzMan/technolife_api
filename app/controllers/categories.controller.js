import { pool } from "../../config/db.js"

export const GetCategories = async (req, res) => {
    const [response] = await pool.query('SELECT * FROM categories')
    res.json(response)
}