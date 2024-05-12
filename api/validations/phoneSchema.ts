import { z } from "zod"

export const phoneSchema = z.object({
	phoneNumber: z.coerce
		.number({ required_error: "Required field" })
		.gte(100000000000, { message: "Must be 10 digits" })
		.lte(999999999999, { message: "Must be 10 digits" }),
})
