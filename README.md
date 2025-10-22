## App Structure

src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (test page)
│   ├── item/              # Product pages
│   │   ├── page.tsx       # All products listing
│   │   └── [slug]/        # Individual product detail
│   ├── category/          # Collection pages
│   │   ├── page.tsx       # All collections
│   │   └── [slug]/        # Filtered by collection (glasses, bags)
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout redirect page
│   ├── confirmation/      # Order confirmation
│   └── layout.tsx         # Root layout with providers
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx     # Navigation + cart count
│   │   ├── Footer.tsx     # Footer
│   │   └── Layout.tsx     # Wraps Header + children + Footer
│   ├── products/
│   │   ├── ProductCard.tsx      # Single product display
│   │   ├── ProductGrid.tsx      # Grid of products
│   │   └── AddToCartButton.tsx  # Add to cart functionality
│   └── cart/
│       ├── CartItem.tsx         # Single cart item with +/- controls
│       └── CartSummary.tsx      # Total + checkout button
│
├── context/
│   └── CartContext.tsx    # Global cart state management
│
├── lib/
│   └── shopify.ts         # All Shopify API functions
│
├── types/
│   ├── product.ts         # Product TypeScript types
│   └── cart.ts            # Cart TypeScript types
│
└── utils/
    └── tagFilter.ts       # Filter products by tags
