'use client'

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode
} from 'react'
import { FavoriteItem } from '@/types/favorites'

interface FavoritesContextType {
	favorites: FavoriteItem[]
	toggleFavorite: (item: FavoriteItem) => void
	isFavorite: (productId: string) => boolean
	getFavoriteCount: () => number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined
)

export function FavoritesProvider({ children }: { children: ReactNode }) {
	const [favorites, setFavorites] = useState<FavoriteItem[]>([])

	// Load from localStorage on mount
	useEffect(() => {
		const saved = localStorage.getItem('favorites')
		if (saved) {
			setFavorites(JSON.parse(saved))
		}
	}, [])

	// Save to localStorage whenever favorites change
	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}, [favorites])

	const toggleFavorite = (item: FavoriteItem) => {
		setFavorites((prev) => {
			const exists = prev.find((fav) => fav.productId === item.productId)

			if (exists) {
				// Remove from favorites
				return prev.filter((fav) => fav.productId !== item.productId)
			} else {
				// Add to favorites
				return [...prev, item]
			}
		})
	}

	const isFavorite = (productId: string) => {
		return favorites.some((fav) => fav.productId === productId)
	}

	const getFavoriteCount = () => favorites.length

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				toggleFavorite,
				isFavorite,
				getFavoriteCount
			}}
		>
			{children}
		</FavoritesContext.Provider>
	)
}

export function useFavorites() {
	const context = useContext(FavoritesContext)
	if (!context) {
		throw new Error('useFavorites must be used within FavoritesProvider')
	}
	return context
}
