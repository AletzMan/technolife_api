import { z } from "zod"

export const passwordChangeSchema = z
	.object({
		currentPassword: z.string({
			required_error: "Required field",
		}),
		newPassword: z
			.string({ required_error: "Required field" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/, {
				message:
					"Password must include uppercase, lowercase, digit, and special character (@, $, !, %, *, ?, &, _, or -), and be at least 8 characters long.",
			}),
		confirmNewPassword: z
			.string({ required_error: "Required field" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/, {
				message:
					"Password must include uppercase, lowercase, digit, and special character (@, $, !, %, *, ?, &, _, or -), and be at least 8 characters long.",
			}),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "New password and confirmation do not match",
		path: ["confirmNewPassword"],
	})
