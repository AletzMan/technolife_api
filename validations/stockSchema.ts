import { z } from "zod"

export const stockSchema = z.object({
	inventory_quantity: z
		.string()
		.refine((val) => parseInt(val) > 0, { message: "Price must be greater than 0" }),
	minimun_inventory_quantity: z
		.string()
		.refine((val) => parseInt(val) > 0, { message: "Price must be greater than 0" }),
})
