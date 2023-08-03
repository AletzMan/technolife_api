import { Router } from 'express'
import { GetCategories } from '../controllers/categories.controller.js'

const router = Router()

router.get('/categories', GetCategories)

export default router