import { z } from "zod"

export const authorizationSchema = z.object({
	email: z
		.string({ required_error: "Required field" })
		.email({ message: "Please enter a valid email address" }),
	password: z.string({ required_error: "Required field" }).min(1, { message: "Required field" }),
})
