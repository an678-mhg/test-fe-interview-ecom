import type {
  AuthResponse,
  LoginCredentials,
  ProductsResponse,
  Product,
  Cart,
  User,
} from "../types";

const API_BASE_URL = "https://dummyjson.com";

// Helper function to handle API errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An error occurred",
    }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse<AuthResponse>(response);
  },

  getCurrentUser: async (token: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<User>(response);
  },
};

// Products API
export const productsAPI = {
  getProducts: async (
    limit: number = 20,
    skip: number = 0
  ): Promise<ProductsResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`
    );
    return handleResponse<ProductsResponse>(response);
  },

  searchProducts: async (
    query: string,
    limit: number = 20,
    skip: number = 0
  ): Promise<ProductsResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/products/search?q=${encodeURIComponent(
        query
      )}&limit=${limit}&skip=${skip}`
    );
    return handleResponse<ProductsResponse>(response);
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse<Product>(response);
  },
};

interface CartProductInput {
  id: number;
  quantity: number;
}

// Cart API
export const cartAPI = {
  getUserCarts: async (userId: number): Promise<Cart> => {
    const response = await fetch(`${API_BASE_URL}/carts/${userId}`);
    return handleResponse<Cart>(response);
  },

  addToCart: async (
    userId: number,
    products: CartProductInput[]
  ): Promise<Cart> => {
    const response = await fetch(`${API_BASE_URL}/carts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, products }),
    });
    return handleResponse<Cart>(response);
  },

  updateCart: async (
    cartId: number,
    products: CartProductInput[],
    merge: boolean = false
  ): Promise<Cart> => {
    const response = await fetch(`${API_BASE_URL}/carts/${cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge,
        products,
      }),
    });
    return handleResponse<Cart>(response);
  },

  deleteCart: async (cartId: number): Promise<Cart> => {
    const response = await fetch(`${API_BASE_URL}/carts/${cartId}`, {
      method: "DELETE",
    });
    return handleResponse<Cart>(response);
  },
};

// User API
export const userAPI = {
  updateUser: async (userId: number, data: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<User>(response);
  },
};
