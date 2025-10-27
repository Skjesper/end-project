import { getProductByHandle } from '@/lib/shopify'
import Link from 'next/link'
import styles from './page.module.css'
import AddToCartButton from '@/components/ui/button/AddToCartButton'

export default async function ProductDetailPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const product = await getProductByHandle(slug)

	if (!product) {
		return (
			<div>
				<h1>Product Not Found</h1>
				<Link href="/item">Back to Products</Link>
			</div>
		)
	}

	const price = parseFloat(product.priceRange.minVariantPrice.amount)
	const currency = product.priceRange.minVariantPrice.currencyCode

	return (
		<div>
			<Link href="/item">← Back to Products</Link>
			<div className={styles.pageContainer}>
				<section className={styles.imageGallery}>
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
				</section>
				<section className={styles.productDetails}>
					<h1>{product.title}</h1>

					<div>
						<p>
							Price: {price.toFixed(2)} {currency}
						</p>

						{product.description && (
							<div>
								<h2>Details</h2>
								<p>{product.description}</p>
							</div>
						)}
					</div>
					<div className={styles.addToCartButton}>
						<AddToCartButton
							productId={product.id}
							variantId={product.variantId || ''}
							handle={product.handle}
							title={product.title}
							price={price}
							image={product.images[0]?.url || ''}
							currency={currency}
							variant="primary"
						>
							Add to Cart
						</AddToCartButton>
					</div>
				</section>
			</div>
		</div>
	)
}
