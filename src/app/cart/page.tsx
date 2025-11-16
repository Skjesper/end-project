'use client'

import { useCart } from '@/context/CartContext'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Link from 'next/link'
import styles from './page.module.css'
import Button from '@/components/ui/button/Button'

export default function CartPage() {
	const { cart } = useCart()

	if (cart.items.length === 0) {
		return (
			<div className={styles.emptyCart}>
				<h1>Your cart is empty</h1>
				<Link href="/">
					<Button variant="filter">Back to home</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className={styles.cartPage}>
			<div className={styles.cartContainer}>
				{/* Cart Items */}
				<section className={styles.cartItemsList} aria-label="Cart items">
					{cart.items.map((item) => (
						<CartItem key={item.variantId} item={item} />
					))}
				</section>

				{/* Cart Summary */}
				<CartSummary />
			</div>
		</div>
	)
}
