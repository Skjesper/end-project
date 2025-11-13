// src/components/collection/collection-content/CollectionContent.tsx
'use client'

import { useState, useEffect } from 'react'
import ProductGrid from '@/components/products/productGrid/ProductGrid'
import TagFilter from '../tagFilter/TagFilter'
import { Product } from '@/types/product'
import { extractUniqueTags, filterProductsByTag } from '@/utils/tagFilter'
import styles from './CollectionContent.module.css'

interface CollectionContentProps {
	products: Product[]
}

export default function CollectionContent({
	products
}: CollectionContentProps) {
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
	const [selectedTag, setSelectedTag] = useState<string | null>(null)
	const [availableTags, setAvailableTags] = useState<string[]>([])

	useEffect(() => {
		const tags = extractUniqueTags(products)
		setAvailableTags(tags)
	}, [products])

	useEffect(() => {
		const filtered = filterProductsByTag(products, selectedTag)
		setFilteredProducts(filtered)
	}, [selectedTag, products])

	return (
		<div className={styles.content}>
			<TagFilter
				tags={availableTags}
				selectedTag={selectedTag}
				onTagChange={setSelectedTag}
			/>

			<p className={styles.count}>
				Showing {filteredProducts.length}{' '}
				{filteredProducts.length === 1 ? 'product' : 'products'}
			</p>

			<ProductGrid products={filteredProducts} />
		</div>
	)
}
