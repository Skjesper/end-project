export interface CartItem {
	productId: string
	variantId: string
	handle: string
	title: string
	price: number
	image: string
	currency: string
	quantity: number
	selectedSize?: string
	selectedColor?: string
}

export interface Cart {
	items: CartItem[]
}
