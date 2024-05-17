import { Router } from "express"
import {
	CreateNewsletter,
	DeleteNewsletter,
	GetNewsLetters,
} from "../controllers/newsletter.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Newsletters
 *   description: Endpoints for managing newsletters
 */

/**
 * @swagger
 * /api/newsletters:
 *   get:
 *     summary: Retrieve all newsletters
 *     tags:
 *       - Newsletters
 *     responses:
 *       200:
 *         description: A list of newsletters.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Newsletter'
 */
router.get("/newsletters", GetNewsLetters)

/**
 * @swagger
 * /api/newsletters:
 *   post:
 *     summary: Create a new newsletter
 *     tags:
 *       - Newsletters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsletterInput'
 *     responses:
 *       201:
 *         description: The created newsletter.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Newsletter'
 *       422:
 *         description: Unprocessable Entity. Invalid data provided.
 */
router.post("/newsletters", CreateNewsletter)

/**
 * @swagger
 * /api/newsletters/{id}:
 *   delete:
 *     summary: Delete a newsletter by ID
 *     tags:
 *       - Newsletters
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the newsletter to delete.
 *     responses:
 *       204:
 *         description: Newsletter deleted successfully.
 *       404:
 *         description: Newsletter not found.
 */
router.delete("/newsletters/:id", DeleteNewsletter)

export default router
