'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { CartItem as CartItemType } from '@/types/cart'
import styles from './CartItem.module.css'
import Button from '../ui/button/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Image from 'next/image'

interface CartItemProps {
	item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
	const { updateQuantity, removeFromCart } = useCart()

	const handleDecrease = () => {
		if (item.quantity > 1) {
			updateQuantity(item.variantId, item.quantity - 1)
		}
	}

	const handleIncrease = () => {
		updateQuantity(item.variantId, item.quantity + 1)
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
					<Image src={item.image} alt={item.title} width={200} height={200} />
				</Link>
			</div>

			{/* Product Info & Controls */}
			<div className={styles.cartItemDetails}>
				{/* Product Info */}
				<div className={styles.productInfo}>
					<div className={styles.titlePrice}>
						{' '}
						<Link href={`/item/${item.handle}`}>
							<h3 className={styles.itemTitle}>{item.title}</h3>
						</Link>
						<p className={styles.itemPrice}>
							{item.price.toFixed(2)} {item.currency}
						</p>
					</div>

					{/* Show variant options */}
					{(item.selectedSize || item.selectedColor) && (
						<div className={styles.itemVariants}>
							{item.selectedSize && (
								<p className={styles.variantItem}>
									<span className={styles.variantLabel}>Size:</span>{' '}
									<span className={styles.variantValue}>
										{item.selectedSize}
									</span>
								</p>
							)}
							{item.selectedColor && (
								<p className={styles.variantItem}>
									<span className={styles.variantLabel}>Color:</span>{' '}
									<span className={styles.variantValue}>
										{item.selectedColor}
									</span>
								</p>
							)}
						</div>
					)}
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
							<RemoveIcon />
						</Button>
						<span aria-live="polite" aria-atomic="true">
							{item.quantity}
						</span>
						<Button
							variant="nav"
							onClick={handleIncrease}
							aria-label="Increase quantity"
						>
							<AddIcon />
						</Button>
					</div>
					{/* ... rest of your code */}

					<Button
						variant="filter"
						onClick={() => removeFromCart(item.variantId)}
						aria-label={`Remove ${item.title} from cart`}
					>
						Remove
					</Button>
				</div>
			</div>
		</article>
	)
}
