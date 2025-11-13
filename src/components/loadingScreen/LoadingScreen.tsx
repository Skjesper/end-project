'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import styles from './LoadingScreen.module.css'
import CountUp from './countUp/CountUp'

interface LoadingScreenProps {
	onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [shouldAnimate, setShouldAnimate] = useState(false)

	useGSAP(
		() => {
			if (shouldAnimate) {
				gsap.to(containerRef.current, {
					y: '100%',
					duration: 1,
					ease: 'power3.inOut',
					onComplete: () => {
						if (onComplete) {
							onComplete()
						}
					}
				})
			}
		},
		{ scope: containerRef, dependencies: [shouldAnimate] }
	)

	const handleCountUpEnd = () => {
		setShouldAnimate(true)
	}

	return (
		<div ref={containerRef} className={styles.container}>
			<CountUp
				from={0}
				to={100}
				separator=","
				direction="up"
				duration={3}
				endDelay={2200}
				className={styles.countUpText}
				onEnd={handleCountUpEnd}
			/>
		</div>
	)
}
