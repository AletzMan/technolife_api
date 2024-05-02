export interface IProduct {
	id: number
	sku: string
	title: string
	name: string
	description: string
	rating: number
	specs: IProductCharacteristic[]
	image: string
	slide_images: string[]
	brand: string
	brand_logo: string
	category: string
	subcategory: string
	same_day_delivery: boolean
	store_pickup: boolean
	price: number
	is_discounted: boolean
	discount: number
	is_new: boolean
	is_sale: boolean
	is_freeshipping: boolean
	is_clearance: boolean
	create_date: Date
	last_modfied: Date
	inventory_quantity: number
	minimun_inventory_quantity: number
	sold_quantity: number
	status: string
}

export interface IProductCharacteristic {
	id: string
	name: string
	attributes: IProductAttribute[]
}

export interface IProductAttribute {
	id: string
	name: string
	value: string
}

export interface IProductNew {
	sku: string
	title: string
	description: string
	specs: IProductCharacteristic[]
	image: string
	slide_images: string[]
	brand: string
	brand_logo: string
	category: number
	subcategory: number
	same_day_delivery: boolean
	store_pickup: boolean
	price: number
	is_discounted: boolean
	discount: number
	is_new: boolean
	is_sale: boolean
	is_freeshipping: boolean
	is_clearance: boolean
	create_date: Date
	last_modfied: Date
	inventory_quantity: number
	minimun_inventory_quantity: number
	sold_quantity: number
}
