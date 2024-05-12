import z from "zod"

export const subCategorySchema = z.object({
	category_id: z.coerce.number({ invalid_type_error: "Must be a number" }),
	name: z.string().min(3, "Must be at least 3 characters"),
	name_abbr: z
		.string()
		.length(3, "Must be 3 characters")
		.regex(/^[A-Z]+$/, "Must be in capital letters"),
})
