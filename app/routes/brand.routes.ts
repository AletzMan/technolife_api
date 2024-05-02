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

router.get("/brands", GetBrands)
router.get("/brands/:id", GetBrandById)
router.post("/brands", CreateBrand)
router.put("/brands/:id", UpdateBrand)
router.delete("/brands/:id", DeleteBrand)
router.get("/brands/count/all", GetAllBrands)

export default router
