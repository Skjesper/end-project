// components/layout/header/Header.tsx
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
import { useHoverDelay } from '@/hooks/useHoverDelay'

const CATEGORY_TYPES = ['men', 'women', 'accessories'] as const
type CategoryType = (typeof CATEGORY_TYPES)[number]

export default function Header() {
	const { getTotalItems } = useCart()

	const [categories, setCategories] = useState<Record<CategoryType, string[]>>({
		men: [],
		women: [],
		accessories: []
	})

	const [activeModal, setActiveModal] = useState<CategoryType | null>(null)

	useEffect(() => {
		async function loadCategories() {
			const categoryPromises = CATEGORY_TYPES.map(async (type) => {
				const data = await getProductsByCollection(type)
				const cats = extractUniqueCategories(data.products)
				return { type, categories: cats }
			})

			const results = await Promise.all(categoryPromises)

			const newCategories = results.reduce((acc, { type, categories }) => {
				acc[type] = categories
				return acc
			}, {} as Record<CategoryType, string[]>)

			setCategories(newCategories)
		}
		loadCategories()
	}, [])

	const openModal = (categoryType: CategoryType) => {
		setActiveModal(categoryType)
	}

	const closeModal = () => {
		setActiveModal(null)
	}

	const menHover = useHoverDelay({
		onHoverStart: () => openModal('men'),
		delay: 500,
		enabled: true
	})

	const womenHover = useHoverDelay({
		onHoverStart: () => openModal('women'),
		delay: 500,
		enabled: true
	})

	const accessoriesHover = useHoverDelay({
		onHoverStart: () => openModal('accessories'),
		delay: 500,
		enabled: true
	})

	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<div className={styles.mobileMenu}>
					<Button variant="nav">☰</Button>
				</div>

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

					<div
						onMouseEnter={menHover.handleMouseEnter}
						onMouseLeave={menHover.handleMouseLeave}
					>
						<Button variant="nav" onClick={() => openModal('men')}>
							Men
						</Button>
					</div>

					<div
						onMouseEnter={womenHover.handleMouseEnter}
						onMouseLeave={womenHover.handleMouseLeave}
					>
						<Button variant="nav" onClick={() => openModal('women')}>
							Women
						</Button>
					</div>

					<div
						onMouseEnter={accessoriesHover.handleMouseEnter}
						onMouseLeave={accessoriesHover.handleMouseLeave}
					>
						<Button variant="nav" onClick={() => openModal('accessories')}>
							Accessories
						</Button>
					</div>
				</nav>

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

			{/* Render all modals but only open the active one */}
			<CategoryDropdown
				open={activeModal === 'men'}
				onClose={closeModal}
				categories={categories.men}
				categoryType="men"
			/>
			<CategoryDropdown
				open={activeModal === 'women'}
				onClose={closeModal}
				categories={categories.women}
				categoryType="women"
			/>
			<CategoryDropdown
				open={activeModal === 'accessories'}
				onClose={closeModal}
				categories={categories.accessories}
				categoryType="accessories"
			/>
		</header>
	)
}
