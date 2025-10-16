import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { Product } from '@/types/product'

const client = createStorefrontApiClient({
	storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
	apiVersion: '2024-10',
	publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!
})

export async function getProducts(): Promise<Product[]> {
	const query = `
    query GetProducts {
      products(first: 20) {
        edges {
          node {
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
		const products =
			response.data?.products.edges.map((edge: any) => {
				const node = edge.node
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
			}) || []

		return products
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}
