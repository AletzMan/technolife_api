import { Router } from "express"
import {
	CreateSubCategory,
	DeleteSubCategory,
	GetAllSubCategories,
	GetSubCategory,
} from "../controllers/subcategories.controller"

const router = Router()

router.get("/subcategories", GetAllSubCategories)
router.get("/subcategories/:id", GetSubCategory)
router.post("/subcategories/", CreateSubCategory)
router.delete("/subcategories/:id", DeleteSubCategory)

export default router
