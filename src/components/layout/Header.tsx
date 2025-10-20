'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function Header() {
	const { getTotalItems } = useCart()
	return (
		<header>
			<div>
				<Link href="/">StoreName</Link>

				<nav>
					<Link href="/">Home</Link>
					<Link href="/products">Products</Link>
					<Link href="/cart">Cart ({getTotalItems()})</Link>
				</nav>
			</div>
		</header>
	)
}
