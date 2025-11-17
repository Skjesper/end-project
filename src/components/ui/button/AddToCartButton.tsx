'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import AddToCartModal from '@/components/cart/AddToCartModal'
import Button from '@/components/ui/button/Button'
import { CartItem } from '@/types/cart'

interface AddToCartButtonProps {
	productId: string
	variantId: string
	handle: string
	title: string
	price: number
	image: string
	onClick?: () => void
	currency: string
	variant?: 'primary' | 'secondary' | 'filter'
	children?: React.ReactNode
	selectedSize?: string
	selectedColor?: string
	availableForSale?: boolean // Add this prop
}

export default function AddToCartButton({
	productId,
	onClick,
	variantId,
	handle,
	title,
	price,
	image,
	currency,
	variant = 'primary',
	children,
	selectedSize,
	selectedColor,
	availableForSale = true // Default to true for backwards compatibility
}: AddToCartButtonProps) {
	const { addToCart } = useCart()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [addedItem, setAddedItem] = useState<CartItem | null>(null)

	const handleClick = () => {
		// Check if item is available for sale
		if (!availableForSale) {
			alert('This item is currently out of stock')
			return
		}

		const item = {
			productId,
			variantId,
			handle,
			title,
			price,
			image,
			currency,
			selectedSize,
			selectedColor,
			quantity: 1
		}

		addToCart(item)
		setAddedItem(item)
		setIsModalOpen(true)

		if (onClick) {
			onClick()
		}
	}

	return (
		<>
			<Button
				onClick={handleClick}
				variant={variant}
				disabled={!availableForSale} // Disable if not available
			>
				{!availableForSale ? 'Out of Stock' : children || 'Add to Cart'}
			</Button>

			<AddToCartModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				addedItem={addedItem}
			/>
		</>
	)
}
