'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/button/Button'
import styles from './Header.module.css'
import Image from 'next/image'
export default function Header() {
	const { getTotalItems } = useCart()

	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				{/* Mobile menu - hidden on desktop */}
				<div className={styles.mobileMenu}>
					<Button variant="nav">☰</Button>
				</div>

				{/* Left side navigation */}
				<nav className={styles.leftNav}>
					<Link href="/" className={`${styles.navItem} ${styles.priority2}`}>
						<Button variant="nav">Explore</Button>
					</Link>
					<Link
						href="/category/glasses"
						className={`${styles.navItem} ${styles.priority2}`}
					>
						<Button variant="nav">Glasses</Button>
					</Link>
					<Link
						href="/category/bags"
						className={`${styles.navItem} ${styles.priority3}`}
					>
						<Button variant="nav">Bags</Button>
					</Link>
					<Link
						href="/shop"
						className={`${styles.navItem} ${styles.priority4}`}
					>
						<Button variant="nav">Collections</Button>
					</Link>
				</nav>

				{/* Center - Logo */}
				<div className={styles.logoContainer}>
					<Link href="/">
						<Image
							src="/assets/SkjespLogo.png"
							alt="Logo"
							width={200}
							height={50}
						/>
					</Link>
				</div>

				{/* Right side navigation */}
				<nav className={styles.rightNav}>
					<Link
						href="/account"
						className={`${styles.navItem} ${styles.priority3}`}
					>
						<Button variant="nav">Login</Button>
					</Link>

					<Link href="/search" className={styles.navItem}>
						<Button variant="nav">
							<Image
								src="/assets/SearchIcon.svg"
								alt="Search"
								width={25}
								height={25}
							/>
						</Button>
					</Link>

					<Link
						href="/favorites"
						className={`${styles.navItem} ${styles.priority2}`}
					>
						<Button variant="nav">
							<Image
								src="/assets/HeartIcon.svg"
								alt="Favorites"
								width={25}
								height={25}
							/>
						</Button>
					</Link>

					<Link href="/cart" className={styles.navItem}>
						<Button variant="nav">
							<div style={{ position: 'relative', display: 'inline-block' }}>
								<Image
									src="/assets/CartIcon.svg"
									alt="Cart"
									width={25}
									height={25}
								/>
								<span
									style={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										fontSize: '10px',
										fontWeight: 'bold'
									}}
								>
									{getTotalItems()}
								</span>
							</div>
						</Button>
					</Link>
				</nav>
			</div>
		</header>
	)
}
