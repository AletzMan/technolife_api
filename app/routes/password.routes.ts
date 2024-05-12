import { Router } from "express"
import {
	ResetPassword,
	RestorePassword,
	UpdateRestorePassword,
} from "../controllers/password.controller"

const router = Router()

router.post("/password/reset", ResetPassword)
router.post("/password/restore", RestorePassword)
router.patch("/password/update", UpdateRestorePassword)

export default router
