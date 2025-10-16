import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2024-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

// Test function - fetch all products
export async function getProducts() {
  const query = `
    query GetProducts {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
          }
        }
      }
    }
  `;

  try {
    const response = await client.request(query);
    console.log('Shopify Response:', response);
    return response.data?.products.edges.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Shopify Connection Error:', error);
    return [];
  }
}