import { Request, Response } from "express"
import { emailSchema } from "../validations/emailSchema"
import { ZodError } from "zod"
import { NotFoundError, ServerError, UnprocessableEntityError } from "../services/errorResponses"
import { QueryRecordByID, UpdateRecordByParams } from "../services/querys"
import { IUser } from "../Interfaces/user"
import { SuccessResponse } from "../services/successResponses"
import { sign, verify } from "../services/jwt_sign_verify"
import { SendMailPasswordReset } from "../services/mailer/mailer"
import Cryptr from "cryptr"

const KEY_SECRET = process.env.KEY_SECRET_LOGIN as string
const crypt = new Cryptr(KEY_SECRET)

export const ResetPassword = async (req: Request, res: Response) => {
	try {
		const email = await req.body
		console.log(email)
		const emailValidate = emailSchema.parse(email)
		console.log(emailValidate)

		const resultUser = await QueryRecordByID<IUser>(emailValidate.email, "users", "email")
		console.log(resultUser[0])
		if (resultUser[0]) {
			const token = await sign(emailValidate.email, KEY_SECRET, 900)
			const responseSendMail = await SendMailPasswordReset(
				resultUser[0].email,
				resultUser[0].name,
				resultUser[0].password,
				token
			)
			console.log(responseSendMail)
			const responseToken = await UpdateRecordByParams(
				["email"],
				[resultUser[0].email],
				"users",
				{ token_reset_password: token },
				["token_reset_password"]
			)
			if (responseToken) {
				res.json(SuccessResponse({ message: "Mail has been sent" })).status(200)
			}
		} else {
			res.json(NotFoundError()).status(404)
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

export const RestorePassword = async (req: Request, res: Response) => {
	try {
		const { email } = await req.body
		const emailDecrypt = crypt.decrypt(email)

		const resultUser = await QueryRecordByID<IUser>(emailDecrypt, "users", "email")
		if (resultUser[0]) {
			await verify(resultUser[0].token_reset_password as string, KEY_SECRET)
			res.status(200).json(SuccessResponse(resultUser[0].name))
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}
