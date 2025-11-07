import { create } from "zustand";
import type { Product } from "../types";
import { productsAPI } from "../services/api";

interface ProductsState {
  products: Product[];
  total: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  searchQuery: string;
  loadProducts: (skip?: number) => Promise<void>;
  searchProducts: (query: string, skip?: number) => Promise<void>;
  setSearchQuery: (query: string) => void;
  resetProducts: () => void;
}

const LIMIT = 20;

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  total: 0,
  isLoading: false,
  error: null,
  hasMore: true,
  searchQuery: "",

  loadProducts: async (skip = 0) => {
    const { searchQuery } = get();

    if (searchQuery) {
      await get().searchProducts(searchQuery, skip);
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await productsAPI.getProducts(LIMIT, skip);
      set((state) => ({
        products:
          skip === 0
            ? response.products
            : [...state.products, ...response.products],
        total: response.total,
        hasMore: skip + LIMIT < response.total,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to load products",
        isLoading: false,
      });
    }
  },

  searchProducts: async (query: string, skip = 0) => {
    set({ isLoading: true, error: null, searchQuery: query });
    try {
      const response = await productsAPI.searchProducts(query, LIMIT, skip);
      set((state) => ({
        products:
          skip === 0
            ? response.products
            : [...state.products, ...response.products],
        total: response.total,
        hasMore: skip + LIMIT < response.total,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to search products",
        isLoading: false,
      });
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  resetProducts: () => {
    set({
      products: [],
      total: 0,
      hasMore: true,
      searchQuery: "",
      error: null,
    });
  },
}));
