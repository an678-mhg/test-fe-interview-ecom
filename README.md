# E-Commerce Application

A full-featured e-commerce application built with React, TypeScript, Vite, and Zustand. This project demonstrates modern web development practices including state management, authentication, infinite scroll, and form validation.

> **⚠️ Important Note**: This application uses a **local-first cart implementation** due to reliability issues with the DummyJSON Cart API. Cart state is managed entirely in the client using Zustand with localStorage persistence. See [Known Limitations & Design Decisions](#-known-limitations--design-decisions) for details.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

**Test Login**: username: `emilys` / password: `emilyspass`

## 🚀 Live Demo

[Add your deployment URL here when deployed]

## 📋 Features

### Authentication

- User login with JWT token management
- Protected routes for cart and checkout
- Persistent authentication state
- Automatic redirection after login

### Product Browsing

- Product list with infinite scroll (20 items per load)
- Real-time search functionality with debouncing
- Product details including images, pricing, and discounts
- Stock availability display
- Add to cart functionality

### Shopping Cart

- View all items in cart
- Update product quantities
- Remove items from cart
- Real-time price calculations (client-side)
- Automatic discount calculations
- Persistent cart state via localStorage (survives page refresh)
- Instant updates with no network latency
- Login required to add items to cart

### Checkout Process

- Comprehensive shipping information form
- Payment information with card details
- Real-time form validation
- Card number auto-formatting (e.g., 1234 5678 9012 3456)
- Expiry date formatting (MM/YY)
- Email and phone validation
- Postal code validation
- Order summary with item details
- Order confirmation page

### Additional Features

- Error handling for API failures
- Loading states during data fetching
- Responsive design for mobile and desktop
- Modern, clean UI with smooth animations
- Toast notifications for cart actions

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Zustand (with persist middleware)
- **Routing**: React Router DOM v6
- **Styling**: CSS3 (with CSS Grid and Flexbox)
- **API**: DummyJSON API (https://dummyjson.com)

## 📁 Folder Structure

```
src/
├── components/           # Reusable components
│   ├── auth/            # Authentication components
│   ├── cart/            # Shopping cart components
│   ├── checkout/        # Checkout form components
│   ├── products/        # Product listing components
│   └── common/          # Shared components (Header, Loading, Error, etc.)
├── pages/               # Page components
│   ├── Login.tsx
│   ├── Products.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   └── OrderSuccess.tsx
├── store/               # Zustand stores
│   ├── authStore.ts     # Authentication state
│   └── cartStore.ts     # Shopping cart state (local-only)
├── services/            # API services
│   └── api.ts           # API client and endpoints
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   └── validation.ts    # Form validation helpers
├── hooks/               # Custom React hooks
│   └── useInfiniteScroll.ts
├── App.tsx              # Main application component
├── App.css              # Global styles
├── main.tsx             # Application entry point
└── index.css            # Base styles
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v20.19.0 or higher recommended)
- **npm** (v10.x or higher)

### Installation & Running

1. **Clone the repository:**

```bash
git clone <your-repository-url>
cd test-fe-interview-ecom
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. **Open your browser and navigate to:**

```
http://localhost:5173
```

The application will be running on port 5173 by default.

### Build for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 🚀 Deployment

### Netlify Deployment

This project is configured for Netlify deployment with proper SPA routing support.

**Option 1: Deploy from GitHub**

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Connect your repository
5. Build settings are automatically configured:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

**Option 2: Deploy via Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod
```

**SPA Routing Configuration**

The project includes two configuration files for proper SPA routing on Netlify:

1. **`public/_redirects`**: Simple redirect rule

   ```
   /* /index.html 200
   ```

2. **`netlify.toml`**: Alternative configuration format
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

These configurations ensure that all routes (like `/products`, `/cart`, `/checkout`) properly redirect to `index.html`, allowing React Router to handle routing on the client side. Without this, refreshing the page on any route would result in a 404 error.

### Vercel Deployment

For Vercel deployment, no additional configuration is needed. Vercel automatically handles SPA routing:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 🔑 Test Credentials

The application uses the DummyJSON API. You can use any of these test accounts:

- **Username**: `emilys` / **Password**: `emilyspass`
- **Username**: `michaelw` / **Password**: `michaelwpass`
- **Username**: `sophiab` / **Password**: `sophiabpass`

For more test accounts, visit: [DummyJSON Users](https://dummyjson.com/users)

## 📖 Usage Guide

### 1. Login

1. Navigate to the login page
2. Enter test credentials (e.g., username: `emilys`, password: `emilyspass`)
3. Click "Login" button
4. You'll be redirected to the products page

### 2. Browse Products

1. View the list of products with images, prices, and details
2. Scroll down to load more products (infinite scroll)
3. Use the search bar to find specific products
4. Click "Add to Cart" to add items to your shopping cart

### 3. Shopping Cart

1. Click the "Cart" link in the header to view your cart
2. Adjust quantities using the + and - buttons
3. Remove items using the "Remove" button
4. View the order summary with total and discounts
5. Click "Proceed to Checkout" when ready

### 4. Checkout

1. Fill in shipping information (all fields marked with \* are required)
2. Fill in payment information
3. Card numbers are auto-formatted as you type
4. Review your order summary on the right
5. Click "Place Order" to complete the purchase
6. View the order confirmation page

## 🎯 Key Implementation Details

### State Management

- **Zustand** is used for global state management
- Two main stores: `authStore` and `cartStore`
- **Cart Store**: Fully local implementation with localStorage persistence
  - No API dependencies for cart operations
  - Instant, synchronous updates
  - Client-side calculations for totals and discounts
- **Auth Store**: Integrates with DummyJSON Auth API for login/logout
- State persistence using `zustand/middleware/persist`
- Immutable state updates following React best practices

### API Integration

- Centralized API client in `services/api.ts`
- Error handling for all API calls
- Type-safe responses using TypeScript interfaces
- Proper async/await patterns

### Infinite Scroll

- Custom hook `useInfiniteScroll` using Intersection Observer API
- Loads 20 products at a time
- Automatic loading when user scrolls to bottom
- Works seamlessly with search functionality

### Form Validation

- Real-time validation with error messages
- Email format validation
- Phone number validation
- Credit card number validation and formatting
- Expiry date validation (checks if card is expired)
- CVV validation
- Postal code validation (US format)

### Protected Routes

- Custom `ProtectedRoute` component
- Redirects unauthenticated users to login
- Preserves intended destination after login

### Performance Optimizations

- Debounced search (500ms delay)
- Lazy state updates
- Optimized re-renders using proper state management
- Image optimization with object-fit

## 🐛 Error Handling

The application handles various error scenarios:

- Network failures
- API errors
- Invalid login credentials
- Form validation errors
- Empty states (no products, empty cart)

## 🎨 Design Decisions

### Why Zustand?

- Lightweight (1kb) compared to Redux
- Simple API with minimal boilerplate
- Built-in TypeScript support
- Easy persistence with middleware
- No need for context providers

### Why CSS instead of a UI library?

- Full control over styling
- No additional dependencies
- Better performance (no runtime styles)
- Demonstrates CSS skills
- Custom, modern design

### Component Structure

- Separation of concerns (presentational vs. container components)
- Reusable components for common UI elements
- Type-safe props using TypeScript
- Single responsibility principle

## 🚧 Known Limitations & Design Decisions

### DummyJSON Cart API Issues

During development, we encountered significant issues with the DummyJSON Cart API:

1. **Inconsistent Responses**: The Cart API (`/carts/user/{userId}`) returns inconsistent data structures when reloading cart data after updates.

2. **Update Problems**: The `PUT /carts/{cartId}` endpoint with `merge: true` parameter does not reliably merge products as documented. Updates sometimes:

   - Overwrite existing cart items unexpectedly
   - Return different data structures than documented
   - Fail to persist changes correctly

3. **Response Structure Mismatch**: The API documentation suggests specific response formats, but actual responses vary, making it difficult to maintain consistent state.

### Our Solution: Local Cart Management

Due to these API reliability issues, **we implemented a local-first cart approach**:

- **Cart state is managed entirely in the client** using Zustand
- **No API calls for cart operations** (add, update, remove items)
- **Data persists via localStorage** (survives page refresh)
- **All cart calculations done client-side** (totals, discounts, quantities)

This approach provides:

- ✅ **100% reliability** - no API failures
- ✅ **Instant updates** - no network latency
- ✅ **Consistent behavior** - predictable state management
- ✅ **Better UX** - immediate feedback for all cart actions

### Other API Limitations

Since DummyJSON is a mock API:

- Order placement is simulated (no real order processing)
- User profile updates don't actually persist on the server
- Product data is read-only

These limitations don't affect the demonstration of the application's functionality and state management capabilities.

## 🔮 Future Enhancements

Potential improvements for a production application:

- Add product detail pages
- Implement product categories/filters
- Add sorting options (price, rating, etc.)
- Implement wishlists
- Add order history
- Implement real payment processing
- Add user profile management
- Implement email notifications
- Add product reviews and ratings
- Implement multi-language support
- Add dark mode

## 📝 Challenges and Considerations

### 1. DummyJSON Cart API Reliability Issues

**Challenge**: The DummyJSON Cart API (`/carts/*`) has several critical issues:

- Inconsistent response structures when loading cart data
- `merge: true` parameter doesn't work reliably
- Cart updates return unpredictable results
- Response formats don't match documentation

**Solution**: After extensive testing and debugging, we made the architectural decision to implement a **local-first cart approach**:

- Cart state managed entirely in Zustand store
- No API calls for cart operations
- localStorage persistence for data survival across sessions
- All calculations (totals, discounts, quantities) done client-side
- This provides instant updates and 100% reliability

This is a pragmatic solution that prioritizes user experience and reliability over API integration when the API proves unreliable.

### 2. Infinite Scroll Implementation

**Challenge**: Managing scroll position and preventing duplicate loads
**Solution**: Custom hook using Intersection Observer API with proper loading states

### 3. Form Validation

**Challenge**: Real-time validation without annoying users
**Solution**: Validate on blur and on submit, clear errors on input change

### 4. State Synchronization

**Challenge**: Keeping cart state in sync across pages
**Solution**: Zustand's centralized store with localStorage persistence

### 5. Type Safety

**Challenge**: Ensuring type safety across the application
**Solution**: Comprehensive TypeScript interfaces and proper type annotations

### 6. User Experience

**Challenge**: Providing feedback for actions
**Solution**: Loading states, error messages, and visual feedback for interactions

## 👨‍💻 Development Notes

- The application uses React 19 with the latest features
- Vite is configured for fast development and optimized builds
- ESLint is configured for code quality
- TypeScript strict mode is enabled
- All components are functional components using hooks

## 📄 License

This project is created as an interview assignment and is free to use.

## 🤝 Contributing

This is an interview assignment, but feedback and suggestions are welcome!

## 📧 Contact

[Add your contact information here]

---

Built with ❤️ using React, TypeScript, and Zustand
