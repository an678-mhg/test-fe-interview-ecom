import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Loading } from "../components/common/Loading";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading, error, clearError } =
    useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Get the page they were trying to access, or default to /products
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/products";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
    } catch {
      // Error is handled by the store
    }
  };

  if (isLoading) {
    return <Loading message="Logging in..." />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to E-Commerce Store</h2>

        {from === "/products" && (
          <div
            className="info-message"
            style={{
              backgroundColor: "#e7f3ff",
              padding: "1rem",
              borderRadius: "6px",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, color: "#0066cc" }}>
              📦 Please login to add items to your cart
            </p>
          </div>
        )}

        <div className="test-credentials">
          <p>
            <strong>Test Credentials:</strong>
          </p>
          <p>
            Username: <code>emilys</code>
          </p>
          <p>
            Password: <code>emilyspass</code>
          </p>
          <p className="hint">
            Or check{" "}
            <a
              href="https://dummyjson.com/users"
              target="_blank"
              rel="noopener noreferrer"
            >
              DummyJSON Users
            </a>{" "}
            for more test accounts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
