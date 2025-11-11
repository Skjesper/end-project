// components/ui/mobileMenu/MobileMenu.tsx
'use client'

import { useState } from 'react'
import SlideOutModal from '@/components/ui/slideOutModal/SlideOutModal'
import CategoryList from '@/components/ui/categoryList/CategoryList'
import styles from './MobileMenu.module.css'
import Button from '../button/Button'

interface MobileMenuProps {
	open: boolean
	onClose: () => void
	categories: {
		men: string[]
		women: string[]
		accessories: string[]
	}
}

type MenuView = 'main' | 'men' | 'women' | 'accessories'

export default function MobileMenu({
	open,
	onClose,
	categories
}: MobileMenuProps) {
	const [currentView, setCurrentView] = useState<MenuView>('main')

	const handleClose = () => {
		setCurrentView('main')
		onClose()
	}

	const goToCategory = (category: MenuView) => {
		setCurrentView(category)
	}

	const goBack = () => {
		setCurrentView('main')
	}

	const getTitle = () => {
		switch (currentView) {
			case 'men':
				return 'Men'
			case 'women':
				return 'Women'
			case 'accessories':
				return 'Accessories'
			default:
				return 'Menu'
		}
	}

	return (
		<SlideOutModal open={open} onClose={handleClose} title={getTitle()}>
			{currentView === 'main' ? (
				<nav className={styles.mainMenu}>
					<div className={styles.categorySection}>
						<Button
							variant="nav"
							onClick={() => goToCategory('men')}
							className={styles.menuItem}
						>
							Men
						</Button>
						<Button
							variant="nav"
							onClick={() => goToCategory('women')}
							className={styles.menuItem}
						>
							Women
						</Button>
						<Button
							variant="nav"
							onClick={() => goToCategory('accessories')}
							className={styles.menuItem}
						>
							Accessories
						</Button>
					</div>

					<div className={styles.divider} />

					{/* <a href="/account" className={styles.menuItem}>
						Login
					</a> */}
				</nav>
			) : (
				<div className={styles.categoryView}>
					<button onClick={goBack} className={styles.backButton}>
						← Back to Menu
					</button>

					<CategoryList
						categories={
							categories[currentView as 'men' | 'women' | 'accessories']
						}
						categoryType={currentView}
						onCategoryClick={handleClose}
					/>
				</div>
			)}
		</SlideOutModal>
	)
}
