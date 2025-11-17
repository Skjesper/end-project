import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { Product, ProductVariant } from '@/types/product'

const client = createStorefrontApiClient({
	storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
	apiVersion: '2025-01',
	publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!
})

// Type definitions for Shopify API responses
interface ShopifyEdge<T> {
	node: T
}

interface ShopifyConnection<T> {
	edges: ShopifyEdge<T>[]
}

interface ShopifyCollectionNode {
	id: string
	title: string
	handle: string
	description: string
}

interface ShopifyImageNode {
	url: string
	altText: string | null
}

interface ShopifyPriceNode {
	amount: string
	currencyCode: string
}

interface ShopifySelectedOption {
	name: string
	value: string
}

interface ShopifyVariantNode {
	id: string
	title: string
	availableForSale: boolean
	price: ShopifyPriceNode
	selectedOptions: ShopifySelectedOption[]
}

interface ShopifyMetafieldNode {
	value: string
}

interface ShopifyProductNode {
	id: string
	title: string
	handle: string
	description: string
	tags?: string[]
	category?: {
		name: string
	} | null
	standardShipping?: ShopifyMetafieldNode | null
	sizeInfo?: ShopifyMetafieldNode | null
	priceRange: {
		minVariantPrice: ShopifyPriceNode
	}
	images: ShopifyConnection<ShopifyImageNode>
	variants: ShopifyConnection<ShopifyVariantNode>
}

interface ShopifyCollectionWithProducts extends ShopifyCollectionNode {
	products: ShopifyConnection<ShopifyProductNode>
}

// Export Collection type
export interface Collection {
	id: string
	title: string
	handle: string
	description: string
}

// Export CartItem type
export interface CartItem {
	variantId: string
	quantity: number
}

export async function getCollections(): Promise<Collection[]> {
	const query = `
    query GetCollections {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
          }
        }
      }
    }
  `

	try {
		const response = await client.request(query)
		console.log('Collections Response:', response)

		const collections =
			(response.data?.collections.edges.map(
				(edge: ShopifyEdge<ShopifyCollectionNode>) => edge.node
			) as Collection[]) || []

		return collections
	} catch (error) {
		console.error('Shopify Collections Error:', error)
		return []
	}
}

export async function getProductsByCollection(
	collectionHandle: string
): Promise<{ collection: Collection | null; products: Product[] }> {
	const query = `
    query GetProductsByCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        products(first: 30) {
          edges {
            node {
              id
              title
              handle
              description
              tags
              category {
                name
              }
              standardShipping: metafield(namespace: "custom", key: "standard_shipping") {
                value
              }
				sizeInfo: metafield(namespace: "custom", key: "sizeinfo") {
  value
}

              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 50) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

	try {
		const response = await client.request(query, {
			variables: { handle: collectionHandle }
		})
		console.log('Products by Collection Response:', response)

		const collectionData = response.data?.collection as
			| ShopifyCollectionWithProducts
			| undefined

		if (!collectionData) {
			return { collection: null, products: [] }
		}

		const collection: Collection = {
			id: collectionData.id,
			title: collectionData.title,
			handle: collectionData.handle,
			description: collectionData.description
		}

		const products: Product[] = collectionData.products.edges
			.map((edge: ShopifyEdge<ShopifyProductNode>) => {
				const node = edge.node

				// Map variants with proper typing
				const mappedVariants: ProductVariant[] = node.variants.edges.map(
					(variantEdge: ShopifyEdge<ShopifyVariantNode>) => ({
						id: variantEdge.node.id,
						title: variantEdge.node.title,
						availableForSale: variantEdge.node.availableForSale,
						price: {
							amount: variantEdge.node.price.amount,
							currencyCode: variantEdge.node.price.currencyCode
						},
						selectedOptions: variantEdge.node.selectedOptions
					})
				)

				return {
					id: node.id,
					title: node.title,
					handle: node.handle,
					tags: node.tags,
					category: node.category?.name || null,
					standardShipping: node.standardShipping?.value || null,
					sizeInfo: node.sizeInfo?.value || null,
					description: node.description,
					priceRange: {
						minVariantPrice: {
							amount: node.priceRange.minVariantPrice.amount,
							currencyCode: node.priceRange.minVariantPrice.currencyCode
						}
					},
					images: node.images.edges.map(
						(imgEdge: ShopifyEdge<ShopifyImageNode>) => ({
							url: imgEdge.node.url,
							altText: imgEdge.node.altText
						})
					),
					variants: mappedVariants,
					availableForSale: mappedVariants.some((v) => v.availableForSale)
				}
			})
			// Filter out products with NO available variants
			.filter((product: Product) => {
				return (
					product.variants &&
					product.variants.length > 0 &&
					product.variants.some((variant) => variant.availableForSale)
				)
			})

		return { collection, products }
	} catch (error) {
		console.error('Shopify Products by Collection Error:', error)
		return { collection: null, products: [] }
	}
}

export async function getProducts(): Promise<Product[]> {
	const query = `
    query GetProducts {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            standardShipping: metafield(namespace: "custom", key: "standard_shipping") {
              value
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `

	try {
		const response = await client.request(query)
		console.log('Shopify Response:', response)

		const products: Product[] =
			response.data?.products.edges
				.map((edge: ShopifyEdge<ShopifyProductNode>) => {
					const node = edge.node

					// Map variants with proper typing
					const mappedVariants: ProductVariant[] = node.variants.edges.map(
						(variantEdge: ShopifyEdge<ShopifyVariantNode>) => ({
							id: variantEdge.node.id,
							title: variantEdge.node.title,
							availableForSale: variantEdge.node.availableForSale,
							price: {
								amount: variantEdge.node.price.amount,
								currencyCode: variantEdge.node.price.currencyCode
							},
							selectedOptions: variantEdge.node.selectedOptions
						})
					)

					return {
						id: node.id,
						title: node.title,
						handle: node.handle,
						description: node.description,
						standardShipping: node.standardShipping?.value || null,
						priceRange: {
							minVariantPrice: {
								amount: node.priceRange.minVariantPrice.amount,
								currencyCode: node.priceRange.minVariantPrice.currencyCode
							}
						},
						images: node.images.edges.map(
							(imgEdge: ShopifyEdge<ShopifyImageNode>) => ({
								url: imgEdge.node.url,
								altText: imgEdge.node.altText
							})
						),
						variants: mappedVariants,
						availableForSale: mappedVariants.some((v) => v.availableForSale)
					}
				})
				.filter((product: Product) => {
					return (
						product.variants &&
						product.variants.length > 0 &&
						product.variants.some((variant) => variant.availableForSale)
					)
				}) || []

		return products
	} catch (error) {
		console.error('Shopify Connection Error:', error)
		return []
	}
}

export async function getProduct(id: string): Promise<Product | null> {
	const query = `
    query GetProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        handle
        standardShipping: metafield(namespace: "custom", key: "standard_shipping") {
          value
        }
		  sizeInfo: metafield(namespace: "custom", key: "standard_shipping") {
          value
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `

	try {
		const response = await client.request(query, {
			variables: { id }
		})

		if (!response.data?.product) {
			return null
		}

		const node = response.data.product as ShopifyProductNode

		// Map variants with proper typing
		const mappedVariants: ProductVariant[] = node.variants.edges.map(
			(variantEdge: ShopifyEdge<ShopifyVariantNode>) => ({
				id: variantEdge.node.id,
				title: variantEdge.node.title,
				availableForSale: variantEdge.node.availableForSale,
				price: {
					amount: variantEdge.node.price.amount,
					currencyCode: variantEdge.node.price.currencyCode
				},
				selectedOptions: variantEdge.node.selectedOptions
			})
		)

		return {
			id: node.id,
			title: node.title,
			description: node.description || '',
			handle: node.handle,
			tags: node.tags,
			standardShipping: node.standardShipping?.value || null,
			priceRange: {
				minVariantPrice: {
					amount: node.priceRange.minVariantPrice.amount,
					currencyCode: node.priceRange.minVariantPrice.currencyCode
				}
			},
			images: node.images.edges.map(
				(imgEdge: ShopifyEdge<ShopifyImageNode>) => ({
					url: imgEdge.node.url,
					altText: imgEdge.node.altText
				})
			),
			variants: mappedVariants,
			availableForSale: mappedVariants.some((v) => v.availableForSale)
		}
	} catch (error) {
		console.error('Error fetching product:', error)
		return null
	}
}

export async function getProductByHandle(
	handle: string
): Promise<Product | null> {
	const query = `
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        handle
        standardShipping: metafield(namespace: "custom", key: "standard_shipping") {
          value
        }
		  sizeInfo: metafield(namespace: "custom", key: "sizeinfo") {
  value
}
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `

	try {
		const response = await client.request(query, {
			variables: { handle }
		})

		if (!response.data?.product) {
			return null
		}

		const node = response.data.product as ShopifyProductNode

		// Map variants with proper typing
		const mappedVariants: ProductVariant[] = node.variants.edges.map(
			(variantEdge: ShopifyEdge<ShopifyVariantNode>) => ({
				id: variantEdge.node.id,
				title: variantEdge.node.title,
				availableForSale: variantEdge.node.availableForSale,
				price: {
					amount: variantEdge.node.price.amount,
					currencyCode: variantEdge.node.price.currencyCode
				},
				selectedOptions: variantEdge.node.selectedOptions
			})
		)

		return {
			id: node.id,
			title: node.title,
			description: node.description || '',
			handle: node.handle,
			standardShipping: node.standardShipping?.value || null,
			sizeInfo: node.sizeInfo?.value || null,
			priceRange: {
				minVariantPrice: {
					amount: node.priceRange.minVariantPrice.amount,
					currencyCode: node.priceRange.minVariantPrice.currencyCode
				}
			},
			images: node.images.edges.map(
				(imgEdge: ShopifyEdge<ShopifyImageNode>) => ({
					url: imgEdge.node.url,
					altText: imgEdge.node.altText
				})
			),
			variants: mappedVariants,
			availableForSale: mappedVariants.some((v) => v.availableForSale),
			variantId: node.variants.edges[0]?.node.id || node.id
		}
	} catch (error) {
		console.error('Error fetching product by handle:', error)
		return null
	}
}

export async function createCheckout(cartItems: CartItem[]) {
	const lines = cartItems.map((item) => ({
		merchandiseId: item.variantId,
		quantity: item.quantity
	}))

	console.log('Creating checkout with lines:', lines)

	// Step 1: Create cart
	const createMutation = `
    mutation cartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          message
          field
        }
      }
    }
  `

	try {
		const response = await client.request(createMutation, {
			variables: { lines }
		})

		const cartId = response.data?.cartCreate?.cart?.id
		const errors = response.data?.cartCreate?.userErrors

		if (errors && errors.length > 0) {
			console.error('Cart errors:', errors)
			return null
		}

		if (!cartId) {
			console.error('No cart ID returned')
			return null
		}

		// Step 2: Get checkout URL
		const cartQuery = `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          checkoutUrl
        }
      }
    `

		const cartResponse = await client.request(cartQuery, {
			variables: { cartId }
		})

		let checkoutUrl = cartResponse.data?.cart?.checkoutUrl

		// Add return_to parameter to redirect back to your Vercel site
		if (checkoutUrl) {
			const url = new URL(checkoutUrl)
			url.searchParams.append(
				'return_to',
				'https://skjesp.vercel.app/thank-you'
			)
			checkoutUrl = url.toString()
		}

		console.log('Final checkout URL:', checkoutUrl)
		return checkoutUrl || null
	} catch (error) {
		console.error('Checkout request failed:', error)
		return null
	}
}

export async function getProductsByTag(
	tag: string,
	limit: number = 10
): Promise<Product[]> {
	const query = `
    query GetProductsByTag($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            tags
            category {
              name
            }
            standardShipping: metafield(namespace: "custom", key: "standard_shipping") {
              value
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `

	try {
		const response = await client.request(query, {
			variables: {
				query: `tag:${tag}`,
				first: limit
			}
		})

		console.log('Products by Tag Response:', response)

		const products: Product[] =
			response.data?.products.edges
				.map((edge: ShopifyEdge<ShopifyProductNode>) => {
					const node = edge.node

					// Map variants with proper typing
					const mappedVariants: ProductVariant[] = node.variants.edges.map(
						(variantEdge: ShopifyEdge<ShopifyVariantNode>) => ({
							id: variantEdge.node.id,
							title: variantEdge.node.title,
							availableForSale: variantEdge.node.availableForSale,
							price: {
								amount: variantEdge.node.price.amount,
								currencyCode: variantEdge.node.price.currencyCode
							},
							selectedOptions: variantEdge.node.selectedOptions
						})
					)

					return {
						id: node.id,
						title: node.title,
						handle: node.handle,
						description: node.description,
						tags: node.tags,
						category: node.category?.name || null,
						standardShipping: node.standardShipping?.value || null,
						priceRange: {
							minVariantPrice: {
								amount: node.priceRange.minVariantPrice.amount,
								currencyCode: node.priceRange.minVariantPrice.currencyCode
							}
						},
						images: node.images.edges.map(
							(imgEdge: ShopifyEdge<ShopifyImageNode>) => ({
								url: imgEdge.node.url,
								altText: imgEdge.node.altText
							})
						),
						variants: mappedVariants,
						availableForSale: mappedVariants.some((v) => v.availableForSale)
					}
				})
				.filter((product: Product) => {
					return (
						product.variants &&
						product.variants.length > 0 &&
						product.variants.some((variant) => variant.availableForSale)
					)
				}) || []

		return products
	} catch (error) {
		console.error('Shopify Products by Tag Error:', error)
		return []
	}
}
