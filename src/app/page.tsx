import CategorySideScroll from '@/components/categorySideScroll/CategorySideScroll'
import HeroTitle from '@/components/hero/HeroTitle'
import ProductHighlight from '@/components/productHighlight/ProductHighlight'
import Dither from '@/components/hero/Dither'
import MySwiper from '@/components/products/carousel/Carousel'

export default function Home() {
	return (
		<main>
			<HeroTitle />

			<ProductHighlight />

			<CategorySideScroll />

			<MySwiper />
		</main>
	)
}
