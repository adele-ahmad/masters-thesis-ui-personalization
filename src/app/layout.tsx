import type { Metadata } from 'next';
import { PersonalizationProvider } from '@/contexts/PersonalizationContext';
import { CartProvider } from '../contexts/CartContext';
import Navigation from '@/components/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI-Driven UI Personalization',
  description: 'Master\'s thesis demonstration of AI-driven UI personalization using TensorFlow.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PersonalizationProvider>
          <CartProvider>
            <Navigation />
            <main>{children}</main>
          </CartProvider>
        </PersonalizationProvider>
      </body>
    </html>
  );
}