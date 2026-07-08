import Link from 'next/link';

type Category = {
  id: string;
  title: string;
  icon: string;
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mt-[40px]">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-label-md uppercase tracking-[0.16em] text-secondary">Shop by category</p>
          <h2 className="mt-2 text-[28px] md:text-[32px] font-semibold text-primary">Browse top categories</h2>
        </div>
        <Link href="/categories" className="text-secondary font-semibold hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories?category=${category.id}`}
            className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-surface-container p-5 bg-white text-center transition hover:-translate-y-1 hover:shadow-card"
          >
            <span className="material-symbols-outlined text-[28px] text-secondary">{category.icon}</span>
            <span className="font-semibold text-on-surface">{category.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
