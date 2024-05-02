import { Request, Response } from "express"
import { SuccessResponse } from "../services/successResponses"
import {
	BadRequestError,
	NotAuthorizedError,
	ServerError,
	UnprocessableEntityError,
} from "../services/errorResponses"
import dotenv from "dotenv"
import { phoneSchema } from "../validations/phoneSchema"
import { ZodError } from "zod"

dotenv.config()

const BOT_ID = process.env.BOT_ID_WHATSAPP
//const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER
const TOKEN_WHATSAPP = process.env.TOKEN_WHATSAPP
const URL = "https://graph.facebook.com/v18.0/" + BOT_ID + "/messages"

const headers = {
	Authorization: `Bearer ${TOKEN_WHATSAPP}`,
	"Content-Type": "application/json",
}

export const SendMessage = async (req: Request, res: Response) => {
	try {
		const userData = await phoneSchema.parseAsync(await req.body)

		const PHONE_NUMBER = userData.phoneNumber
		const data = {
			messaging_product: "whatsapp",
			to: PHONE_NUMBER,
			type: "template",
			template: {
				name: "hello_world",
				language: {
					code: "en_US",
				},
			},
		}

		const response = await fetch(URL, {
			method: "POST",
			headers,
			body: JSON.stringify(data),
		})

		if (response.status === 200) {
			res.status(200).json(SuccessResponse(await response.json()))
		} else if (response?.status === 400) {
			res.status(400).json(BadRequestError())
		} else if (response?.status === 401) {
			res.status(401).json(NotAuthorizedError())
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
