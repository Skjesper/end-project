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

			// IMPORTANT: Set default variant immediately when product loads
			if (productData?.variants && productData.variants.length > 0) {
				const firstVariant = productData.variants[0]
				setSelectedVariantId(firstVariant.id) // Set the variant ID right away

				// Also set the default size and color based on first variant
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
		if (!product?.variants || product.variants.length === 0) return

		const matchingVariant = product.variants.find((variant) => {
			const variantSize = variant.selectedOptions.find(
				(opt) => opt.name.toLowerCase() === 'size'
			)?.value
			const variantColor = variant.selectedOptions.find(
				(opt) => opt.name.toLowerCase() === 'color'
			)?.value

			// Match based on selected options
			const sizeMatches = !selectedSize || variantSize === selectedSize
			const colorMatches = !selectedColor || variantColor === selectedColor

			return sizeMatches && colorMatches
		})

		if (matchingVariant) {
			setSelectedVariantId(matchingVariant.id)
			console.log('Selected variant ID:', matchingVariant.id) // Debug log
		}
	}, [selectedSize, selectedColor, product])

	const handleSizeChange = (event: SelectChangeEvent<string>) => {
		setSelectedSize(event.target.value)
	}

	const handleColorChange = (event: SelectChangeEvent<string>) => {
		setSelectedColor(event.target.value)
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

	console.log('Current selectedVariantId:', selectedVariantId) // Debug log

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
											label="Select Size"
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
									<FormControl fullWidth>
										<InputLabel id="color-select-label">
											Select Color
										</InputLabel>
										<Select
											labelId="color-select-label"
											id="color-select"
											value={selectedColor}
											label="Select Color"
											onChange={handleColorChange}
										>
											{colors.map((color) => (
												<MenuItem key={color} value={color}>
													{color}
												</MenuItem>
											))}
										</Select>
									</FormControl>
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
								selectedSize={selectedSize}
								selectedColor={selectedColor}
							/>
						</div>

						<ProductAccordions description={product.description} />
					</div>
				</section>
			</div>
		</div>
	)
}
