import { Router } from "express"
import {
	CreateCategory,
	DeleteCategory,
	GetAllCategories,
	GetCategory,
} from "../controllers/categories.controller"

const router = Router()

router.get("/categories", GetAllCategories)
router.get("/categories/:id", GetCategory)
router.post("/categories/", CreateCategory)
router.delete("/categories/:id", DeleteCategory)

export default router
