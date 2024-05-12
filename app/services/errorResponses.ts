export const NotAuthorizedError = () => {
	return {
		error: true,
		message: "Not authorized ",
		description: "Authentication is required to access the resource.",
	}
	//.status(401)
}

export const ServerError = () => {
	return {
		error: true,
		message: "Internal server error",
		description:
			"The server encountered an unexpected condition that prevented it from fulfilling the request.",
	}
	//.status(500)
}

export const NotFoundError = () => {
	return {
		data: {
			error: true,
			message: "Not found",
			description: "The requested resource could not be found.",
		},
		status: 404,
	}
}

export const BadRequestError = () => {
	return {
		error: true,
		message: "Bad request",
		description:
			"The server cannot or will not process the request due to an apparent client error.",
	}
	//.status(400)
}

export const ForbiddenError = () => {
	return {
		error: true,
		message: "Forbidden",
		description: "Sorry, you do not have permission to access this resource.",
	}
	//.status(403)
}

export const ConflictError = () => {
	return {
		error: true,
		message: "Conflict",
		description:
			"The request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.",
	}
	//.status(409)
}
export const GoneError = () => {
	return {
		error: true,
		message: "Gone",
		description: "The requested resource is no longer available. Please update your links.",
	}
	//.status(409)
}

export const UnprocessableEntityError = (issues: unknown) => {
	return {
		error: true,
		message: "Unprocessable entity",
		description:
			"The request was well-formed but was unable to be followed due to semantic errors.",
		issues,
	}
	//.status(422)
}

export const DefaultError = (message: unknown) => {
	return {
		error: true,
		message: message,
		description:
			"The server encountered an unexpected condition that prevented it from fulfilling the request.",
	}
	//.status(500)
}
