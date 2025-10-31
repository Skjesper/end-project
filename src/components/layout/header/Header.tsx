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
import MobileMenu from '@/components/ui/mobileMenu/MobileMenu'
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
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

	const createHoverHandler = (categoryType: CategoryType) => {
		return useHoverDelay({
			onHoverStart: () => openModal(categoryType),
			delay: 500,
			enabled: true
		})
	}

	const hoverHandlers: Record<
		CategoryType,
		ReturnType<typeof useHoverDelay>
	> = {
		men: createHoverHandler('men'),
		women: createHoverHandler('women'),
		accessories: createHoverHandler('accessories')
	}

	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<div className={styles.mobileMenu}>
					<Button variant="nav" onClick={() => setMobileMenuOpen(true)}>
						☰
					</Button>
				</div>

				<nav className={styles.leftNav}>
					{CATEGORY_TYPES.map((categoryType) => (
						<div
							key={categoryType}
							onMouseEnter={hoverHandlers[categoryType].handleMouseEnter}
							onMouseLeave={hoverHandlers[categoryType].handleMouseLeave}
						>
							<Button variant="nav" onClick={() => openModal(categoryType)}>
								{categoryType.charAt(0).toUpperCase() + categoryType.slice(1)}
							</Button>
						</div>
					))}
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

			<MobileMenu
				open={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
				categories={categories}
			/>

			{CATEGORY_TYPES.map((categoryType) => (
				<CategoryDropdown
					key={categoryType}
					open={activeModal === categoryType}
					onClose={closeModal}
					categories={categories[categoryType]}
					categoryType={categoryType}
				/>
			))}
		</header>
	)
}
