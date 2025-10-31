'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { CartItem as CartItemType } from '@/types/cart'
import styles from './CartItem.module.css'
import Button from '../ui/button/Button'

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

	const itemTotal = (item.price * item.quantity).toFixed(2)

	return (
		<article className={styles.cartItem} aria-label={`${item.title} in cart`}>
			{/* Product Image */}
			<div className={styles.cartItemImage}>
				<Link
					href={`/item/${item.handle}`}
					aria-label={`View ${item.title} details`}
				>
					<img src={item.image} alt={item.title} width="100" height="100" />
				</Link>
			</div>

			{/* Product Info & Controls */}
			<div className={styles.cartItemDetails}>
				{/* Product Info */}
				<div className={styles.productInfo}>
					<Link href={`/item/${item.handle}`}>
						<h3>{item.title}</h3>
					</Link>
					<p aria-label={`Price: ${item.price.toFixed(2)} ${item.currency}`}>
						{item.price.toFixed(2)} {item.currency}
					</p>
				</div>

				{/* Quantity Controls & Actions */}
				<div className={styles.cartItemRight}>
					<div
						className={styles.quantityControls}
						role="group"
						aria-label="Quantity controls"
					>
						<Button
							variant="nav"
							onClick={handleDecrease}
							disabled={item.quantity <= 1}
							aria-label="Decrease quantity"
						>
							-
						</Button>
						<span aria-live="polite" aria-atomic="true">
							{item.quantity}
						</span>
						<Button
							variant="nav"
							onClick={handleIncrease}
							aria-label="Increase quantity"
						>
							+
						</Button>
					</div>

					<Button
						variant="delete"
						onClick={() => removeFromCart(item.productId)}
						aria-label={`Remove ${item.title} from cart`}
					>
						Remove
					</Button>
				</div>
			</div>
		</article>
	)
}
