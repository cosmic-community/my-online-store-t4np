export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: CosmicImage;
  };
}

export interface Variant extends CosmicObject {
  type: 'variants';
  metadata: {
    variant_name?: string;
    variant_type?: string;
    sku?: string;
    price_adjustment?: number;
    stock?: number;
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name?: string;
    description?: string;
    price?: number;
    compare_at_price?: number;
    main_image?: CosmicImage;
    gallery?: CosmicImage[];
    inventory_status?: string;
    stock_quantity?: number;
    sku?: string;
    category?: Category;
    variants?: Variant[];
    featured?: boolean;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    customer_name?: string;
    rating?: number | string;
    review_title?: string;
    review_text?: string;
    product?: Product;
    verified_purchase?: boolean;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}