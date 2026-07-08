"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import SafeImg from './SafeImg';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
  rating?: number;
};

type Props = {
  items: Product[];
  carouselId: string;
  itemsPerView?: number;
};

export function ProductCarousel({ items, carouselId, itemsPerView = 3 }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      setActiveIndex(0);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const maxIndex = Math.max(0, items.length - itemsPerView);

  const onPrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const onNext = () => setActiveIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <section className="mt-[56px]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-label-md uppercase tracking-[0.16em] text-secondary">Recommended for you</p>
          <h2 className="mt-2 text-[28px] md:text-[32px] font-semibold text-primary">Products curated for your needs</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full bg-white border border-outline text-on-surface shadow-sm hover:bg-surface-container transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={activeIndex === items.length - 1}
            className="w-10 h-10 rounded-full bg-white border border-outline text-on-surface shadow-sm hover:bg-surface-container transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden rounded-[24px] border border-surface-container bg-white shadow-card">
          <div ref={containerRef} className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${(activeIndex * 100) / itemsPerView}%)` }}>
            {items.map((item) => (
              <article key={item.id} className="p-4" style={{ minWidth: `${100 / itemsPerView}%` }}>
                <div className="rounded-[16px] overflow-hidden bg-white border border-surface-container p-4 h-full flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-4 bg-surface-container rounded-[12px]">
                    <SafeImg src={item.image} alt={item.name} className="h-40 w-full object-contain" />
                  </div>
                  <div className="mt-4">
                    {item.badge ? (
                      <span className="inline-flex items-center rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold text-on-secondary-container">
                        {item.badge}
                      </span>
                    ) : null}
                    <h3 className="mt-2 text-[16px] font-semibold text-primary">{item.name}</h3>
                    <div className="flex items-center gap-2 text-secondary-container mt-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${index + 1 <= (item.rating ?? 0) ? 1 : 0}` }}>
                          star
                        </span>
                      ))}
                      <span className="text-label-sm">{item.rating ?? 0}.0</span>
                    </div>
                    <p className="mt-2 text-[18px] font-bold text-primary">${item.price}</p>
                    <div className="mt-3 flex flex-col gap-2">
                      <Link href={`/product/${item.id}`} className="inline-flex items-center justify-center rounded-[12px] border border-outline px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-container transition">
                        View details
                      </Link>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="w-full inline-flex items-center justify-center rounded-[12px] bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary shadow-sm hover:bg-secondary/90 transition"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
