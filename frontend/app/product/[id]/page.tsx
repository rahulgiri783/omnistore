'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import SafeImg from '../../components/SafeImg';
import { allProducts, getProductById } from '../../data/store';
import { useCart } from '../../context/CartContext';

type Props = { params: { id: string } };

const colorOptions = ['Midnight', 'Slate', 'Ivory'];
const sizeOptions = ['S', 'M', 'L', 'XL'];

export default function ProductPage({ params }: Props) {
  const { addToCart } = useCart();
  const product = getProductById(params.id);
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[1]);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedColor(colorOptions[0]);
    setSelectedSize(sizeOptions[1]);
  }, [product.image]);

  useEffect(() => {
    if (!isAdded) return;
    const timer = window.setTimeout(() => setIsAdded(false), 1800);
    return () => window.clearTimeout(timer);
  }, [isAdded]);

  const galleryImages = useMemo(() => {
    if (product.galleryImages && product.galleryImages.length > 0) {
      return product.galleryImages;
    }
    return [product.image, product.image, product.image];
  }, [product.galleryImages, product.image]);

  const relatedProducts = useMemo(
    () => allProducts.filter((item) => item.id !== product.id).slice(0, 3),
    [product.id],
  );

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <Header />
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[48px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <div className="rounded-[20px] border border-surface-container bg-white p-4 shadow-card">
              <div className="flex items-center justify-center rounded-[16px] bg-surface-container p-6">
                <SafeImg src={activeImage} alt={product.name} className="max-h-[420px] w-full object-contain" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`rounded-[12px] border p-2 transition ${activeImage === image ? 'border-secondary shadow-sm' : 'border-surface-container'}`}
                  >
                    <SafeImg src={image} alt={`${product.name} preview ${index + 1}`} className="h-20 w-full rounded-[8px] object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">{product.category ?? 'featured'}</p>
            <h1 className="text-headline-lg font-bold">{product.name}</h1>
            <div className="text-[28px] font-extrabold text-primary">${product.price}</div>
            <p className="text-on-surface-variant">{product.description ?? 'Discover this curated product with premium styling and strong everyday performance.'}</p>

            <div className="rounded-[16px] border border-surface-container bg-white p-4">
              <p className="text-sm font-semibold text-primary">Color</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-3 py-2 text-sm font-medium transition ${selectedColor === color ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline text-on-surface-variant'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[16px] border border-surface-container bg-white p-4">
              <p className="text-sm font-semibold text-primary">Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-3 py-2 text-sm font-medium transition ${selectedSize === size ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline text-on-surface-variant'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[16px] border border-surface-container bg-white p-4">
              <p className="text-sm font-semibold text-primary">Highlights</p>
              <ul className="mt-3 space-y-2 text-sm text-on-surface-variant">
                {(product.highlights ?? ['Premium design', 'Fast delivery', 'Easy returns']).map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  addToCart(product);
                  setIsAdded(true);
                }}
                className="rounded-[12px] bg-secondary px-6 py-3 text-on-secondary font-semibold"
              >
                {isAdded ? 'Added to cart ✓' : 'Add to cart'}
              </button>
              <Link href="/checkout" className="rounded-[12px] border border-outline px-6 py-3 font-semibold text-primary">
                Buy now
              </Link>
            </div>
            <p className="text-sm text-on-surface-variant">Selected: {selectedColor} • {selectedSize}</p>
          </div>
        </div>

        <section className="mt-12 rounded-[20px] border border-surface-container bg-white p-6 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-secondary">You may also like</p>
              <h2 className="mt-2 text-2xl font-semibold text-primary">Related products</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`} className="rounded-[16px] border border-surface-container p-4 transition hover:-translate-y-1">
                <div className="rounded-[12px] bg-surface-container p-4">
                  <SafeImg src={item.image} alt={item.name} className="h-32 w-full rounded-[8px] object-cover" />
                </div>
                <h3 className="mt-4 font-semibold text-primary">{item.name}</h3>
                <p className="mt-2 text-sm text-on-surface-variant">{item.description}</p>
                <p className="mt-3 text-lg font-semibold text-primary">${item.price}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
