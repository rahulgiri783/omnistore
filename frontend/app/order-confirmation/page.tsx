'use client';

import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function OrderConfirmationPage() {
  const { order } = useCart();

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <Header />
      <div className="mx-auto max-w-[1100px] px-[16px] py-12 md:px-[48px]">
        <div className="rounded-[24px] border border-surface-container bg-white p-8 shadow-card">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-secondary">Order received</p>
              <h1 className="mt-3 text-3xl font-bold text-primary">Thank you for your order!</h1>
              <p className="mt-3 max-w-2xl text-on-surface-variant">Your purchase has been placed successfully. We’ll keep you updated as it moves through delivery.</p>
            </div>
            <div className="rounded-[16px] border border-secondary/20 bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary">
              Estimated delivery: 2–4 business days
            </div>
          </div>

          {order ? (
            <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="rounded-[16px] border border-surface-container p-4">
                  <p className="font-semibold text-primary">Order ID</p>
                  <p className="mt-2 text-sm text-on-surface-variant">{order.id}</p>
                </div>
                <div className="rounded-[16px] border border-surface-container p-4">
                  <p className="font-semibold text-primary">Payment</p>
                  <p className="mt-2 text-sm text-on-surface-variant">{order.paymentMethod} • {order.deliveryMethod}</p>
                </div>
                <div className="rounded-[16px] border border-surface-container p-4">
                  <p className="font-semibold text-primary">Delivery address</p>
                  <p className="mt-2 text-sm text-on-surface-variant">{order.address}</p>
                </div>
                <div className="rounded-[16px] border border-surface-container p-4">
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
              </div>

              <div className="rounded-[20px] bg-surface-container-lowest p-5">
                <p className="text-lg font-semibold text-primary">Receipt summary</p>
                <div className="mt-4 space-y-3 text-sm text-on-surface-variant">
                  <div className="flex items-center justify-between"><span>Subtotal</span><span>${order.total.toFixed(2)}</span></div>
                  <div className="flex items-center justify-between"><span>Shipping</span><span>Free</span></div>
                  <div className="flex items-center justify-between"><span>Tax</span><span>Included</span></div>
                  <div className="mt-3 flex items-center justify-between border-t border-surface-container pt-3 text-base font-semibold text-primary"><span>Total paid</span><span>${order.total.toFixed(2)}</span></div>
                </div>
                <div className="mt-6 rounded-[16px] border border-surface-container bg-white p-4 text-sm text-on-surface-variant">
                  <p className="font-semibold text-primary">Need help?</p>
                  <p className="mt-2">Contact support at support@omnistore.com or call +1 800 555 0199.</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/track-order" className="rounded-[12px] bg-secondary px-5 py-3 font-semibold text-on-secondary">
              Track order
            </Link>
            <Link href="/" className="rounded-[12px] border border-outline px-5 py-3 font-semibold text-primary">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
