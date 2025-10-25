// src/app/category/[slug]/components/TagFilter/TagFilter.tsx
import Button from '@/components/ui/button/Button'
import styles from './TagFilter.module.css'

interface TagFilterProps {
	tags: string[]
	selectedTag: string | null
	onTagChange: (tag: string | null) => void
}

export default function TagFilter({
	tags,
	selectedTag,
	onTagChange
}: TagFilterProps) {
	if (tags.length === 0) return null

	return (
		<div className={styles.filterContainer}>
			<Button
				variant="filter"
				isActive={selectedTag === null}
				onClick={() => onTagChange(null)}
			>
				All
			</Button>
			{tags.map((tag) => (
				<Button
					key={tag}
					variant="filter"
					isActive={selectedTag === tag}
					onClick={() => onTagChange(tag)}
				>
					{tag}
				</Button>
			))}
		</div>
	)
}
