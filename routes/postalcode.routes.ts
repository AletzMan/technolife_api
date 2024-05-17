import { Router } from "express"
import { GetPostalCode } from "../controllers/postalcode.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: PostalCode
 *   description: Endpoints for retrieving postal codes
 */

/**
 * @swagger
 * /api/postalcode:
 *   get:
 *     summary: Retrieve postal codes by query
 *     tags:
 *       - PostalCode
 *     parameters:
 *       - in: query
 *         name: cp
 *         schema:
 *           type: string
 *         required: true
 *         description: The postal code to retrieve information for.
 *     responses:
 *       200:
 *         description: Postal code retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postalCode:
 *                   type: string
 *                   description: The postal code.
 *       500:
 *         description: Internal Server Error. Failed to retrieve postal code information.
 */
router.get("/postalcode", GetPostalCode)

export default router
