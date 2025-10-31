'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './ProductImageGallery.module.css'
import ImageIndicator from '@/components/ui/imageIndicator/ImageIndicator'

interface ProductImage {
	url: string
	altText: string | null
}

interface ProductImageGalleryProps {
	images: ProductImage[]
	productTitle: string
}

export default function ProductImageGallery({
	images,
	productTitle
}: ProductImageGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const galleryRef = useRef<HTMLElement>(null)

	useEffect(() => {
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
	}, [])

	return (
		<div className={styles.galleryWrapper}>
			<section ref={galleryRef} className={styles.imageGallery}>
				{images.length > 0 ? (
					images.map((image, index) => (
						<div key={index}>
							<img src={image.url} alt={image.altText || productTitle} />
						</div>
					))
				) : (
					<p>No images available</p>
				)}
			</section>
			<ImageIndicator totalImages={images.length} currentIndex={currentIndex} />
		</div>
	)
}
