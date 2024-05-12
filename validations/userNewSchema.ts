import { z } from "zod"

export const userNewSchema = z
	.object({
		name: z
			.string({ required_error: "Required field" })
			.min(3, { message: "Must have at least three letters." }),
		lastname: z
			.string({ required_error: "Required field" })
			.min(3, { message: "Must have at least three letters." }),
		email: z.string().email({ message: "Invalid email address." }),
		password: z
			.string({ required_error: "Required field" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/, {
				message:
					"The password format is invalid. Make sure it meets the security requirements.",
			}),
		confirmPassword: z
			.string({ required_error: "Required field" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/, {
				message:
					"The password format is invalid. Make sure it meets the security requirements.",
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "New password and confirmation do not match",
		path: ["confirmPassword"],
	})
