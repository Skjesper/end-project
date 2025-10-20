import ProductCard from './ProductCard'
import { Product } from '@/types/product'

interface ProductGridProps {
	products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
	return (
		<div>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
}
