import React from "react";
import type { PaymentInfo } from "../../types";
import { formatCardNumber, formatExpiryDate } from "../../utils/validation";

interface PaymentFormProps {
  paymentInfo: PaymentInfo;
  onChange: (field: keyof PaymentInfo, value: string) => void;
  errors: Partial<Record<keyof PaymentInfo, string>>;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentInfo,
  onChange,
  errors,
}) => {
  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    if (formatted.replace(/\s/g, "").length <= 16) {
      onChange("cardNumber", formatted);
    }
  };

  const handleExpiryDateChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    if (formatted.length <= 5) {
      onChange("expiryDate", formatted);
    }
  };

  const handleCVVChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 4) {
      onChange("cvv", cleaned);
    }
  };

  return (
    <div className="payment-form">
      <h3>Payment Information</h3>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="paymentMethod">
            Payment Method <span className="required">*</span>
          </label>
          <select
            id="paymentMethod"
            value={paymentInfo.method}
            onChange={(e) =>
              onChange("method", e.target.value as PaymentInfo["method"])
            }
            className={errors.method ? "error" : ""}
          >
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
          {errors.method && (
            <span className="error-message">{errors.method}</span>
          )}
        </div>
      </div>

      {(paymentInfo.method === "credit_card" ||
        paymentInfo.method === "debit_card") && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cardNumber">
                Card Number <span className="required">*</span>
              </label>
              <input
                type="text"
                id="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                className={errors.cardNumber ? "error" : ""}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.cardNumber && (
                <span className="error-message">{errors.cardNumber}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">
                Expiry Date <span className="required">*</span>
              </label>
              <input
                type="text"
                id="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={(e) => handleExpiryDateChange(e.target.value)}
                className={errors.expiryDate ? "error" : ""}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiryDate && (
                <span className="error-message">{errors.expiryDate}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cvv">
                CVV <span className="required">*</span>
              </label>
              <input
                type="text"
                id="cvv"
                value={paymentInfo.cvv}
                onChange={(e) => handleCVVChange(e.target.value)}
                className={errors.cvv ? "error" : ""}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && (
                <span className="error-message">{errors.cvv}</span>
              )}
            </div>
          </div>
        </>
      )}

      {paymentInfo.method === "paypal" && (
        <div className="paypal-info">
          <p>You will be redirected to PayPal to complete your payment.</p>
        </div>
      )}
    </div>
  );
};
