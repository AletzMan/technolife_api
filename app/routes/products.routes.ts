import { Router } from "express"
import {
	AddProduct,
	DeleteProduct,
	GetProduct,
	GetProductAlerts,
	GetProducts,
	TotalProducts,
	UpdateStock,
} from "../controllers/products.controller"

const router = Router()

router.get("/products", GetProducts)
router.get("/products/:id", GetProduct)
router.post("/products", AddProduct)
router.delete("/products/:id", DeleteProduct)
router.put("/products/stock/:id", UpdateStock)
router.get("/products/count", TotalProducts)
router.get("/products/statistics/alerts", GetProductAlerts)

export default router
