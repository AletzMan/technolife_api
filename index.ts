import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import users from "./app/routes/users.routes"
import subcategories from "./app/routes/subcategories.routes"
import categories from "./app/routes/categories.routes"
import newsletters from "./app/routes/newsletter.routes"
import message from "./app/routes/message.routes"
import postalcode from "./app/routes/postalcode.routes"
import payment from "./app/routes/payment.routes"
import password from "./app/routes/password.routes"
import products from "./app/routes/products.routes"
import orders from "./app/routes/orders.routes"
import brand from "./app/routes/brand.routes"
import customers from "./app/routes/customers.routes"
import coupons from "./app/routes/coupons.routes"
import main from "./app/routes/main.routes"

dotenv.config()
const PORT = process.env.PORT

const app = express()

dotenv.config()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: process.env.FRONT_END_URL,
		credentials: true,
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	})
)
app.use(function (_req, res, next) {
	res.header("Content-Type", "application/json;charset=UTF-8")
	res.header("Access-Control-Allow-Credentials", "true")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

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

app.listen(PORT, () => {
	console.log("Server running at PORT: ", PORT)
}).on("error", (error) => {
	// gracefully handle error
	throw new Error(error.message)
})
