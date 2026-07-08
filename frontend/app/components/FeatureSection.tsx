import Link from 'next/link';
import SafeImg from './SafeImg';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export function FeatureSection({ products }: { products: Product[] }) {
  return (
    <section className="mt-[56px]">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-label-md uppercase tracking-[0.16em] text-secondary">Featured categories</p>
          <h2 className="mt-2 text-[28px] md:text-[32px] font-semibold text-primary">High-demand essentials</h2>
        </div>
        <Link href="/categories" className="text-secondary font-semibold hover:underline">
          Explore more
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="rounded-[24px] border border-surface-container bg-white p-6 shadow-card transition hover:-translate-y-1">
            <div className="rounded-[24px] overflow-hidden bg-surface-container p-6 mb-5 flex items-center justify-center">
              <SafeImg src={product.image} alt={product.name} className="h-52 w-full object-contain" />
            </div>
            <h3 className="text-[20px] font-semibold text-primary">{product.name}</h3>
            <p className="mt-3 text-[18px] font-bold text-primary">${product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
