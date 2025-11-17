'use client'

import { useFavorites } from '@/context/FavoritesContext'
import Button from './Button'
import styles from './Button.module.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'

interface FavoriteButtonProps {
	productId: string
	handle: string
	title: string
	image: string
	price: number
	currency: string
	variantId: string
}

export default function FavoriteButton({
	productId,
	handle,
	title,
	image,
	price,
	currency,
	variantId
}: FavoriteButtonProps) {
	const { toggleFavorite, isFavorite } = useFavorites()

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault() // Prevents link navigation
		e.stopPropagation() // Stops event from bubbling to parent elements

		toggleFavorite({
			productId,
			handle,
			title,
			image,
			price,
			currency,
			variantId
		})
	}

	const favorited = isFavorite(productId)

	return (
		<Button
			variant="favorites"
			className={styles.favoriteButton}
			onClick={handleClick}
		>
			{favorited ? (
				<BookmarkIcon className={styles.favoriteIcon} />
			) : (
				<BookmarkBorderIcon className={styles.favoriteIcon} />
			)}
		</Button>
	)
}
