import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCarousel } from './components/ProductCarousel';
import { DealSection } from './components/DealSection';
import { FeatureSection } from './components/FeatureSection';
import { Footer } from './components/Footer';
import { products, recommendedProducts, topDeals, categories } from './data/store';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <Header />
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[48px] pb-[80px] pt-[24px]">
        <HeroCarousel />
        <CategoryGrid categories={categories} />
        <ProductCarousel items={recommendedProducts} carouselId="recommended" itemsPerView={4} />
        <DealSection items={topDeals} />
        <FeatureSection products={products.slice(0, 4)} />
      </div>
      <Footer />
    </main>
  );
}
