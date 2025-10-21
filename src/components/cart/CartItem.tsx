'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { CartItem as CartItemType } from '@/types/cart'

interface CartItemProps {
	item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
	const { updateQuantity, removeFromCart } = useCart()

	const handleDecrease = () => {
		if (item.quantity > 1) {
			updateQuantity(item.productId, item.quantity - 1)
		}
	}

	const handleIncrease = () => {
		updateQuantity(item.productId, item.quantity + 1)
	}

	return (
		<div>
			{/* Product Image */}
			<Link href={`/item/${item.handle}`}>
				<img src={item.image} alt={item.title} width="100" height="100" />
			</Link>

			{/* Product Info */}
			<div>
				<Link href={`/item/${item.handle}`}>
					<h3>{item.title}</h3>
				</Link>
				<p>
					{item.price.toFixed(2)} {item.currency}
				</p>
			</div>

			{/* Quantity Controls */}
			<div>
				<button onClick={handleDecrease} disabled={item.quantity <= 1}>
					-
				</button>
				<span>{item.quantity}</span>
				<button onClick={handleIncrease}>+</button>
			</div>

			{/* Item Total */}
			<div>
				<p>
					Total: {(item.price * item.quantity).toFixed(2)} {item.currency}
				</p>
			</div>

			{/* Remove Button */}
			<div>
				<button onClick={() => removeFromCart(item.productId)}>Remove</button>
			</div>
		</div>
	)
}
