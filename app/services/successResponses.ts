export const PaginationResponse = (
	results: unknown,
	totalResults: number,
	totalPages: number,
	currentPage: number
) => {
	return {
		error: false,
		response: {
			results,
			totalResults,
			totalPages,
			currentPage,
		},
	}
	//.status(200)
}

export const PaginationResponseProducts = (
	results: unknown,
	totalResults: number,
	totalPages: number,
	currentPage: number,
	brands: string[],
	minPrice: number,
	maxPrice: number
) => {
	return {
		error: false,
		response: {
			results,
			totalResults,
			totalPages,
			currentPage,
			brands,
			minPrice,
			maxPrice,
		},
	}
	//.status(200)
}

export const SuccessUpdate = (data: unknown) => {
	return {
		error: false,
		message: "Updated successfully",
		data: data,
	}
	//.status(200)
}

export const SuccessDelete = () => {
	return {
		error: false,
		message: "Deleted successfully",
	}
	//.status(200)
}

export const SuccessCreate = (data: unknown) => {
	return {
		error: false,
		message: "Created successfully",
		data: data,
	}
	//.status(201)
}

export const SuccessResponse = (data: unknown) => {
	return {
		error: false,
		message: "OK",
		response: data,
	}
	//.status(200)
}
