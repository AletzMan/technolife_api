import { Request } from "express"
import { pool } from "../config/db"
import { QueryResultRow } from "pg"
import { IProduct } from "../Interfaces/product"
import { IOrder } from "../Interfaces/order"

interface PaginationResult {
	rows: any[]
	count: number
	limit: number
	page: number
}

interface PaginationResultOrders {
	rows: any[]
	count: number
	limit: number
	page: number
	on_the_way: number
	pending: number
	delivered: number
	cancelled: number
}

interface PaginationResultProducts {
	rows: any[]
	count: number
	limit: number
	page: number
	brands: string[]
	minPrice: number
	maxPrice: number
	categories: number[]
	subCategories: number[]
	numberCategories: number[]
	numberBrands: number[]
	numberSubCategories: number[]
}

export const BuildQueryPagination = async <T extends QueryResultRow>(
	req: Request,
	fields: string[],
	table: string
): Promise<PaginationResult> => {
	const searchParams = new URLSearchParams(req.url.split("?")[1])
	const search = searchParams.get("search") || ""
	const sort = searchParams.get("sort") || "asc"
	const order = searchParams.get("order") || ""
	const page = Number(searchParams.get("page")) || 1
	const limit = Number(searchParams.get("limit")) || 15
	const offset = (page - 1) * limit

	let filters: [string, string][] = []
	searchParams.forEach((value, key) => {
		if (!["search", "sort", "order", "page", "limit"].includes(key)) {
			filters.push([key, value])
		}
	})

	let query = `SELECT * FROM ${table}`
	let queryCount = `SELECT COUNT(*) AS quantity FROM ${table}`
	const likePatternSearch = `%${search}%`

	const queryParams: any[] = []
	const queryParamsCount: any[] = []

	if (search !== "") {
		query += " WHERE"
		queryCount += " WHERE"
	}

	if (search) {
		query += " ("
		queryCount += " ("
		query += fields
			.map((field) => {
				queryParams.push(likePatternSearch)
				return ` ${field} ILIKE $${queryParams.length}`
			})
			.join(" OR ")
		queryCount += fields
			.map((field) => {
				queryParamsCount.push(likePatternSearch)
				return ` ${field} ILIKE $${queryParamsCount.length}`
			})
			.join(" OR ")
		query += ") "
		queryCount += ") "
	}

	if (filters.length > 0) {
		query += search ? " AND" : " WHERE "
		queryCount += search ? " AND" : " WHERE "
		query += filters
			.map((filter, _index) => {
				if (filter[0].includes("price")) {
					const prices = filter[1].split(",")
					queryParams.push(prices[0])
					queryParams.push(prices[1])
					return ` ${filter[0]} BETWEEN $${queryParams.length - 1} AND $${
						queryParams.length
					}`
				} else {
					const filterValues = filter[1].split(",")
					filterValues.forEach((value) => {
						queryParams.push(value)
					})
					return ` ${filter[0]} IN (${filterValues
						.map((_, i) => `$${queryParams.length - (filterValues.length - 1) + i}`)
						.join(", ")})`
				}
			})
			.join(" AND ")
		queryCount += filters
			.map((filter, _index) => {
				if (filter[0].includes("price")) {
					const prices = filter[1].split(",")
					queryParamsCount.push(prices[0])
					queryParamsCount.push(prices[1])
					return ` ${filter[0]} BETWEEN $${queryParamsCount.length - 1} AND $${
						queryParamsCount.length
					}`
				} else {
					const filterValues = filter[1].split(",")
					filterValues.forEach((value) => {
						queryParamsCount.push(value)
					})
					return ` ${filter[0]} IN (${filterValues
						.map(
							(_, i) => `$${queryParamsCount.length - (filterValues.length - 1) + i}`
						)
						.join(", ")})`
				}
			})
			.join(" AND ")
	}

	if (order) {
		query += ` ORDER BY ${order} ${sort}`
	}

	query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`

	queryParams.push(limit, offset)

	const { rows } = await pool.query<T>(query, queryParams)
	const { rows: countRows } = await pool.query<T>(queryCount, queryParamsCount)
	const count = countRows[0].quantity

	return { rows, count, limit, page }
}

export const BuildQueryPaginationProducts = async <T extends QueryResultRow>(
	req: Request,
	fields: string[],
	table: string
): Promise<PaginationResultProducts> => {
	const searchParams = new URLSearchParams(req.url.split("?")[1])
	const search = searchParams.get("search") || ""
	const sort = searchParams.get("sort") || "asc"
	const order = searchParams.get("order") || ""
	const page = Number(searchParams.get("page")) || 1
	const limit = Number(searchParams.get("limit")) || 15
	const offset = (page - 1) * limit

	let filters: [string, string][] = []
	searchParams.forEach((value, key) => {
		if (!["search", "sort", "order", "page", "limit"].includes(key)) {
			filters.push([key, value])
		}
	})

	let query = `SELECT * FROM ${table}`
	let queryCount = `SELECT COUNT(*) AS quantity FROM ${table}`
	const likePatternSearch = `%${search}%`

	const queryParams: any[] = []
	const queryParamsCount: any[] = []

	if (search !== "") {
		query += " WHERE"
		queryCount += " WHERE"
	}

	if (search) {
		query += " ("
		queryCount += " ("
		query += fields
			.map((field) => {
				queryParams.push(likePatternSearch)
				return ` ${field} ILIKE $${queryParams.length}`
			})
			.join(" OR ")
		queryCount += fields
			.map((field) => {
				queryParamsCount.push(likePatternSearch)
				return ` ${field} ILIKE $${queryParamsCount.length}`
			})
			.join(" OR ")
		query += ") "
		queryCount += ") "
	}

	if (filters.length > 0) {
		query += search ? " AND" : " WHERE "
		queryCount += search ? " AND" : " WHERE "
		query += filters
			.map((filter, _index) => {
				if (filter[0].includes("price")) {
					const prices = filter[1].split(",")
					queryParams.push(prices[0])
					queryParams.push(prices[1])
					return ` ${filter[0]} BETWEEN $${queryParams.length - 1} AND $${
						queryParams.length
					}`
				} else {
					const filterValues = filter[1].split(",")
					filterValues.forEach((value) => {
						queryParams.push(value)
					})
					return ` ${filter[0]} IN (${filterValues
						.map((_, i) => `$${queryParams.length - (filterValues.length - 1) + i}`)
						.join(", ")})`
				}
			})
			.join(" AND ")
		queryCount += filters
			.map((filter, _index) => {
				if (filter[0].includes("price")) {
					const prices = filter[1].split(",")
					queryParamsCount.push(prices[0])
					queryParamsCount.push(prices[1])
					return ` ${filter[0]} BETWEEN $${queryParamsCount.length - 1} AND $${
						queryParamsCount.length
					}`
				} else {
					const filterValues = filter[1].split(",")
					filterValues.forEach((value) => {
						queryParamsCount.push(value)
					})
					return ` ${filter[0]} IN (${filterValues
						.map(
							(_, i) => `$${queryParamsCount.length - (filterValues.length - 1) + i}`
						)
						.join(", ")})`
				}
			})
			.join(" AND ")
	}

	if (order) {
		query += ` ORDER BY ${order} ${sort}`
	}

	const { rows: rowsProducts } = await pool.query<IProduct>(query, queryParams)

	const brands = new Set<string>()
	const prices = new Set<number>()
	const categories = new Set<number>()
	const subcategories = new Set<number>()
	const products: IProduct[] = rowsProducts
	products.forEach((product) => {
		brands.add(product.brand)
		prices.add(product.price)
		categories.add(Number(product.category))
		subcategories.add(Number(product.subcategory))
	})
	const arrayBrands = Array.from(brands.values())
	const arrayPrices = Array.from<number>(prices.values())
	const minPrice = Math.min(...arrayPrices)
	const maxPrice = Math.max(...arrayPrices)
	const arrayCategories = Array.from(categories.values())
	const arraySubCategories = Array.from(subcategories.values())

	let numberCategories: number[] = []
	let numberSubCategories: number[] = []
	let numberBrands: number[] = []
	arrayCategories.forEach((_) => {
		numberCategories.push(0)
	})
	arraySubCategories.forEach((_) => {
		numberSubCategories.push(0)
	})
	arrayBrands.forEach((_) => {
		numberBrands.push(0)
	})

	products.forEach((product) => {
		arrayCategories.forEach((category, index) => {
			if (category === Number(product.category)) {
				numberCategories[index]++
			}
		})
		arraySubCategories.forEach((subcategory, index) => {
			if (subcategory === Number(product.subcategory)) {
				numberSubCategories[index]++
			}
		})
		arrayBrands.forEach((brand, index) => {
			if (brand === product.brand) {
				numberBrands[index]++
			}
		})
	})

	query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`

	queryParams.push(limit, offset)

	const { rows } = await pool.query<T>(query, queryParams)
	const { rows: countRows } = await pool.query<T>(queryCount, queryParamsCount)
	const count = countRows[0].quantity

	return {
		rows,
		count,
		limit,
		page,
		brands: arrayBrands,
		minPrice,
		maxPrice,
		categories: arrayCategories,
		subCategories: arraySubCategories,
		numberCategories,
		numberBrands,
		numberSubCategories,
	}
}

export const BuildQueryPaginationOrders = async <T extends QueryResultRow>(
	req: Request,
	fields: string[],
	table: string
): Promise<PaginationResultOrders> => {
	const searchParams = new URLSearchParams(req.url.split("?")[1])
	const search = searchParams.get("search") || ""
	const sort = searchParams.get("sort") || "asc"
	const order = searchParams.get("order") || ""
	const page = Number(searchParams.get("page")) || 1
	const limit = Number(searchParams.get("limit")) || 15
	const offset = (page - 1) * limit

	let filters: [string, string][] = []
	searchParams.forEach((value, key) => {
		if (!["search", "sort", "order", "page", "limit"].includes(key)) {
			filters.push([key, value])
		}
	})

	let query = `SELECT * FROM ${table}`
	let queryCount = `SELECT COUNT(*) AS quantity FROM ${table}`
	const likePatternSearch = `%${search}%`

	const queryParams: any[] = []
	const queryParamsCount: any[] = []

	if (search !== "") {
		query += " WHERE"
		queryCount += " WHERE"
	}

	if (search) {
		query += " ("
		queryCount += " ("
		query += fields
			.map((field) => {
				queryParams.push(likePatternSearch)
				return ` ${field} ILIKE $${queryParams.length}`
			})
			.join(" OR ")
		queryCount += fields
			.map((field) => {
				queryParamsCount.push(likePatternSearch)
				return ` ${field} ILIKE $${queryParamsCount.length}`
			})
			.join(" OR ")
		query += ") "
		queryCount += ") "
	}

	if (filters.length > 0) {
		query += search ? " AND" : " WHERE "
		queryCount += search ? " AND" : " WHERE "
		query += filters
			.map((filter, _index) => {
				if (filter[0].includes("price")) {
					const prices = filter[1].split(",")
					queryParams.push(prices[0])
					queryParams.push(prices[1])
					return ` ${filter[0]} BETWEEN $${queryParams.length - 1} AND $${
						queryParams.length
					}`
				} else {
					const filterValues = filter[1].split(",")
					filterValues.forEach((value) => {
						queryParams.push(value)
					})
					return ` ${filter[0]} IN (${filterValues
						.map((_, i) => `$${queryParams.length - (filterValues.length - 1) + i}`)
						.join(", ")})`
				}
			})
			.join(" AND ")
		queryCount += filters
			.map((filter, _index) => {
				if (filter[0].includes("price")) {
					const prices = filter[1].split(",")
					queryParamsCount.push(prices[0])
					queryParamsCount.push(prices[1])
					return ` ${filter[0]} BETWEEN $${queryParamsCount.length - 1} AND $${
						queryParamsCount.length
					}`
				} else {
					const filterValues = filter[1].split(",")
					filterValues.forEach((value) => {
						queryParamsCount.push(value)
					})
					return ` ${filter[0]} IN (${filterValues
						.map(
							(_, i) => `$${queryParamsCount.length - (filterValues.length - 1) + i}`
						)
						.join(", ")})`
				}
			})
			.join(" AND ")
	}

	if (order) {
		query += ` ORDER BY ${order} ${sort}`
	}

	const { rows: rowsOrders } = await pool.query<IOrder>(query, queryParams)

	const on_the_way: number = rowsOrders.filter((order) => order.state === "ON THE WAY").length
	const pending: number = rowsOrders.filter((order) => order.state === "PENDING").length
	const delivered: number = rowsOrders.filter((order) => order.state === "DELIVERED").length
	const cancelled: number = rowsOrders.filter((order) => order.state === "CANCELLED").length

	query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`

	queryParams.push(limit, offset)

	const { rows } = await pool.query<T>(query, queryParams)
	const { rows: countRows } = await pool.query<T>(queryCount, queryParamsCount)
	const count = countRows[0].quantity

	return {
		rows,
		count,
		limit,
		page,
		on_the_way,
		pending,
		delivered,
		cancelled,
	}
}
