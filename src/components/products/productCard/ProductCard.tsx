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
				<div className={styles.info}>
					<h3 className={styles.title}>{product.title}</h3>
					<p className={styles.price}>
						{price.toFixed(2)} {currency}
					</p>
				</div>
			</Link>
		</article>
	)
}
