'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/button/Button'
import styles from './Header.module.css'
import Image from 'next/image'

export default function Header() {
	const { getTotalItems } = useCart()

	return (
		<header>
			<div className={styles.headerContainer}>
				{/* Left side - 4 items */}
				<nav className={styles.leftNav}>
					<Link href="/">
						<Button variant="nav">Home</Button>
					</Link>
					<Link href="/category/glasses">
						<Button variant="nav">Glasses</Button>
					</Link>
					<Link href="/category/bags">
						<Button variant="nav">Bags</Button>
					</Link>
					<Link href="/shop">
						<Button variant="nav">Shop</Button>
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

				{/* Right side - 4 items */}
				<nav className={styles.rightNav}>
					<Link href="/account">
						<Button variant="nav">Login</Button>
					</Link>
					<Link href="/search">
						<Button variant="nav">
							<Image
								src="/assets/SearchIcon.svg"
								alt="Cart"
								width={25}
								height={25}
							/>
						</Button>
					</Link>

					<Link href="/favorites">
						<Button variant="nav">
							<Image
								src="/assets/HeartIcon.svg"
								alt="Cart"
								width={25}
								height={25}
							/>
						</Button>
					</Link>
					<Link href="/cart">
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
										fontWeight: 'bold',
										height: 'inherit'
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
