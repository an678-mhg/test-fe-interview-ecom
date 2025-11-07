import React from "react";
import type { CartItem as CartItemType } from "../../types";
import { useCartStore } from "../../store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.thumbnail} alt={item.title} />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <div className="cart-item-price">
          {item.discountPercentage > 0 ? (
            <>
              <span className="price">${item.discountedTotal.toFixed(2)}</span>
              <span className="original-price">${item.price.toFixed(2)}</span>
              <span className="discount">
                -{item.discountPercentage.toFixed(0)}%
              </span>
            </>
          ) : (
            <span className="price">${item.price.toFixed(2)}</span>
          )}
        </div>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="quantity-button"
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(parseInt(e.target.value) || 1)
            }
            className="quantity-input"
            min="1"
          />
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="quantity-button"
          >
            +
          </button>
        </div>

        <div className="cart-item-total">
          <span className="total-label">Total:</span>
          <span className="total-price">
            ${item.discountedTotal.toFixed(2)}
          </span>
        </div>

        <button onClick={handleRemove} className="remove-button">
          Remove
        </button>
      </div>
    </div>
  );
};
