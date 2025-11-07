import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    // Require login before adding to cart
    if (!isAuthenticated || !user) {
      navigate("/login", { state: { from: { pathname: "/products" } } });
      return;
    }

    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  const discountedPrice =
    (product.price * (100 - product.discountPercentage)) / 100;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
        {product.discountPercentage > 0 && (
          <span className="discount-badge">
            -{product.discountPercentage.toFixed(0)}%
          </span>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-meta">
          <span className="product-brand">{product.brand}</span>
          <span className="product-rating">⭐ {product.rating.toFixed(1)}</span>
        </div>

        <div className="product-footer">
          <div className="product-pricing">
            {product.discountPercentage > 0 ? (
              <>
                <span className="product-price">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="product-original-price">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="product-price">${product.price.toFixed(2)}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`add-to-cart-button ${isAdding ? "adding" : ""}`}
            disabled={isAdding || product.stock === 0}
          >
            {product.stock === 0
              ? "Out of Stock"
              : isAdding
              ? "Added!"
              : "Add to Cart"}
          </button>
        </div>

        <div className="product-stock">
          {product.stock > 0 ? (
            <span className="in-stock">{product.stock} in stock</span>
          ) : (
            <span className="out-of-stock">Out of stock</span>
          )}
        </div>
      </div>
    </div>
  );
};
