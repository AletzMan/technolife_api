import { Request, Response } from "express"
import { IUser, OldPasswordType } from "../Interfaces/user"
import Cryptr from "cryptr"
import {
	CreateRecord,
	DeleteRecordByID,
	DeleteRecordByParams,
	QueryRecordByID,
	UpdateRecordByID,
} from "../services/querys"
import {
	PaginationResponse,
	SuccessCreate,
	SuccessDelete,
	SuccessResponse,
	SuccessUpdate,
} from "../services/successResponses"
import {
	ConflictError,
	NotFoundError,
	ServerError,
	UnprocessableEntityError,
} from "../services/errorResponses"
import { userNewSchema } from "../validations/userNewSchema"
import { ZodError } from "zod"
import { IFavorite } from "../Interfaces/favorite"
import { DatabaseError } from "pg"
import { passwordChangeSchema } from "../validations/passwordChangeSchema"
import { addressSchema } from "../validations/addressSchema"
import { IAddress } from "../Interfaces/address"
import { authorizationSchema } from "../validations/authorizationSchema"
import { useEditSchema } from "../validations/userEditSchema"
import { BuildQueryPagination } from "../services/BuildQueryPagination"
import { sign } from "../services/jwt_sign_verify"

const KEY_SECRET = process.env.KEY_SECRET_LOGIN as string
const crypt = new Cryptr(KEY_SECRET)
//-- USER ROUTE HANDLERS --//
export const GetCustomers = async (req: Request, res: Response) => {
	try {
		const { count, limit, rows, page } = await BuildQueryPagination<IUser>(
			req,
			["name", "lastname", "email"],
			"customers"
		)
		const totalPages = Math.ceil(count / limit)
		if (rows) {
			res.status(200).json(PaginationResponse(rows, Number(count), totalPages, page))
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(ServerError())
	}
}

export const GetCustomerById = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<IUser>(id, "customers")
		if (result.length > 0) {
			res.status(200).json(SuccessResponse(result[0]))
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

export const CreateCustomer = async (req: Request, res: Response) => {
	try {
		console.log(req.body)
		const data = userNewSchema.parse(req.body)
		const { confirmPassword, ...newData } = data
		const result = await CreateRecord<IUser>("customers", { ...newData, privileges: 0 }, [
			"name",
			"lastname",
			"email",
			"password",
			"privileges",
		])
		if (result) {
			const token = await sign(KEY_SECRET, KEY_SECRET, 30)
			/*const tokenSerialized = serialize("seccesfulRegister", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 30,
				path: "/",
			})*/

			res.cookie("seccesfulRegister", token, { maxAge: 30000, httpOnly: true })
			res.json(SuccessCreate(result))
		}
	} catch (error) {
		console.error(error)
		if (error instanceof ZodError) {
			res.status(422).json(UnprocessableEntityError(error.issues))
		} else if (error instanceof DatabaseError) {
			if (error.code === "23505") {
				res.status(409).json(ConflictError())
			}
		} else {
			res.status(500).json(ServerError())
		}
	}
}

export const UpdateCustomer = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const data = await useEditSchema.parseAsync(await req.body)
		const result = await UpdateRecordByID(id, "customers", data, [
			"name",
			"lastname",
			"datebirth",
			"phonenumber",
		])
		if (result) {
			res.status(200).json(SuccessUpdate(result))
		}
	} catch (error) {
		console.error(error)
		if (error instanceof ZodError) {
			res.status(422).json(UnprocessableEntityError(error.issues))
		} else {
			res.status(500).json(ServerError())
		}
	}
}

export const DeleteCustomer = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await DeleteRecordByID<IUser>(Number(id), "customers")
		if (result) {
			res.status(200).json(SuccessDelete())
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(ServerError())
	}
}

export const UpdatePassword = async (req: Request, res: Response) => {
	const { id } = req.params
	const data = await req.body
	try {
		const userToUpdate = await QueryRecordByID<IUser>(id, "customers")
		//----VALIDAR LOS CAMPOS QUE SON REQUERIDOS----//
		const userData = passwordChangeSchema.parse(data)
		const actualPassword = userToUpdate[0].password
		const PASSWORD_DECRYPT = crypt.decrypt(actualPassword)

		//----VALIDAR QUE EL PASSWORD ACTUAL COINCIDA CON EL DE LA DB----//
		if (PASSWORD_DECRYPT !== userData.currentPassword) {
			throw new ZodError([
				{
					code: "custom",
					message: "The password provided does not match the current password",
					path: ["currentPassword"],
				},
			])
		}
		if (userToUpdate.length > 0) {
			const currentPassword = userData.currentPassword

			//----VALIDAR SI EL PASSWORD ES IGUAL AL ACTUAL---//
			if (userData.newPassword === PASSWORD_DECRYPT) {
				throw new ZodError([
					{
						code: "custom",
						message: "Your current password and your new password are the same",
						path: ["passwordConfirm"],
					},
				])
			}

			//----DESCIFRAR LOS PASSWORDS ANTERIORES----//
			const oldPasswords = userToUpdate[0].oldpasswords
			if (oldPasswords.length > 0) {
				const oldPasswordsDecript: OldPasswordType[] = []
				userToUpdate[0].oldpasswords?.forEach((element, index) => {
					const passDecrypt = crypt.decrypt(element.password)
					console.log(passDecrypt, index)
					oldPasswordsDecript.push({ password: passDecrypt })
				})

				//----VALIDAR SI EL PASSWORD YA HA SIDO UTILIZADO----//
				if (
					oldPasswordsDecript.filter(
						(password) => password.password === userData.newPassword
					).length > 0
				) {
					throw new ZodError([
						{
							code: "custom",
							message: "The password provided has been used before",
							path: ["confirmNewPassword"],
						},
					])
				}
				//----ENCRIPTAR EL NUEVO PASSWORD Y LOS PASSWORDS ANTERIORES----//
			}
			const passwordCrypt = crypt.encrypt(userData.newPassword)

			const updateOldPasswords = oldPasswords
				? [...oldPasswords, { password: currentPassword }]
				: [{ password: currentPassword }]
			const oldPasswordsString = JSON.stringify(updateOldPasswords)

			const result = await UpdateRecordByID(
				userToUpdate[0].id,
				"customers",
				{ password: passwordCrypt, oldpasswords: oldPasswordsString },
				["password", "oldpasswords"]
			)
			if (result) {
				res.status(200).json(SuccessUpdate(result))
			} else {
				res.status(NotFoundError().status).json(NotFoundError().data)
			}
		}
	} catch (error) {
		console.error(error)
		if (error instanceof ZodError) {
			res.status(422).json(UnprocessableEntityError(error))
		} else {
			res.status(500).json(ServerError())
		}
	}
}

// -- USER AUTHORIZATION LOGIN ROUTE HANDLR -- //
export const AuthorizationLogin = async (req: Request, res: Response) => {
	try {
		const credentials = await req.body
		authorizationSchema.parse(credentials)
		const result = await QueryRecordByID<IUser>(credentials.email, "customers", "email")
		if (result.length > 0) {
			if (crypt.decrypt(result[0].password) === credentials.password) {
				res.status(200).json(
					SuccessResponse({
						id: result[0].id,
						name: result[0].name,
						email: result[0].email,
						password: "",
					})
				)
			} else {
				const zodError: ZodError = new ZodError([
					{
						code: "custom",
						message: "The email and password do not match",
						path: ["password"],
					},
				])
				res.status(422).json(UnprocessableEntityError(zodError.issues))
			}
		} else {
			res.status(404).json(NotFoundError())
		}
	} catch (error) {
		console.error(error)
		if (error instanceof ZodError) {
			res.status(422).json(UnprocessableEntityError(error.issues))
		} else {
			res.status(500).json(ServerError())
		}
	}
}

// -- USER FAVORITES ROUTE HANDLRES -- //
export const GetFavorites = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<IFavorite>(id, "favorites", "user_id")
		if (result) {
			res.status(200).json(SuccessResponse(result))
		} else {
			res.status(404).json(SuccessResponse(result))
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

export const AddFavorite = async (req: Request, res: Response) => {
	const { id } = req.params
	const item = req.body
	try {
		const result = await CreateRecord("favorites", { user_id: id, item_id: item.item_id }, [
			"user_id",
			"item_id",
		])
		if (result) {
			res.status(201).json(SuccessCreate(result))
		}
	} catch (error) {
		console.error(error)
		if (error instanceof DatabaseError) {
			if (error.code === "23502") {
				const errorNull = new ZodError([
					{
						code: "custom",
						message: "A required field is missing",
						path: [error.column || ""],
					},
				])
				res.status(422).json(UnprocessableEntityError(errorNull))
			}
		} else {
			res.status(500).json(ServerError())
		}
	}
}

export const DeleteAllFavorites = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await DeleteRecordByID(Number(id), "favorites", "user_id")

		if (result) {
			res.status(200).json(SuccessResponse(result))
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

export const DeleteFavorite = async (req: Request, res: Response) => {
	const { id, item_id } = req.params
	try {
		const result = await DeleteRecordByParams([id, item_id], "favorites", [
			"user_id",
			"item_id",
		])

		if (result) {
			res.status(200).json(SuccessResponse(result))
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

// -- USER ADDRESS ROUTE HANDLERS -- //
export const GetAddressById = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<IAddress>(id, "shipping_address")
		if (result.length > 0) {
			res.status(200).json(SuccessResponse(result[0]))
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

export const GetAllAddress = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<IAddress>(id, "shipping_address", "user_id")
		if (result) {
			res.status(200).json(SuccessResponse(result))
		} else {
			res.status(200).json(SuccessResponse([]))
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

export const AddAddress = async (req: Request, res: Response) => {
	try {
		const data = req.body
		console.log("DATA ADD", data)
		const addressData = addressSchema.parse(data)
		const result = await CreateRecord<IAddress>("shipping_address", addressData, [
			"user_id",
			"name",
			"last_name",
			"phone_number",
			"street_name",
			"street_number",
			"postal_code",
			"colonia",
			"city",
			"state",
		])
		if (result) {
			res.status(201).json(SuccessCreate(result))
		}
	} catch (error) {
		console.error(error)
		if (error instanceof ZodError) {
			res.status(422).json(UnprocessableEntityError(error.issues))
		} else {
			res.status(500).json(ServerError())
		}
	}
}

export const UpdateAddress = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const data = req.body
		const addressData = addressSchema.parse(data)
		const result = await UpdateRecordByID<IAddress>(id, "shipping_address", addressData, [
			"user_id",
			"name",
			"last_name",
			"phone_number",
			"street_name",
			"street_number",
			"postal_code",
			"colonia",
			"city",
			"state",
		])
		console.log(result)
		if (result) {
			res.status(200).json(SuccessUpdate(result))
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.error(error)
		if (error instanceof ZodError) {
			res.status(422).json(UnprocessableEntityError(error.issues))
		} else {
			res.status(500).json(ServerError())
		}
	}
}

export const DeleteAddress = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await DeleteRecordByID<IAddress>(id, "shipping_address")

		if (result) {
			res.status(200).json(SuccessResponse(result))
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}
