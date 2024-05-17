import { Router } from "express"
import { PaymentPaypal } from "../controllers/payment.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Endpoints for payment processing
 */

/**
 * @swagger
 * /api/payment:
 *   post:
 *     summary: Process payment
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentInput'
 *     responses:
 *       200:
 *         description: Payment processed successfully.
 *       422:
 *         description: Unprocessable Entity. Invalid data provided.
 *       500:
 *         description: Internal Server Error. Payment processing failed.
 */
router.post("/payment", PaymentPaypal)

export default router
