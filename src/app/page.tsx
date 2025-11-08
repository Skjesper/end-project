import CategorySideScroll from '@/components/categorySideScroll/CategorySideScroll'
import HeroTitle from '@/components/hero/HeroTitle'

import MySwiper from '@/components/products/carousel/Carousel'

export default function Home() {
	return (
		<main>
			<HeroTitle />

			<MySwiper />

			<CategorySideScroll />
		</main>
	)
}
