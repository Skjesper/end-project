'use client'

import { useCart } from '@/context/CartContext'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Link from 'next/link'
import styles from './page.module.css'
import Button from '@/components/ui/button/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'

export default function CartPage() {
	const { cart } = useCart()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 100)

		return () => clearTimeout(timer)
	}, [])

	if (isLoading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: 'calc(100vh - 5rem)'
				}}
			>
				<CircularProgress size={60} sx={{ color: 'var(--accent)' }} />
			</div>
		)
	}

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
