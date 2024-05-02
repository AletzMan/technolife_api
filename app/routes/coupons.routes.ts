import { Router } from "express"
import {
	CreateCoupon,
	Deletecoupon,
	GetAllCoupons,
	GetCoupon,
} from "../controllers/coupons.controller"

const router = Router()

router.get("/coupons", GetAllCoupons)
router.get("/coupons/:id", GetCoupon)
router.post("/coupons/", CreateCoupon)
router.delete("/coupons/:id", Deletecoupon)

export default router
