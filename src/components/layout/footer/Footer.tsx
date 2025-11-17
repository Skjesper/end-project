'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'
import Button from '@/components/ui/button/Button'
import CategoryDropdown from '@/components/ui/categoryDropDown/CategoryDropDown'
import { getProductsByCollection } from '@/lib/shopify'
import { extractUniqueCategories } from '@/utils/categoryFilter'
import { useModalState } from '@/hooks/useModalState'

const CATEGORY_TYPES = ['men', 'women', 'accessories'] as const
type CategoryType = (typeof CATEGORY_TYPES)[number]

export default function Footer() {
	const { activeModal, openModal, closeModal, isOpen } =
		useModalState<CategoryType>()

	const [categories, setCategories] = useState<Record<CategoryType, string[]>>({
		men: [],
		women: [],
		accessories: []
	})

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

	return (
		<>
			<footer className={styles.footer}>
				<div className={styles.container}>
					<div className={styles.section}>
						<h3 className={styles.heading}>SHOP</h3>
						<ul className={styles.list}>
							<li>
								<Button variant="nav" onClick={() => openModal('men')}>
									Men
								</Button>
							</li>
							<li>
								<Button variant="nav" onClick={() => openModal('women')}>
									Women
								</Button>
							</li>
							<li>
								<Button variant="nav" onClick={() => openModal('accessories')}>
									Accessories
								</Button>
							</li>
						</ul>
					</div>

					<div className={styles.section}>
						<h3 className={styles.heading}>CUSTOMER SERVICE</h3>
						<ul className={styles.list}>
							<li>
								<Button variant="nav">
									<Link href="/cart">Shopping Cart</Link>
								</Button>
							</li>
							<li>
								<Button variant="nav">
									<Link href="/favorites">Favorites</Link>
								</Button>
							</li>
						</ul>
					</div>

					<div className={styles.section}>
						<h3 className={styles.heading}>SKJESP</h3>
						<ul className={styles.list}>
							<li>
								<Button variant="nav">
									<Link href="https://github.com/skjesper" target="_blank">
										GitHub
									</Link>
								</Button>
							</li>
							<li>
								<Button variant="nav">
									<Link
										href="https://linkedin.com/in/jesperskeppstedt"
										target="_blank"
									>
										LinkedIn
									</Link>
								</Button>
							</li>
						</ul>
					</div>

					<div className={styles.section}>
						<h3 className={styles.heading}>CONTACT</h3>
						<ul className={styles.list}>
							<li>Student Project</li>
							<li>Built with Next.js & Shopify</li>
						</ul>
					</div>
				</div>

				<div className={styles.bottom}>
					<h3 className={styles.bottomText}>
						&copy; 2025 SKJESP. Student E-Commerce Project.
					</h3>
				</div>
			</footer>

			{CATEGORY_TYPES.map((categoryType) => (
				<CategoryDropdown
					key={categoryType}
					open={isOpen(categoryType)}
					onClose={closeModal}
					categories={categories[categoryType]}
					categoryType={categoryType}
				/>
			))}
		</>
	)
}
