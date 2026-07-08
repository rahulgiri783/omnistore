'use client';

import { useState } from 'react';
import SafeImg from './SafeImg';

type DealItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  savings: string;
};

export function DealSection({ items }: { items: DealItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const onNext = () => setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));

  return (
    <section className="mt-[56px]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-label-md uppercase tracking-[0.16em] text-secondary">Top deals</p>
          <h2 className="mt-2 text-[28px] md:text-[32px] font-semibold text-primary">Unlock limited-time offers</h2>
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
      <div className="overflow-hidden rounded-[24px] border border-surface-container bg-white shadow-card">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {items.map((item) => (
            <article key={item.id} className="min-w-full p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-[320px_minmax(0,1fr)] items-center">
                <div className="rounded-[24px] overflow-hidden bg-surface-container p-6 flex items-center justify-center">
                  <SafeImg src={item.image} alt={item.title} className="h-72 w-full object-contain" />
                </div>
                <div className="space-y-5">
                  <span className="inline-flex rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold text-on-secondary-container">
                    Save {item.savings}
                  </span>
                  <h3 className="text-[28px] font-semibold text-primary">{item.title}</h3>
                  <p className="text-body-lg text-on-surface-variant">{item.description}</p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-[32px] font-bold text-primary">${item.price}</span>
                    <button className="rounded-[16px] bg-secondary px-6 py-3 text-sm font-semibold text-on-secondary shadow-sm hover:bg-secondary/90 transition">
                      Shop deal
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
