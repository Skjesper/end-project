'use client'

import { useCart } from '@/context/CartContext'
import { createCheckout } from '@/lib/shopify'
import { useState } from 'react'
import Link from 'next/link'
import styles from './CartSummary.module.css'
import Button from '../ui/button/Button'

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
		<aside className={styles.cartSummary} aria-label="Cart summary">
			<div className={styles.summaryDetails}>
				<p>Items: {getTotalItems()}</p>
				<p className={styles.totalPrice}>
					<span>Subtotal:</span>
					<span>
						{getTotalPrice().toFixed(2)} {currency}
					</span>
				</p>
			</div>

			<Button onClick={handleCheckout} disabled={loading}>
				{loading ? 'Loading...' : 'Proceed to Checkout'}
			</Button>

			<Button variant="secondary">
				<Link href="/products">Continue Shopping</Link>
			</Button>
		</aside>
	)
}
