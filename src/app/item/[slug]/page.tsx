import { getProductByHandle } from '@/lib/shopify'
import Link from 'next/link'
import styles from './page.module.css'
import AddToCartButton from '@/components/ui/button/AddToCartButton'
import ProductImageGallery from '@/components/products/productImageGallery/ProductImageGallery'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default async function ProductDetailPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const product = await getProductByHandle(slug)

	if (!product) {
		return (
			<div>
				<h1>Product Not Found</h1>
				<Link href="/item">Back to Products</Link>
			</div>
		)
	}

	const price = parseFloat(product.priceRange.minVariantPrice.amount)
	const currency = product.priceRange.minVariantPrice.currencyCode

	return (
		<div>
			<Link href="/item">← Back to Products</Link>
			<div className={styles.pageContainer}>
				<ProductImageGallery
					images={product.images}
					productTitle={product.title}
				/>

				<section className={styles.productDetails}>
					<h3>{product.title}</h3>

					<div>
						<p>
							Price: {price.toFixed(2)} {currency}
						</p>

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
							>
								Add to Cart
							</AddToCartButton>
						</div>
						<section className={styles.productDescription}>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="size-fit-content"
									id="size-fit-header"
								>
									<h3>Size & Fit</h3>
								</AccordionSummary>
								<AccordionDetails>
									{product.sizeAndFit && <p>{product.sizeAndFit}</p>}
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="details-content"
									id="details-header"
								>
									<h3>Details</h3>
								</AccordionSummary>
								<AccordionDetails>
									{product.description && <p>{product.description}</p>}
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="shipping-content"
									id="shipping-header"
								>
									<h3>Shipping</h3>
								</AccordionSummary>
								<AccordionDetails>
									{product.shipping && <p>{product.shipping}</p>}
								</AccordionDetails>
							</Accordion>
						</section>
					</div>
				</section>
			</div>
		</div>
	)
}
