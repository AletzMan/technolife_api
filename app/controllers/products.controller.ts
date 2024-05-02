import { Request, Response } from "express"
import { BuildQueryPaginationProducts } from "../services/BuildQueryPagination"
import { IProduct, IProductNew } from "../Interfaces/product"
import { NotFoundError, ServerError, UnprocessableEntityError } from "../services/errorResponses"
import {
	PaginationResponseProducts,
	SuccessCreate,
	SuccessDelete,
	SuccessResponse,
	SuccessUpdate,
} from "../services/successResponses"
import {
	CreateRecord,
	DeleteRecordByID,
	QueryAllRecords,
	QueryRecordByID,
	TotalRecords,
	UpdateRecordByID,
} from "../services/querys"
import { productSchema } from "../validations/productSchema"
import { ZodError } from "zod"
import { stockSchema } from "../validations/stockSchema"

export const GetProducts = async (req: Request, res: Response) => {
	try {
		const { count, limit, rows, page, brands, minPrice, maxPrice } =
			await BuildQueryPaginationProducts<IProduct>(
				req,
				["sku", "title", "name", "description", "brand"],
				"products"
			)

		const totalPages = Math.ceil(count / limit)
		if (rows) {
			res.status(200).json(
				PaginationResponseProducts(
					rows,
					Number(count),
					totalPages,
					page,
					brands,
					minPrice,
					maxPrice
				)
			)
		} else {
			res.status(NotFoundError().status).json(NotFoundError().data)
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

export const GetProduct = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<IProduct>(id, "products")
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

export const AddProduct = async (req: Request, res: Response) => {
	try {
		const { productValue } = await req.body

		const product: IProductNew = productValue
		const skuProduct = CreateIDProduct(product.sku)
		productSchema.parse(productValue)
		const result = await CreateRecord<IProductNew>(
			"products",
			{
				sku: skuProduct,
				title: product.title,
				description: product.description,
				specs: JSON.stringify(product.specs),
				image: product.image,
				slide_images: JSON.stringify(product.slide_images),
				brand: product.brand,
				brand_logo: product.brand_logo,
				category: product.category,
				subcategory: product.subcategory,
				same_day_delivery: product.same_day_delivery,
				store_pickup: product.store_pickup,
				price: product.price,
				is_discounted: product.is_discounted,
				discount: product.discount,
				is_new: product.is_new,
				is_sale: product.is_sale,
				is_freeshipping: product.is_freeshipping,
				is_clearance: product.is_clearance,
				inventory_quantity: product.inventory_quantity,
				minimun_inventory_quantity: product.minimun_inventory_quantity,
			},
			[
				"sku",
				"title",
				"description",
				"specs",
				"image",
				"slide_images",
				"brand",
				"brand_logo",
				"category",
				"subcategory",
				"same_day_delivery",
				"store_pickup",
				"price",
				"is_discounted",
				"discount",
				"is_new",
				"is_sale",
				"is_freeshipping",
				"is_clearance",
				"inventory_quantity",
				"minimun_inventory_quantity",
			]
		)
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

export const DeleteProduct = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await DeleteRecordByID<IProduct>(Number(id), "products")
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

export const UpdateStock = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const data = await stockSchema.parseAsync(await req.body)
		//const dateNow = new Date().toISOString()
		const result = await UpdateRecordByID(
			id,
			"products",
			{
				inventory_quantity: data.inventory_quantity,
				minimun_inventory_quantity: data.minimun_inventory_quantity,
			},
			["inventory_quantity", "minimun_inventory_quantity"]
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

export const TotalProducts = async (_req: Request, res: Response) => {
	try {
		const result = await TotalRecords("products")
		if (result) {
			res.status(200).json(SuccessResponse(result))
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(ServerError())
	}
}

export const GetProductAlerts = async (_req: Request, res: Response) => {
	try {
		const result = await QueryAllRecords<IProduct>("alerts_inventory")
		if (result) {
			res.status(200).json(SuccessResponse(result))
		} else {
			res.status(200).json(SuccessResponse([]))
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(ServerError())
	}
}

export const CreateIDProduct = (sku: string) => {
	const fechaActual = new Date()
	const milisegundos = fechaActual.getTime()

	return `${sku}-${milisegundos}`
}
