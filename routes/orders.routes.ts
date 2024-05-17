import { Router } from "express"
import {
	CreateOrder,
	GetOrderById,
	GetOrderDetails,
	GetOrders,
	TotalOrders,
	UpdateOrder,
} from "../controllers/orders.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints for managing orders
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/orders", GetOrders)

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Retrieve an order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to retrieve.
 *     responses:
 *       200:
 *         description: The requested order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found.
 */
router.get("/orders/:id", GetOrderById)

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     summary: Update an order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderUpdateInput'
 *     responses:
 *       200:
 *         description: The updated order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found.
 *       422:
 *         description: Unprocessable Entity. Invalid data provided.
 */
router.patch("/orders/:id", UpdateOrder)

/**
 * @swagger
 * /api/orders/{id}/details:
 *   get:
 *     summary: Retrieve details of an order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to retrieve details for.
 *     responses:
 *       200:
 *         description: Details of the requested order.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderDetail'
 *       404:
 *         description: Order not found.
 */
router.get("/orders/:id/details", GetOrderDetails)

/**
 * @swagger
 * /api/orders/statistics/count:
 *   get:
 *     summary: Get total count of orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Total count of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 */
router.get("/orders/statistics/count", TotalOrders)

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: The created order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       422:
 *         description: Unprocessable Entity. Invalid data provided.
 */
router.post("/orders", CreateOrder)

export default router
