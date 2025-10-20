'use client'

import { useCart } from '@/context/CartContext'

interface AddToCartButtonProps {
	productId: string
	variantId: string
	handle: string
	title: string
	price: number
	image: string
	currency: string
}

export default function AddToCartButton({
	productId,
	variantId,
	handle,
	title,
	price,
	image,
	currency
}: AddToCartButtonProps) {
	const { addToCart } = useCart()

	const handleClick = () => {
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

	return <button onClick={handleClick}>Add to Cart</button>
}
