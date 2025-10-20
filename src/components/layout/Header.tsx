import Link from 'next/link'

export default function Header() {
	return (
		<header>
			<div>
				<Link href="/">StoreName</Link>

				<nav>
					<Link href="/">Home</Link>
					<Link href="/products">Products</Link>
					<Link href="/cart">Cart (0)</Link>
				</nav>
			</div>
		</header>
	)
}
