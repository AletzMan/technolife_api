import { Router } from "express"
import { SendMessage } from "../controllers/message.controller"

const router = Router()

router.post("/message", SendMessage)

export default router
