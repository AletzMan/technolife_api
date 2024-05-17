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

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Endpoints for managing products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/products", GetProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get("/products/:id", GetProduct)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/products", AddProduct)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully.
 */
router.delete("/products/:id", DeleteProduct)

/**
 * @swagger
 * /api/products/stock/{id}:
 *   put:
 *     summary: Update stock of a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Product stock updated successfully.
 */
router.put("/products/stock/:id", UpdateStock)

/**
 * @swagger
 * /api/products/count:
 *   get:
 *     summary: Get the total count of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The total count of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 1000
 */
router.get("/products/count", TotalProducts)

/**
 * @swagger
 * /api/products/statistics/alerts:
 *   get:
 *     summary: Get product alerts and statistics
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Product alerts and statistics.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductAlerts'
 */
router.get("/products/statistics/alerts", GetProductAlerts)

export default router
