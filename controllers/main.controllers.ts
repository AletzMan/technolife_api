import { Request, Response } from "express"

export const GetMainMessage = async (_req: Request, res: Response) => {
	res.status(200).json({
		message: "API Technolife Dashboard & Ecommerce",
	})
}
