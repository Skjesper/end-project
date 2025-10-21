'use client'

import { use, useState, useEffect } from 'react'
import ProductGrid from '@/components/products/ProductGrid'
import { getProductsByCollection } from '@/lib/shopify'
import { Product } from '@/types/product'

interface CategoryPageProps {
	params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
	const { slug } = use(params)
	const [collection, setCollection] = useState<any>(null)
	const [allProducts, setAllProducts] = useState<Product[]>([])
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
	const [showSaleOnly, setShowSaleOnly] = useState(false)

	useEffect(() => {
		async function loadData() {
			const data = await getProductsByCollection(slug)
			console.log('All products loaded:', data.products)
			setCollection(data.collection)
			setAllProducts(data.products)
			setFilteredProducts(data.products)
		}
		loadData()
	}, [slug])

	useEffect(() => {
		if (showSaleOnly) {
			const filtered = allProducts.filter((p) =>
				p.tags?.some((tag) => tag.toLowerCase().trim() === 'sale')
			)
			console.log('Filtered products:', filtered)
			setFilteredProducts(filtered)
		} else {
			setFilteredProducts(allProducts)
		}
	}, [showSaleOnly, allProducts])

	if (!collection) {
		return <p>Category not found</p>
	}

	return (
		<div>
			<h1>{collection.title}</h1>
			<p>{collection.description}</p>
			<button onClick={() => setShowSaleOnly(!showSaleOnly)}>
				{showSaleOnly ? 'Show All' : 'Sale Only'}
			</button>
			<p>Showing {filteredProducts.length} products</p>
			<ProductGrid products={filteredProducts} />
		</div>
	)
}
