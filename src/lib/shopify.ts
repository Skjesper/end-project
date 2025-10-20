import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { Product, Collection } from '@/types/product'

const client = createStorefrontApiClient({
	storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
	apiVersion: '2025-01',
	publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!
})
// Fetch all collections (categories)
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
				(edge: any) => edge.node
			) as Collection[]) || []

		return collections
	} catch (error) {
		console.error('Shopify Collections Error:', error)
		return []
	}
}

// Fetch products by collection handle
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
        products(first: 6) {
          edges {
            node {
              id
              title
              handle
              description
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

		const collectionData = response.data?.collection

		if (!collectionData) {
			return { collection: null, products: [] }
		}

		const collection: Collection = {
			id: collectionData.id,
			title: collectionData.title,
			handle: collectionData.handle,
			description: collectionData.description
		}

		const products: Product[] = collectionData.products.edges.map(
			(edge: any) => {
				const node = edge.node
				return {
					id: node.id,
					title: node.title,
					handle: node.handle,
					description: node.description,
					priceRange: {
						minVariantPrice: {
							amount: node.priceRange.minVariantPrice.amount,
							currencyCode: node.priceRange.minVariantPrice.currencyCode
						}
					},
					images: node.images.edges.map((imgEdge: any) => ({
						url: imgEdge.node.url,
						altText: imgEdge.node.altText
					}))
				}
			}
		)

		return { collection, products }
	} catch (error) {
		console.error('Shopify Products by Collection Error:', error)
		return { collection: null, products: [] }
	}
}

// Original function - kept for reference
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
          }
        }
      }
    }
  `

	try {
		const response = await client.request(query)
		console.log('Shopify Response:', response)

		const products: Product[] =
			response.data?.products.edges.map((edge: any) => {
				const node = edge.node
				return {
					id: node.id,
					title: node.title,
					handle: node.handle,
					description: node.description,
					priceRange: {
						minVariantPrice: {
							amount: node.priceRange.minVariantPrice.amount,
							currencyCode: node.priceRange.minVariantPrice.currencyCode
						}
					},
					images: node.images.edges.map((imgEdge: any) => ({
						url: imgEdge.node.url,
						altText: imgEdge.node.altText
					}))
				}
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

		const node = response.data.product
		return {
			id: node.id,
			title: node.title,
			description: node.description || '',
			handle: node.handle,
			priceRange: {
				minVariantPrice: {
					amount: node.priceRange.minVariantPrice.amount,
					currencyCode: node.priceRange.minVariantPrice.currencyCode
				}
			},
			images: node.images.edges.map((imgEdge: any) => ({
				url: imgEdge.node.url,
				altText: imgEdge.node.altText
			}))
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
        variants(first: 1) {
          edges {
            node {
              id
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

		const node = response.data.product
		return {
			id: node.id,
			title: node.title,
			description: node.description || '',
			handle: node.handle,
			priceRange: {
				minVariantPrice: {
					amount: node.priceRange.minVariantPrice.amount,
					currencyCode: node.priceRange.minVariantPrice.currencyCode
				}
			},
			images: node.images.edges.map((imgEdge: any) => ({
				url: imgEdge.node.url,
				altText: imgEdge.node.altText
			})),
			variantId: node.variants.edges[0]?.node.id || node.id
		}
	} catch (error) {
		console.error('Error fetching product by handle:', error)
		return null
	}
}
