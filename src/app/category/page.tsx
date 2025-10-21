import ProductGrid from '@/components/products/ProductGrid'
import { getCollections } from '@/lib/shopify'

export default async function ProductsPage() {
	const collections = await getCollections()

	return (
		<div>
			<h1>All Products</h1>
			<p>Showing {collections.length} collections</p>

			<p>
				The names of the collections are:{' '}
				{collections.map((collection) => collection.title).join(', ')}
			</p>

			{/* Optional: render them in a list */}
			<ul>
				{collections.map((collection) => (
					<li key={collection.id}>{collection.title}</li>
				))}
			</ul>
		</div>
	)
}
