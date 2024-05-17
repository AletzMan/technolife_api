import { Router } from "express"
import { SendMessage } from "../controllers/message.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Endpoints for message sending
 */

/**
 * @swagger
 * /api/message:
 *   post:
 *     summary: Send a message
 *     tags:
 *       - Messages
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageInput'
 *     responses:
 *       200:
 *         description: Message sent successfully.
 *       422:
 *         description: Unprocessable Entity. Invalid data provided.
 */
router.post("/message", SendMessage)

export default router
