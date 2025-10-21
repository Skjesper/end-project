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
					<ul>
						<li>
							<Link href="/category/glasses">Glasses</Link>
						</li>
						<li>
							<Link href="/category/bags">Bags</Link>
						</li>
					</ul>
					<Link href="/cart">Cart ({getTotalItems()})</Link>
				</nav>
			</div>
		</header>
	)
}
