// components/ui/categoryList/CategoryList.tsx
'use client'

import Link from 'next/link'
import styles from './CategoryList.module.css'

interface CategoryListProps {
	categories: string[]
	categoryType: string
	onCategoryClick?: () => void
}

export default function CategoryList({
	categories,
	categoryType,
	onCategoryClick
}: CategoryListProps) {
	return (
		<ul className={styles.categoryList}>
			{categories.length > 0 ? (
				categories.map((category) => (
					<li key={category} className={styles.categoryItem}>
						<Link
							href={`/category/${categoryType}?category=${encodeURIComponent(
								category
							)}`}
							onClick={onCategoryClick}
							className={styles.categoryLink}
						>
							{category}
						</Link>
					</li>
				))
			) : (
				<p className={styles.loadingText}>Loading categories...</p>
			)}
		</ul>
	)
}
