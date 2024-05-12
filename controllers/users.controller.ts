import { Request, Response } from "express"
import { IUser, OldPasswordType } from "../Interfaces/user"
import Cryptr from "cryptr"
import {
	CreateRecord,
	DeleteRecordByID,
	DeleteRecordByParams,
	QueryAllRecords,
	QueryRecordByID,
	UpdateRecordByID,
} from "../services/querys"
import {
	SuccessCreate,
	SuccessDelete,
	SuccessResponse,
	SuccessUpdate,
} from "../services/successResponses"
import { NotFoundError, ServerError, UnprocessableEntityError } from "../services/errorResponses"
import { userNewSchema } from "../validations/userNewSchema"
import { ZodError } from "zod"
import { IFavorite } from "../Interfaces/favorite"
import { DatabaseError } from "pg"
import { passwordChangeSchema } from "../validations/passwordChangeSchema"
import { addressSchema } from "../validations/addressSchema"
import { IAddress } from "../Interfaces/address"
import { authorizationSchema } from "../validations/authorizationSchema"
import { useEditSchema } from "../validations/userEditSchema"

const KEY_SECRET = process.env.KEY_SECRET_LOGIN as string
const crypt = new Cryptr(KEY_SECRET)
//-- USER ROUTE HANDLERS --//
export const GetUsers = async (req: Request<{}, {}, {}, IUser>, res: Response) => {
	try {
		const result = await QueryAllRecords<IUser>("users", req)
		if (result) {
			res.status(200).json(SuccessResponse(result))
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(ServerError())
	}
}

export const GetUserById = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<IUser>(id, "users")
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

export const CreateUser = async (req: Request, res: Response) => {
	try {
		const userData = userNewSchema.parse(req.body)
		const result = await CreateRecord<IUser>("users", userData, [
			"name",
			"lastname",
			"email",
			"password",
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

export const UpdateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const userData = await useEditSchema.parseAsync(await req.body)
		const result = await UpdateRecordByID(id, "users", userData, [
			"name",
			"lastname",
			"datebirth",
			"phonenumber",
		])
		const user = await QueryRecordByID<IUser>(id, "users")
		if (result) {
			res.status(200).json(SuccessUpdate(user[0]))
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

export const DeleteUser = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await DeleteRecordByID<IUser>(Number(id), "users")
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
		const userToUpdate = await QueryRecordByID<IUser>(id, "users")
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
			if (data.password === PASSWORD_DECRYPT) {
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
			if (oldPasswords) {
				const oldPasswordsDecript: OldPasswordType[] = []
				userToUpdate[0].oldpasswords?.forEach((element) => {
					const passDecrypt = crypt.decrypt(element.password)
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
			const passwordCrypt = crypt.encrypt(data.password)

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
		const result = await QueryRecordByID<IUser>(credentials.email, "users", "email")
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

export const GetAllAddress = async (_req: Request, res: Response) => {
	try {
		const result = await QueryAllRecords<IAddress>("shipping_address")
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
		const { deliveryAddress } = req.body
		const { id } = req.params
		const addressData = addressSchema.parse(deliveryAddress)

		const result = await CreateRecord<IAddress>(
			"shipping_address",
			{ ...addressData, user_id: id },
			[
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
			]
		)
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
		const { deliveryAddress } = req.body

		const addressData = addressSchema.parse(deliveryAddress)
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
