'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './page.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollTriggerPage() {
	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: `.${styles.container}`,
				start: 'top top',
				end: '+=2000',
				scrub: 2,
				pin: true,
				markers: true
			}
		})

		// Animate first box
		tl.to(`.${styles.box}:nth-child(1)`, {
			x: '80vw',
			duration: 1,
			ease: 'none'
		})

		// Then animate second box (starts after previous animation)
		tl.to(
			`.${styles.box}:nth-child(2)`,
			{
				x: '80vw',
				duration: 2,
				ease: 'none'
			},
			'>'
		) // This means "start at the END of the previous animation"

		// Then animate third box
		tl.to(
			`.${styles.box}:nth-child(3)`,
			{
				x: '80vw',
				duration: 1,
				ease: 'none'
			},
			'>'
		)
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.boxContainer}>
				<div className={styles.box}></div>
				<div className={styles.box}></div>
				<div className={styles.box}></div>
			</div>
		</div>
	)
}

export default function ScrollTriggerPageTest() {


}