export type ProductItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
  rating?: number;
  description?: string;
  category?: string;
  galleryImages?: string[];
  highlights?: string[];
};

export const categories = [
  { id: 'electronics', title: 'Electronics', icon: 'devices' },
  { id: 'fashion', title: 'Fashion', icon: 'style' },
  { id: 'home', title: 'Home', icon: 'chair' },
  { id: 'sports', title: 'Sports', icon: 'fitness_center' },
  { id: 'beauty', title: 'Beauty', icon: 'spa' },
  { id: 'toys', title: 'Toys', icon: 'toys' },
];

export const heroSlides = [
  {
    title: 'Elevate Your Living Space',
    tagline: 'Smart retail upgrades',
    description: 'Experience next-gen electronics, appliances, and commercial inventory with premium performance across every aisle.',
    cta: 'Shop Home Cinema',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Business-Grade Performance',
    tagline: 'Scale with confidence',
    description: 'Discover curated B2B catalogs, fast logistics, and trusted deals for enterprise procurement and modern retail.',
    cta: 'Browse deals',
    image: 'https://images.unsplash.com/photo-1513708922418-8c9f661baf37?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Top-Shelf Value',
    tagline: 'Premium products, better margins',
    description: 'Secure customer demand with data-backed product assortments and limited-time offers designed for rapid conversion.',
    cta: 'View offers',
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5f0?auto=format&fit=crop&w=1400&q=80',
  },
];

export const recommendedProducts: ProductItem[] = [
  {
    id: 'r1',
    name: 'OmniView Pro Z-900 Camera Kit',
    price: '2,499.99',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    rating: 5,
    category: 'electronics',
    description: 'A premium camera kit designed for high-resolution capture and seamless content creation.',
  },
  {
    id: 'r2',
    name: 'AeroForm Wireless Headset',
    price: '349.00',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    rating: 5,
    category: 'electronics',
    description: 'Immersive sound, all-day comfort, and fast pairing for work or travel.',
  },
  {
    id: 'r3',
    name: 'Quantum Smart Display',
    price: '1,199.00',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    rating: 4,
    category: 'electronics',
    description: 'Stay connected with a beautiful display that fits every modern workspace.',
  },
  {
    id: 'r4',
    name: 'Mobile Smart Display',
    price: '1,200.00',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    category: 'home',
    description: 'A sleek smart display for entertainment and home automation.',
  },
  {
    id: 'r5',
    name: 'Laptop Smart Display',
    price: '2,200.00',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    category: 'electronics',
    description: 'Built for productivity with a powerful display and smart connectivity.',
  },
];

export const topDeals = [
  {
    id: 'd1',
    title: 'Executive Workstation Bundle',
    description: 'Premium hardware with factory discount for fast rollout across offices and stores.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    price: '1,299.00',
    savings: '25%',
  },
  {
    id: 'd2',
    title: 'Designer Lighting Pack',
    description: 'Elevate presentation spaces with curated fixtures built for modern retail environments.',
    image: 'https://media.istockphoto.com/id/1467976868/photo/the-convenience-of-shopping-online.jpg',
    price: '599.00',
    savings: '18%',
  },
  {
    id: 'd3',
    title: 'Premium Apparel Capsule',
    description: 'High-margin fashion essentials with fast replenishment support.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    price: '179.00',
    savings: '30%',
  },
];

export const products: ProductItem[] = [
  {
    id: 'p1',
    name: 'OmniView Pro Z-900 Camera Kit',
    price: '2,499.99',
    image: 'https://media.istockphoto.com/id/1952832315/photo/online-shopping-man-hold-credit-or-debit-card-make-online-purchase.jpg',
    category: 'electronics',
    description: 'A premium camera kit with a crisp display, smart stabilization, and a travel-ready design.',
  },
  {
    id: 'p2',
    name: 'AeroForm Wireless Headset',
    price: '349.00',
    image: 'https://media.istockphoto.com/id/1467976868/photo/the-convenience-of-shopping-online.jpg',
    category: 'electronics',
    description: 'High-fidelity sound and a lightweight frame built for long listening sessions.',
  },
  {
    id: 'p3',
    name: 'Quantum Smart Display',
    price: '1,199.00',
    image: 'https://media.istockphoto.com/id/1467976868/photo/the-convenience-of-shopping-online.jpg',
    category: 'electronics',
    description: 'An elegant smart display that brings your favorite content and controls into one place.',
  },
  {
    id: 'p4',
    name: 'Avalon Office Chair',
    price: '449.00',
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=800&q=80',
    category: 'home',
    description: 'A supportive, premium chair for focused work and long hours of comfort.',
  },
  {
    id: 'p5',
    name: 'Lumen Streetwear Set',
    price: '129.00',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    description: 'Comfort-forward essentials in a polished silhouette for everyday movement.',
  },
  {
    id: 'p6',
    name: 'Glow Radiance Serum',
    price: '79.00',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    category: 'beauty',
    description: 'A lightweight serum that leaves skin feeling nourished and refreshed.',
  },
];

export const allProducts: ProductItem[] = [...products, ...recommendedProducts];

export function getProductById(id: string) {
  return allProducts.find((product) => product.id === id) ?? allProducts[0];
}
