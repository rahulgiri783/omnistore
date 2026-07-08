'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import SafeImg from './SafeImg';

export function CartDrawer() {
  const router = useRouter();
  const { items, subtotal, itemCount, isDrawerOpen, drawerType, closeDrawer, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    closeDrawer();
    router.push('/checkout');
  };

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeDrawer, isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/40" onClick={closeDrawer} />
      <aside className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-container px-5 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">{drawerType === 'checkout' ? 'Checkout' : 'Your cart'}</p>
            <h2 className="text-xl font-semibold text-primary">{itemCount} item{itemCount === 1 ? '' : 's'}</h2>
          </div>
          <button type="button" onClick={closeDrawer} className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-[16px] border border-dashed border-outline p-6 text-center">
              <span className="material-symbols-outlined text-[48px] text-outline">shopping_cart</span>
              <h3 className="mt-3 text-lg font-semibold text-primary">Your cart is empty</h3>
              <p className="mt-2 text-sm text-on-surface-variant">Add something from the shop to get started.</p>
              <button type="button" onClick={closeDrawer} className="mt-4 rounded-[12px] bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary">
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-[16px] border border-surface-container p-3">
                  <div className="flex gap-3">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[12px] bg-surface-container p-2">
                      <SafeImg src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-primary">{item.name}</p>
                          <p className="text-sm text-on-surface-variant">${item.price}</p>
                        </div>
                        <button type="button" onClick={() => removeFromCart(item.id)} className="text-sm text-secondary">Remove</button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-outline">
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-lg">−</button>
                          <span className="min-w-[24px] text-center text-sm font-semibold">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-lg">+</button>
                        </div>
                        <div className="font-semibold text-primary">${(Number(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t border-surface-container bg-surface-container-lowest px-5 py-4">
            <div className="flex items-center justify-between text-base font-semibold text-primary">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {drawerType === 'checkout' ? (
              <div className="mt-4 space-y-3 rounded-[16px] border border-surface-container bg-white p-4 text-sm text-on-surface-variant">
                <p className="font-semibold text-primary">Delivery details</p>
                <p>Standard shipping • 2-4 business days</p>
                <p>Payment method • Card ending in 4242</p>
                <Link href="/track-order" onClick={closeDrawer} className="mt-2 inline-flex rounded-[12px] bg-secondary px-4 py-2 font-semibold text-on-secondary">
                  Track order
                </Link>
              </div>
            ) : (
              <button type="button" onClick={handleCheckout} className="mt-4 w-full rounded-[12px] bg-secondary px-4 py-3 font-semibold text-on-secondary">
                Proceed to checkout
              </button>
            )}
          </div>
        ) : null}
      </aside>
    </>
  );
}
