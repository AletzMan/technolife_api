import { Router } from "express"
import { GetMainMessage } from "../controllers/main.controllers"

const router = Router()

router.get("/", GetMainMessage)

export default router
