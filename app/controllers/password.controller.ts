import { Request, Response } from "express"
import { emailSchema } from "../validations/emailSchema"
import { ZodError } from "zod"
import {
	GoneError,
	NotFoundError,
	ServerError,
	UnprocessableEntityError,
} from "../services/errorResponses"
import { QueryRecordByID, UpdateRecordByID, UpdateRecordByParams } from "../services/querys"
import { IUser, OldPasswordType } from "../Interfaces/user"
import { SuccessResponse, SuccessUpdate } from "../services/successResponses"
import { sign, verify } from "../services/jwt_sign_verify"
import { SendMailPasswordReset } from "../services/mailer/mailer"
import Cryptr from "cryptr"
import { newPasswordSchema } from "../validations/newPasswordSchema"

const KEY_SECRET = process.env.KEY_SECRET_LOGIN as string
const crypt = new Cryptr(KEY_SECRET)

export const ResetPassword = async (req: Request, res: Response) => {
	try {
		const email = await req.body
		console.log(email)
		const emailValidate = emailSchema.parse(email)
		console.log(emailValidate)

		const resultUser = await QueryRecordByID<IUser>(emailValidate.email, "customers", "email")
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
				"customers",
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
		//console.log(req.headers.authorization?.split(" ")[1])
		const { email } = await req.body
		const emailDecrypt = crypt.decrypt(email)

		const resultUser = await QueryRecordByID<IUser>(emailDecrypt, "customers", "email")
		if (resultUser[0]) {
			await verify(resultUser[0].token_reset_password as string, KEY_SECRET)
			res.status(200).json(SuccessResponse(resultUser[0].name))
		} else {
			res.status(410).json(GoneError())
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

export const UpdateRestorePassword = async (req: Request, res: Response) => {
	try {
		const newPasswords = req.body

		const data = newPasswordSchema.parse(newPasswords)
		const emailDecrypt = crypt.decrypt(data.email)

		const response = await QueryRecordByID<IUser>(emailDecrypt, "customers", "email")

		if (response.length > 0) {
			const userData: IUser = response[0]

			const currentPassword = userData.password

			const PASSWORD_DECRYPT = crypt.decrypt(currentPassword)

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
			const oldPasswords = userData.oldpasswords
			if (oldPasswords) {
				const oldPasswordsDecript: OldPasswordType[] = []
				userData.oldpasswords?.forEach((element) => {
					const passDecrypt = crypt.decrypt(element.password)
					oldPasswordsDecript.push({ password: passDecrypt })
				})

				//----VALIDAR SI EL PASSWORD YA HA SIDO UTILIZADO----//
				if (
					oldPasswordsDecript.filter(
						(password) => password.password === userData.password
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
				userData.id,
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

/*
export async function PATCH(req: NextRequest) {
	const { name, email, newPasswords } = await req.json()
	const crypt = new Cryptr(KEY_SECRET)
  
	//----VALIDACION DE LA API KEY----//
	const authorization = req.headers.get("authorization")?.split(" ")[1] as string
	if (authorization !== PASSWORD) {
	  return NextResponse.json(
		{
		  error: "access_forbidden",
		  message: "You must be granted a valid key",
		},
		{ status: 403 }
	  )
	}
  
	try {
	  const emailDecrypt = crypt.decrypt(email as string)
  
	  //OBTENER EL PASSWORD ACTUAL Y LOS ANTERIORES PARA VALIDAR QUE NO VUELVAN A CREARSE
	  const UserData = async () => {
		const response = await pool.query(`SELECT password, oldpasswords FROM  users WHERE email=?`, [
		  emailDecrypt,
		])
		return response
	  }
	  const userData = (await UserData()) as RowDataPacket[][]
	  const oldPasswords = userData[0][0].oldpasswords
	  const currentPassword = userData[0][0].password
  
	  //DECIFRAR EL VALOR DEL PASSWORD ACTUAL Y LOS ANTERIORES
	  const currentPasswordDecrypt = crypt.decrypt(currentPassword as string)
	  const oldPasswordsDecript = [] as PasswordType[]
  
	  ;(oldPasswords as PasswordType[])?.forEach((element) => {
		const passDecrypt = crypt.decrypt(element.password)
		oldPasswordsDecript.push({ password: passDecrypt })
	  })
  
	  //VALIDACION DEL PASSWORD
	  if (newPasswords.password === "" || newPasswords.passwordConfirm === "") {
		return NextResponse.json(
		  {
			error: "missing_field",
			message: "This field is required.",
			fieldError: [
			  newPasswords.password === "" ? "password" : "",
			  newPasswords.passwordConfirm === "" ? "passwordConfirm" : "",
			],
		  },
		  { status: 400 }
		)
	  }
	  if (newPasswords.password !== newPasswords.passwordConfirm) {
		return NextResponse.json(
		  {
			error: "password_mismatch",
			message: "Password and password confirmation do not matches",
			fieldError: ["password", "passwordConfirm"],
		  },
		  { status: 400 }
		)
	  }
	  if (!IsValidPassword(newPasswords.password) || !IsValidPassword(newPasswords.passwordConfirm)) {
		return NextResponse.json(
		  {
			error: "invalid_password",
			message: "The password does not meet the security requirements.",
			fieldError: [
			  !IsValidPassword(newPasswords.password) ? "password" : "",
			  !IsValidPassword(newPasswords.passwordConfirm) ? "passwordConfirm" : "",
			],
		  },
		  { status: 400 }
		)
	  }
	  if (newPasswords.password === currentPasswordDecrypt) {
		return NextResponse.json(
		  {
			error: "password_already_used",
			message: "The password provided has been used before",
			fieldError: ["password", "passwordConfirm"],
		  },
		  { status: 409 }
		)
	  }
	  if (
		oldPasswordsDecript.filter((password) => password.password === newPasswords.password).length >
		0
	  ) {
		return NextResponse.json(
		  {
			error: "password_already_used",
			message: "The password provided has been used before",
			fieldError: ["password", "passwordConfirm"],
		  },
		  { status: 409 }
		)
	  }
  
	  //ENCRIPTAR EL PASSWORD ACTUAL Y LOS PASSWORDS ANTIGUOS
	  const newPasswordEncryp = crypt.encrypt(newPasswords.password)
	  oldPasswords.push({ password: crypt.encrypt(newPasswords.password) })
	  const oldPasswordsString = JSON.stringify(oldPasswords)
  
	  //ACTUALIZAR EL PASSWORD Y LOS PASWORDS ANTIGUOS, Y ELIMINAR EL TOKEN DE RESET PARA QUE NO VUELVA A REAUTILIZARSE
	  const SearchUser = async () => {
		const response = await pool.query(
		  `UPDATE users SET password=?, oldpasswords=?, token_reset_password=? WHERE email=?`,
		  [newPasswordEncryp, oldPasswordsString, "", emailDecrypt]
		)
		return response
	  }
	  const result = (await SearchUser()) as ResultSetHeader[]
  
	  return NextResponse.json(
		{
		  type: "succes",
		  message: "Password successfully changed!",
		},
		{ status: 200 }
	  )
	} catch (error) {
	  console.error(error)
	  return NextResponse.json({ error: error }, { status: 500 })
	}
  }
*/
