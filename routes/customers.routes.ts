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

/**
 * @swagger
 * tags:
 *   - name: Customers
 *     description: Endpoints for managing customers
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Retrieve a list of customers
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the customer to retrieve.
 *     responses:
 *       200:
 *         description: A single customer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
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
 *         description: Customer not found.
 */
router.get("/customers", GetCustomers)

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Retrieve a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: A single customer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not registered.
 */
router.get("/customers/:id", GetCustomerById)

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       201:
 *         description: The created customer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       422:
 *         description: Unprocessable Entity Error.
 */
router.post("/customers", CreateCustomer)

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
 *     responses:
 *       204:
 *         description: Customer deleted successfully.
 *       404:
 *         description: Customer not registered.
 */
router.delete("/customers/:id", DeleteCustomer)

/**
 * @swagger
 * /api/customers/{id}:
 *   patch:
 *     summary: Update a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerUpdate'
 *     responses:
 *       200:
 *         description: Customer updated successfully.
 *       422:
 *         description: Unprocessable Entity Error.
 *       404:
 *         description: Customer not registered.
 */
router.patch("/customers/:id", UpdateCustomer)

/**
 * @swagger
 * /api/customers/{id}/password:
 *   patch:
 *     summary: Update password of a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
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
 *         description: Customer not registered.
 */
router.patch("/customers/:id/password", UpdatePassword)

/**
 * @swagger
 * /api/customers/authorization:
 *   post:
 *     summary: Customer authorization and login
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Customer authorized successfully.
 *       422:
 *         description: Unprocessable Entity Error.
 *       404:
 *         description: Customer not registered.
 */
router.post("/customers/authorization", AuthorizationLogin)

/**
 * @swagger
 * /api/customers/{id}/favorites:
 *   get:
 *     summary: Get favorites of a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: Customer favorites retrieved successfully.
 *       404:
 *         description: Customer not found.
 */
router.get("/customers/:id/favorites", GetFavorites)

/**
 * @swagger
 * /api/customers/{id}/favorites:
 *   post:
 *     summary: Add a favorite for a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
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
 *         description: Customer not found.
 */
router.post("/customers/:id/favorites", AddFavorite)

/**
 * @swagger
 * /api/customers/{id}/favorites:
 *   delete:
 *     summary: Delete all favorites of a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
 *     responses:
 *       204:
 *         description: All favorites deleted successfully.
 *       404:
 *         description: Customer not found.
 */
router.delete("/customers/:id/favorites", DeleteAllFavorites)

/**
 * @swagger
 * /api/customers/{id}/favorites/{item_id}:
 *   delete:
 *     summary: Delete a favorite of a customer by ID and item ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
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
router.delete("/customers/:id/favorites/:item_id", DeleteFavorite)

/**
 * @swagger
 * /api/customers/address/{id}:
 *   get:
 *     summary: Get an address by ID
 *     tags: [Customers]
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
 *         description: Address or customer not found.
 */
router.get("/customers/address/:id", GetAddressById)

/**
 * @swagger
 * /api/customers/{id}/address:
 *   get:
 *     summary: Get all addresses of a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
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
router.get("/customers/:id/address", GetAllAddress)

/**
 * @swagger
 * /api/customers/{id}/address:
 *   post:
 *     summary: Add a new address for a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer ID
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
 *         description: Customer not found.
 */
router.post("/customers/:id/address", AddAddress)

/**
 * @swagger
 * /api/customers/address/{id}:
 *   patch:
 *     summary: Update an address by ID
 *     tags: [Customers]
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
router.patch("/customers/address/:id", UpdateAddress)

/**
 * @swagger
 * /api/customers/address/{id}:
 *   delete:
 *     summary: Delete an address by ID
 *     tags: [Customers]
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
router.delete("/customers/address/:id", DeleteAddress)

export default router
