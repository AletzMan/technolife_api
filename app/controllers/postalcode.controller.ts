import { Request, Response } from "express"
import { NotFoundError } from "../services/errorResponses"
import { SuccessResponse } from "../services/successResponses"
import dotenv from "dotenv"

dotenv.config()

const URL_DIPOMEX_API = "https://api.tau.com.mx/dipomex/v1/"
const API_KEY = process.env.DIPOMEX_API as string

export const GetPostalCode = async (req: Request, res: Response) => {
	const { postalcode } = req.query
	console.log(postalcode)
	try {
		const response = await fetch(`${URL_DIPOMEX_API}codigo_postal?cp=${postalcode}`, {
			method: "GET",
			headers: {
				APIKEY: API_KEY,
			},
		})
		console.log(response)
		const data = await response.json()
		res.status(200).json(SuccessResponse(data.codigo_postal))
	} catch (error) {
		console.error(error)
		res.status(400).json(NotFoundError())
	}
}
