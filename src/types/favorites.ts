export interface FavoriteItem {
	productId: string
	variantId: string
	handle: string
	title: string
	price: number
	currency: string
	image: string

	selectedOptions?: {
		name: string
		value: string
	}[]
	variantTitle?: string
}
