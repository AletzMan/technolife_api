import { Request, Response } from "express"
import paypal from "@paypal/checkout-server-sdk"
import dotenv from "dotenv"

dotenv.config()
let clientId = process.env.CLIENT_ID_PAYPAL as string
let clientSecret = process.env.SECRET_KEY_PAYPAL as string

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
let client = new paypal.core.PayPalHttpClient(environment)

export const PaymentPaypal = async (req: Request, res: Response) => {
	const { amount } = req.query

	const request = new paypal.orders.OrdersCreateRequest()
	request.requestBody({
		intent: "CAPTURE",
		purchase_units: [
			{
				amount: {
					currency_code: "USD",
					value: `${amount}`,
				},
			},
		],
	})
	const response = await client.execute(request)

	console.log(response.result.links)
	res.status(200).json({ id: response.result.id, data: response.result })
}
