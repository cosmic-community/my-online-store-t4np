# My Online Store

![App Preview](https://imgix.cosmicjs.com/36c2b510-48b0-11f1-8990-91a1b41fbf66-autopilot-photo-1627123424574-724758594e93-1778005709524.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive e-commerce storefront built with Next.js 16 and Cosmic CMS.

## Features

- 🛍️ Product catalog with detailed product pages
- 🏷️ Category browsing and filtering
- 🎨 Product variants display
- ⭐ Customer reviews with star ratings
- 📱 Fully responsive design
- ⚡ Fast page loads with server components

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69fa366b0a8b0d6c3983031e&clone_repository=69fa3795169966c6f1528d3d)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Online Store". The content is managed in Cosmic CMS with the following object types: categories, variants, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic CMS SDK

## Getting Started

### Prerequisites
- Bun installed
- Cosmic account with bucket configured

### Installation

```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all products
const { objects } = await cosmic.objects
  .find({ type: 'products' })
  .depth(1)

// Fetch product by slug
const { object } = await cosmic.objects
  .findOne({ type: 'products', slug })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with the following Cosmic object types:
- **products**: Main product catalog
- **categories**: Product categorization
- **variants**: Product variations (size, color, etc.)
- **reviews**: Customer reviews with ratings

## Deployment

Deploy to Vercel or Netlify with the following environment variables:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->