'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, placeOrder } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [deliveryMethod, setDeliveryMethod] = useState('Standard');
  const [billingName, setBillingName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex@example.com');
  const [phone, setPhone] = useState('+1 555 123 4567');
  const [address, setAddress] = useState('123 Commerce Street, Suite 400, New York, NY 10001');
  const [notes, setNotes] = useState('Leave at the front desk if I am unavailable.');

  const handlePlaceOrder = () => {
    if (!items.length) return;
    placeOrder(paymentMethod, deliveryMethod, `${billingName} • ${address} • ${phone}`);
    router.push('/order-confirmation');
  };

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <Header />
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-[16px] py-12 md:px-[48px] lg:flex-row">
        <section className="flex-1 rounded-[24px] border border-surface-container bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Checkout</p>
          <h1 className="mt-3 text-3xl font-bold text-primary">Complete your order</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Fast, secure checkout with billing, shipping, and delivery options.</p>

          <div className="mt-6 space-y-4">
            <div className="rounded-[16px] border border-surface-container p-4">
              <p className="font-semibold text-primary">Billing details</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <input value={billingName} onChange={(event) => setBillingName(event.target.value)} className="rounded-[12px] border border-outline bg-surface-container-lowest px-3 py-2 text-sm" placeholder="Full name" />
                <input value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-[12px] border border-outline bg-surface-container-lowest px-3 py-2 text-sm" placeholder="Email address" />
                <input value={phone} onChange={(event) => setPhone(event.target.value)} className="rounded-[12px] border border-outline bg-surface-container-lowest px-3 py-2 text-sm" placeholder="Phone number" />
                <input className="rounded-[12px] border border-outline bg-surface-container-lowest px-3 py-2 text-sm" placeholder="Company (optional)" />
              </div>
            </div>

            <div className="rounded-[16px] border border-surface-container p-4">
              <p className="font-semibold text-primary">Shipping address</p>
              <textarea value={address} onChange={(event) => setAddress(event.target.value)} className="mt-3 w-full rounded-[12px] border border-outline bg-surface-container-lowest px-3 py-2 text-sm" rows={3} />
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-3 w-full rounded-[12px] border border-outline bg-surface-container-lowest px-3 py-2 text-sm" rows={2} placeholder="Delivery notes" />
            </div>

            <div className="rounded-[16px] border border-surface-container p-4">
              <p className="font-semibold text-primary">Payment method</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {['COD', 'Card'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${paymentMethod === method ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline text-on-surface-variant'}`}
                  >
                    {method === 'COD' ? 'Cash on Delivery' : 'Credit/Debit Card'}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[16px] border border-surface-container p-4">
              <p className="font-semibold text-primary">Delivery method</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {['Standard', 'Express'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setDeliveryMethod(method)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${deliveryMethod === method ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline text-on-surface-variant'}`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="w-full max-w-[420px] rounded-[24px] border border-surface-container bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-primary">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.length === 0 ? (
              <p className="text-sm text-on-surface-variant">Your cart is empty.</p>
            ) : items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm text-on-surface-variant">
                <span>{item.name} × {item.quantity}</span>
                <span>${(Number(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[16px] bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
            <div className="flex items-center justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="mt-2 flex items-center justify-between"><span>Shipping</span><span>Free</span></div>
            <div className="mt-3 flex items-center justify-between border-t border-surface-container pt-3 text-base font-semibold text-primary"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
          </div>
          <button type="button" onClick={handlePlaceOrder} className="mt-6 w-full rounded-[12px] bg-secondary px-4 py-3 font-semibold text-on-secondary">
            Place order
          </button>
          <Link href="/track-order" className="mt-3 inline-flex text-sm font-semibold text-secondary">
            Track my order
          </Link>
        </aside>
      </div>
      <Footer />
    </main>
  );
}
