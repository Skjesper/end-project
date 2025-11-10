'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import AddToCartModal from '@/components/cart/AddToCartModal'
import { CartItem } from '@/types/cart'
import styles from './Button.module.css' // Använd samma CSS!

interface AddToCartButtonProps {
	productId: string
	variantId: string
	handle: string
	title: string
	price: number
	image: string
	currency: string
	variant?: 'primary' | 'secondary'
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
			<button
				onClick={handleClick}
				className={styles.button}
				data-variant={variant}
			>
				{children || 'Add to Cart'}
			</button>

			<AddToCartModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				addedItem={addedItem}
			/>
		</>
	)
}
