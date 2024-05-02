import { z } from "zod"

export const productSchema = z.object({
	title: z.string().min(5),
	image: z.string().min(5),
	slide_images: z.array(z.string()),
	description: z.string().min(2).max(300),
	category: z.string().regex(/^[1-9]$/, { message: "The number must be from 1 to 9." }),
	subcategory: z
		.string()
		.regex(/^(?:[1-9]|[1-3][0-9]|4[0-2])$/, { message: "The number must be from 1 to 42." }),
	brand: z.string().min(1).max(100),
	price: z
		.string()
		.refine((val) => parseInt(val) > 0, { message: "Price must be greater than 0" }),
	inventory_quantity: z
		.string()
		.refine((val) => parseInt(val) > 0, { message: "Price must be greater than 0" }),
	minimun_inventory_quantity: z
		.string()
		.refine((val) => parseInt(val) > 0, { message: "Price must be greater than 0" }),
})
