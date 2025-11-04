'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import localFont from 'next/font/local'
import styles from './CategorySideScroll.module.css'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const images = [
	{ src: '/assets/images/testimg1.png', alt: 'Product 1' },
	{ src: '/assets/images/testimg2.png', alt: 'Product 2' },
	{ src: '/assets/images/testimg1.png', alt: 'Product 3' },
	{ src: '/assets/images/testimg2.png', alt: 'Product 4' },
	{ src: '/assets/images/testimg1.png', alt: 'Product 5' },
	{ src: '/assets/images/testimg2.png', alt: 'Product 6' }
]

export default function CategorySideScroll() {
	const sectionRef = useRef<HTMLDivElement>(null)
	const imagesRef = useRef<(HTMLDivElement | null)[]>([])
	const categoryContainerRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: categoryContainerRef.current,
				start: 'center center', // Pin starts when container enters viewport
				end: '+=2000', // Stay pinned for 2000px of scroll
				scrub: 0.5,
				markers: true,
				pin: categoryContainerRef.current // Pin the container
				// pinSpacing: true,
				// anticipatePin: 1
			}
		})

		tl.fromTo(
			imagesRef.current,
			{ '--progress': 1 },
			{ '--progress': -1, stagger: 0.25, ease: 'none' }
		)
	}, [])

	return (
		<div ref={categoryContainerRef} className={styles.categoryContainer}>
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
					</div>
				))}
			</section>
		</div>
	)
}
