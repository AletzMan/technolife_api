import { Request, Response } from "express"
import {
	CreateRecord,
	DeleteRecordByID,
	QueryAllRecords,
	QueryRecordByID,
} from "../services/querys"
import { SuccessCreate, SuccessDelete, SuccessResponse } from "../services/successResponses"
import { NotFoundError, ServerError, UnprocessableEntityError } from "../services/errorResponses"
import { ZodError } from "zod"
import { ICategory } from "../Interfaces/categories"
import { categorySchema } from "../validations/categorySchema"

export const GetAllCategories = async (req: Request<{}, {}, {}, ICategory>, res: Response) => {
	try {
		const result = await QueryAllRecords<ICategory>("categories", req)
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

export const GetCategory = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<ICategory>(id, "categories")
		if (result.length > 0) {
			res.status(200).json(SuccessResponse(result))
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

export const CreateCategory = async (req: Request, res: Response) => {
	try {
		const userData = categorySchema.parse(req.body)
		const result = await CreateRecord<ICategory>("categories", userData, [
			"category_id",
			"name",
			"name_abbr",
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

export const DeleteCategory = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await DeleteRecordByID<ICategory>(Number(id), "categories")
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
