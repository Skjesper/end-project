export interface ProductImage {
	url: string
	altText: string | null
}

export interface ProductPrice {
	amount: string
	currencyCode: string
}

export interface Product {
	id: string
	title: string
	description: string
	handle: string
	priceRange: {
		minVariantPrice: ProductPrice
	}
	images: ProductImage[]
	variantId: string
}
