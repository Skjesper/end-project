import Link from 'next/link'
import { Product } from '@/types/product'
import styles from './ProductCard.module.css'

interface ProductCardProps {
	product: Product
	className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
	const price = parseFloat(product.priceRange.minVariantPrice.amount)
	const currency = product.priceRange.minVariantPrice.currencyCode
	const primaryImage = product.images[0]
	const hoverImage = product.images[1]

	// Extract unique colors and sizes from variants
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

	const hasVariants = sizes.length > 0 || colors.length > 0

	return (
		<article className={className}>
			<Link href={`/item/${product.handle}`} className={styles.card}>
				<div className={styles.imageWrapper}>
					{primaryImage ? (
						<>
							<img
								src={primaryImage.url}
								alt={primaryImage.altText || product.title}
								className={`${styles.image} ${styles.primaryImage}`}
							/>
							{hoverImage && (
								<img
									src={hoverImage.url}
									alt={hoverImage.altText || product.title}
									className={`${styles.image} ${styles.hoverImage}`}
								/>
							)}
						</>
					) : (
						<div>No image</div>
					)}
				</div>

				<div className={styles.infoContainer}>
					{/* Default info */}
					<div className={styles.defaultInfo}>
						<h3 className={styles.title}>{product.title}</h3>
						<p className={styles.price}>
							{price.toFixed(2)} {currency}
						</p>
					</div>

					{/* Variant info - only render if variants exist */}
					{hasVariants && (
						<div className={styles.variantInfo}>
							{sizes.length > 0 && (
								<div className={styles.variantRow}>
									<span className={styles.variantLabel}></span>
									<div className={styles.variantOptions}>
										{sizes.map((size) => (
											<span key={size} className={styles.variantOption}>
												{size}
											</span>
										))}
									</div>
								</div>
							)}
							{colors.length > 0 && (
								<div className={styles.variantRow}>
									<span className={styles.variantLabel}></span>
									<div className={styles.variantOptions}>
										{colors.map((color) => (
											<span key={color} className={styles.variantOption}>
												{color}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</Link>
		</article>
	)
}
