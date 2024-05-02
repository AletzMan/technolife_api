import { Router } from "express"
import { GetOrderById, GetOrders, TotalOrders } from "../controllers/orders.controller"

const router = Router()

router.get("/orders", GetOrders)
router.get("/orders/:id", GetOrderById)
router.get("/orders/statistics/count", TotalOrders)

export default router
