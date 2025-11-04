import CategorySideScroll from '@/components/categorySideScroll/CategorySideScroll'
import HeroTitle from '@/components/hero/HeroTitle'
import ProductHighlight from '@/components/productHighlight/ProductHighlight'
import { Category } from '@mui/icons-material'

export default function Home() {
	// Remove 'async' if you don't need it
	return (
		<main>
			<HeroTitle />

			{/* <ProductHighlight /> */}

			<CategorySideScroll />

			<div style={{ height: '100vh', background: '#333' }}>
				<h1 style={{ color: 'white', padding: '2rem' }}>After component</h1>
			</div>
		</main>
	)
}
