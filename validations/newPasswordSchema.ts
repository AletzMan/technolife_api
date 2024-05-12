import { z } from "zod"

export const newPasswordSchema = z
	.object({
		email: z.string(),
		password: z
			.string({ required_error: "Required field" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/, {
				message:
					"The password format is invalid. Make sure it meets the security requirements.",
			}),
		passwordConfirm: z
			.string({ required_error: "Required field" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/, {
				message:
					"The password format is invalid. Make sure it meets the security requirements.",
			}),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "New password and confirmation do not match",
		path: ["passwordConfirm"],
	})
