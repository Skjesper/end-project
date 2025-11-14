'use client'

import { useState, useEffect } from 'react'
import ProductCard from '../productCard/ProductCard'
import { Product } from '@/types/product'
import styles from './ProductGrid.module.css'
import Button from '@/components/ui/button/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface ProductGridProps {
	products: Product[]
	itemsPerPage?: number
}

export default function ProductGrid({
	products,
	itemsPerPage = 12
}: ProductGridProps) {
	const [currentPage, setCurrentPage] = useState(1)

	// Reset to page 1 when products array changes (filtering)
	useEffect(() => {
		setCurrentPage(1)
	}, [products])

	// Calculate pagination values
	const totalPages = Math.ceil(products.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentProducts = products.slice(startIndex, endIndex)

	// Handle page change
	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<div className={styles.productWrapper}>
			<div className={styles.gridWrapper}>
				<section className={styles.grid}>
					{currentProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</section>
			</div>

			{totalPages > 1 && (
				<div className={styles.paginationContainer}>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className={styles.arrowButton}
						aria-label="Previous page"
					>
						<ArrowBackIosNewIcon fontSize="small" />
					</button>

					<div className={styles.pageNumbers}>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<Button
								key={page}
								variant="filter"
								onClick={() => handlePageChange(page)}
								className={currentPage === page ? styles.activePage : ''}
							>
								{page}
							</Button>
						))}
					</div>

					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className={styles.arrowButton}
						aria-label="Next page"
					>
						<ArrowForwardIosIcon fontSize="small" />
					</button>
				</div>
			)}
		</div>
	)
}
