# E-Commerce Platform with Shopify & Next.js

A modern e-commerce platform built with Next.js 15, React 19, and Shopify's Storefront API. Features product browsing, cart management, favorites system, and GSAP animations.

## Tech Stack

Next.js 15 (App Router), TypeScript, React 19, CSS Modules, Shopify Storefront API (GraphQL), GSAP with ScrollTrigger, Material-UI, Swiper.js, React Context API

## Prerequisites

- Node.js 18+
- npm or yarn
- Shopify store with Storefront API access

## Installation

Clone the repository and install dependencies:
```bash
git clone https://github.com/yourusername/ecommerce-shopify-nextjs.git
cd ecommerce-shopify-nextjs
npm install
```

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
```

## Getting Shopify Credentials

1. Go to Shopify Admin
2. Navigate to Settings → Apps and sales channels → Develop apps
3. Create a new app
4. Configure Storefront API scopes:
   - unauthenticated_read_product_listings
   - unauthenticated_read_product_inventory
   - unauthenticated_read_collection_listings
5. Install the app and copy the Storefront API access token
6. Add credentials to `.env.local`

## Shopify Store Setup

Create three collections with these handles: `men`, `women`, `accessories`

Tag your products appropriately:
- `mens`, `womens`, `accessories` for main categories
- `highlight` for featured products on homepage
- Custom tags for filtering (e.g., `t-shirts`, `jeans`)

Ensure products have size and color variants configured.

## Running the Project

Development server:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

Open http://localhost:3000 in your browser.

## Project Structure
```
src/
├── app/              # Next.js pages
├── components/       # React components
├── context/          # CartContext, FavoritesContext
├── lib/              # shopify.ts (API functions)
├── types/            # TypeScript types
└── utils/            # Helper functions
```

## Deployment

Deploy to Vercel:
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Common Issues

**Products not showing:** Verify collections are published and products have correct tags

**Environment variables not working:** Restart dev server after adding variables

**GraphQL errors:** Check API token and scopes are correct

## License

MIT License
