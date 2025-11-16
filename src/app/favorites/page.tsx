'use client'

import { useFavorites } from '@/context/FavoritesContext'
import { useCart } from '@/context/CartContext'

import Link from 'next/link'
import Button from '@/components/ui/button/Button'
import AddToCartButton from '@/components/ui/button/AddToCartButton'
import styles from './page.module.css'

export default function FavoritesPage() {
	const { favorites, toggleFavorite } = useFavorites()
	const { getTotalItems } = useCart()

	if (favorites.length === 0) {
		return (
			<div>
				<h1>Your Favorites</h1>
			</div>
		)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.title}>
					<h3>FAVORITES ({favorites.length})</h3>

					<Button variant="nav">
						<Link href="/cart">
							{getTotalItems() > 0 && <h3>Cart ({getTotalItems()})</h3>}
						</Link>
					</Button>
				</div>

				<ul className={styles.favoriteItems}>
					{favorites.map((item) => (
						<li key={item.productId}>
							<div className={styles.contentWrapper}>
								<div className={styles.imageSection}>
									<Link href={`/item/${item.handle}`}>
										<img
											src={item.image}
											alt={item.title}
											width={200}
											height={200}
										/>
									</Link>
								</div>

								<div className={styles.infoSection}>
									<Link href={`/item/${item.handle}`}>
										<h3>{item.title}</h3>
										<p>
											{item.price.toFixed(2)} {item.currency}
										</p>
									</Link>
								</div>
							</div>

							<div className={styles.footerWrapper}>
								<div className={styles.favoritesFooter}>
									<AddToCartButton
										productId={item.productId}
										variantId={item.productId}
										handle={item.handle}
										title={item.title}
										price={item.price}
										image={item.image}
										currency={item.currency}
										variant="filter"
									>
										Add to cart
									</AddToCartButton>

									<Button variant="filter" onClick={() => toggleFavorite(item)}>
										Remove
									</Button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
