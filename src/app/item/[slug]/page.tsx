'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import AddToCartButton from '@/components/ui/button/AddToCartButton'
import ProductImageGallery from '@/components/products/productImageGallery/ProductImageGallery'
import ProductAccordions from '@/components/products/productAccordions/ProductAccordions'
import Button from '@/components/ui/button/Button'
import { Product } from '@/types/product'
import { getProductByHandle } from '@/lib/shopify'

import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent
} from '@mui/material'

export default function ProductDetailPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const [product, setProduct] = useState<Product | null>(null)
	const [loading, setLoading] = useState(true)
	const [selectedSize, setSelectedSize] = useState<string>('')

	useEffect(() => {
		async function loadProduct() {
			const resolvedParams = await params
			const productData = await getProductByHandle(resolvedParams.slug)
			setProduct(productData)
			setLoading(false)
		}
		loadProduct()
	}, [params])

	const handleSizeChange = (event: SelectChangeEvent<string>) => {
		setSelectedSize(event.target.value)
	}

	if (loading) {
		return <div>Loading...</div>
	}

	if (!product) {
		return (
			<div>
				<h1>Product Not Found</h1>
				<Link href="/item">Back to Products</Link>
			</div>
		)
	}

	const colors = product.variants
		? Array.from(
				new Set(
					product.variants
						.flatMap((v) => v.selectedOptions)
						.filter((opt) => opt.name.toLowerCase() === 'color')
						.map((opt) => opt.value)
				)
		  )
		: []

	const sizes = product.variants
		? Array.from(
				new Set(
					product.variants
						.flatMap((v) => v.selectedOptions)
						.filter((opt) => opt.name.toLowerCase() === 'size')
						.map((opt) => opt.value)
				)
		  )
		: []

	const price = parseFloat(product.priceRange.minVariantPrice.amount)
	const currency = product.priceRange.minVariantPrice.currencyCode

	return (
		<div>
			<div className={styles.pageContainer}>
				<ProductImageGallery
					images={product.images}
					productTitle={product.title}
				/>

				<section className={styles.productDetails}>
					<h3>{product.title}</h3>
					<div className={styles.options}>
						<div className={styles.price}>
							<p>
								Price: {price.toFixed(2)} {currency}
							</p>
						</div>

						<div className={styles.variantInfo}>
							{sizes.length > 0 && (
								<div className={styles.variantRow}>
									<FormControl fullWidth>
										<InputLabel id="size-select-label">Select Size</InputLabel>
										<Select
											labelId="size-select-label"
											id="size-select"
											value={selectedSize}
											label="Size"
											onChange={handleSizeChange}
										>
											{sizes.map((size) => (
												<MenuItem key={size} value={size}>
													{size}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</div>
							)}
						</div>

						<div className={styles.variantInfo}>
							{colors.length > 0 && (
								<div className={styles.variantRow}>
									<span className={styles.variantLabel}></span>
									<div className={styles.variantOptions}>
										{colors.map((color) => (
											<Button key={color} variant="color">
												{color}
											</Button>
										))}
									</div>
								</div>
							)}
						</div>

						<div className={styles.addToCartButton}>
							<AddToCartButton
								productId={product.id}
								variantId={product.variantId || ''}
								handle={product.handle}
								title={product.title}
								price={price}
								image={product.images[0]?.url || ''}
								currency={currency}
								variant="primary"
							/>
						</div>

						<ProductAccordions description={product.description} />
					</div>
				</section>
			</div>
		</div>
	)
}
