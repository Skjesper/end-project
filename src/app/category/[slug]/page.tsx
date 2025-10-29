'use client'

import { use, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/products/productGrid/ProductGrid'
import TagFilter from '@/components/collection/tagFilter/TagFilter'
import { getProductsByCollection } from '@/lib/shopify'
import { Product } from '@/types/product'
import {
	extractUniqueCategories,
	filterProductsByCategory
} from '@/utils/categoryFilter'
import { extractUniqueTags, filterProductsByTag } from '@/utils/tagFilter'
import styles from './page.module.css'

interface CategoryPageProps {
	params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
	const { slug } = use(params)
	const searchParams = useSearchParams()
	const categoryFromUrl = searchParams.get('category')

	const [collection, setCollection] = useState<any>(null)
	const [products, setProducts] = useState<Product[]>([])
	const [categoryFilteredProducts, setCategoryFilteredProducts] = useState<
		Product[]
	>([])
	const [finalFilteredProducts, setFinalFilteredProducts] = useState<Product[]>(
		[]
	)

	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		categoryFromUrl
	)
	const [selectedTag, setSelectedTag] = useState<string | null>(null)

	const [availableCategories, setAvailableCategories] = useState<string[]>([])
	const [availableTags, setAvailableTags] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(true)

	// Load initial data
	useEffect(() => {
		async function loadData() {
			try {
				const data = await getProductsByCollection(slug)
				setCollection(data.collection)
				setProducts(data.products)
				setCategoryFilteredProducts(data.products)
				setFinalFilteredProducts(data.products)

				// Extract categories
				const categories = extractUniqueCategories(data.products)
				setAvailableCategories(categories)

				// Extract tags
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

	// Set selected category from URL
	useEffect(() => {
		if (categoryFromUrl) {
			setSelectedCategory(categoryFromUrl)
		}
	}, [categoryFromUrl])

	// First filter: by category (from URL)
	useEffect(() => {
		const filtered = filterProductsByCategory(products, selectedCategory)
		setCategoryFilteredProducts(filtered)

		// Update available tags based on category-filtered products
		const tags = extractUniqueTags(filtered)
		setAvailableTags(tags)

		// Reset tag selection when category changes
		setSelectedTag(null)
	}, [selectedCategory, products])

	// Second filter: by tag (from page filter)
	useEffect(() => {
		const filtered = filterProductsByTag(categoryFilteredProducts, selectedTag)
		setFinalFilteredProducts(filtered)
	}, [selectedTag, categoryFilteredProducts])

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
					<h1 className={styles.collectionTitle}>
						{collection.title}
						{selectedCategory && ` - ${selectedCategory}`}
					</h1>
					{collection.description && (
						<p className={styles.descriptionText}>{collection.description}</p>
					)}
				</section>
				<section className={styles.filterSection}>
					<TagFilter
						tags={availableTags}
						selectedTag={selectedTag}
						onTagChange={setSelectedTag}
					/>
					<p className={styles.count}>
						{finalFilteredProducts.length}{' '}
						{finalFilteredProducts.length === 1 ? 'product' : 'products'}
					</p>
				</section>
			</header>

			<div className={styles.content}>
				<ProductGrid products={finalFilteredProducts} />
			</div>
		</div>
	)
}
