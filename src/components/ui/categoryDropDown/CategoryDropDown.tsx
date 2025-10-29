// components/layout/categoryDropdown/CategoryDropdown.tsx
'use client'

import { Dialog, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef, ReactElement, Ref } from 'react'
import Link from 'next/link'
import styles from './CategoryDropdown.module.css'

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement
	},
	ref: Ref<unknown>
) {
	return <Slide direction="right" ref={ref} {...props} />
})

interface CategoryDropdownProps {
	open: boolean
	onClose: () => void
	categories: string[] // Add this
}

export default function CategoryDropdown({
	open,
	onClose,
	categories
}: CategoryDropdownProps) {
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			onClose={onClose}
			aria-labelledby="category-dropdown-title"
			slotProps={{
				backdrop: {
					timeout: 500
				}
			}}
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
			<div style={{ padding: '2rem' }}>
				<h2 id="category-dropdown-title">Men's Categories</h2>

				{/* Display categories */}
				<div style={{ marginTop: '2rem' }}>
					{categories.length > 0 ? (
						<ul style={{ listStyle: 'none', padding: 0 }}>
							{categories.map((category) => (
								<li key={category} style={{ marginBottom: '1rem' }}>
									<Link
										href={`/category/men?category=${encodeURIComponent(
											category
										)}`}
										onClick={onClose} // Close modal when clicking a category
										style={{
											textDecoration: 'none',
											color: 'black',
											fontSize: '1.2rem'
										}}
									>
										{category}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>Loading categories...</p>
					)}
				</div>

				<button onClick={onClose} style={{ marginTop: '2rem' }}>
					Close
				</button>
			</div>
		</Dialog>
	)
}
