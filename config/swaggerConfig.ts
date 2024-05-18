import path from "path"
import swaggerJSDoc from "swagger-jsdoc"
import { Brand, Category, User } from "../schemas/schemas"
//import swaggerUi from "swagger-ui-express"
//import { Express } from "express"

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
				User,
				Brand,
				Category,
			},
		},
	},
	apis: [`${(path.join(__dirname), "./routes/*")}`], // Ruta a tus archivos de rutas
}

const swaggerSpec = swaggerJSDoc(options)

//const swaggerConfig = (app: Express) => {
//	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
//}

export default swaggerSpec
