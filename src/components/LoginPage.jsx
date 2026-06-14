import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import "./styles/adminpage.css";

const LoginPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">Loading…</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin-page" replace />;
  }

  return (
    <div className="admin-page">
      <section className="admin-hero">
        <div className="admin-hero-inner">
          <span className="admin-badge">Admin Access</span>
          <h1>Login Required</h1>
          <p>Only authorized admin users can access the dashboard.</p>
        </div>
      </section>
      <div className="admin-login-wrap">
        <button
          type="button"
          className="btn-upload"
          onClick={() =>
            loginWithRedirect({
              appState: { returnTo: "/admin-page" },
            })
          }
        >
          Log In with Auth0
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
