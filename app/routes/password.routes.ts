import { Router } from "express"
import { ResetPassword } from "../controllers/password.controller"

const router = Router()

router.post("/password/reset", ResetPassword)

export default router
