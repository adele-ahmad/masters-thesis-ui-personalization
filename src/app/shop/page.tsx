'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import styles from '@/styles/Shop.module.css';

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'Premium noise-cancelling wireless headphones'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description: 'Fitness tracking and notifications on your wrist'
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    description: 'Ergonomic aluminum laptop stand'
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    description: 'RGB backlit mechanical gaming keyboard'
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    description: 'Ergonomic wireless mouse with precision tracking'
  },
  {
    id: 6,
    name: 'USB-C Hub',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
    description: '7-in-1 USB-C hub with HDMI and card reader'
  },
  {
    id: 7,
    name: 'Desk Lamp',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    description: 'LED desk lamp with adjustable brightness'
  },
  {
    id: 8,
    name: 'Phone Stand',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
    description: 'Adjustable phone and tablet stand'
  }
];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1>Shop</h1>
        <p className={styles.subtitle}>
          Browse our collection of tech accessories
        </p>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </section>

      <section className={styles.products}>
        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className={styles.noResults}>
            No products found matching "{searchQuery}"
          </p>
        )}
      </section>
    </div>
  );
}