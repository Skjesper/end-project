'use client'

import { createContext, use, useState, useEffect, ReactNode } from 'react'
import { Cart, CartItem } from '@/types/cart'

interface CartContextType {
	cart: Cart
	addToCart: (item: Omit<CartItem, 'quantity'>) => void
	removeFromCart: (variantId: string) => void
	updateQuantity: (variantId: string, quantity: number) => void
	clearCart: () => void
	getTotalItems: () => number
	getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<Cart>({ items: [] })

	useEffect(() => {
		const saved = localStorage.getItem('cart')
		if (saved) {
			setCart(JSON.parse(saved))
		}
	}, [])

	// Save cart whenever it changes
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	const addToCart = (item: Omit<CartItem, 'quantity'>) => {
		setCart((prev) => {
			// Use variantId instead of productId to find existing items
			const existingItem = prev.items.find(
				(i) => i.variantId === item.variantId
			)

			if (existingItem) {
				// If same variant exists, just increase quantity
				return {
					items: prev.items.map((i) =>
						i.variantId === item.variantId
							? { ...i, quantity: i.quantity + 1 }
							: i
					)
				}
			}

			// If it's a new variant, add it as a new item
			return {
				items: [...prev.items, { ...item, quantity: 1 }]
			}
		})
	}

	const removeFromCart = (variantId: string) => {
		setCart((prev) => ({
			items: prev.items.filter((item) => item.variantId !== variantId)
		}))
	}

	const updateQuantity = (variantId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(variantId)
			return
		}

		setCart((prev) => ({
			items: prev.items.map((item) =>
				item.variantId === variantId ? { ...item, quantity } : item
			)
		}))
	}

	const clearCart = () => {
		setCart({ items: [] })
	}

	const getTotalItems = () => {
		return cart.items.reduce((sum, item) => sum + item.quantity, 0)
	}

	const getTotalPrice = () => {
		return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				getTotalItems,
				getTotalPrice
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = use(CartContext)
	if (!context) {
		throw new Error('useCart must be used within CartProvider')
	}
	return context
}
