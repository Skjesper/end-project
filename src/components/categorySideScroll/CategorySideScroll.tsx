'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import styles from './CategorySideScroll.module.css'
import Image from 'next/image'
import { useIsMobile } from '@/hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger, SplitText)

const images = [
	{ src: '/assets/images/testimg1.png', alt: 'Product 1', number: '01' },
	{ src: '/assets/images/testimg2.png', alt: 'Product 2', number: '02' },
	{ src: '/assets/images/testimg1.png', alt: 'Product 3', number: '03' },
	{ src: '/assets/images/testimg2.png', alt: 'Product 4', number: '04' },
	{ src: '/assets/images/testimg1.png', alt: 'Product 5', number: '05' },
	{ src: '/assets/images/testimg2.png', alt: 'Product 6', number: '06' }
]

export default function CategorySideScroll() {
	const isMobile = useIsMobile()
	const sectionRef = useRef<HTMLDivElement>(null)
	const imagesRef = useRef<(HTMLDivElement | null)[]>([])
	const bottomTextRef = useRef<HTMLDivElement>(null)
	const categoryContainerRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
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
		{ dependencies: [isMobile], revertOnUpdate: true }
	)

	return (
		<div ref={categoryContainerRef} className={styles.categoryContainer}>
			<h1>GALLERY</h1>
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
						<span className={styles.imageNumber}>{image.number}.</span>
					</div>
				))}
			</section>
			<div ref={bottomTextRef} className={styles.bottomText}>
				<h2>COLLECTIONS 17-25</h2>
			</div>
		</div>
	)
}
