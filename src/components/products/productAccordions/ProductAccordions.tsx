'use client'

import { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styles from './ProductAccordions.module.css'

interface ProductAccordionsProps {
	sizeAndFit?: string
	description?: string
	shipping?: string
}

export default function ProductAccordions({
	sizeAndFit,
	description,
	shipping
}: ProductAccordionsProps) {
	const [expanded, setExpanded] = useState('')

	// Shared accordion styles
	const accordionSx = {
		backgroundColor: 'transparent',
		boxShadow: 'none',
		// border: '1px solid #000',
		borderBottom: 'none',
		'&:before': {
			display: 'none' // Remove default MUI divider
		},
		'&:last-of-type': {
			// borderBottom: '1px solid #000'
		},
		'&.Mui-expanded': {
			margin: 0
		}
	}

	const summarySx = {
		fontFamily: 'var(--font-display)',
		padding: '1rem',
		minHeight: 'auto',
		'& .MuiAccordionSummary-content': {
			margin: 0
		},
		'& .MuiAccordionSummary-content.Mui-expanded': {
			margin: 0
		},
		'&:hover': {
			backgroundColor: '#f5f5f5'
		}
	}

	const detailsSx = {
		// borderTop: '1px solid #000',
		padding: '1rem',
		fontFamily: 'var(--font-body)'
	}

	const iconSx = {
		color: '#000'
	}

	return (
		<section className={styles.productDescription}>
			<Accordion
				expanded={expanded === 'sizefit'}
				onChange={() => setExpanded(expanded === 'sizefit' ? '' : 'sizefit')}
				sx={accordionSx}
			>
				<AccordionSummary
					expandIcon={
						expanded === 'sizefit' ? (
							<RemoveIcon sx={iconSx} />
						) : (
							<AddIcon sx={iconSx} />
						)
					}
					aria-controls="size-fit-content"
					id="size-fit-header"
					sx={summarySx}
				>
					<h3 className={styles.accordionTitle}>Size & Fit</h3>
				</AccordionSummary>
				<AccordionDetails sx={detailsSx}>
					{sizeAndFit && <p>{sizeAndFit}</p>}
				</AccordionDetails>
			</Accordion>

			<Accordion
				expanded={expanded === 'details'}
				onChange={() => setExpanded(expanded === 'details' ? '' : 'details')}
				sx={accordionSx}
			>
				<AccordionSummary
					expandIcon={
						expanded === 'details' ? (
							<RemoveIcon sx={iconSx} />
						) : (
							<AddIcon sx={iconSx} />
						)
					}
					aria-controls="details-content"
					id="details-header"
					sx={summarySx}
				>
					<h3 className={styles.accordionTitle}>Details</h3>
				</AccordionSummary>
				<AccordionDetails sx={detailsSx}>
					{description && <p>{description}</p>}
				</AccordionDetails>
			</Accordion>

			<Accordion
				expanded={expanded === 'shipping'}
				onChange={() => setExpanded(expanded === 'shipping' ? '' : 'shipping')}
				sx={accordionSx}
			>
				<AccordionSummary
					expandIcon={
						expanded === 'shipping' ? (
							<RemoveIcon sx={iconSx} />
						) : (
							<AddIcon sx={iconSx} />
						)
					}
					aria-controls="shipping-content"
					id="shipping-header"
					sx={summarySx}
				>
					<h3 className={styles.accordionTitle}>Shipping</h3>
				</AccordionSummary>
				<AccordionDetails sx={detailsSx}>
					{shipping && <p>{shipping}</p>}
				</AccordionDetails>
			</Accordion>
		</section>
	)
}
