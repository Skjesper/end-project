import { getProductByHandle } from '@/lib/shopify'
import Link from 'next/link'
import styles from './page.module.css'
import AddToCartButton from '@/components/ui/button/AddToCartButton'
import ProductImageGallery from '@/components/products/productImageGallery/ProductImageGallery'
import ProductAccordions from '@/components/products/productAccordions/ProductAccordions'
import Button from '@/components/ui/button/Button'
import { Product } from '@/types/product'

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
	const colors = product.variants
		? Array.from(
				new Set(
					product.variants
						.flatMap((v) => v.selectedOptions)
						.filter((opt) => opt.name.toLowerCase() === 'color')
						.map((opt) => opt.value)
				)
		  )
		: []

	const sizes = product.variants
		? Array.from(
				new Set(
					product.variants
						.flatMap((v) => v.selectedOptions)
						.filter((opt) => opt.name.toLowerCase() === 'size')
						.map((opt) => opt.value)
				)
		  )
		: []
	const price = parseFloat(product.priceRange.minVariantPrice.amount)
	const currency = product.priceRange.minVariantPrice.currencyCode

	return (
		<div>
			<div className={styles.pageContainer}>
				<ProductImageGallery
					images={product.images}
					productTitle={product.title}
				/>

				<section className={styles.productDetails}>
					<h3>{product.title}</h3>
					<div className={styles.options}>
						<div className={styles.price}>
							<p>
								Price: {price.toFixed(2)} {currency}
							</p>
						</div>

						<div className={styles.variantInfo}>
							{sizes.length > 0 && (
								<div className={styles.variantRow}>
									<span className={styles.variantLabel}></span>
									<div className={styles.variantOptions}>
										{sizes.map((size) => (
											<Button key={size} variant="size">
												{size}
											</Button>
										))}
									</div>
								</div>
							)}
						</div>

						<div className={styles.variantInfo}>
							{colors.length > 0 && (
								<div className={styles.variantRow}>
									<span className={styles.variantLabel}></span>
									<div className={styles.variantOptions}>
										{colors.map((color) => (
											<Button key={color} variant="color">
												{color}
											</Button>
										))}
									</div>
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
							/>
						</div>

						<ProductAccordions
							// sizeAndFit={product.sizeAndFit}
							description={product.description}
							// shipping={product.shipping}
						/>
					</div>
				</section>
			</div>
		</div>
	)
}
