import express from 'express'
import { pool } from "../../config/db.js"

export const ValidateUser = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    if (!email) {
        res.status(404).json({
            code: 5,
            message: "The email parameter is required"
        })
    } else if (!password) {
        res.status(404).json({
            code: 5,
            message: "The password parameter is required"
        })
    } else if (email && password) {
        const [response] = await pool.query(`SELECT * FROM users WHERE mail='${email}'`)
        
        if (response.length === 0) {
            console.log('AQUI')
            res.status(404).json({
                code: 4,
                message: "User does not exist"
            })
        } else {
            if(response[0].mail === email && response[0].password === password){
                res.status(200).json({
                    code: 1,
                    message: 'Successful login'
                })
            } else {
                res.status(401).json({
                    code: 2,
                    message: 'User or password are not correct'
                })
            }
            //res.json(response)
            //console.log(response)
        }
    }
}

export const GetUsers = async (req, res) => {
    const [response] = await pool.query(`SELECT * FROM users`)
    console.log(response)
    res.json(response)
}