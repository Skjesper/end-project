'use client'

import { useCart } from '@/context/CartContext'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Link from 'next/link'

export default function CartPage() {
	const { cart } = useCart()

	if (cart.items.length === 0) {
		return (
			<div>
				<h1>Shopping Cart</h1>
				<p>Your cart is empty</p>
				<Link href="/products">
					<button>Browse Products</button>
				</Link>
			</div>
		)
	}

	return (
		<div>
			<h1>Shopping Cart</h1>

			{/* Cart Items */}
			<div>
				{cart.items.map((item) => (
					<CartItem key={item.productId} item={item} />
				))}
			</div>

			{/* Cart Summary */}
			<CartSummary />
		</div>
	)
}
