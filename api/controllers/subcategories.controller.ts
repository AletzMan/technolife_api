import { Request, Response } from "express"
import { ISubCategory } from "../Interfaces/subcategory"
import {
	CreateRecord,
	DeleteRecordByID,
	QueryAllRecords,
	QueryRecordByID,
} from "../services/querys"
import { SuccessCreate, SuccessDelete, SuccessResponse } from "../services/successResponses"
import { NotFoundError, ServerError, UnprocessableEntityError } from "../services/errorResponses"
import { ZodError } from "zod"
import { subCategorySchema } from "../validations/subCategorySchema"

export const GetAllSubCategories = async (
	req: Request<{}, {}, {}, ISubCategory>,
	res: Response
) => {
	try {
		const result = await QueryAllRecords<ISubCategory>("subcategories", req)
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

export const GetSubCategory = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<ISubCategory>(id, "subcategories")
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

export const CreateSubCategory = async (req: Request, res: Response) => {
	try {
		const userData = subCategorySchema.parse(req.body)
		const result = await CreateRecord<ISubCategory>("subcategories", userData, [
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

export const DeleteSubCategory = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await DeleteRecordByID<ISubCategory>(Number(id), "subcategories")
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
