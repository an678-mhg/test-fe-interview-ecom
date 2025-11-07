import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { ShippingForm } from "../components/checkout/ShippingForm";
import { PaymentForm } from "../components/checkout/PaymentForm";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { Loading } from "../components/common/Loading";
import type { ShippingInfo, PaymentInfo } from "../types";
import {
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
} from "../utils/validation";
import { userAPI } from "../services/api";

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getDiscountedTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const discountedTotal = getDiscountedTotal();

  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: user ? `${user.firstName} ${user.lastName}` : "",
    phone: user?.phone || "",
    email: user?.email || "",
    postalCode: "",
    address: "",
    detailedAddress: "",
    deliveryNotes: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "credit_card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [shippingErrors, setShippingErrors] = useState<
    Partial<Record<keyof ShippingInfo, string>>
  >({});
  const [paymentErrors, setPaymentErrors] = useState<
    Partial<Record<keyof PaymentInfo, string>>
  >({});

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (shippingErrors[field]) {
      setShippingErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (paymentErrors[field]) {
      setPaymentErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateShippingInfo = (): boolean => {
    const errors: Partial<Record<keyof ShippingInfo, string>> = {};

    if (!shippingInfo.name.trim()) {
      errors.name = "Name is required";
    }

    if (!shippingInfo.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(shippingInfo.phone)) {
      errors.phone = "Invalid phone number";
    }

    if (!shippingInfo.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(shippingInfo.email)) {
      errors.email = "Invalid email address";
    }

    if (!shippingInfo.postalCode.trim()) {
      errors.postalCode = "Postal code is required";
    } else if (!validatePostalCode(shippingInfo.postalCode)) {
      errors.postalCode =
        "Invalid postal code (use format: 12345 or 12345-6789)";
    }

    if (!shippingInfo.address.trim()) {
      errors.address = "Street address is required";
    }

    if (!shippingInfo.detailedAddress.trim()) {
      errors.detailedAddress = "Detailed address is required";
    }

    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentInfo = (): boolean => {
    const errors: Partial<Record<keyof PaymentInfo, string>> = {};

    if (
      paymentInfo.method === "credit_card" ||
      paymentInfo.method === "debit_card"
    ) {
      if (!paymentInfo.cardNumber.trim()) {
        errors.cardNumber = "Card number is required";
      } else if (!validateCardNumber(paymentInfo.cardNumber)) {
        errors.cardNumber = "Invalid card number (must be 16 digits)";
      }

      if (!paymentInfo.expiryDate.trim()) {
        errors.expiryDate = "Expiry date is required";
      } else if (!validateExpiryDate(paymentInfo.expiryDate)) {
        errors.expiryDate = "Invalid or expired date (use MM/YY format)";
      }

      if (!paymentInfo.cvv.trim()) {
        errors.cvv = "CVV is required";
      } else if (!validateCVV(paymentInfo.cvv)) {
        errors.cvv = "Invalid CVV (3-4 digits)";
      }
    }

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isShippingValid = validateShippingInfo();
    const isPaymentValid = validatePaymentInfo();

    if (!isShippingValid || !isPaymentValid) {
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Update user information with shipping address (as per requirement)
      if (user) {
        try {
          await userAPI.updateUser(user.id, {
            address: {
              address: shippingInfo.address,
              city: shippingInfo.detailedAddress,
              state: "",
              postalCode: shippingInfo.postalCode,
            },
            phone: shippingInfo.phone,
          });
          console.log("User information updated successfully");
        } catch (error) {
          console.warn(
            "Failed to update user info (DummyJSON limitation):",
            error
          );
          // Continue anyway since DummyJSON doesn't actually persist
        }
      }

      // Step 2: Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 3: Clear cart
      clearCart();

      // Step 4: Navigate to success page
      navigate("/order-success", {
        state: {
          orderSummary: {
            items,
            total: discountedTotal,
            shippingInfo,
            paymentInfo,
          },
        },
      });
    } catch (error) {
      console.error("Order processing failed:", error);
      alert("Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  if (isProcessing) {
    return <Loading message="Processing your order..." />;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2>Checkout</h2>

        <div className="checkout-content">
          <form onSubmit={handleSubmit} className="checkout-form">
            <ShippingForm
              shippingInfo={shippingInfo}
              onChange={handleShippingChange}
              errors={shippingErrors}
            />

            <PaymentForm
              paymentInfo={paymentInfo}
              onChange={handlePaymentChange}
              errors={paymentErrors}
            />

            <button type="submit" className="place-order-button">
              Place Order
            </button>
          </form>

          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
