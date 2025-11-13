'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/button/Button'
import styles from './Header.module.css'

import { getProductsByCollection } from '@/lib/shopify'
import { extractUniqueCategories } from '@/utils/categoryFilter'
import CategoryDropdown from '@/components/ui/categoryDropDown/CategoryDropDown'
import MobileMenu from '@/components/ui/mobileMenu/MobileMenu'
import { useHoverDelay } from '@/hooks/useHoverDelay'

import SearchIcon from '@mui/icons-material/Search'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

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

	const hoverHandlers: Record<
		CategoryType,
		ReturnType<typeof useHoverDelay>
	> = {
		men: menHover,
		women: womenHover,
		accessories: accessoriesHover
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
					<div className={styles.leftNavContent}>
						{CATEGORY_TYPES.map((categoryType) => (
							<div
								key={categoryType}
								className={styles.category}
								onMouseEnter={hoverHandlers[categoryType].handleMouseEnter}
								onMouseLeave={hoverHandlers[categoryType].handleMouseLeave}
							>
								<Button variant="nav" onClick={() => openModal(categoryType)}>
									{categoryType.charAt(0).toUpperCase() + categoryType.slice(1)}
								</Button>
							</div>
						))}
					</div>
				</nav>

				<div className={styles.logoContainer}>
					<Link href="/">
						<div className={styles.titleContainer}>
							<h1
								className={styles.title}
								style={{ fontFamily: 'var(--font-display)' }}
							>
								SKJESP
							</h1>
						</div>
					</Link>
				</div>

				<nav className={styles.rightNav}>
					<div className={styles.rightNavContent}>
						<div className={styles.icons}>
							<Link href="/search" className={styles.navItem}>
								<Button variant="nav">
									<SearchIcon sx={{ fontSize: 25 }} />
								</Button>
							</Link>

							<Link
								href="/favorites"
								className={`${styles.navItem} ${styles.priority2}`}
							>
								<Button variant="nav">
									<FavoriteBorderIcon sx={{ fontSize: 25 }} />
								</Button>
							</Link>

							<Link href="/cart" className={styles.navItem}>
								<Button variant="cart">
									<div className={styles.cartIconWrapper}>
										<span className={styles.cartBadge}>{getTotalItems()}</span>
									</div>
								</Button>
							</Link>
						</div>
					</div>
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
