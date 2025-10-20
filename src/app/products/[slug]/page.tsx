import { getProductByHandle } from '@/lib/shopify'
import Link from 'next/link'

export default async function ProductDetailPage({
	params
}: {
	params: { slug: string }
}) {
	const product = await getProductByHandle(params.slug)

	if (!product) {
		return (
			<div>
				<h1>Product Not Found</h1>
				<Link href="/products">Back to Products</Link>
			</div>
		)
	}

	const price = parseFloat(product.priceRange.minVariantPrice.amount)
	const currency = product.priceRange.minVariantPrice.currencyCode

	return (
		<div>
			<Link href="/products">← Back to Products</Link>

			<h1>{product.title}</h1>

			<div>
				<h2>Images</h2>
				{product.images.length > 0 ? (
					product.images.map((image, index) => (
						<div key={index}>
							<img
								src={image.url}
								alt={image.altText || product.title}
								width="400"
								height="400"
							/>
						</div>
					))
				) : (
					<p>No images available</p>
				)}
			</div>

			<div>
				<p>
					Price: {price.toFixed(2)} {currency}
				</p>

				{product.description && (
					<div>
						<h2>Description</h2>
						<p>{product.description}</p>
					</div>
				)}

				{/* Placeholder Add to Cart Button */}
				<button>Add to Cart</button>
			</div>
		</div>
	)
}
