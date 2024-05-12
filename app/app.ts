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
import main from "./routes/main.routes"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"

export class App {
	private app: Application

	constructor(private port?: number | string | undefined) {
		this.app = express()
		this.settings()
		this.middlewares()
		this.routes()
		dotenv.config()
	}

	settings() {
		this.app.set("port", this.port || process.env.PORT || 4100)
	}

	middlewares() {
		dotenv.config()
		this.app.use(morgan("dev"))
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(
			cors({
				origin: process.env.FRONT_END_URL,
				credentials: true,
				optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
			})
		)
		this.app.use(function (_req, res, next) {
			res.header("Content-Type", "application/json;charset=UTF-8")
			res.header("Access-Control-Allow-Credentials", "true")
			res.header(
				"Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept"
			)
			next()
		})
	}

	routes() {
		this.app.use("/", main)
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
