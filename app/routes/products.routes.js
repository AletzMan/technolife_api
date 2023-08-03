import { Router } from 'express'
import { GetProducts, PostProduct, GetProduct, DeleteProduct } from '../controllers/products.controller.js'

const router = Router()

router.get('/products', GetProducts)
router.post('/products', PostProduct)
router.get('/products/:id', GetProduct)
router.delete('/products/:id', DeleteProduct)

export default router