import { pool } from "../../config/db.js"

export const GetSubCategories = async (req, res) => {
    const [response] = await pool.query('SELECT * FROM subcategories')
    res.json(response)
}