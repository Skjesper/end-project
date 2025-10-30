// components/layout/categoryDropdown/CategoryDropdown.tsx
'use client'

import React from 'react'
import { Dialog, IconButton, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Close as CloseIcon } from '@mui/icons-material'
import Link from 'next/link'
import styles from './CategoryDropDown.module.css'

// Slide transition component
const SlideTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="right" ref={ref} {...props} />
})

interface CategoryDropdownProps {
	open: boolean
	onClose: () => void
	categories: string[]
	categoryType: string
	title?: string
}

export default function CategoryDropdown({
	open,
	onClose,
	categories,
	categoryType,
	title
}: CategoryDropdownProps) {
	// Generate title from categoryType if not provided
	const displayTitle =
		title ||
		(categoryType
			? `${
					categoryType.charAt(0).toUpperCase() + categoryType.slice(1)
			  }'s Categories`
			: 'Categories')

	return (
		<Dialog
			open={open}
			onClose={onClose}
			slots={{
				transition: SlideTransition
			}}
			slotProps={{
				paper: {
					className: styles.modalPaper,
					elevation: 0
				},
				backdrop: {
					timeout: 500
				}
			}}
			transitionDuration={400}
			aria-labelledby="category-dropdown-title"
			sx={{
				'& .MuiDialog-container': {
					justifyContent: 'flex-start',
					alignItems: 'stretch',
					padding: 0,
					margin: 0
				},
				'& .MuiDialog-paper': {
					margin: 0,
					maxHeight: '100%',
					height: '100vh',
					width: '400px',
					maxWidth: '90vw',
					borderRadius: 0
				},
				'& .MuiBackdrop-root': {
					backgroundColor: 'rgba(0, 0, 0, 0.2)'
				}
			}}
		>
			<div className={styles.modalContent}>
				{/* Header with close button */}
				<div className={styles.header}>
					<h2 id="category-dropdown-title" className={styles.title}>
						{displayTitle}
					</h2>
					<IconButton
						onClick={onClose}
						size="small"
						className={styles.closeButton}
						aria-label="Close modal"
					>
						<CloseIcon />
					</IconButton>
				</div>

				{/* Display categories */}
				<div className={styles.categoriesList}>
					{categories.length > 0 ? (
						<ul className={styles.categoryList}>
							{categories.map((category) => (
								<li key={category} className={styles.categoryItem}>
									<Link
										href={`/category/${categoryType}?category=${encodeURIComponent(
											category
										)}`}
										onClick={onClose}
										className={styles.categoryLink}
									>
										{category}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p className={styles.loadingText}>Loading categories...</p>
					)}
				</div>
			</div>
		</Dialog>
	)
}
