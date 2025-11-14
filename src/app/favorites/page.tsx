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
	const [selectedColor, setSelectedColor] = useState<string>('')
	const [selectedVariantId, setSelectedVariantId] = useState<string>('')

	useEffect(() => {
		async function loadProduct() {
			const resolvedParams = await params
			const productData = await getProductByHandle(resolvedParams.slug)
			setProduct(productData)

			// Set default variant if available
			if (productData?.variants?.[0]) {
				setSelectedVariantId(productData.variants[0].id)
				// Set default selections based on first variant
				const firstVariant = productData.variants[0]
				const sizeOption = firstVariant.selectedOptions.find(
					(opt) => opt.name.toLowerCase() === 'size'
				)
				const colorOption = firstVariant.selectedOptions.find(
					(opt) => opt.name.toLowerCase() === 'color'
				)
				if (sizeOption) setSelectedSize(sizeOption.value)
				if (colorOption) setSelectedColor(colorOption.value)
			}

			setLoading(false)
		}
		loadProduct()
	}, [params])

	// Update selected variant when size or color changes
	useEffect(() => {
		if (!product?.variants) return

		const matchingVariant = product.variants.find((variant) => {
			const variantSize = variant.selectedOptions.find(
				(opt) => opt.name.toLowerCase() === 'size'
			)?.value
			const variantColor = variant.selectedOptions.find(
				(opt) => opt.name.toLowerCase() === 'color'
			)?.value

			// Match based on what options exist
			const sizeMatches = !selectedSize || variantSize === selectedSize
			const colorMatches = !selectedColor || variantColor === selectedColor

			return sizeMatches && colorMatches
		})

		if (matchingVariant) {
			setSelectedVariantId(matchingVariant.id)
		}
	}, [selectedSize, selectedColor, product])

	const handleSizeChange = (event: SelectChangeEvent<string>) => {
		setSelectedSize(event.target.value)
	}

	const handleColorChange = (color: string) => {
		setSelectedColor(color)
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
									<span className={styles.variantLabel}>Color:</span>
									<div className={styles.variantOptions}>
										{colors.map((color) => (
											<Button
												key={color}
												variant="color"
												onClick={() => handleColorChange(color)}
												className={
													selectedColor === color ? styles.selected : ''
												}
											>
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
								variantId={selectedVariantId}
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
