import { Router } from 'express'
import { GetUser } from '../controllers/authentication.controller.js'

const router = Router()

router.get('/signup', GetUser)

export default router