import { Router } from 'express'
import { GetSubCategories } from '../controllers/subcategories.controller.js'

const router = Router()

router.get('/subcategories', GetSubCategories)

export default router