'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
// import localFont from 'next/font/local'
import styles from './HeroTitle.module.css'
import Image from 'next/image'
import Waves from './Waves'

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
			<div className={styles.titleContainer}>
				<h1
					ref={titleRef}
					className={styles.title}
					style={{ fontFamily: 'var(--font-display)' }}
				>
					SKJESP
				</h1>
			</div>
			<div className={styles.ditherWrapper}>
				<Waves
					lineColor="#a82121"
					backgroundColor="rgb(255, 255, 255)"
					waveSpeedX={0.02}
					waveSpeedY={0.01}
					waveAmpX={40}
					waveAmpY={20}
					friction={0.9}
					tension={0.01}
					maxCursorMove={120}
					xGap={12}
					yGap={36}
				/>
			</div>
		</div>
	)
}
