import CategorySideScroll from '@/components/categorySideScroll/CategorySideScroll'
import HeroTitle from '@/components/hero/HeroTitle'
import ProductHighlight from '@/components/productHighlight/ProductHighlight'

export default function Home() {
	return (
		<main>
			<HeroTitle />

			<ProductHighlight />

			<CategorySideScroll />
		</main>
	)
}
