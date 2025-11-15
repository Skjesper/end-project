'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types/product'
import styles from './ProductCard.module.css'
import Image from 'next/image'
import FavoriteButton from '@/components/ui/button/FavoritesButton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ProductCardProps {
	product: Product
	className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
	const [isSwiping, setIsSwiping] = useState(false)
	const price = parseFloat(product.priceRange.minVariantPrice.amount)
	const currency = product.priceRange.minVariantPrice.currencyCode
	const primaryImage = product.images[0]

	const handleClick = (e: React.MouseEvent) => {
		if (isSwiping) {
			e.preventDefault()
		}
	}

	return (
		<article className={className}>
			<Link
				href={`/item/${product.handle}`}
				className={styles.card}
				onClick={handleClick}
			>
				<div className={styles.imageContainer}>
					<div className={styles.cardHeader}></div>

					<div className={styles.imageWrapper}>
						{product.images.length > 0 ? (
							<Swiper
								modules={[Navigation, Pagination]}
								spaceBetween={0}
								slidesPerView={1}
								navigation={true}
								pagination={{
									clickable: true,
									dynamicBullets: false
								}}
								onTouchStart={() => setIsSwiping(true)}
								onTouchEnd={() => setIsSwiping(false)}
								className={styles.productCardSwiper}
							>
								{product.images.map((image, index) => (
									<SwiperSlide key={index}>
										<img
											src={image.url}
											alt={image.altText || `${product.title} ${index + 1}`}
											className={styles.image}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						) : (
							<div>No image</div>
						)}
					</div>

					<div className={styles.favoriteButton}>
						<FavoriteButton
							productId={product.id}
							variantId={product.variants?.[0]?.id || product.id}
							handle={product.handle}
							title={product.title}
							image={primaryImage?.url || ''}
							price={price}
							currency={currency}
						/>
					</div>
				</div>

				<div className={styles.infoContainer}>
					<div className={styles.defaultInfo}>
						<h3 className={styles.title}>{product.title}</h3>

						<p className={styles.price}>
							<span className={styles.priceWrapper}>
								<Image
									src="/assets/images/PriceTag.png"
									alt="Price tag"
									width={200}
									height={80}
									className={styles.priceImage}
								/>
								<span className={styles.priceText}>
									{price.toFixed(2)} {currency}
								</span>
							</span>
						</p>
					</div>
				</div>
			</Link>
		</article>
	)
}
