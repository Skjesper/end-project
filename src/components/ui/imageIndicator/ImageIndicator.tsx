'use client'

import styles from './ImageIndicator.module.css'

interface ImageIndicatorProps {
	totalImages: number
	currentIndex: number
}

export default function ImageIndicator({
	totalImages,
	currentIndex
}: ImageIndicatorProps) {
	return (
		<div className={styles.indicator}>
			{Array.from({ length: totalImages }).map((_, index) => (
				<div
					key={index}
					className={`${styles.dot} ${
						index === currentIndex ? styles.active : ''
					}`}
				/>
			))}
		</div>
	)
}
