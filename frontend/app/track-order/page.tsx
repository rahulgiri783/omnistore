'use client';

import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function TrackOrderPage() {
  const { order } = useCart();

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <Header />
      <div className="max-w-[900px] mx-auto px-[16px] md:px-[48px] py-12">
        <h1 className="text-headline-lg font-bold mb-6">Track your order</h1>
        {order ? (
          <div className="space-y-4">
            <div className="rounded-[16px] border border-surface-container bg-white p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-secondary">Order confirmed</p>
              <h2 className="mt-2 text-2xl font-semibold text-primary">{order.id}</h2>
              <p className="mt-2 text-sm text-on-surface-variant">Placed on {order.createdAt}</p>
            </div>
            <div className="rounded-[16px] border border-surface-container bg-white p-6">
              <p className="font-semibold text-primary">Status</p>
              <p className="mt-2 text-sm text-on-surface-variant">Preparing your order • {order.deliveryMethod} delivery • {order.paymentMethod}</p>
            </div>
            <div className="rounded-[16px] border border-surface-container bg-white p-6">
              <p className="font-semibold text-primary">Delivery address</p>
              <p className="mt-2 text-sm text-on-surface-variant">{order.address}</p>
            </div>
            <div className="rounded-[16px] border border-surface-container bg-white p-6">
              <p className="font-semibold text-primary">Items</p>
              <div className="mt-3 space-y-2 text-sm text-on-surface-variant">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(Number(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/" className="inline-flex rounded-[12px] bg-secondary px-5 py-3 font-semibold text-on-secondary">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="rounded-[16px] border border-surface-container bg-white p-6">
            <p className="font-semibold">No active order yet.</p>
            <p className="mt-2 text-on-surface-variant">Once you place an order, tracking details will appear here.</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
