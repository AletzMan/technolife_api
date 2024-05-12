import { Router } from "express"
import {
	CreateOrder,
	GetOrderById,
	GetOrderDetails,
	GetOrders,
	TotalOrders,
} from "../controllers/orders.controller"

const router = Router()

router.get("/orders", GetOrders)
router.get("/orders/:id", GetOrderById)
router.get("/orders/:id/details", GetOrderDetails)
router.get("/orders/statistics/count", TotalOrders)
router.post("/orders", CreateOrder)

export default router
