import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { CartItem } from "../components/cart/CartItem";

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, getDiscountedTotal, getTotalQuantity } =
    useCartStore();

  const total = getTotal();
  const discountedTotal = getDiscountedTotal();
  const totalQuantity = getTotalQuantity();
  const discount = total - discountedTotal;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/products" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2>Shopping Cart ({totalQuantity} items)</h2>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total:</span>
              <span>${discountedTotal.toFixed(2)}</span>
            </div>

            <button onClick={handleCheckout} className="checkout-button">
              Proceed to Checkout
            </button>

            <Link to="/products" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
