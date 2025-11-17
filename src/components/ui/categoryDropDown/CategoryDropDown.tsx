'use client'

import SlideOutModal from '@/components/ui/slideOutModal/SlideOutModal'
import CategoryList from '@/components/ui/categoryList/CategoryList'

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
	const displayTitle =
		title ||
		(categoryType
			? `${categoryType.charAt(0).toUpperCase() + categoryType.slice(1)}`
			: 'Categories')

	const handleClose = () => {
		onClose()

		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<SlideOutModal open={open} onClose={handleClose} title={displayTitle}>
			<CategoryList
				categories={categories}
				categoryType={categoryType}
				onCategoryClick={handleClose}
			/>
		</SlideOutModal>
	)
}
