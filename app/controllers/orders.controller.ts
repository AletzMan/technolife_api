import { Request, Response } from "express"
import { IOrder } from "../Interfaces/order"
import { PaginationResponse, SuccessResponse } from "../services/successResponses"
import { NotFoundError, ServerError } from "../services/errorResponses"
import { BuildQueryPagination } from "../services/BuildQueryPagination"
import { QueryRecordByID, TotalRecords } from "../services/querys"

export const GetOrders = async (req: Request, res: Response) => {
	try {
		const { count, limit, rows, page } = await BuildQueryPagination<IOrder>(req, [""], "orders")
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

export const GetOrderById = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<IOrder>(id, "orders")
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

export const TotalOrders = async (req: Request, res: Response) => {
	const { customer_id } = req.query
	console.log(customer_id)
	try {
		const result = await TotalRecords("orders")

		if (result) {
			res.status(200).json(SuccessResponse(result))
		} else {
			res.status(200).json(SuccessResponse(0))
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(ServerError())
	}
}
