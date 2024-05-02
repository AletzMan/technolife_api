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
import { ICoupon } from "../Interfaces/coupon"
import { couponSchema } from "../validations/couponSchema"

export const GetAllCoupons = async (req: Request<{}, {}, {}, ICoupon>, res: Response) => {
	try {
		const result = await QueryAllRecords<ICoupon>("coupons", req)
		if (result) {
			res.status(200).json(SuccessResponse(result))
		} else {
			res.status(200).json(SuccessResponse([]))
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(ServerError())
	}
}

export const GetCoupon = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await QueryRecordByID<ICoupon>(id, "coupons")
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

export const CreateCoupon = async (req: Request, res: Response) => {
	try {
		const data = couponSchema.parse(req.body)
		const result = await CreateRecord<ICoupon>("coupons", data, [
			"code",
			"description",
			"discount",
			"limits",
			"start_date",
			"end_date",
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

export const Deletecoupon = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const result = await DeleteRecordByID<ICoupon>(Number(id), "coupons")
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
