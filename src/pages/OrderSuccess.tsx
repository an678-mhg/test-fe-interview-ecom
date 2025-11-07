import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { CartItem } from "../types";

interface OrderSummaryState {
  items: CartItem[];
  total: number;
  shippingInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
    detailedAddress: string;
    postalCode: string;
  };
}

export const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const orderSummary = location.state?.orderSummary as
    | OrderSummaryState
    | undefined;

  if (!orderSummary) {
    return (
      <div className="order-success-page">
        <div className="order-success-container">
          <h2>No Order Found</h2>
          <Link to="/products" className="continue-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="order-success-container">
        <div className="success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p className="success-message">
          Thank you for your order. We've sent a confirmation email to{" "}
          <strong>{orderSummary.shippingInfo.email}</strong>
        </p>

        <div className="order-details">
          <h3>Order Summary</h3>

          <div className="order-items-list">
            {orderSummary.items.map((item) => (
              <div key={item.id} className="order-item-row">
                <span>
                  {item.title} x {item.quantity}
                </span>
                <span>${item.discountedTotal.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="order-total">
            <strong>Total:</strong>
            <strong>${orderSummary.total.toFixed(2)}</strong>
          </div>

          <div className="shipping-details">
            <h4>Shipping Address</h4>
            <p>{orderSummary.shippingInfo.name}</p>
            <p>{orderSummary.shippingInfo.address}</p>
            <p>{orderSummary.shippingInfo.detailedAddress}</p>
            <p>{orderSummary.shippingInfo.postalCode}</p>
            <p>{orderSummary.shippingInfo.phone}</p>
          </div>
        </div>

        <Link to="/products" className="continue-button">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
