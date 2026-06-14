import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./style.css";

function Auth0ProviderWithRedirect({ children }) {
  const navigate = useNavigate();

  return (
    <Auth0Provider
      domain="dev-ocvyazc4sl6cijo3.us.auth0.com"
      clientId="yi71USLtKaYzAzOWQIacv8X6QNd7NJdz"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={(appState) => {
        navigate(appState?.returnTo || window.location.pathname);
      }}
    >
      {children}
    </Auth0Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Auth0ProviderWithRedirect>
      <App />
    </Auth0ProviderWithRedirect>
  </Router>
);
