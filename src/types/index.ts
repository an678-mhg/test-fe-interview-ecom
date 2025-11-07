// User & Auth Types
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  address?: Address;
  phone?: string;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Product Types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Cart Types
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number; // Changed from discountedPrice to match API
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: CartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

// Checkout Types
export interface ShippingInfo {
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  address: string;
  detailedAddress: string;
  deliveryNotes: string;
}

export interface PaymentInfo {
  method: "credit_card" | "debit_card" | "paypal";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
}
