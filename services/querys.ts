import { Request } from "express"
import { pool } from "../config/db"
import { QueryResultRow } from "pg"

export async function QueryAllRecords<T extends QueryResultRow>(
	table: string,
	queryParams?: Request<{}, {}, {}, T>
) {
	let query = `SELECT * FROM ${table}`
	let fields: string[] = []
	if (queryParams) {
		Object.entries(queryParams.query).forEach((item, index) => {
			if (index === 0) {
				query += ` WHERE `
			}
			if (index > 0) {
				query += ` AND `
			}
			const idParse = parseInt(item[1] as string, 10)
			if (!isNaN(idParse)) {
				query += `${item[0]} = $${index + 1}`
			} else {
				query += `LOWER(${item[0]}) = LOWER($${index + 1})`
			}
			fields.push(item[1])
		})
	}

	const response = await pool.query<T>(query, fields)
	if (response.rowCount) {
		return response.rows
	} else {
		return null
	}
}

export async function QueryRecordByID<T extends QueryResultRow>(
	id: number | string,
	table: string,
	optionalSearch?: string
) {
	let query = ""

	const idParse = parseInt(id as string, 10)
	if (optionalSearch) {
		if (!isNaN(idParse)) {
			query = `SELECT * FROM ${table} WHERE ${optionalSearch} = $1`
		} else {
			query = `SELECT * FROM ${table} WHERE LOWER(${optionalSearch}) = LOWER($1)`
		}
	} else {
		query = `SELECT * FROM ${table} WHERE id= $1`
	}
	//console.log(id)
	const response = await pool.query<T>(query, [id])

	if (response.rowCount) {
		return response.rows
	} else {
		return response.rows
	}
}

export async function QueryRecordbyEmail(email: string, table: string) {
	const query = `SELECT * FROM ${table} WHERE email= $1`
	const response = await pool.query(query, [email])
	if (response.rowCount) {
		return response.rows[0]
	} else {
		return null
	}
}

export async function DeleteRecordByID<T extends QueryResultRow>(
	id: number | string,
	table: string,
	optionalSearch?: string
): Promise<boolean> {
	let query = ""
	if (optionalSearch) {
		query = `DELETE FROM ${table} WHERE ${optionalSearch}= $1`
	} else {
		query = `DELETE FROM ${table} WHERE id= $1`
	}

	const response = await pool.query<T>(query, [id])

	if (response.rowCount) {
		return true
	} else {
		return false
	}
}

export async function DeleteRecordByParams<T extends QueryResultRow>(
	params: string[],
	table: string,
	fields: string[]
): Promise<boolean> {
	let query = `DELETE FROM ${table} WHERE `
	fields.forEach((field, index) => {
		if (index > 0) {
			query += ` AND `
		}
		query += `${field} = $${index + 1} `
	})
	const response = await pool.query<T>(query, params)
	if (response.rowCount) {
		return true
	} else {
		return false
	}
}

export async function UpdateRecordByID<T extends QueryResultRow>(
	id: number | string,
	table: string,
	values: object,
	fields: string[]
) {
	const query = `UPDATE ${table} SET ${fields
		.map((field, index) => `${field}=$${index + 1}`)
		.join(",")} WHERE id=$${fields.length + 1}`
	const response = await pool.query<T>(query, [...Object.values(values), id])
	if (response.rowCount) {
		return response
	} else {
		return false
	}
}

export async function UpdateRecordByParams<T extends QueryResultRow>(
	paramFields: string[],
	params: string[],
	table: string,
	values: object,
	fields: string[]
) {
	let query = `UPDATE ${table} SET ${fields
		.map((field, index) => `${field} = $${index + 1} `)
		.join(",")} `
	paramFields.forEach((param, index) => {
		if (index === 0) {
			query += ` WHERE `
		} else if (index > 0) {
			query += ` AND `
		}
		query += ` ${param} = $${fields.length + index + 1} `
	})

	const response = await pool.query<T>(query, [...Object.values(values), ...params.values()])

	if (response.rowCount) {
		return response
	} else {
		return false
	}
}

export async function CreateRecord<T extends QueryResultRow>(
	table: string,
	values: object,
	fields: string[]
) {
	const query = `INSERT INTO ${table} (${fields.join(",")}) VALUES (${fields
		.map((_field, index) => `$${index + 1}`)
		.join(",")})`

	const response = await pool.query<T>(query, Object.values(values))

	if (response.rowCount) {
		return true
	} else {
		return false
	}
}

export async function LastRecord(table: string) {
	const query = `SELECT MAX(id) FROM ${table}`
	const response = await pool.query(query)
	if (response.rowCount) {
		return response.rows[0]["max(id)"]
	} else {
		return null
	}
}

export async function NextRecordNumber(table: string) {
	const query = `SELECT MAX(id) FROM ${table}`
	const response = await pool.query(query)
	if (response.rowCount) {
		return (response.rows[0]["max(id)"] as number) + 1
	} else {
		return 1
	}
}

export async function LastsRecords(table: string, limit: number) {
	const query = `SELECT * FROM ${table} ORDER BY id DESC LIMIT ${limit}`
	const response = await pool.query(query)
	if (response.rowCount) {
		return response.rows[0]
	} else {
		return []
	}
}

export const TotalRecords = async (table: string, id?: string) => {
	let query = ""
	let response
	if (id) {
		query = `SELECT COUNT(*) FROM ${table} WHERE user_id = $1`
		response = await pool.query(query, [id])
	} else {
		query = `SELECT COUNT(*) FROM ${table}`
		response = await pool.query(query)
	}
	if (response.rowCount) {
		return response.rows[0]["count(*)"]
	} else {
		return null
	}
}
