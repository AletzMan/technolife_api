import { z } from "zod"

export const couponSchema = z
	.object({
		code: z
			.string()
			.min(6)
			.max(12)
			.refine((val) => val.toUpperCase() === val, { message: "Code must be uppercase" }),
		description: z.string().min(6),
		discount: z.string().refine((val) => parseFloat(val) > 0 && parseFloat(val) <= 1, {
			message: "It must be greater than 0 and less than or equal to 1",
		}),
		limits: z
			.string()
			.refine((val) => parseInt(val) > 0, { message: "It must be greater than 0" }),
		start_date: z.string().refine((val) => new Date(val).getTime() > new Date().getTime(), {
			message: "Start date must be greater than today",
		}),
		end_date: z.string().refine((val) => new Date(val).getTime() > new Date().getTime(), {
			message: "End date must be greater than today",
		}),
	})
	.refine(
		(data) => new Date(data.start_date).getTime() + 3540000 < new Date(data.end_date).getTime(),
		{
			message: "End date must be separated by at least 1 hour",
			path: ["end_date"],
		}
	)
