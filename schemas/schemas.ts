export const Brand = {
	type: "object",
	properties: {
		id: {
			type: "integer",
			example: 1,
		},
		name: {
			type: "string",
			example: "Brand Name",
		},
		name_logo: {
			type: "string",
			example: "Brand Name Logo",
		},
		logo: {
			type: "string",
			example: "http://example.com/logo.png",
		},
		created_date: {
			type: "string",
			format: "date-time",
			example: "2023-05-18T16:39:57Z",
		},
		last_modified: {
			type: "string",
			format: "date-time",
			example: "2024-05-18T16:39:57Z",
		},
	},
	required: ["name", "name_logo"],
}

export const User = {
	type: "object",
	properties: {
		id: { type: "number" },
		name: { type: "string" },
		lastname: { type: "string" },
		email: { type: "string" },
		password: { type: "string" },
		oldpasswords: {
			type: "array",
			items: {
				type: "object",
				properties: {
					password: { type: "string" },
				},
			},
		},
		token_reset_password: { type: "string" },
		privileges: { type: "number" },
		datebirth: { type: "string" },
		phonenumber: { type: "number" },
		favorites: {
			type: "array",
			items: { type: "string" },
		},
	},
}

export const Category = {
	type: "object",
	properties: {
		id: {
			type: "integer",
			example: 1,
		},
		name: {
			type: "string",
			example: "Category Name",
		},
		name_abbr: {
			type: "string",
			example: "CN",
		},
	},
	required: ["name", "name_abbr"],
}
