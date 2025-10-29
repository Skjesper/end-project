'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, IconButton, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Close as CloseIcon } from '@mui/icons-material'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { CartItem } from '@/types/cart'
import Button from '@/components/ui/button/Button'
import styles from './AddToCartModal.module.css'

interface AddToCartModalProps {
	isOpen: boolean
	onClose: () => void
	addedItem: CartItem | null
}

// Slide transition component (moved outside)
const SlideTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="left" ref={ref} {...props} />
})

export default function AddToCartModal({
	isOpen,
	onClose,
	addedItem
}: AddToCartModalProps) {
	const { getTotalItems, getTotalPrice } = useCart()
	const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(
		null
	)

	// Auto-close after 5 seconds
	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => {
				onClose()
			}, 5000)
			setAutoCloseTimer(timer)

			return () => {
				if (timer) clearTimeout(timer)
			}
		}
	}, [isOpen, onClose])

	const handleClose = () => {
		if (autoCloseTimer) {
			clearTimeout(autoCloseTimer)
		}
		onClose()
	}

	if (!addedItem) return null

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			slots={{
				transition: SlideTransition
			}}
			slotProps={{
				paper: {
					className: styles.modalPaper,
					elevation: 0
				}
			}}
			transitionDuration={300}
			sx={{
				'& .MuiDialog-container': {
					justifyContent: 'flex-end',
					alignItems: 'stretch',
					padding: 0,
					margin: 0
				},
				'& .MuiDialog-paper': {
					margin: 0,
					maxHeight: '100%',
					borderRadius: 0
				},
				'& .MuiBackdrop-root': {
					backgroundColor: 'rgba(0, 0, 0, 0.2)'
				}
			}}
		>
			<div className={styles.modalContent}>
				{/* Header */}
				<div className={styles.header}>
					<h2 className={styles.title}>Added to Cart</h2>
					<IconButton
						onClick={handleClose}
						size="small"
						className={styles.closeButton}
						aria-label="Close modal"
					>
						<CloseIcon />
					</IconButton>
				</div>

				{/* Added Item */}
				<div className={styles.addedItem}>
					<div className={styles.itemImage}>
						<img src={addedItem.image} alt={addedItem.title} />
					</div>
					<div className={styles.itemDetails}>
						<h3 className={styles.itemTitle}>{addedItem.title}</h3>
						<p className={styles.itemPrice}>
							{addedItem.price.toFixed(2)} {addedItem.currency}
						</p>
						<p className={styles.itemQuantity}>Qty: {addedItem.quantity}</p>
					</div>
				</div>

				{/* Cart Summary */}
				<div className={styles.cartSummary}>
					<div className={styles.summaryRow}>
						<span>Items in cart:</span>
						<span className={styles.summaryValue}>{getTotalItems()}</span>
					</div>
					<div className={styles.summaryRow}>
						<span>Subtotal:</span>
						<span className={styles.summaryValue}>
							{getTotalPrice().toFixed(2)} {addedItem.currency}
						</span>
					</div>
				</div>

				{/* Action Buttons */}
				<div className={styles.actions}>
					<Link href="/cart" onClick={handleClose} className={styles.viewCart}>
						<Button variant="primary">View Cart & Checkout</Button>
					</Link>
					<Button variant="secondary" onClick={handleClose}>
						Continue Shopping
					</Button>
				</div>
			</div>
		</Dialog>
	)
}
