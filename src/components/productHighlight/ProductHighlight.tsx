'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import styles from './ProductHighlight.module.css'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function ProductHighlightTest() {
	const containerRef = useRef<HTMLDivElement>(null)
	const leftImageRef = useRef<HTMLDivElement>(null)
	const rightImageRef = useRef<HTMLDivElement>(null)
	const swiperRef = useRef<HTMLElement>(null)
	const subtitleRef = useRef<HTMLHeadingElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)

	useGSAP(
		() => {
			// Split text into words
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

			let hasCompletedOnce = false

			// One timeline for everything
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top top',
					end: '+=150%',
					scrub: 1,
					markers: true,
					pin: true,
					anticipatePin: 1,
					onUpdate: (self) => {
						// When timeline completes (progress reaches 1)
						if (self.progress === 1 && !hasCompletedOnce) {
							hasCompletedOnce = true
							console.log('Timeline completed! Now locked in final state.')

							// Kill the ScrollTrigger so it can't be scrolled anymore
							self.kill()

							// Set timeline to final state
							tl.progress(1)
						}
					}
				}
			})

			// 1. Animate left image (position 0-1)
			tl.from(
				leftImageRef.current,
				{
					x: -200,
					opacity: 0,
					duration: 1
				},
				0
			)

				// 2. Animate right image (position 0-1, simultaneous with left)
				.from(
					rightImageRef.current,
					{
						x: 200,
						opacity: 0,
						duration: 1
					},
					0
				)

				// 3. Animate subtitle words (position 1-2, after images)
				.from(
					splitSubtitle.words,
					{
						opacity: 0,
						y: 50,
						duration: 0.5,
						stagger: 0.1,
						ease: 'power2.out'
					},
					1
				)

				// 4. Animate title words (position 1.8-2.5, slightly overlapping subtitle)
				.from(
					splitTitle.words,
					{
						opacity: 0,
						y: 50,
						duration: 0.5,
						stagger: 0.15,
						ease: 'power2.out'
					},
					1.8
				)

				// 5. Animate swiper (position 2.5-3.5, after text)
				.from(
					swiperRef.current,
					{
						y: 100,
						opacity: 0,
						duration: 1,
						ease: 'power2.out'
					},
					2.5
				)
		},
		{ scope: containerRef }
	)

	return (
		<div
			ref={containerRef}
			className={styles.container}
			style={{ minHeight: '100vh' }}
		>
			<div className={styles.contentWrapper}>
				<div className={styles.titleSection}>
					<h2 ref={subtitleRef} className={styles.subtitle}>
						New in
					</h2>
					<h1 ref={titleRef} className={styles.title}>
						AW 25
					</h1>
				</div>
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
		</div>
	)
}
