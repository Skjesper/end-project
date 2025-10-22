'use client'

import { useCart } from '@/context/CartContext'
import { createCheckout } from '@/lib/shopify'
import { useState } from 'react'
import Link from 'next/link'

export default function CartSummary() {
	const { getTotalItems, getTotalPrice, cart } = useCart()
	const [loading, setLoading] = useState(false)

	const handleCheckout = async () => {
		setLoading(true)
		console.log('Cart items:', cart.items)
		const checkoutUrl = await createCheckout(cart.items)
		console.log('Checkout URL:', checkoutUrl)
		if (checkoutUrl) {
			window.location.href = checkoutUrl
		} else {
			console.error('No checkout URL returned')
		}
		setLoading(false)
	}

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
				<button onClick={handleCheckout} disabled={loading}>
					{loading ? 'Loading...' : 'Proceed to Checkout'}
				</button>
			</div>

			<div>
				<Link href="/products">Continue Shopping</Link>
			</div>
		</div>
	)
}
