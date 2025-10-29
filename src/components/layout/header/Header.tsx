'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/button/Button'
import styles from './Header.module.css'
import Image from 'next/image'
import { getProductsByCollection } from '@/lib/shopify'
import { extractUniqueCategories } from '@/utils/categoryFilter'
import CategoryDropdown from '@/components/ui/categoryDropDown/CategoryDropDown'

export default function Header() {
	const { getTotalItems } = useCart()
	const [openDropdown, setOpenDropdown] = useState<string | null>(null)
	const [menCategories, setMenCategories] = useState<string[]>([])
	const [categoryModalOpen, setCategoryModalOpen] = useState(false)

	// Fetch Men's categories on mount
	useEffect(() => {
		async function loadMenCategories() {
			const data = await getProductsByCollection('men')
			const categories = extractUniqueCategories(data.products)
			setMenCategories(categories)
		}
		loadMenCategories()
	}, [])

	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				{/* Mobile menu - hidden on desktop */}
				<div className={styles.mobileMenu}>
					<Button variant="nav">☰</Button>
				</div>

				{/* Left side navigation */}
				<nav className={styles.leftNav}>
					<Link href="/" className={`${styles.navItem} ${styles.priority2}`}>
						<Button variant="nav">Explore</Button>
					</Link>
					<Link
						href="/category/glasses"
						className={`${styles.navItem} ${styles.priority2}`}
					>
						<Button variant="nav">Glasses</Button>
					</Link>
					<Link
						href="/category/bags"
						className={`${styles.navItem} ${styles.priority3}`}
					>
						<Button variant="nav">Bags</Button>
					</Link>
					<Link
						href="/shop"
						className={`${styles.navItem} ${styles.priority4}`}
					>
						<Button variant="nav">Collections</Button>
					</Link>

					{/* TEST: Click to open modal */}
					<Button variant="nav" onClick={() => setCategoryModalOpen(true)}>
						Men (Modal Test)
					</Button>
				</nav>

				{/* Center - Logo */}
				<div className={styles.logoContainer}>
					<Link href="/">
						<Image
							src="/assets/SkjespLogo.png"
							alt="Logo"
							width={200}
							height={50}
						/>
					</Link>
				</div>

				{/* Right side navigation */}
				<nav className={styles.rightNav}>
					<Link
						href="/account"
						className={`${styles.navItem} ${styles.priority3}`}
					>
						<Button variant="nav">Login</Button>
					</Link>

					<Link href="/search" className={styles.navItem}>
						<Button variant="nav">
							<Image
								src="/assets/SearchIcon.svg"
								alt="Search"
								width={25}
								height={25}
							/>
						</Button>
					</Link>

					<Link
						href="/favorites"
						className={`${styles.navItem} ${styles.priority2}`}
					>
						<Button variant="nav">
							<Image
								src="/assets/HeartIcon.svg"
								alt="Favorites"
								width={25}
								height={25}
							/>
						</Button>
					</Link>

					<Link href="/cart" className={styles.navItem}>
						<Button variant="nav">
							<div className={styles.cartIconWrapper}>
								<Image
									src="/assets/CartIcon.svg"
									alt="Cart"
									width={25}
									height={25}
								/>
								<span className={styles.cartBadge}>{getTotalItems()}</span>
							</div>
						</Button>
					</Link>
				</nav>
			</div>

			{/* Category Modal */}
			{/* Category Modal */}
			<CategoryDropdown
				open={categoryModalOpen}
				onClose={() => setCategoryModalOpen(false)}
				categories={menCategories} // Pass the categories here
			/>
		</header>
	)
}
