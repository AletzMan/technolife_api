import { Router } from 'express'
import { Login, Protected, Secure } from '../controllers/authentication.controller.js'

const router = Router()

router.post('/login', Login)
router.get('/protected', ensureToken, Protected)
router.get('/secure',  Secure)

export default router

function ensureToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader)
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}