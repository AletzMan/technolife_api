import { z } from "zod"

export const useEditSchema = z.object({
	name: z
		.string({ required_error: "Required field" })
		.min(3, { message: "Must have at least three letters." }),
	lastname: z
		.string({ required_error: "Required field" })
		.min(3, { message: "Must have at least three letters." }),
	datebirth: z.string({ required_error: "Required field" }).refine(
		(dueDate) => {
			const dateBirth = new Date(dueDate)
			const now = new Date()
			const minimunAge = 18
			// Calcula la diferencia de años
			const age = now.getFullYear() - dateBirth.getFullYear()
			// Verifica si la edad es mayor o igual a 18
			return age >= minimunAge
		},
		{
			message: "Must be 18 years of age or older",
		}
	),
	phonenumber: z.coerce
		.number({ required_error: "Required field" })
		.gte(1000000000, { message: "Must be 10 digits" })
		.lte(9999999999, { message: "Must be 10 digits" }),
})
