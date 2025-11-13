export interface ProductImage {
	url: string
	altText: string | null
}

export interface ProductPrice {
	amount: string
	currencyCode: string
}

export interface ProductVariant {
	id: string
	title: string
	availableForSale: boolean
	price: ProductPrice
	selectedOptions: {
		name: string
		value: string
	}[]
}

export interface Product {
	id: string
	title: string
	description: string
	handle: string
	tags?: string[]
	category?: string | null
	priceRange: {
		minVariantPrice: ProductPrice
	}
	images: ProductImage[]
	variants?: ProductVariant[]
	variantId?: string
}
