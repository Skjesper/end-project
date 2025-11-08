'use client'

import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import Image from 'next/image'
import styles from './Carousel.module.css'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface ImageData {
	src: string
	alt: string
}

export default function MySwiper() {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
	const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null)

	const images: ImageData[] = [
		{ src: '/assets/images/testimg1.png', alt: 'Product 1' },
		{ src: '/assets/images/testimg2.png', alt: 'Product 2' },
		{ src: '/assets/images/testimg1.png', alt: 'Product 3' },
		{ src: '/assets/images/testimg2.png', alt: 'Product 4' },
		{ src: '/assets/images/testimg1.png', alt: 'Product 5' }
	]

	const containerRef = useRef<HTMLDivElement>(null)
	const mainSwiperRef = useRef<HTMLElement>(null)
	const thumbSwiperRef = useRef<HTMLElement>(null)
	const subtitleRef = useRef<HTMLHeadingElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)

	useGSAP(
		() => {
			// Only animate if elements exist
			if (!subtitleRef.current || !titleRef.current) return

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
					start: 'top top',
					end: '+=100%',
					scrub: 1,
					// markers: true,
					pin: true,
					anticipatePin: 1,
					id: 'product-highlight'
				}
			})

			tl.from(
				splitSubtitle.words,
				{
					opacity: 0,
					y: 50,
					duration: 0.5,
					stagger: 0.1,
					ease: 'power2.out'
				},
				0
			)
				.from(
					splitTitle.words,
					{
						opacity: 0,
						y: 50,
						duration: 0.5,
						stagger: 0.15,
						ease: 'power2.out'
					},
					0.8
				)
				.from(
					mainSwiperRef.current,
					{ y: -100, opacity: 0, duration: 1, ease: 'power2.out' },
					1.5
				)
				.from(
					thumbSwiperRef.current,
					{ y: 100, opacity: 0, duration: 1, ease: 'power2.out' },
					2.5
				)
		},
		{ scope: containerRef }
	)

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
						autoplay={{
							delay: 6000,
							disableOnInteraction: false
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
						{images.map((image, index) => (
							<SwiperSlide key={index} className={styles.mainSlide}>
								<Image
									src={image.src}
									alt={image.alt}
									width={320}
									height={400}
									className={styles.mainSlideImage}
								/>
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
						{images.map((image, index) => (
							<SwiperSlide key={index} className={styles.thumbSlide}>
								<Image
									src={image.src}
									alt={image.alt}
									width={50}
									height={60}
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
