import express, { Application } from "express"
import users from "./routes/users.routes"
import subcategories from "./routes/subcategories.routes"
import categories from "./routes/categories.routes"
import newsletters from "./routes/newsletter.routes"
import message from "./routes/message.routes"
import postalcode from "./routes/postalcode.routes"
import payment from "./routes/payment.routes"
import password from "./routes/password.routes"
import products from "./routes/products.routes"
import orders from "./routes/orders.routes"
import brand from "./routes/brand.routes"
import customers from "./routes/customers.routes"
import coupons from "./routes/coupons.routes"
import cors from "cors"
import morgan from "morgan"

export class App {
	private app: Application

	constructor(private port?: number | string | undefined) {
		this.app = express()
		this.settings()
		this.middlewares()
		this.routes()
	}

	settings() {
		this.app.set("port", this.port || process.env.PORT || 4100)
	}

	middlewares() {
		this.app.use(morgan("dev"))
		this.app.use(cors())
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))
	}

	routes() {
		this.app.use("/api", users)
		this.app.use("/api", subcategories)
		this.app.use("/api", categories)
		this.app.use("/api", newsletters)
		this.app.use("/api", message)
		this.app.use("/api", postalcode)
		this.app.use("/api", payment)
		this.app.use("/api", password)
		this.app.use("/api", products)
		this.app.use("/api", orders)
		this.app.use("/api", brand)
		this.app.use("/api", customers)
		this.app.use("/api", coupons)
	}

	listen() {
		this.app.listen(this.app.get("port"))
		console.log(`Server is on PORT: ${this.port} `)
	}
}
