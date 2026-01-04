'use client';

import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import styles from '@/styles/ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className={styles.button}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
