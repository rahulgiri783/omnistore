'use client';

import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import SafeImg from '../components/SafeImg';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart, openCheckoutDrawer } = useCart();

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <Header />
      <div className="max-w-[1000px] mx-auto px-[16px] md:px-[48px] py-12">
        <h1 className="text-headline-lg font-bold mb-6">Shopping cart</h1>
        {items.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-outline bg-white p-8 text-center">
            <p className="text-lg font-semibold text-primary">Your cart is empty</p>
            <p className="mt-2 text-on-surface-variant">Pick a product to start your order.</p>
            <Link href="/" className="mt-4 inline-flex rounded-[12px] bg-secondary px-5 py-3 font-semibold text-on-secondary">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 bg-white p-4 rounded-[12px] border border-surface-container md:flex-row md:items-center">
                <SafeImg src={item.image} alt={item.name} className="h-20 w-20 object-contain" />
                <div className="flex-1">
                  <div className="font-semibold text-primary">{item.name}</div>
                  <div className="text-on-surface-variant text-sm">Qty: {item.quantity}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-outline">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-lg">−</button>
                    <span className="min-w-[24px] text-center text-sm font-semibold">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-lg">+</button>
                  </div>
                  <div className="text-[18px] font-bold text-primary">${(Number(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</div>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="text-sm font-semibold text-secondary">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 flex flex-col gap-3 rounded-[16px] border border-surface-container bg-white p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Estimated total</p>
            <p className="mt-2 text-2xl font-bold text-primary">${subtotal.toFixed(2)}</p>
          </div>
          <button type="button" onClick={openCheckoutDrawer} className="rounded-[12px] bg-secondary px-6 py-3 text-on-secondary font-semibold">
            Proceed to checkout
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
