import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "../types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getDiscountedTotal: () => number;
  getTotalQuantity: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // Update quantity of existing item
          set({
            items: items.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    total: (item.quantity + 1) * item.price,
                    discountedTotal:
                      ((item.quantity + 1) *
                        item.price *
                        (100 - item.discountPercentage)) /
                      100,
                  }
                : item
            ),
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            total: product.price,
            discountPercentage: product.discountPercentage,
            discountedTotal:
              (product.price * (100 - product.discountPercentage)) / 100,
            thumbnail: product.thumbnail,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (productId: number) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const { items } = get();
        set({
          items: items.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity,
                  total: quantity * item.price,
                  discountedTotal:
                    (quantity * item.price * (100 - item.discountPercentage)) /
                    100,
                }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.total, 0);
      },

      getDiscountedTotal: () => {
        return get().items.reduce((sum, item) => sum + item.discountedTotal, 0);
      },

      getTotalQuantity: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
