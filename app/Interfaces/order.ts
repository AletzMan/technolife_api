import { IAddress } from "./address"
import { IProduct } from "./product"

export interface IOrder {
	id: number
	order_id: string
	user_id: number
	creation_date: string
	state: string
	address_id: number
	total_price: number
	name: string
}

export interface INewOrder {
	products: { product: IProduct; quantity: number }[]
	order_id: string
	user_id: number
	name: string
	address: IAddress
	total_price: number
}
