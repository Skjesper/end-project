export interface CartItem {
	handle: string
	productId: string
	variantId: string
	title: string
	price: number
	quantity: number
	image: string
	currency: string
}

export interface Cart {
	items: CartItem[]
}
