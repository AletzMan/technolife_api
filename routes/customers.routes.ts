import { Router } from "express"
import {
	CreateCustomer,
	GetCustomers,
	GetCustomerById,
	DeleteCustomer,
	GetFavorites,
	DeleteFavorite,
	AddFavorite,
	DeleteAllFavorites,
	UpdatePassword,
	AddAddress,
	GetAllAddress,
	UpdateAddress,
	DeleteAddress,
	GetAddressById,
	AuthorizationLogin,
	UpdateCustomer,
} from "../controllers/customers.controller"

const router = Router()

router.get("/customers", GetCustomers)
router.get("/customers/:id", GetCustomerById)
router.post("/customers", CreateCustomer)
router.delete("/customers/:id", DeleteCustomer)
router.patch("/customers/:id", UpdateCustomer)
router.patch("/customers/:id/password", UpdatePassword)
//
router.post("/customers/authorization", AuthorizationLogin)
//
router.get("/customers/:id/favorites", GetFavorites)
router.post("/customers/:id/favorites", AddFavorite)
router.delete("/customers/:id/favorites", DeleteAllFavorites)
router.delete("/customers/:id/favorites/:item_id", DeleteFavorite)
//
router.get("/customers/address/:id", GetAddressById)
router.get("/customers/:id/address", GetAllAddress)
router.post("/customers/:id/address", AddAddress)
router.patch("/customers/address/:id", UpdateAddress)
router.delete("/customers/address/:id", DeleteAddress)

export default router
