'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import styles from '@/styles/Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          AI-Personalized UI
        </Link>
        
        <div className={styles.links}>
          <Link 
            href="/" 
            className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/shop" 
            className={`${styles.link} ${pathname === '/shop' ? styles.active : ''}`}
          >
            Shop
          </Link>
          <Link 
            href="/cart" 
            className={`${styles.link} ${pathname === '/cart' ? styles.active : ''}`}
          >
            Cart {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}