import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getTotalQuantity } = useCartStore();

  const totalQuantity = getTotalQuantity();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/products" className="logo">
          <h1>E-Commerce Store</h1>
        </Link>

        <nav className="nav">
          {isAuthenticated ? (
            <>
              <Link to="/products" className="nav-link">
                Products
              </Link>
              <Link to="/cart" className="nav-link cart-link">
                Cart
                {totalQuantity > 0 && (
                  <span className="cart-badge">{totalQuantity}</span>
                )}
              </Link>
              <div className="user-section">
                <span className="user-name">
                  {user?.firstName} {user?.lastName}
                </span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/products" className="nav-link">
                Products
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
