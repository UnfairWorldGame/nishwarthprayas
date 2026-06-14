import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutPage = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="logout-page">
      <h2>Logout Page</h2>
      <p>Are you sure you want to log out?</p>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default LogoutPage;
