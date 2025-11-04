import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ProductHighlight.module.css'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function ProductHighlightTest() {
	const containerRef = useRef<HTMLElement>(null)
	const leftImageRef = useRef<HTMLDivElement>(null)
	const rightImageRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		console.log('useGSAP running')
		console.log('containerRef:', containerRef.current)
		console.log('leftImageRef:', leftImageRef.current)
		console.log('rightImageRef:', rightImageRef.current)

		// Animate left image from left side
		gsap.from(leftImageRef.current, {
			x: -400,
			opacity: 0,
			duration: 1,
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top bottom',
				end: 'bottom top',
				scrub: true,
				markers: true,
				onEnter: () => console.log('Left image triggered!')
			}
		})

		// Animate right image from right side
		gsap.from(rightImageRef.current, {
			x: 400,
			opacity: 0,
			duration: 1,
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top bottom',
				end: 'bottom top',
				scrub: true,
				markers: true,
				onEnter: () => console.log('Right image triggered!')
			}
		})
	})

	return (
		<section className={styles.productSection} ref={containerRef}>
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
	)
}
