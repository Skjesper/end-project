'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { CartItem as CartItemType } from '@/types/cart'

interface CartItemProps {
	item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
	const { updateQuantity, removeFromCart } = useCart()

	return (
		<div>
			{/* Product Image */}
			<Link href={`/products/${item.handle}`}>
				<img src={item.image} alt={item.title} width="100" height="100" />
			</Link>

			{/* Product Info */}
			<div>
				<Link href={`/products/${item.handle}`}>
					<h3>{item.title}</h3>
				</Link>
				<p>
					{item.price.toFixed(2)} {item.currency}
				</p>
			</div>

			{/* Quantity Controls */}
			<div>
				<label>Quantity:</label>
				<input
					type="number"
					min="1"
					value={item.quantity}
					onChange={(e) =>
						updateQuantity(item.productId, parseInt(e.target.value))
					}
				/>
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
