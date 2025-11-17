'use client'

import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import styles from './CategorySideScroll.module.css'
import Image from 'next/image'
import { useIsMobile } from '@/hooks/useIsMobile'
import { getProductsByCollection } from '@/lib/shopify'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Collections from 2020-2025
const FEATURED_COLLECTIONS = ['aw20', 'aw21', 'aw22', 'aw23', 'aw24', 'aw25']

export default function CategorySideScroll() {
	const isMobile = useIsMobile()
	const [images, setImages] = useState<
		Array<{ src: string; alt: string; number: string; collection: string }>
	>([])
	const [loading, setLoading] = useState(true)
	const sectionRef = useRef<HTMLDivElement>(null)
	const imagesRef = useRef<(HTMLDivElement | null)[]>([])
	const bottomTextRef = useRef<HTMLDivElement>(null)
	const categoryContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		async function loadCollectionImages() {
			setLoading(true)
			const imagePromises = FEATURED_COLLECTIONS.map(
				async (collectionHandle, index) => {
					const data = await getProductsByCollection(collectionHandle)

					// Get a random product from the collection
					const randomProduct =
						data.products[Math.floor(Math.random() * data.products.length)]

					return {
						src: randomProduct?.images[0]?.url || '/placeholder.png',
						alt: `${data.collection?.title || collectionHandle} collection`,
						number: `0${index + 1}`,
						collection: data.collection?.title || collectionHandle.toUpperCase()
					}
				}
			)

			const collectionImages = await Promise.all(imagePromises)
			setImages(collectionImages)
			setLoading(false)
		}

		loadCollectionImages()
	}, [])

	useGSAP(
		() => {
			if (images.length === 0) return

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: categoryContainerRef.current,
					start: 'top top',
					end: '+=2000',
					scrub: 0.5,
					pin: categoryContainerRef.current
				}
			})

			tl.fromTo(
				imagesRef.current,
				{ '--progress': 1 },
				{ '--progress': -1, stagger: isMobile ? 0.2 : 0.1, ease: 'none' }
			)

			if (bottomTextRef.current) {
				const text = new SplitText(bottomTextRef.current.querySelector('h2'), {
					type: 'words'
				})

				gsap.from(text.words, {
					opacity: 0,
					y: 20,
					duration: 1.5,
					stagger: 0.4,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: categoryContainerRef.current,
						start: 'top top',
						once: true
					}
				})
			}
		},
		{ dependencies: [isMobile, images], revertOnUpdate: true }
	)

	if (loading) {
		return (
			<div className={styles.categoryContainer}>Loading collections...</div>
		)
	}

	return (
		<div ref={categoryContainerRef} className={styles.categoryContainer}>
			<h1>GALLERY.</h1>
			<section ref={sectionRef} className={styles.categorySection}>
				{images.map((image, index) => (
					<div
						key={index}
						ref={(element) => {
							if (element) imagesRef.current[index] = element
						}}
						className={styles.imageWrapper}
					>
						<Image src={image.src} alt={image.alt} width={400} height={500} />
						<span className={styles.imageNumber}>{image.collection}.</span>
					</div>
				))}
			</section>
			<div ref={bottomTextRef} className={styles.bottomText}>
				<h2>COLLECTIONS 20-25</h2>
			</div>
		</div>
	)
}
