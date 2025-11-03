// components/ui/categoryDropDown/CategoryDropDown.tsx
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
			? `${
					categoryType.charAt(0).toUpperCase() + categoryType.slice(1)
			  }'s Categories`
			: 'Categories')

	return (
		<SlideOutModal open={open} onClose={onClose} title={displayTitle}>
			<CategoryList
				categories={categories}
				categoryType={categoryType}
				onCategoryClick={onClose}
			/>
		</SlideOutModal>
	)
}
