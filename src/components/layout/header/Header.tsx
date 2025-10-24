'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/button/Button'
import styles from './Header.module.css'

export default function Header() {
	const { getTotalItems } = useCart()

	return (
		<header>
			<div className={styles.headerContainer}>
				{/* Left side - 4 items */}
				<nav className={styles.leftNav}>
					<Link href="/">
						<Button variant="nav">Home</Button>
					</Link>
					<Link href="/category/glasses">
						<Button variant="nav">Glasses</Button>
					</Link>
					<Link href="/category/bags">
						<Button variant="nav">Bags</Button>
					</Link>
					<Link href="/shop">
						<Button variant="nav">Shop</Button>
					</Link>
				</nav>

				{/* Right side - 4 items */}
				<nav className={styles.rightNav}>
					<Link href="/search">
						<Button variant="nav">Search</Button>
					</Link>
					<Link href="/account">
						<Button variant="nav">Account</Button>
					</Link>
					<Link href="/favorites">
						<Button variant="nav">Favorites</Button>
					</Link>
					<Link href="/cart">
						<Button variant="nav">Cart ({getTotalItems()})</Button>
					</Link>
				</nav>
			</div>
		</header>
	)
}
