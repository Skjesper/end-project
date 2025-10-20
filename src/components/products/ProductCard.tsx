import Link from 'next/link'
import { Product } from '@/types/product'

interface ProductCardProps {
	product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
	const price = parseFloat(product.priceRange.minVariantPrice.amount)
	const currency = product.priceRange.minVariantPrice.currencyCode
	const image = product.images[0]

	return (
		<article>
			<Link href={`/products/${product.handle}`}>
				{' '}
				<div>
					{image ? (
						<img
							src={image.url}
							alt={image.altText || product.title}
							width="300"
							height="300"
						/>
					) : (
						<div>No image</div>
					)}
				</div>
				<div>
					<h3>{product.title}</h3>
					<p>
						{price.toFixed(2)} {currency}
					</p>
				</div>
			</Link>{' '}
			{/* ← Close Link here */}
		</article>
	)
}
