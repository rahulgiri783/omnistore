'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { ProductItem } from '../data/store';

type CartItem = ProductItem & { quantity: number };
type DrawerType = 'cart' | 'checkout' | null;

type OrderDetails = {
  id: string;
  paymentMethod: string;
  deliveryMethod: string;
  address: string;
  total: number;
  items: CartItem[];
  createdAt: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  drawerType: DrawerType;
  order: OrderDetails | null;
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  openCartDrawer: () => void;
  openCheckoutDrawer: () => void;
  closeDrawer: () => void;
  placeOrder: (paymentMethod: string, deliveryMethod: string, address: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<DrawerType>(null);
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    setIsDrawerOpen(false);
    setDrawerType(null);
  }, [pathname]);

  const addToCart = (product: ProductItem, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...current, { ...product, quantity }];
    });
    setDrawerType('cart');
    setIsDrawerOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const openCartDrawer = () => {
    setDrawerType('cart');
    setIsDrawerOpen(true);
  };

  const openCheckoutDrawer = () => {
    setDrawerType('checkout');
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerType(null);
  };

  const placeOrder = (paymentMethod: string, deliveryMethod: string, address: string) => {
    if (!items.length) return;

    const newOrder: OrderDetails = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      paymentMethod,
      deliveryMethod,
      address,
      total: subtotal,
      items: items.map((item) => ({ ...item })),
      createdAt: new Date().toLocaleString(),
    };

    setOrder(newOrder);
    setItems([]);
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price.replace(/[^\d.]/g, '')) * item.quantity, 0),
    [items],
  );

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      isDrawerOpen,
      drawerType,
      order,
      addToCart,
      removeFromCart,
      updateQuantity,
      openCartDrawer,
      openCheckoutDrawer,
      closeDrawer,
      placeOrder,
    }),
    [items, itemCount, subtotal, isDrawerOpen, drawerType, order],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
