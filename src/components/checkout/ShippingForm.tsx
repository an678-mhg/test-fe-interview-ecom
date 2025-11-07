import React from "react";
import type { ShippingInfo } from "../../types";

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  onChange: (field: keyof ShippingInfo, value: string) => void;
  errors: Partial<Record<keyof ShippingInfo, string>>;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingInfo,
  onChange,
  errors,
}) => {
  return (
    <div className="shipping-form">
      <h3>Shipping Information</h3>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={shippingInfo.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={errors.name ? "error" : ""}
            placeholder="John Doe"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={shippingInfo.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={errors.phone ? "error" : ""}
            placeholder="+1 234 567 8900"
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={shippingInfo.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={errors.email ? "error" : ""}
            placeholder="john.doe@example.com"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="postalCode">
            Postal Code <span className="required">*</span>
          </label>
          <input
            type="text"
            id="postalCode"
            value={shippingInfo.postalCode}
            onChange={(e) => onChange("postalCode", e.target.value)}
            className={errors.postalCode ? "error" : ""}
            placeholder="12345"
          />
          {errors.postalCode && (
            <span className="error-message">{errors.postalCode}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="address">
            Street Address <span className="required">*</span>
          </label>
          <input
            type="text"
            id="address"
            value={shippingInfo.address}
            onChange={(e) => onChange("address", e.target.value)}
            className={errors.address ? "error" : ""}
            placeholder="123 Main Street"
          />
          {errors.address && (
            <span className="error-message">{errors.address}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="detailedAddress">
            Detailed Address <span className="required">*</span>
          </label>
          <input
            type="text"
            id="detailedAddress"
            value={shippingInfo.detailedAddress}
            onChange={(e) => onChange("detailedAddress", e.target.value)}
            className={errors.detailedAddress ? "error" : ""}
            placeholder="Apt 4B, Building C"
          />
          {errors.detailedAddress && (
            <span className="error-message">{errors.detailedAddress}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="deliveryNotes">Delivery Notes</label>
          <textarea
            id="deliveryNotes"
            value={shippingInfo.deliveryNotes}
            onChange={(e) => onChange("deliveryNotes", e.target.value)}
            placeholder="Leave at front door, ring bell twice, etc."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};
