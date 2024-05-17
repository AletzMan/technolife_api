import { Router } from "express"
import {
	CreateCoupon,
	Deletecoupon,
	GetAllCoupons,
	GetCoupon,
	GetCouponValidate,
} from "../controllers/coupons.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Endpoints for coupon management
 */

/**
 * @swagger
 * /api/coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: A list of coupons.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupons not found.
 */
router.get("/coupons", GetAllCoupons)

/**
 * @swagger
 * /api/coupons/{id}:
 *   get:
 *     summary: Get a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the coupon to retrieve.
 *     responses:
 *       200:
 *         description: A single coupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found.
 */
router.get("/coupons/:id", GetCoupon)

/**
 * @swagger
 * /api/coupons/validate/{id}:
 *   get:
 *     summary: Validate a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the coupon to validate.
 *     responses:
 *       200:
 *         description: Coupon validation result.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *       404:
 *         description: Coupon not found.
 */
router.get("/coupons/validate/:id", GetCouponValidate)

/**
 * @swagger
 * /api/coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CouponInput'
 *     responses:
 *       201:
 *         description: The created coupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       422:
 *         description: Unprocessable entity. Invalid data provided.
 */
router.post("/coupons/", CreateCoupon)

/**
 * @swagger
 * /api/coupons/{id}:
 *   delete:
 *     summary: Delete a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the coupon to delete.
 *     responses:
 *       204:
 *         description: Coupon deleted successfully.
 *       404:
 *         description: Coupon not found.
 */
router.delete("/coupons/:id", Deletecoupon)

export default router
