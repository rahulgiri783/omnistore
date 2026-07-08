import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';

export const metadata: Metadata = {
  title: 'OmniStore | Modern E-commerce',
  description:
    'OmniStore is a scalable e-commerce storefront built for conversion, featuring product discovery, carousel offers, and checkout-ready flows.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'OmniStore | Modern E-commerce',
    description:
      'OmniStore is a scalable e-commerce storefront built for conversion, featuring product discovery, carousel offers, and checkout-ready flows.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
