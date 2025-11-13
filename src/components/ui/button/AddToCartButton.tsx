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
	children
}: AddToCartButtonProps) {
	const { addToCart } = useCart()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [addedItem, setAddedItem] = useState<CartItem | null>(null)

	const handleClick = () => {
		const item = {
			productId,
			variantId,
			handle,
			onClick,
			title,
			price,
			image,
			currency,
			quantity: 1
		}

		addToCart(item)
		setAddedItem(item)
		setIsModalOpen(true)
	}

	return (
		<>
			<Button onClick={handleClick} variant={variant}>
				{children || 'Add to Cart'}
			</Button>

			<AddToCartModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				addedItem={addedItem}
			/>
		</>
	)
}
