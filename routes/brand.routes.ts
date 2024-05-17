import { Router } from "express"
import {
	CreateBrand,
	DeleteBrand,
	GetAllBrands,
	GetBrandById,
	GetBrands,
	UpdateBrand,
} from "../controllers/brands.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Endpoints for managing brands
 */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Retrieve a list of brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: A list of brands.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/brands", GetBrands)

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Retrieve a single brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: A single brand.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/brands/:id", GetBrandById)

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Brand Name"
 *               logo:
 *                 type: string
 *                 example: "Brand Logo URL"
 *     responses:
 *       201:
 *         description: The created brand.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/brands", CreateBrand)

/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Brand Name"
 *               logo:
 *                 type: string
 *                 example: "Updated Brand Logo URL"
 *     responses:
 *       200:
 *         description: The updated brand.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put("/brands/:id", UpdateBrand)

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     responses:
 *       204:
 *         description: Brand deleted successfully.
 */
router.delete("/brands/:id", DeleteBrand)

/**
 * @swagger
 * /api/brands/count/all:
 *   get:
 *     summary: Get the count of all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: The count of all brands.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 100
 */
router.get("/brands/count/all", GetAllBrands)

export default router
