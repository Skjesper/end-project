'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Carousel.module.css'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { getProductsByCollection } from '@/lib/shopify'
import { Product } from '@/types/product'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function MySwiper() {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
	const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null)
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)

	const containerRef = useRef<HTMLDivElement>(null)
	const mainSwiperRef = useRef<HTMLElement>(null)
	const thumbSwiperRef = useRef<HTMLElement>(null)
	const subtitleRef = useRef<HTMLHeadingElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)

	// Fetch products on mount
	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true)
			const data = await getProductsByCollection('aw25')
			setProducts(data.products)
			setLoading(false)
		}

		fetchProducts()
	}, [])

	useGSAP(
		() => {
			if (!subtitleRef.current || !titleRef.current || loading) return

			const splitSubtitle = new SplitText(subtitleRef.current, {
				type: 'words,chars',
				wordsClass: 'word',
				charsClass: 'char'
			})
			const splitTitle = new SplitText(titleRef.current, {
				type: 'words,chars',
				wordsClass: 'word',
				charsClass: 'char'
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top 50%',
					toggleActions: 'play none none none'
				}
			})

			tl.from(
				splitSubtitle.words,
				{
					opacity: 0,
					y: 50,
					duration: 0.3,
					stagger: 0.05,
					ease: 'power2.out'
				},
				0
			)
				.from(
					splitTitle.words,
					{
						opacity: 0,
						y: 50,
						duration: 0.3,
						stagger: 0.08,
						ease: 'power2.out'
					},
					0.4
				)
				.from(
					mainSwiperRef.current,
					{ y: -100, opacity: 0, duration: 0.6, ease: 'power2.out' },
					0.8
				)
				.from(
					thumbSwiperRef.current,
					{ y: 100, opacity: 0, duration: 0.6, ease: 'power2.out' },
					1.2
				)
		},
		{ scope: containerRef, dependencies: [loading] }
	)

	if (loading) {
		return (
			<div ref={containerRef} className={styles.container}>
				<div className={styles.contentWrapper}>
					<p>Loading...</p>
				</div>
			</div>
		)
	}

	if (products.length === 0) {
		return (
			<div ref={containerRef} className={styles.container}>
				<div className={styles.contentWrapper}>
					<p>No highlighted products found.</p>
				</div>
			</div>
		)
	}

	return (
		<div ref={containerRef} className={styles.container}>
			<div className={styles.contentWrapper}>
				<div className={styles.titleSection}>
					<h2 ref={subtitleRef} className={styles.subtitle}>
						New in
					</h2>
					<h1 ref={titleRef} className={styles.title}>
						AW 25
					</h1>
				</div>

				<section className={styles.productSection} ref={mainSwiperRef}>
					<Swiper
						modules={[Thumbs, FreeMode, Autoplay]}
						onSwiper={setMainSwiper}
						spaceBetween={30}
						slidesPerView={2}
						simulateTouch={true}
						allowTouchMove={true}
						grabCursor={true}
						autoplay={{
							delay: 5000,
							disableOnInteraction: true
						}}
						thumbs={{
							swiper:
								thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
						}}
						className={styles.mainSwiper}
						breakpoints={{
							320: {
								slidesPerView: 1,
								spaceBetween: 10
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 30
							}
						}}
					>
						{products.map((product) => (
							<SwiperSlide key={product.id} className={styles.mainSlide}>
								<Link href={`/item/${product.handle}`}>
									<Image
										src={product.images[0]?.url || '/placeholder.png'}
										alt={product.images[0]?.altText || product.title}
										width={320}
										height={400}
										className={styles.mainSlideImage}
									/>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				</section>

				<section className={styles.swiperSection} ref={thumbSwiperRef}>
					<Swiper
						modules={[Thumbs, FreeMode]}
						onSwiper={setThumbsSwiper}
						spaceBetween={6}
						slidesPerView={5}
						freeMode={true}
						watchSlidesProgress={true}
						className={styles.thumbSwiper}
						breakpoints={{
							320: {
								slidesPerView: 3
							},
							768: {
								slidesPerView: 5
							}
						}}
					>
						{products.map((product) => (
							<SwiperSlide
								key={`thumb-${product.id}`}
								className={styles.thumbSlide}
							>
								<Image
									src={product.images[0]?.url || '/placeholder.png'}
									alt={product.images[0]?.altText || product.title}
									width={200}
									height={240}
									className={styles.thumbImage}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</section>
			</div>
		</div>
	)
}
