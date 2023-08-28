import jwt from "jsonwebtoken"
import { pool } from "../../config/db.js"

export const Login = async (req, res) => {
    //const [response] = await pool.query('SELECT * FROM products')
    const user = {id: 3}
    const token = jwt.sign({user}, 'my_secret_token')
    res.json({
        token
    })
}

export const Protected = async (req, res) => {
    //const [response] = await pool.query('SELECT * FROM products')
    jwt.verify(req.token, 'my_secret_token', (err, data) => {
        if(err){
            res.sendStatus(403)
        } else {
            res.json({
                text: "Protected",
                data
            })
        }
    })
       
}

export const Secure = async (req, res) => {
    //const [response] = await pool.query('SELECT * FROM products')
    jwt.verify(req.token, 'my_secret_token', (err, data) => {
        if(err){
            res.sendStatus(403)
        } else {
            res.json({
                text: "Protected",
                data
            })
        }
    })
       
}

