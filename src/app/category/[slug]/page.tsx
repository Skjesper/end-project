// src/app/category/[slug]/page.tsx
'use client'

import { use, useState, useEffect } from 'react'
import CollectionContent from '@/components/collection/collectionContent/CollectionContent'
import { getProductsByCollection } from '@/lib/shopify'
import { Product } from '@/types/product'
import styles from './page.module.css'

interface CategoryPageProps {
	params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
	const { slug } = use(params)
	const [collection, setCollection] = useState<any>(null)
	const [products, setProducts] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function loadData() {
			try {
				const data = await getProductsByCollection(slug)
				setCollection(data.collection)
				setProducts(data.products)
			} catch (error) {
				console.error('Error loading collection:', error)
			} finally {
				setIsLoading(false)
			}
		}
		loadData()
	}, [slug])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (!collection) {
		return <div>Collection not found</div>
	}

	return (
		<div className={styles.pageContainer}>
			<header>
				<section className={styles.collectionSection}>
					<h1 className={styles.collectionTitle}>{collection.title}</h1>
					{collection.description && (
						<p className={styles.descriptionText}>{collection.description}</p>
					)}
				</section>
			</header>

			<CollectionContent products={products} />
		</div>
	)
}
