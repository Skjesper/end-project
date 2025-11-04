import HeroTitle from '@/components/hero/HeroTitle'
import ProductHighlight from '@/components/productHighlight/ProductHighlight'

export default function Home() {
	// Remove 'async' if you don't need it
	return (
		<main>
			<HeroTitle />
			<div style={{ height: '100vh', background: '#000' }}>
				<h1 style={{ color: 'white', padding: '2rem' }}>Scroll down</h1>
			</div>

			<ProductHighlight />

			<div style={{ height: '100vh', background: '#333' }}>
				<h1 style={{ color: 'white', padding: '2rem' }}>After component</h1>
			</div>
		</main>
	)
}
