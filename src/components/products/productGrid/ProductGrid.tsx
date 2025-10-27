import ProductCard from '../productCard/ProductCard'
import { Product } from '@/types/product'
import styles from './ProductGrid.module.css'

interface ProductGridProps {
	products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
	return (
		<div>
			<div className={styles.gridWrapper}>
				<section className={styles.grid}>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</section>
			</div>
		</div>
	)
}
