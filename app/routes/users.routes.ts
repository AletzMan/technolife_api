import { Router } from "express"
import {
	CreateUser,
	GetUsers,
	GetUserById,
	DeleteUser,
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
	UpdateUser,
} from "../controllers/users.controller"

const router = Router()

router.get("/users", GetUsers)
router.get("/users/:id", GetUserById)
router.post("/users", CreateUser)
router.delete("/users/:id", DeleteUser)
router.patch("/users/:id", UpdateUser)
router.patch("/users/:id/password", UpdatePassword)
//
router.post("/users/authorization", AuthorizationLogin)
//
router.get("/users/:id/favorites", GetFavorites)
router.post("/users/:id/favorites", AddFavorite)
router.delete("/users/:id/favorites", DeleteAllFavorites)
router.delete("/users/:id/favorites/:item_id", DeleteFavorite)
//
router.get("/users/address/:id", GetAddressById)
router.get("/users/:id/address", GetAllAddress)
router.post("/users/:id/address", AddAddress)
router.patch("/users/address/:id", UpdateAddress)
router.delete("/users/address/:id", DeleteAddress)

export default router
