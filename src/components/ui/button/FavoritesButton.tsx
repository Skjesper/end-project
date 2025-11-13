'use client'

import { useFavorites } from '@/context/FavoritesContext'
import Button from './Button'

interface FavoriteButtonProps {
	productId: string
	handle: string
	title: string
	image: string
	price: number
	currency: string
}

export default function FavoriteButton({
	productId,
	handle,
	title,
	image,
	price,
	currency
}: FavoriteButtonProps) {
	const { toggleFavorite, isFavorite } = useFavorites()

	const handleClick = () => {
		toggleFavorite({
			productId,
			handle,
			title,
			image,
			price,
			currency
		})
	}

	const favorited = isFavorite(productId)

	return (
		<Button
			onClick={handleClick}
			variant="secondary"
			ariaLabel={favorited ? 'Remove from favorites' : 'Add to favorites'}
		>
			{favorited ? '❤️' : '🤍'}
		</Button>
	)
}
