import ProductGrid from '@/components/products/ProductGrid'
import { getProductsByCollection } from '@/lib/shopify'

export default async function CategoryPage({
	params
}: {
	params: { slug: string }
}) {
	const { slug } = params
	const { collection, products } = await getProductsByCollection(slug)

	if (!collection) {
		return <p>Category not found</p>
	}

	return (
		<div>
			<h1>{collection.title}</h1>
			<p>{collection.description}</p>
			<p>Showing {products.length} products</p>

			<ProductGrid products={products} />
		</div>
	)
}
