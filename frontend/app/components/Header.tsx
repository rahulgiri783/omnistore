'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export function Header() {
  const { itemCount, openCartDrawer } = useCart();

  return (
    <header className="flex flex-col w-full z-50 bg-tertiary top-0">
      <div className="max-w-[1440px] mx-auto w-full px-[16px] md:px-[48px] py-sm flex items-center justify-between gap-md">
        <Link href="/" className="font-headline-lg text-headline-lg font-black text-secondary shrink-0">
          OmniStore
        </Link>

        <div className="hidden md:flex flex-1 max-w-2xl relative group">
          <input
            className="w-full h-10 px-md pl-10 rounded-lg border-0 bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-secondary transition-all"
            placeholder="Search OmniStore"
            type="text"
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <button className="bg-secondary-container text-on-secondary-container px-md py-1 rounded-md font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">Search</button>
          </div>
        </div>

        <div className="flex items-center gap-md">
          <nav className="hidden lg:flex items-center gap-lg mr-md">
            <Link className="text-secondary font-bold border-b-2 border-secondary pb-1 font-label-md text-label-md" href="/">
              Home
            </Link>
            <Link className="text-on-tertiary opacity-90 font-label-md text-label-md hover:text-secondary-container transition-colors duration-200" href="/track-order">
              Orders
            </Link>
            <Link className="text-on-tertiary opacity-90 font-label-md text-label-md hover:text-secondary-container transition-colors duration-200" href="/cart">
              Cart
            </Link>
          </nav>
          <div className="flex items-center gap-sm">
            <button className="text-on-tertiary hover:text-secondary-container p-2 active:scale-95 transition-all" type="button">
              <span className="material-symbols-outlined">location_on</span>
            </button>
            <Link href="/account" className="text-on-tertiary hover:text-secondary-container p-2 active:scale-95 transition-all">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
            <button
              type="button"
              onClick={openCartDrawer}
              className="text-on-tertiary hover:text-secondary-container p-2 relative active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {itemCount > 0 ? (
                <span className="absolute -top-1 -right-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 rounded-full">
                  {itemCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden px-[16px] pb-sm">
        <div className="relative w-full">
          <input className="w-full h-10 px-md pl-10 rounded-lg border-0 bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-secondary transition-all" placeholder="Search OmniStore" type="text" />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
        </div>
      </div>

      <div className="bg-surface-container-high px-[16px] md:px-[48px] py-xs">
        <div className="max-w-[1440px] md:px-[48px] mx-auto flex items-center gap-md text-label-md font-label-md">
          <Link href="/categories" className="flex items-center gap-xs font-bold text-primary hover:text-secondary transition-colors">
            <span className="material-symbols-outlined">menu</span> All
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/categories?category=electronics">
            Today's Deals
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/account">
            Customer Service
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/categories?category=home">
            Registry
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/categories?category=fashion">
            Gift Cards
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/categories?category=beauty">
            Sell
          </Link>
        </div>
      </div>
    </header>
  );
}
