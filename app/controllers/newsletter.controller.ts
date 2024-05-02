//import { INewsletter } from "../Interfaces/newsletter"
import { Request, Response } from "express"
import { PaginationResponse, SuccessCreate, SuccessDelete } from "../services/successResponses"
import {
	ConflictError,
	NotFoundError,
	ServerError,
	UnprocessableEntityError,
} from "../services/errorResponses"
import { BuildQueryPagination } from "../services/BuildQueryPagination"
import { CreateRecord, DeleteRecordByID } from "../services/querys"
import { INewsletter } from "../Interfaces/newsletter"
import { newsLetterSchema } from "../validations/newsletterSchema"
import { SendMailNewsletter } from "../services/mailer/mailer"
import { DatabaseError } from "pg"
import { ZodError } from "zod"

export const GetNewsLetters = async (req: Request, res: Response) => {
	try {
		const { count, limit, page, rows } = await BuildQueryPagination(
			req,
			["email", "register_date"],
			"newsletters"
		)
		const totalPages = Math.ceil(count / limit)
		if (rows) {
			res.json(PaginationResponse(rows, Number(count), totalPages, page)).status(200)
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(ServerError())
	}
}

export const CreateNewsletter = async (req: Request, res: Response) => {
	try {
		const data = await req.body

		const emailData = newsLetterSchema.parse(data)

		const ACTUAL_DATE = new Date().toISOString().slice(0, 19).replace("T", " ")
		const result = await CreateRecord<INewsletter>(
			"newsletters",
			{ email: emailData.email, registerdate: ACTUAL_DATE },
			["email", "register_date"]
		)

		if (result) {
			const response = await SendMailNewsletter(emailData.email)
			console.log(response)
			if (response.length > 0) {
				res.json(SuccessCreate(result)).status(200)
			}
		}
	} catch (error) {
		console.error(error)
		if (error instanceof ZodError) {
			res.json(UnprocessableEntityError(error)).status(422)
		} else if (error instanceof DatabaseError) {
			if (error.code === "23505") {
				res.json(ConflictError()).status(409)
			}
		} else {
			res.status(500).json(ServerError())
		}
	}
}

export const DeleteNewsletter = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await DeleteRecordByID<INewsletter>(Number(id), "newsletters")
		if (result) {
			res.json(SuccessDelete()).status(200)
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(ServerError())
	}
}
