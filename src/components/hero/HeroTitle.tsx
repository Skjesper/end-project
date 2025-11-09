'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import localFont from 'next/font/local'
import styles from './HeroTitle.module.css'

import Dither from './Dither'

gsap.registerPlugin(SplitText)

export default function HeroTitle() {
	const titleRef = useRef<HTMLHeadingElement>(null)

	useEffect(() => {
		if (!titleRef.current) return

		const titleSplit = new SplitText(titleRef.current, {
			type: 'words,chars',
			charsClass: 'char'
		})

		// Animate title chars with alternating directions
		titleSplit.chars.forEach((char, index) => {
			const yValue = index % 2 === 0 ? 100 : -100 // Even from below, odd from above

			gsap.from(char, {
				duration: 1,
				y: yValue,
				opacity: 0,
				ease: 'back.out(1.7)',
				delay: index * 0.05
			})
		})

		return () => {
			titleSplit.revert()
		}
	}, [])

	return (
		<div className={`${styles.container}`}>
			{/* <div className={styles.heroImg}> */}
			<div className={styles.ditherWrapper}>
				{/* <Dither
					waveColor={[0.5, 0.5, 0.5]}
					disableAnimation={false}
					enableMouseInteraction={true}
					mouseRadius={0.3}
					colorNum={4}
					waveAmplitude={0.3}
					waveFrequency={3}
					waveSpeed={0.05}
				/> */}
			</div>
			<h1
				ref={titleRef}
				className={styles.title}
				style={{ fontFamily: 'var(--font-display)' }}
			>
				OCULUS CAPIENS
			</h1>
		</div>
	)
}
