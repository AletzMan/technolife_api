import { Router } from "express"
import {
	CreateNewsletter,
	DeleteNewsletter,
	GetNewsLetters,
} from "../controllers/newsletter.controller"

const router = Router()

router.get("/newsletters", GetNewsLetters)
router.post("/newsletters", CreateNewsletter)
router.delete("/newsletters/:id", DeleteNewsletter)

export default router
