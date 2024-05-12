import { App } from "./app"
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT

async function main() {
	const app = new App(PORT)
	app.listen()
}

main()
