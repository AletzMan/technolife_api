import { z } from "zod"

export const addressSchema = z.object({
	user_id: z.coerce.number({ required_error: "Required field" }),
	name: z
		.string({ required_error: "Required field" })
		.min(3, { message: "Must have at least three letters." }),
	last_name: z
		.string({ required_error: "Required field" })
		.min(3, { message: "Must have at least three letters." }),
	phone_number: z.coerce
		.number({ required_error: "Required field" })
		.gte(1000000000, { message: "Must be 10 digits" })
		.lte(9999999999, { message: "Must be 10 digits" }),
	street_name: z
		.string({ required_error: "Required field" })
		.min(3, { message: "Must have at least three letters." }),
	street_number: z.coerce.number({ required_error: "Required field" }),
	postal_code: z.coerce
		.number({ required_error: "Required field" })
		.gte(10000, { message: "Must be 5 digits" })
		.lte(99999, { message: "Must be 5 digits" }),
	colonia: z
		.string({ required_error: "Required field" })
		.min(3, { message: "Minimum 3 characters" })
		.max(100, { message: "Maximum 255 characters" }),
	city: z
		.string({ required_error: "Required field" })
		.min(3, { message: "Minimum 3 characters" })
		.max(100, { message: "Maximum 255 characters" }),
	state: z
		.string({ required_error: "Required field" })
		.min(3, { message: "Minimum 3 characters" })
		.max(100, { message: "Maximum 255 characters" }),
})
