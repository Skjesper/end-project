// utils/categoryFilter.ts
import { Product } from '@/types/product'

// Extract unique categories from products
export function extractUniqueCategories(products: Product[]): string[] {
	const categories = new Set<string>()

	products.forEach((product) => {
		if (product.category) {
			// Extract just the subcategory (e.g., "T-Shirts" from "Clothing > Tops > T-Shirts")
			// Or use the full category name if it's already just one word like "Bodysuits"
			const parts = product.category.split(' > ')
			const subcategory = parts[parts.length - 1]
			categories.add(subcategory)
		}
	})

	return Array.from(categories).sort()
}

// Filter products by category
export function filterProductsByCategory(
	products: Product[],
	selectedCategory: string | null
): Product[] {
	if (!selectedCategory) {
		return products
	}

	return products.filter((product) => {
		if (!product.category) return false
		// Check if the category ends with the selected subcategory
		return product.category.endsWith(selectedCategory)
	})
}
