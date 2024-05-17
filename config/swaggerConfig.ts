import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { Express } from "express"

const options: swaggerJSDoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Technolife API Documentation",
			version: "1.0.0",
			description: "Documentación de la API Technolife con Swagger",
		},
		components: {
			schemas: {
				User: {
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
				},
			},
		},
	},
	apis: ["./routes/*.ts"], // Ruta a tus archivos de rutas
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerConfig = (app: Express) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default swaggerConfig
