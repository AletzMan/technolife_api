import { Router } from "express"
import {
	CreateSubCategory,
	DeleteSubCategory,
	GetAllSubCategories,
	GetSubCategory,
} from "../controllers/subcategories.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   - name: Subcategories
 *     description: Endpoints for managing subcategories
 */

/**
 * @swagger
 * /api/subcategories:
 *   get:
 *     summary: Retrieve all subcategories
 *     tags: [Subcategories]
 *     responses:
 *       200:
 *         description: A list of subcategories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subcategory'
 */
router.get("/subcategories", GetAllSubCategories)

/**
 * @swagger
 * /api/subcategories/{id}:
 *   get:
 *     summary: Retrieve a subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory ID
 *     responses:
 *       200:
 *         description: A single subcategory.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategory'
 */
router.get("/subcategories/:id", GetSubCategory)

/**
 * @swagger
 * /api/subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [Subcategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubcategoryInput'
 *     responses:
 *       201:
 *         description: The created subcategory.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategory'
 */
router.post("/subcategories", CreateSubCategory)

/**
 * @swagger
 * /api/subcategories/{id}:
 *   delete:
 *     summary: Delete a subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory ID
 *     responses:
 *       204:
 *         description: Subcategory deleted successfully.
 */
router.delete("/subcategories/:id", DeleteSubCategory)

export default router
