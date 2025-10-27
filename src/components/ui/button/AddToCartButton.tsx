'use client'

import Button from '@/components/ui/button/Button'
import { useCart } from '@/context/CartContext'

interface AddToCartButtonProps {
	productId: string
	variantId: string
	handle: string
	title: string
	price: number
	image: string
	currency: string
	variant?: 'primary' | 'secondary' | 'danger' | 'nav'
	disabled?: boolean
	children?: React.ReactNode
}

export default function AddToCartButton({
	productId,
	variantId,
	handle,
	title,
	price,
	image,
	currency,
	variant = 'primary',
	disabled = false,
	children = 'Add to Cart'
}: AddToCartButtonProps) {
	const { addToCart } = useCart()

	const handleAddToCart = () => {
		addToCart({
			productId,
			variantId,
			handle,
			title,
			price,
			image,
			currency
		})
	}

	return (
		<Button variant={variant} disabled={disabled} onClick={handleAddToCart}>
			{children}
		</Button>
	)
}
