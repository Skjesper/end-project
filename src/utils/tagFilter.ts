import { Product } from '@/types/product'

export function extractUniqueTags(products: Product[]): string[] {
	const tags = new Set<string>()
	products.forEach((product) => {
		product.tags?.forEach((tag) => tags.add(tag))
	})
	return Array.from(tags)
}

export function filterProductsByTag(
	products: Product[],
	tag: string | null
): Product[] {
	if (!tag) return products

	return products.filter((p) =>
		p.tags?.some((t) => t.toLowerCase().trim() === tag.toLowerCase())
	)
}
