'use client'

import { useRef, useEffect } from 'react'
import styles from '@/components/productHighlight/ProductHighlight.module.css'
import Image from 'next/image'

export default function ProductHighlightTest() {
	const containerRef = useRef<HTMLDivElement>(null)
	const leftImageRef = useRef<HTMLDivElement>(null)
	const rightImageRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		alert('Component mounted!')
		console.log('HELLO FROM CONSOLE')
	}, [])

	return (
		<div ref={containerRef} className={styles.container}>
			<h1 style={{ color: 'yellow', background: 'red', padding: '20px' }}>
				COMPONENT IS HERE
			</h1>
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
		</div>
	)
}
