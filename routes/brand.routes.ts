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
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 response:
 *                   type: object
 *                   properties:
 *                     results:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Brand'
 *                     totalResults:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *             example:
 *               error: false
 *               response:
 *                 results:
 *                   - id: 1
 *                     name: "Brand Name 1"
 *                     name_logo: "Brand Name Logo 1"
 *                     logo: "http://example.com/logo1.png"
 *                     created_date: "2023-05-18T16:39:57Z"
 *                     last_modified: "2024-05-18T16:39:57Z"
 *                   - id: 2
 *                     name: "Brand Name 2"
 *                     name_logo: "Brand Name Logo 2"
 *                     logo: "http://example.com/logo2.png"
 *                     created_date: "2023-06-18T16:39:57Z"
 *                     last_modified: "2024-06-18T16:39:57Z"
 *                 totalResults: 100
 *                 totalPages: 10
 *                 currentPage: 1
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Not found"
 *                     description:
 *                       type: string
 *                       example: "The requested resource could not be found."
 *                 status:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 *                     description:
 *                       type: string
 *                       example: "The server encountered an unexpected condition that prevented it from fulfilling the request."
 *                 status:
 *                   type: integer
 *                   example: 500
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
 *               $ref: '#/components/schemas/Brand'
 *             example:
 *               id: 1
 *               name: "Brand Name"
 *               name_logo: "Brand Name Logo"
 *               logo: "http://example.com/logo.png"
 *               created_date: "2023-05-18T16:39:57Z"
 *               last_modified: "2024-05-18T16:39:57Z"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Not found"
 *                 description:
 *                   type: string
 *                   example: "The requested resource could not be found."
 *                 status:
 *                   type: integer
 *                   example: 404
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 description:
 *                   type: string
 *                   example: "The request was well-formed but was unable to be followed due to semantic errors."
 *                 status:
 *                   type: integer
 *                   example: 422
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 description:
 *                   type: string
 *                   example: "The server encountered an unexpected condition that prevented it from fulfilling the request."
 *                 status:
 *                   type: integer
 *                   example: 500
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
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Brand'
 *                 status:
 *                   type: integer
 *                   example: 201
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 description:
 *                   type: string
 *                   example: "The request was well-formed but was unable to be followed due to semantic errors."
 *                 status:
 *                   type: integer
 *                   example: 422
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Conflict"
 *                 description:
 *                   type: string
 *                   example: "The request could not be completed due to a conflict with the current state of the resource."
 *                 status:
 *                   type: integer
 *                   example: 409
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 description:
 *                   type: string
 *                   example: "The server encountered an unexpected condition that prevented it from fulfilling the request."
 *                 status:
 *                   type: integer
 *                   example: 500
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
 *             $ref: '#/components/schemas/Brand'
 *           example:
 *             id: 1
 *             name: "Updated Brand Name"
 *             name_logo: "Updated Brand Name Logo"
 *             logo: "http://example.com/updated-logo.png"
 *             created_date: "2023-05-18T16:39:57Z"
 *             last_modified: "2024-05-18T16:39:57Z"
 *     responses:
 *       200:
 *         description: The updated brand.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *             example:
 *               error: false
 *               message: "Updated successfully"
 *               data: object,
 *       422:
 *         description: The updated brand.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *             example:
 *               error: true
 *               message: "Unprocessable entity"
 *               description: "The request was well-formed but was unable to be followed due to semantic errors."
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Deleted successfully"
 *                 status:
 *                   type: integer
 *                   example: 204
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Not found"
 *                 description:
 *                   type: string
 *                   example: "The requested resource could not be found."
 *                 status:
 *                   type: integer
 *                   example: 404
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 description:
 *                   type: string
 *                   example: "The server encountered an unexpected condition that prevented it from fulfilling the request."
 *                 status:
 *                   type: integer
 *                   example: 500
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
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 description:
 *                   type: string
 *                   example: "The server encountered an unexpected condition that prevented it from fulfilling the request."
 *                 status:
 *                   type: integer
 *                   example: 500
 */
router.get("/brands/count/all", GetAllBrands)

export default router
