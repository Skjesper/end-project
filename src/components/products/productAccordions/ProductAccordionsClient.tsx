'use client'

import { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styles from './ProductAccordions.module.css'

interface ProductAccordionsClientProps {
	items: Array<{
		id: string
		title: string
		content?: string
	}>
}

export default function ProductAccordionsClient({
	items
}: ProductAccordionsClientProps) {
	const [expanded, setExpanded] = useState('')

	const accordionSx = {
		backgroundColor: 'transparent',
		boxShadow: 'none',
		borderBottom: 'none',
		'&:before': {
			display: 'none'
		},
		'&:last-of-type': {},
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
		padding: '1rem',
		fontFamily: 'var(--font-body)'
	}

	const iconSx = {
		color: '#000'
	}

	return (
		<section className={styles.productDescription}>
			{items.map((item) => (
				<Accordion
					key={item.id}
					expanded={expanded === item.id}
					onChange={() => setExpanded(expanded === item.id ? '' : item.id)}
					sx={accordionSx}
				>
					<AccordionSummary
						expandIcon={
							expanded === item.id ? (
								<RemoveIcon sx={iconSx} />
							) : (
								<AddIcon sx={iconSx} />
							)
						}
						aria-controls={`${item.id}-content`}
						id={`${item.id}-header`}
						sx={summarySx}
					>
						<h3 className={styles.accordionTitle}>{item.title}</h3>
					</AccordionSummary>
					<AccordionDetails sx={detailsSx}>
						{item.content && <p>{item.content}</p>}
					</AccordionDetails>
				</Accordion>
			))}
		</section>
	)
}
