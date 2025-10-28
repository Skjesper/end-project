'use client'

import { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styles from './ProductAccordions.module.css' // or wherever your styles are

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

	return (
		<section className={styles.productDescription}>
			<Accordion
				expanded={expanded === 'sizefit'}
				onChange={() => setExpanded(expanded === 'sizefit' ? '' : 'sizefit')}
			>
				<AccordionSummary
					expandIcon={expanded === 'sizefit' ? <RemoveIcon /> : <AddIcon />}
					aria-controls="size-fit-content"
					id="size-fit-header"
				>
					<h3>Size & Fit</h3>
				</AccordionSummary>
				<AccordionDetails>{sizeAndFit && <p>{sizeAndFit}</p>}</AccordionDetails>
			</Accordion>

			<Accordion
				expanded={expanded === 'details'}
				onChange={() => setExpanded(expanded === 'details' ? '' : 'details')}
			>
				<AccordionSummary
					expandIcon={expanded === 'details' ? <RemoveIcon /> : <AddIcon />}
					aria-controls="details-content"
					id="details-header"
				>
					<h3>Details</h3>
				</AccordionSummary>
				<AccordionDetails>
					{description && <p>{description}</p>}
				</AccordionDetails>
			</Accordion>

			<Accordion
				expanded={expanded === 'shipping'}
				onChange={() => setExpanded(expanded === 'shipping' ? '' : 'shipping')}
			>
				<AccordionSummary
					expandIcon={expanded === 'shipping' ? <RemoveIcon /> : <AddIcon />}
					aria-controls="shipping-content"
					id="shipping-header"
				>
					<h3>Shipping</h3>
				</AccordionSummary>
				<AccordionDetails>{shipping && <p>{shipping}</p>}</AccordionDetails>
			</Accordion>
		</section>
	)
}
