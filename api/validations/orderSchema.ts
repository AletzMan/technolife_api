import { z } from "zod"
import { emailSchema } from "./emailSchema"

export const productSchema = z.object({
	title: z.array(emailSchema),
})
