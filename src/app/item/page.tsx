import ProductGrid from '@/components/products/ProductGrid'
import { getProducts } from '@/lib/shopify'

export default async function ProductsPage() {
	const products = await getProducts()

	return (
		<div>
			<h1>All Products</h1>
			<p>Showing {products.length} products</p>
			<ProductGrid products={products} />
		</div>
	)
}
