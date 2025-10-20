'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CartSummary() {
	const { getTotalItems, getTotalPrice, cart } = useCart()

	const currency = cart.items[0]?.currency || 'USD'

	return (
		<div>
			<h2>Cart Summary</h2>

			<div>
				<p>Items: {getTotalItems()}</p>
				<p>
					Subtotal: {getTotalPrice().toFixed(2)} {currency}
				</p>
			</div>

			<div>
				<Link href="/checkout">
					<button>Proceed to Checkout</button>
				</Link>
			</div>

			<div>
				<Link href="/products">Continue Shopping</Link>
			</div>
		</div>
	)
}
