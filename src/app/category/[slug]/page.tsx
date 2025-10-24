'use client'

import { use, useState, useEffect } from 'react'
import ProductGrid from '@/components/products/ProductGrid'
import Button from '@/components/ui/button/Button'
import { getProductsByCollection } from '@/lib/shopify'
import { Product } from '@/types/product'
import { extractUniqueTags, filterProductsByTag } from '@/utils/tagFilter'

interface CategoryPageProps {
	params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
	const { slug } = use(params)
	const [collection, setCollection] = useState<any>(null)
	const [allProducts, setAllProducts] = useState<Product[]>([])
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
	const [selectedTag, setSelectedTag] = useState<string | null>(null)
	const [availableTags, setAvailableTags] = useState<string[]>([])

	useEffect(() => {
		async function loadData() {
			const data = await getProductsByCollection(slug)
			setCollection(data.collection)
			setAllProducts(data.products)
			setFilteredProducts(data.products)

			const tags = extractUniqueTags(data.products)
			setAvailableTags(tags)
		}
		loadData()
	}, [slug])

	useEffect(() => {
		const filtered = filterProductsByTag(allProducts, selectedTag)
		setFilteredProducts(filtered)
	}, [selectedTag, allProducts])

	if (!collection) {
		return <p>Category not found</p>
	}

	return (
		<div>
			<h1>{collection.title}</h1>
			<p>{collection.description}</p>

			<div>
				<Button
					variant="filter"
					isActive={selectedTag === null}
					onClick={() => setSelectedTag(null)}
				>
					All
				</Button>
				{availableTags.map((tag) => (
					<Button
						key={tag}
						variant="filter"
						isActive={selectedTag === tag}
						onClick={() => setSelectedTag(tag)}
					>
						{tag}
					</Button>
				))}
			</div>

			<p>Showing {filteredProducts.length} products</p>
			<ProductGrid products={filteredProducts} />
		</div>
	)
}
