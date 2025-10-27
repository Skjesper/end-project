'use client'

import { use, useState, useEffect } from 'react'
import ProductGrid from '@/components/products/productGrid/ProductGrid'
import TagFilter from '@/components/collection/tagFilter/TagFilter'
import { getProductsByCollection } from '@/lib/shopify'
import { Product } from '@/types/product'
import { extractUniqueTags, filterProductsByTag } from '@/utils/tagFilter'
import styles from './page.module.css'

interface CategoryPageProps {
	params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
	const { slug } = use(params)
	const [collection, setCollection] = useState<any>(null)
	const [products, setProducts] = useState<Product[]>([])
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
	const [selectedTag, setSelectedTag] = useState<string | null>(null)
	const [availableTags, setAvailableTags] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function loadData() {
			try {
				const data = await getProductsByCollection(slug)
				setCollection(data.collection)
				setProducts(data.products)
				setFilteredProducts(data.products)

				// Extract tags immediately
				const tags = extractUniqueTags(data.products)
				setAvailableTags(tags)
			} catch (error) {
				console.error('Error loading collection:', error)
			} finally {
				setIsLoading(false)
			}
		}
		loadData()
	}, [slug])

	// Filter products when tag changes
	useEffect(() => {
		const filtered = filterProductsByTag(products, selectedTag)
		setFilteredProducts(filtered)
	}, [selectedTag, products])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (!collection) {
		return <div>Collection not found</div>
	}

	return (
		<div className={styles.pageContainer}>
			<header className={styles.header}>
				<section className={styles.collectionSection}>
					<h1 className={styles.collectionTitle}>{collection.title}</h1>
					{collection.description && (
						<p className={styles.descriptionText}>{collection.description}</p>
					)}
				</section>

				<TagFilter
					tags={availableTags}
					selectedTag={selectedTag}
					onTagChange={setSelectedTag}
				/>
			</header>

			<div className={styles.content}>
				<p className={styles.count}>
					Showing {filteredProducts.length}{' '}
					{filteredProducts.length === 1 ? 'product' : 'products'}
				</p>

				<ProductGrid products={filteredProducts} />
			</div>
		</div>
	)
}
