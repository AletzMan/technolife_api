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

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints for managing users
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               example1:
 *                 value:
 *                   id: 1
 *                   name: John
 *                   lastname: Doe
 *                   email: john.doe@example.com
 *                   password: hashedpassword
 *                   oldpasswords:
 *                     - password: oldhashedpassword1
 *                     - password: oldhashedpassword2
 *                   token_reset_password: resettoken123
 *                   privileges: 1
 *                   datebirth: 1990-01-01
 *                   phonenumber: 123456789
 *                   favorites:
 *                     - favorite1
 *                     - favorite2
 *       404:
 *         description: User not found.
 */
router.get("/users", GetUsers)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not registered.
 */
router.get("/users/:id", GetUserById)

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       422:
 *         description: Unprocessable Entity Error.
 */
router.post("/users", CreateUser)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not registered.
 */
router.delete("/users/:id", DeleteUser)

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       422:
 *         description: Unprocessable Entity Error.
 *       404:
 *         description: User not registered.
 */
router.patch("/users/:id", UpdateUser)

/**
 * @swagger
 * /api/users/{id}/password:
 *   patch:
 *     summary: Update password of a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordUpdate'
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       422:
 *         description: Unprocessable Entity Error.
 *       404:
 *         description: User not registered.
 */
router.patch("/users/:id/password", UpdatePassword)

/**
 * @swagger
 * /api/users/authorization:
 *   post:
 *     summary: User authorization and login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User authorized successfully.
 *       422:
 *         description: Unprocessable Entity Error.
 *       404:
 *         description: User not registered.
 */
router.post("/users/authorization", AuthorizationLogin)

/**
 * @swagger
 * /api/users/{id}/favorites:
 *   get:
 *     summary: Get favorites of a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User favorites retrieved successfully.
 *       404:
 *         description: User not found.
 */
router.get("/users/:id/favorites", GetFavorites)

/**
 * @swagger
 * /api/users/{id}/favorites:
 *   post:
 *     summary: Add a favorite for a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteInput'
 *     responses:
 *       201:
 *         description: Favorite added successfully.
 *       422:
 *         description: Unprocessable Entity Error.
 *       404:
 *         description: User not found.
 */
router.post("/users/:id/favorites", AddFavorite)

/**
 * @swagger
 * /api/users/{id}/favorites:
 *   delete:
 *     summary: Delete all favorites of a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       204:
 *         description: All favorites deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete("/users/:id/favorites", DeleteAllFavorites)

/**
 * @swagger
 * /api/users/{id}/favorites/{item_id}:
 *   delete:
 *     summary: Delete a favorite of a user by ID and item ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       204:
 *         description: Favorite deleted successfully.
 *       404:
 *         description: Favorite id not found.
 */
router.delete("/users/:id/favorites/:item_id", DeleteFavorite)

/**
 * @swagger
 * /api/users/address/{id}:
 *   get:
 *     summary: Get an address by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address ID
 *     responses:
 *       200:
 *         description: A single address.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Address or user not found.
 */
router.get("/users/address/:id", GetAddressById)

/**
 * @swagger
 * /api/users/{id}/address:
 *   get:
 *     summary: Get all addresses of a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of addresses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *       404:
 *         description: Address not found.
 */
router.get("/users/:id/address", GetAllAddress)

/**
 * @swagger
 * /api/users/{id}/address:
 *   post:
 *     summary: Add a new address for a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressInput'
 *     responses:
 *       201:
 *         description: The created address.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: User not found.
 */
router.post("/users/:id/address", AddAddress)

/**
 * @swagger
 * /api/users/address/{id}:
 *   patch:
 *     summary: Update an address by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressUpdate'
 *     responses:
 *       200:
 *         description: Address updated successfully.
 *       404:
 *         description: Address not found.
 */
router.patch("/users/address/:id", UpdateAddress)

/**
 * @swagger
 * /api/users/address/{id}:
 *   delete:
 *     summary: Delete an address by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address ID
 *     responses:
 *       204:
 *         description: Address deleted successfully.
 *       404:
 *         description: Address not found.
 */
router.delete("/users/address/:id", DeleteAddress)

export default router
