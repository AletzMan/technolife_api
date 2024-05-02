import { Router } from "express"
import { GetPostalCode } from "../controllers/postalcode.controller"

const router = Router()

router.get("/postalcode", GetPostalCode)

export default router
