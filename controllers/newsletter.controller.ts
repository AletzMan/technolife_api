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
			res.status(200).json(PaginationResponse(rows, Number(count), totalPages, page))
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
				res.status(200).json(SuccessCreate(result))
			}
		}
	} catch (error) {
		console.error(error)
		if (error instanceof ZodError) {
			res.status(422).json(UnprocessableEntityError(error))
		} else if (error instanceof DatabaseError) {
			if (error.code === "23505") {
				res.status(409).json(ConflictError())
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
			res.status(200).json(SuccessDelete())
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(ServerError())
	}
}
