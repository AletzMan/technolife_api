import { Request, Response } from "express"
import { INewOrder, IOrder } from "../Interfaces/order"
import {
	PaginationResponseOrders,
	SuccessCreate,
	SuccessResponse,
} from "../services/successResponses"
import { NotFoundError, ServerError, UnprocessableEntityError } from "../services/errorResponses"
import { BuildQueryPaginationOrders } from "../services/BuildQueryPagination"
import { CreateRecord, QueryRecordByID, TotalRecords, UpdateRecordByID } from "../services/querys"
import { ZodError } from "zod"

export const GetOrders = async (req: Request, res: Response) => {
	try {
		const { count, limit, rows, page, on_the_way, pending, delivered, cancelled } =
			await BuildQueryPaginationOrders<IOrder>(req, [""], "orders")
		const totalPages = Math.ceil(count / limit)
		if (rows) {
			res.status(200).json(
				PaginationResponseOrders(
					rows,
					Number(count),
					totalPages,
					page,
					on_the_way,
					pending,
					delivered,
					cancelled
				)
			)
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(ServerError())
	}
}

export const GetOrderDetails = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<IOrder>(id, "order_details", "order_id")
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

export const UpdateOrder = async (req: Request, res: Response) => {
	const { id } = req.params
	const data = req.body
	console.log(data.state)
	try {
		const result = await UpdateRecordByID(id, "orders", { state: data.state }, ["state"])
		if (result) {
			res.status(200).json(SuccessResponse({}))
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

export const TotalOrders = async (_req: Request, res: Response) => {
	//const { customer_id } = req.query
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

export const CreateOrder = async (req: Request, res: Response) => {
	try {
		const data = req.body as INewOrder
		const ACTUAL_DATE = new Date().toISOString().slice(0, 19).replace("T", " ")
		const newData = {
			order_id: data.order_id,
			user_id: data.user_id,
			creation_date: ACTUAL_DATE,
			address_id: data.address.id,
			total_price: data.total_price,
			name: data.name,
		}

		const result = await CreateRecord<IOrder>("orders", newData, [
			"order_id",
			"user_id",
			"creation_date",
			"address_id",
			"total_price",
			"name",
		])
		if (result) {
			let resultDetails = false
			for (let index = 0; index < data.products.length; index++) {
				const dataDetails = {
					order_id: data.order_id,
					item_id: data.products[index].product.sku,
					quantity: data.products[index].quantity,
					unit_price: data.products[index].product.price,
					title: data.products[index].product.title,
				}
				resultDetails = await CreateRecord("order_details", dataDetails, [
					"order_id",
					"item_id",
					"quantity",
					"unit_price",
					"title",
				])
			}
			if (resultDetails) {
			}
		}

		res.status(201).json(SuccessCreate([]))
	} catch (error) {
		console.error(error)
		if (error instanceof ZodError) {
			res.status(422).json(UnprocessableEntityError(error.issues))
		} else {
			res.status(500).json(ServerError())
		}
	}
}
