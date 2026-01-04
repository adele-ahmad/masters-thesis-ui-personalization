'use client';

import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/CartItem';
import styles from '@/styles/Cart.module.css';

export default function Cart() {
  const { cart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <h1>Your Cart is Empty</h1>
          <p>Add some products to get started</p>
          <a href="/shop" className={styles.shopButton}>
            Go to Shop
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1>Shopping Cart</h1>
        <p className={styles.itemCount}>
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.items}>
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className={styles.summary}>
          <h2>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          
          <div className={styles.summaryDivider} />
          
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>

          <button className={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </div>
      </section>
    </div>
  );
}
