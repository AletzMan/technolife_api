import express from "express"
//import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import users from "../routes/users.routes"
import subcategories from "../routes/subcategories.routes"
import categories from "../routes/categories.routes"
import newsletters from "../routes/newsletter.routes"
import message from "../routes/message.routes"
import postalcode from "../routes/postalcode.routes"
import payment from "../routes/payment.routes"
import password from "../routes/password.routes"
import products from "../routes/products.routes"
import orders from "../routes/orders.routes"
import brand from "../routes/brand.routes"
import customers from "../routes/customers.routes"
import coupons from "../routes/coupons.routes"
import main from "../routes/main.routes"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "../config/swaggerConfig"
//const swaggerUiAssetPath = require("swagger-ui-dist").getAbsoluteFSPath()

dotenv.config()
const PORT = process.env.PORT

const app = express()

dotenv.config()
app.use(morgan("dev"))
app.use(express.json())
//app.use(express.static(swaggerUiAssetPath))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname))
/*app.use("*.css", (_req, res, next) => {
	res.set("Content-Type", "text/css")
	next()
})*/
/*app.use(
	cors({
		origin: process.env.FRONT_END_URL,
		credentials: false,
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	})
)*/
/*app.use(function (_req, res, next) {
	res.header("Content-Type", "application/json;charset=UTF-8")
	res.header("Access-Control-Allow-Credentials", "true")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})*/

app.use("/", main)
app.use("/api", users)
app.use("/api", subcategories)
app.use("/api", categories)
app.use("/api", newsletters)
app.use("/api", message)
app.use("/api", postalcode)
app.use("/api", payment)
app.use("/api", password)
app.use("/api", products)
app.use("/api", orders)
app.use("/api", brand)
app.use("/api", customers)
app.use("/api", coupons)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
	console.log("Server running at PORT: ", PORT)
	//console.log(path.join(__dirname, "../routes/*"))
}).on("error", (error) => {
	// gracefully handle error
	throw new Error(error.message)
})
