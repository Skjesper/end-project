'use client'

import { useCart } from '@/context/CartContext'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Link from 'next/link'
import styles from './page.module.css'

export default function CartPage() {
	const { cart } = useCart()

	if (cart.items.length === 0) {
		return (
			<div className={styles.emptyCart}>
				<h1>Shopping Cart</h1>
				<p>Your cart is empty</p>
				<Link href="/products">
					<button>Browse Products</button>
				</Link>
			</div>
		)
	}

	return (
		<div className={styles.cartPage}>
			<h1>Shopping Cart</h1>

			<div className={styles.cartContainer}>
				{/* Cart Items */}
				<section className={styles.cartItemsList} aria-label="Cart items">
					{cart.items.map((item) => (
						<CartItem key={item.productId} item={item} />
					))}
				</section>

				{/* Cart Summary */}
				<CartSummary />
			</div>
		</div>
	)
}
