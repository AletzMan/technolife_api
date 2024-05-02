import { z } from "zod"

export const brandSchema = z.object({
	name: z.string().min(1),
	logo: z.string().min(1, { message: "Load or select an image" }),
})
