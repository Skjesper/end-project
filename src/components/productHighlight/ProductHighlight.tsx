'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ProductHighlight.module.css'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function ProductHighlightTest() {
	const containerRef = useRef<HTMLDivElement>(null)
	const leftImageRef = useRef<HTMLDivElement>(null)
	const rightImageRef = useRef<HTMLDivElement>(null)
	const swiperRef = useRef<HTMLElement>(null)

	useGSAP(
		() => {
			// First timeline for pinned scroll animation
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top top',
					end: '+=100%',
					scrub: 1,
					markers: true,
					pin: true,
					anticipatePin: 1
				}
			})

			// Animate left image
			tl.from(
				leftImageRef.current,
				{
					x: -200,
					opacity: 0,
					duration: 1
				},
				0
			)

				// Animate right image (simultaneous with left)
				.from(
					rightImageRef.current,
					{
						x: 200,
						opacity: 0,
						duration: 1
					},
					0
				)

			// Separate animation for swiper - triggers after scroll/pin ends
			gsap.from(swiperRef.current, {
				y: 100,
				opacity: 0,
				duration: 1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: swiperRef.current,
					start: 'bottom 20%', // Triggers when swiper comes into view
					toggleActions: 'play none none none',
					markers: true
				}
			})
		},
		{ scope: containerRef }
	)

	return (
		<div
			ref={containerRef}
			className={styles.container}
			style={{ minHeight: '100vh' }}
		>
			<section className={styles.productSection}>
				<div ref={leftImageRef}>
					<Image
						src="/assets/images/testimg1.png"
						alt="Highlighted Product"
						width={400}
						height={500}
					/>
				</div>
				<div ref={rightImageRef}>
					<Image
						src="/assets/images/testimg2.png"
						alt="Highlighted Product"
						width={400}
						height={500}
					/>
				</div>
			</section>
			<section className={styles.swiperSection} ref={swiperRef}>
				<Image
					src="/assets/images/testimg1.png"
					alt="Highlighted Product"
					width={40}
					height={40}
				/>
				<Image
					src="/assets/images/testimg1.png"
					alt="Highlighted Product"
					width={40}
					height={40}
				/>
				<Image
					src="/assets/images/testimg1.png"
					alt="Highlighted Product"
					width={40}
					height={40}
				/>
				<Image
					src="/assets/images/testimg1.png"
					alt="Highlighted Product"
					width={40}
					height={40}
				/>
				<Image
					src="/assets/images/testimg1.png"
					alt="Highlighted Product"
					width={40}
					height={40}
				/>
			</section>
		</div>
	)
}
