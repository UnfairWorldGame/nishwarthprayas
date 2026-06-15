import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HEADER_NAV, ROUTES, isNavPathActive } from "./navConfig";
import "./styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const renderLink = (route) => {
    const active = isNavPathActive(location.pathname, route);
    return (
      <li key={route.path}>
        <Link
          to={route.path}
          onClick={closeMenu}
          className={[
            route.cta ? "nav-link--cta" : "",
            active ? "is-active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-current={active ? "page" : undefined}
        >
          {route.label}
        </Link>
      </li>
    );
  };

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <div className="header-inner">
          <div className="header-bar">
            <Link to="/" className="header-brand" onClick={closeMenu}>
              <span className="header-brand-mark" aria-hidden="true">
                ✦
              </span>
              <span className="header-brand-text">Nishwarth Prayas</span>
            </Link>

            <button
              type="button"
              className={`nav-toggle${menuOpen ? " is-active" : ""}`}
              aria-expanded={menuOpen}
              aria-controls="main-nav-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
            </button>
          </div>

          {/* Desktop inline nav */}
          <ul id="main-nav-menu" className="header-nav header-nav--desktop">
            {HEADER_NAV.map(renderLink)}
          </ul>
        </div>
      </nav>

      {/* Mobile slide-out drawer */}
      <div
        className={`mobile-nav-panel${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">Menu</span>
          <button
            type="button"
            className="mobile-nav-close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>
        <ul className="header-nav header-nav--mobile">
          <li>
            <Link
              to={ROUTES.home.path}
              onClick={closeMenu}
              className={isNavPathActive(location.pathname, ROUTES.home) ? "is-active" : ""}
              aria-current={
                isNavPathActive(location.pathname, ROUTES.home) ? "page" : undefined
              }
            >
              {ROUTES.home.label}
            </Link>
          </li>
          {HEADER_NAV.map(renderLink)}
        </ul>
      </div>

      <button
        type="button"
        className={`nav-overlay${menuOpen ? " is-visible" : ""}`}
        aria-label="Close menu"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </header>
  );
}

export default Header;
