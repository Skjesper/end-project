'use client'

import { useState, useEffect } from 'react'
import { getProductsByCollection } from '@/lib/shopify'
import {
	extractUniqueCategories,
	filterProductsByCategory
} from '@/utils/categoryFilter'
import { Product } from '@/types/product'

export default function TestCategoriesPage() {
	const [products, setProducts] = useState<Product[]>([])
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
	const [categories, setCategories] = useState<string[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

	useEffect(() => {
		async function loadData() {
			const data = await getProductsByCollection('men')
			setProducts(data.products)
			setFilteredProducts(data.products)

			const cats = extractUniqueCategories(data.products)
			setCategories(cats)

			console.log('All products:', data.products)
			console.log('Categories found:', cats)
		}
		loadData()
	}, [])

	useEffect(() => {
		const filtered = filterProductsByCategory(products, selectedCategory)
		setFilteredProducts(filtered)
		console.log('Selected category:', selectedCategory)
		console.log('Filtered products:', filtered)
	}, [selectedCategory, products])

	return (
		<div style={{ padding: '2rem' }}>
			<h1>Category Filter Test</h1>

			<div style={{ marginBottom: '2rem' }}>
				<h2>Categories Found:</h2>
				<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
					<button
						onClick={() => setSelectedCategory(null)}
						style={{
							padding: '0.5rem 1rem',
							background: selectedCategory === null ? 'blue' : 'gray',
							color: 'white',
							border: 'none',
							cursor: 'pointer'
						}}
					>
						All ({products.length})
					</button>
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => setSelectedCategory(cat)}
							style={{
								padding: '0.5rem 1rem',
								background: selectedCategory === cat ? 'blue' : 'gray',
								color: 'white',
								border: 'none',
								cursor: 'pointer'
							}}
						>
							{cat}
						</button>
					))}
				</div>
			</div>

			<div>
				<h2>Showing: {filteredProducts.length} products</h2>
				<div style={{ display: 'grid', gap: '1rem' }}>
					{filteredProducts.map((product) => (
						<div
							key={product.id}
							style={{
								border: '1px solid #ccc',
								padding: '1rem',
								borderRadius: '8px'
							}}
						>
							<h3>{product.title}</h3>
							<p>
								<strong>Category:</strong> {product.category || 'No category'}
							</p>
							<img
								src={product.images[0]?.url}
								alt={product.title}
								style={{ width: '100px', height: '100px', objectFit: 'cover' }}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
