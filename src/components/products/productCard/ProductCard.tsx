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
	const image = product.images[0]

	return (
		<article className={className}>
			<Link href={`/item/${product.handle}`} className={styles.card}>
				<div className={styles.imageWrapper}>
					{image ? (
						<img
							src={image.url}
							alt={image.altText || product.title}
							className={styles.image}
						/>
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
