'use client'

import { useState } from 'react'
import CategorySideScroll from '@/components/categorySideScroll/CategorySideScroll'
import HeroTitle from '@/components/hero/HeroTitle'

import MySwiper from '@/components/products/carousel/Carousel'
import LoadingScreen from '@/components/loadingScreen/LoadingScreen'

export default function Home() {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<main>
			{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
			{!isLoading && (
				<>
					<HeroTitle />
					<ProductHighlight />
					<CategorySideScroll />
				</>
			)}
		</main>
	)
}
