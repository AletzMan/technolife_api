import { Router } from 'express'
import { ValidateUser, GetUsers } from '../controllers/users.controller.js'
const router = Router()

router.post('/users', ValidateUser)


export default router