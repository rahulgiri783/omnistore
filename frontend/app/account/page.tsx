import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <Header />
      <div className="max-w-[900px] mx-auto px-[16px] md:px-[48px] py-12">
        <h1 className="text-headline-lg font-bold mb-6">Account</h1>
        <div className="bg-white p-6 rounded-[12px] border border-surface-container">
          <p className="font-semibold">Hello, Sign in</p>
          <p className="text-on-surface-variant mt-2">Manage your orders, addresses, and account settings.</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link href="/track-order" className="rounded-[16px] border border-surface-container bg-white p-5 transition hover:-translate-y-1">
            <p className="font-semibold text-primary">Track orders</p>
            <p className="mt-2 text-sm text-on-surface-variant">View shipping progress and delivery updates.</p>
          </Link>
          <Link href="/cart" className="rounded-[16px] border border-surface-container bg-white p-5 transition hover:-translate-y-1">
            <p className="font-semibold text-primary">Cart</p>
            <p className="mt-2 text-sm text-on-surface-variant">Review saved products and checkout quickly.</p>
          </Link>
          <Link href="/categories" className="rounded-[16px] border border-surface-container bg-white p-5 transition hover:-translate-y-1">
            <p className="font-semibold text-primary">Browse products</p>
            <p className="mt-2 text-sm text-on-surface-variant">Explore the latest deals and categories.</p>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
