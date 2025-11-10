import ProductAccordionsClient from './ProductAccordionsClient'

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
	const items = [
		{
			id: 'sizefit',
			title: 'Size & Fit',
			content: sizeAndFit
		},
		{
			id: 'details',
			title: 'Details',
			content: description
		},
		{
			id: 'shipping',
			title: 'Shipping',
			content: shipping
		}
	]

	return <ProductAccordionsClient items={items} />
}
