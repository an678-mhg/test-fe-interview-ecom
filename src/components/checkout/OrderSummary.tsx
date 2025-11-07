import React from "react";
import { useCartStore } from "../../store/cartStore";

export const OrderSummary: React.FC = () => {
  const { items, getTotal, getDiscountedTotal } = useCartStore();

  const total = getTotal();
  const discountedTotal = getDiscountedTotal();
  const discount = total - discountedTotal;

  return (
    <div className="order-summary-sidebar">
      <h3>Order Summary</h3>

      <div className="order-items">
        {items.map((item) => (
          <div key={item.id} className="order-item">
            <div className="order-item-image">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <div className="order-item-details">
              <p className="order-item-title">{item.title}</p>
              <p className="order-item-quantity">Qty: {item.quantity}</p>
            </div>
            <div className="order-item-price">
              ${item.discountedTotal.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary-divider"></div>

      <div className="order-summary-row">
        <span>Subtotal:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {discount > 0 && (
        <div className="order-summary-row discount">
          <span>Discount:</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
      )}

      <div className="order-summary-divider"></div>

      <div className="order-summary-row total">
        <span>Total:</span>
        <span>${discountedTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};
