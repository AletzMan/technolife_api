import express from 'express'
import { pool } from "../../config/db.js"

export const GetUser = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    if (!email) {
        res.json({
            code: 5,
            message: "The email parameter is required"
        })
    } else if (!password) {
        res.json({
            code: 5,
            message: "The password parameter is required"
        })
    } else if (email && password) {
        const [response] = await pool.query(`SELECT * FROM users WHERE mail='${email}'`)
        if (response.length === 0) {
            res.json({
                code: 4,
                message: "User does not exist"
            })
        } else {

            res.json(response)
        }
    }
}