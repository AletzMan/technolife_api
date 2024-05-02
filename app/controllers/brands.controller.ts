import { Request, Response } from "express"
import {
	CreateRecord,
	DeleteRecordByID,
	QueryAllRecords,
	QueryRecordByID,
	UpdateRecordByID,
} from "../services/querys"
import { IBrand } from "../Interfaces/brand"
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
import { ZodError } from "zod"
import { brandSchema } from "../validations/brandSchema"
import { BuildQueryPagination } from "../services/BuildQueryPagination"
import { DatabaseError } from "pg"

export const GetBrands = async (req: Request, res: Response) => {
	try {
		const { count, limit, rows, page } = await BuildQueryPagination<IBrand>(
			req,
			["name"],
			"brands"
		)

		const totalPages = Math.ceil(count / limit)
		if (rows) {
			res.status(200).json(PaginationResponse(rows, Number(count), totalPages, page))
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

export const GetBrandById = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<IBrand>(id, "brands")
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

export const CreateBrand = async (req: Request, res: Response) => {
	try {
		const data = brandSchema.parse(req.body)
		const dateNow = new Date().toISOString()
		const result = await CreateRecord<IBrand>(
			"brands",
			{ name: data.name, logo: data.logo, created_date: dateNow },
			["name", "logo", "last_modified"]
		)
		if (result) {
			res.status(201).json(SuccessCreate(result))
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

export const UpdateBrand = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const data = await brandSchema.parseAsync(await req.body)
		const dateNow = new Date().toISOString()
		const result = await UpdateRecordByID(
			id,
			"brands",
			{ name: data.name, logo: data.logo, last_modified: dateNow },
			["name", "logo", "last_modified"]
		)
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

export const DeleteBrand = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await DeleteRecordByID<IBrand>(Number(id), "brands")
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

export const GetAllBrands = async (_req: Request, res: Response) => {
	try {
		const result = await QueryAllRecords<IBrand>("brands")
		//const items = result?.map((brand) => brand.name)

		if (result) {
			res.status(200).json(SuccessResponse(result))
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(ServerError())
	}
}
