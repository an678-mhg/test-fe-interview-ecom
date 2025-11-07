import React from "react";
import { ProductList } from "../components/products/ProductList";

export const Products: React.FC = () => {
  return (
    <div className="products-container">
      <ProductList />
    </div>
  );
};
