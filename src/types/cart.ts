export interface CartItem {
	id: string
	productId: string
	variantId: string
	title: string
	price: number
	quantity: number
	image: string
}

export interface Cart {
	items: CartItem[]
	totalItems: number
	totalPrice: number
}
