import React, { useEffect, useState } from "react";
import { useProductsStore } from "../../store/productsStore";
import { ProductCard } from "./ProductCard";
import { Loading } from "../common/Loading";
import { ErrorMessage } from "../common/ErrorMessage";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export const ProductList: React.FC = () => {
  const {
    products,
    isLoading,
    error,
    hasMore,
    searchQuery,
    loadProducts,
    searchProducts,
    setSearchQuery,
    resetProducts,
  } = useProductsStore();

  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    loadProducts(0);

    return () => {
      resetProducts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      loadProducts(products.length);
    }
  };

  const { lastElementRef } = useInfiniteScroll({
    loading: isLoading,
    hasMore,
    onLoadMore: handleLoadMore,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      if (value.trim()) {
        searchProducts(value.trim(), 0);
      } else {
        setSearchQuery("");
        resetProducts();
        loadProducts(0);
      }
    }, 500);

    setSearchTimeout(timeout);
  };

  const handleClearSearch = () => {
    setLocalSearchQuery("");
    setSearchQuery("");
    resetProducts();
    loadProducts(0);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h2>Our Products</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {localSearchQuery && (
            <button onClick={handleClearSearch} className="clear-search-button">
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="search-results-text">
            Found {products.length} results for "{searchQuery}"
          </p>
        )}
      </div>

      {error && (
        <ErrorMessage message={error} onRetry={() => loadProducts(0)} />
      )}

      <div className="products-grid">
        {products.map((product, index) => {
          if (index === products.length - 1) {
            return (
              <div key={product.id} ref={lastElementRef}>
                <ProductCard product={product} />
              </div>
            );
          }
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>

      {isLoading && <Loading message="Loading products..." />}

      {!isLoading && products.length === 0 && !error && (
        <div className="no-products">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};
