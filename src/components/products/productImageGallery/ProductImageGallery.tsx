'use client'

import { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import styles from './ProductImageGallery.module.css'
import ImageIndicator from '@/components/ui/imageIndicator/ImageIndicator'

interface ProductImage {
	url: string
	altText: string | null
}

interface ProductImageGalleryProps {
	images: ProductImage[]
	productTitle: string
	favoriteButton?: React.ReactNode
}

export default function ProductImageGallery({
	images,
	productTitle,
	favoriteButton
}: ProductImageGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isMobile, setIsMobile] = useState(false)
	const galleryRef = useRef<HTMLElement>(null)

	// Check if mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)

		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	// Native scroll tracking for desktop
	useEffect(() => {
		if (isMobile) return

		const gallery = galleryRef.current
		if (!gallery) return

		const handleScroll = () => {
			const scrollLeft = gallery.scrollLeft
			const imageWidth = gallery.offsetWidth
			const index = Math.round(scrollLeft / imageWidth)
			setCurrentIndex(index)
		}

		gallery.addEventListener('scroll', handleScroll)
		return () => gallery.removeEventListener('scroll', handleScroll)
	}, [isMobile])

	// Swiper slide change handler
	const handleSlideChange = (swiper: SwiperType) => {
		setCurrentIndex(swiper.activeIndex)
	}

	if (images.length === 0) {
		return <p>No images available</p>
	}

	return (
		<div className={styles.galleryWrapper}>
			{favoriteButton && (
				<div className={styles.favoriteButton}>{favoriteButton}</div>
			)}
			{isMobile ? (
				// Mobile: Swiper
				<>
					<Swiper
						spaceBetween={0}
						slidesPerView={1}
						onSlideChange={handleSlideChange}
						className={styles.mobileSwiper}
					>
						{images.map((image, index) => (
							<SwiperSlide key={index}>
								<div className={styles.swiperImageWrapper}>
									<img
										src={image.url}
										alt={image.altText || productTitle}
										className={styles.swiperImage}
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<ImageIndicator
						totalImages={images.length}
						currentIndex={currentIndex}
					/>
				</>
			) : (
				// Desktop: Native scroll
				<>
					<section ref={galleryRef} className={styles.imageGallery}>
						{images.map((image, index) => (
							<div key={index}>
								<img src={image.url} alt={image.altText || productTitle} />
							</div>
						))}
					</section>
					<ImageIndicator
						totalImages={images.length}
						currentIndex={currentIndex}
					/>
				</>
			)}
		</div>
	)
}
