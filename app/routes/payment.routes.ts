import { Router } from "express"
import { PaymentPaypal } from "../controllers/payment.controller"

const router = Router()

router.get("/payment", PaymentPaypal)

export default router
