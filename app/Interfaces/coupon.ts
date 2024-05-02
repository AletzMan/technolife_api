export interface ICoupon {
	id: number
	code: string
	description: string
	discount: number
	limits: number
	uses: number
	start_date: string
	end_date: string
}
