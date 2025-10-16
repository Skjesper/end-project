import { getProducts } from '@/lib/shopify';

export default async function Home() {
  const products = await getProducts();

  console.log('Shopify Products:', products);
  console.log('Number of products:', products.length);

  return (
    <main>
      <h1>My E-Commerce Store</h1>
      <p>Check the browser console for Shopify connection test</p>
      <p>Found {products.length} products</p>
    </main>
  );
}