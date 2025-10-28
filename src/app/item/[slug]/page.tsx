import { getProductByHandle } from '@/lib/shopify'
import Link from 'next/link'
import styles from './page.module.css'
import AddToCartButton from '@/components/ui/button/AddToCartButton'
import ProductImageGallery from '@/components/products/productImageGallery/ProductImageGallery'
import ProductAccordions from '@/components/products/productAccordions/ProductAccordions'

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
				<ProductImageGallery
					images={product.images}
					productTitle={product.title}
				/>

				<section className={styles.productDetails}>
					<h3>{product.title}</h3>

					<div>
						<p>
							Price: {price.toFixed(2)} {currency}
						</p>

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

						<ProductAccordions
							sizeAndFit={product.sizeAndFit}
							description={product.description}
							shipping={product.shipping}
						/>
					</div>
				</section>
			</div>
		</div>
	)
}
