'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { categories, products } from '../data/store';

export default function CategoriesPage() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'electronics';
  const activeCategory = categories.find((category) => category.id === selectedCategory) || categories[0];
  const visibleProducts = products.filter((product) => (product.category ?? 'electronics') === selectedCategory);
  const displayProducts = visibleProducts.length > 0 ? visibleProducts : products.slice(0, 3);

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <Header />
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[48px] py-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-label-md uppercase tracking-[0.16em] text-secondary">Browse the shop</p>
            <h1 className="text-display-lg font-black">Shop by category</h1>
          </div>
          <p className="text-on-surface-variant">Showing picks for {activeCategory.title}</p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const isActive = category.id === activeCategory.id;
            return (
              <Link
                key={category.id}
                href={`/categories?category=${category.id}`}
                className={`rounded-[16px] p-6 border text-center transition ${isActive ? 'border-secondary bg-secondary/10 shadow-card' : 'border-surface-container bg-white'}`}
              >
                <span className="material-symbols-outlined text-[34px] text-secondary" aria-hidden>
                  {category.icon}
                </span>
                <div className="mt-3 font-semibold text-primary">{category.title}</div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {displayProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="rounded-[20px] border border-surface-container bg-white p-5 shadow-card transition hover:-translate-y-1">
              <div className="rounded-[16px] bg-surface-container p-4">
                <img src={product.image} alt={product.name} className="h-40 w-full rounded-[12px] object-cover" />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-primary">{product.name}</h2>
                  <p className="mt-2 text-sm text-on-surface-variant">{product.description}</p>
                </div>
                <div className="text-lg font-semibold text-primary">${product.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
