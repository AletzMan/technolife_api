import { Router } from "express"
import {
	ResetPassword,
	RestorePassword,
	UpdateRestorePassword,
} from "../controllers/password.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Password
 *   description: Endpoints for password management
 */

/**
 * @swagger
 * /api/password/reset:
 *   post:
 *     summary: Reset password
 *     tags:
 *       - Password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordInput'
 *     responses:
 *       200:
 *         description: Password reset successful.
 *       422:
 *         description: Unprocessable Entity. Invalid data provided.
 */
router.post("/password/reset", ResetPassword)

/**
 * @swagger
 * /api/password/restore:
 *   post:
 *     summary: Restore password
 *     tags:
 *       - Password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestorePasswordInput'
 *     responses:
 *       200:
 *         description: Password restore successful.
 *       422:
 *         description: Unprocessable Entity. Invalid data provided.
 */
router.post("/password/restore", RestorePassword)

/**
 * @swagger
 * /api/password/update:
 *   patch:
 *     summary: Update restored password
 *     tags:
 *       - Password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRestorePasswordInput'
 *     responses:
 *       200:
 *         description: Password update successful.
 *       422:
 *         description: Unprocessable Entity. Invalid data provided.
 */
router.patch("/password/update", UpdateRestorePassword)

export default router
