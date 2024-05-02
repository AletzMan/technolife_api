import { z } from "zod"

export const userNewSchema = z
	.object({
		name: z
			.string({ required_error: "Required field" })
			.min(3, { message: "Must have at least three letters." }),
		lastname: z
			.string({ required_error: "Required field" })
			.min(3, { message: "Must have at least three letters." }),
		email: z.string().email(),
		phone_number: z.coerce
			.number({ required_error: "Required field" })
			.gte(1000000000, { message: "Must be 10 digits" })
			.lte(9999999999, { message: "Must be 10 digits" }),
		password: z
			.string({ required_error: "Required field" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/, {
				message:
					"The password format is invalid. Make sure it meets the security requirements.",
			}),
		confirm_password: z
			.string({ required_error: "Required field" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/, {
				message:
					"The password format is invalid. Make sure it meets the security requirements.",
			}),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "New password and confirmation do not match",
		path: ["confirm_password"],
	})
