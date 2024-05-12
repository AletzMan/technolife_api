import z from "zod"

export const categorySchema = z.object({
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	name_abbr: z
		.string()
		.length(2, "El código debe tener 2 caracteres")
		.regex(/^[A-Z]+$/, "El código debe ser en mayúsculas"),
})
