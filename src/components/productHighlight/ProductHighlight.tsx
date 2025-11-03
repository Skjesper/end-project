'use client'

import React from 'react'
import styles from './ProductHighlight.module.css'
import Image from 'next/image'

export default function ProductHighlight() {
	return (
		<>
			<div className={styles.container}>
				<section className={styles.productSection}>
					<Image
						src="/assets/images/testimg1.png"
						alt="Highlighted Product"
						width={400}
						height={500}
					></Image>
					<Image
						src="/assets/images/testimg2.png"
						alt="Highlighted Product"
						width={400}
						height={500}
					></Image>
				</section>
			</div>
		</>
	)
}
