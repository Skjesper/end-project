import { getProducts } from '@/lib/shopify'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default async function Home() {
	const products = await getProducts()

	return (
		<main>
			<h1>Product Images Test</h1>
			<p>Showing {products.length} products</p>

			<div>
				{products.map((product) => (
					<div key={product.id}>
						<h3>{product.title}</h3>
						{product.images[0] ? (
							<img
								src={product.images[0].url}
								alt={product.images[0].altText || product.title}
								width="200"
								height="200"
							/>
						) : (
							<p>No image</p>
						)}
						<p>
							Price: {product.priceRange.minVariantPrice.amount}{' '}
							{product.priceRange.minVariantPrice.currencyCode}
						</p>
					</div>
				))}
			</div>
		</main>
	)
}
