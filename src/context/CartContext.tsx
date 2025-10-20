'use client'

import { createContext, use, useState, ReactNode } from 'react'
import { Cart, CartItem } from '@/types/cart'

interface CartContextType {
	cart: Cart
	addToCart: (item: Omit<CartItem, 'quantity'>) => void
	removeFromCart: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	clearCart: () => void
	getTotalItems: () => number
	getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<Cart>({ items: [] })

	const addToCart = (item: Omit<CartItem, 'quantity'>) => {
		setCart((prev) => {
			const existingItem = prev.items.find(
				(i) => i.productId === item.productId
			)

			if (existingItem) {
				return {
					items: prev.items.map((i) =>
						i.productId === item.productId
							? { ...i, quantity: i.quantity + 1 }
							: i
					)
				}
			}

			return {
				items: [...prev.items, { ...item, quantity: 1 }]
			}
		})
	}

	const removeFromCart = (productId: string) => {
		setCart((prev) => ({
			items: prev.items.filter((item) => item.productId !== productId)
		}))
	}

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId)
			return
		}

		setCart((prev) => ({
			items: prev.items.map((item) =>
				item.productId === productId ? { ...item, quantity } : item
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
