import { Router } from 'express'
import { GetUser } from '../controllers/users.controller.js'

const router = Router()

router.post('/users', GetUser)

export default router