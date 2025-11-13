// components/ui/slideOutModal/SlideOutModal.tsx
'use client'

import React from 'react'
import { Dialog, IconButton, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Close as CloseIcon } from '@mui/icons-material'
import styles from './SlideOutModal.module.css'

const SlideTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="right" ref={ref} {...props} />
})

interface SlideOutModalProps {
	open: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
}

export default function SlideOutModal({
	open,
	onClose,
	title,
	children
}: SlideOutModalProps) {
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
			transitionDuration={300}
			aria-labelledby="slide-out-modal-title"
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
					width: '100vw',
					maxWidth: '100vw',
					borderRadius: 0,
					'@media (min-width: 768px)': {
						width: '400px',
						maxWidth: '90vw'
					}
				},
				'& .MuiBackdrop-root': {
					backgroundColor: 'rgba(0, 0, 0, 0.2)'
				}
			}}
		>
			<div className={styles.modalContent}>
				<div className={styles.header}>
					<h2 id="slide-out-modal-title" className={styles.title}>
						{title}
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

				<div className={styles.content}>{children}</div>
			</div>
		</Dialog>
	)
}
