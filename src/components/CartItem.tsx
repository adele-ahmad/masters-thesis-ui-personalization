'use client';

import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/contexts/CartContext';
import styles from '@/styles/CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className={styles.item}>
      <img src={item.image} alt={item.name} className={styles.image} />
      
      <div className={styles.details}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.price}>${item.price.toFixed(2)}</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.quantity}>
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className={styles.quantityBtn}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className={styles.quantityValue}>{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className={styles.quantityBtn}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className={styles.total}>
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className={styles.removeBtn}
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>
    </div>
  );
}