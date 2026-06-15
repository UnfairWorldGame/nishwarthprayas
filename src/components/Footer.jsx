import React from "react";
import { Link } from "react-router-dom";
import "./styles/footer.css";
import whatsappIcon from "./images/whatsapplogo.png";
import config from "./config";
import { FOOTER_NAV, ROUTES } from "./navConfig";

const FOOTER_STATS = [
  { value: "12+", label: "वर्षों की सेवा" },
  { value: "500+", label: "परिवारों को सहायता" },
  { value: "4", label: "मुख्य कार्यक्रम" },
  { value: "2", label: "शहर — फर्रुखाबाद व कानपुर" },
];

const QUICK_LINKS = FOOTER_NAV.map((route) => ({
  to: route.path,
  label: route.label,
}));

const PROGRAMS = [
  { to: ROUTES.services.path, icon: "📚", label: "मुफ्त कोचिंग" },
  { to: ROUTES.services.path, icon: "🤝", label: "आपातकालीन सहायता" },
  { to: ROUTES.services.path, icon: "💪", label: "महिला सशक्तिकरण" },
  { to: ROUTES.services.path, icon: "🌾", label: "ग्रामीण विकास" },
];

const SOCIAL_LINKS = [
  {
    href: "https://m.facebook.com/nirottamSinghrajput81",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: `https://wa.me/${config.primaryPhone}`,
    label: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    href: "https://in.linkedin.com/company/mantrai",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rampur+Chilsara+Road+Farrukhabad+209625";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      {/* CTA strip */}
      <div className="footer-cta">
        <div className="footer-cta-inner">
          <div className="footer-cta-text">
            <span className="footer-cta-badge">Join Our Mission</span>
            <h2>एक कदम मानवता की ओर</h2>
            <p>समाज सेवा में अपना योगदान दें — स्वयंसेवक बनें या सहयोग करें</p>
          </div>
          <div className="footer-cta-actions">
            <Link to="/ngo-donate" className="footer-btn footer-btn--primary">
              दान करें
            </Link>
            <Link to="/online-connectus" className="footer-btn footer-btn--outline">
              हमसे जुड़ें
            </Link>
            <a
              href={`https://wa.me/${config.primaryPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-btn footer-btn--outline"
            >
              <img src={whatsappIcon} alt="" className="footer-wa-icon" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Impact stats */}
      <div className="footer-stats">
        {FOOTER_STATS.map((stat) => (
          <div key={stat.label} className="footer-stat">
            <span className="footer-stat-value">{stat.value}</span>
            <span className="footer-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-mark" aria-hidden="true">✦</span>
              निस्वार्थ प्रयास
            </Link>
            <p className="footer-tagline">एक कदम मानवता की ओर</p>
            <p className="footer-est">स्थापना 2014 · Farrukhabad, UP</p>
            <p className="footer-desc">
              फर्रुखाबाद, उत्तर प्रदेश में स्थित एक गैर-लाभकारी संगठन — शिक्षा,
              महिला सशक्तिकरण, आपदा राहत और ग्रामीण विकास के लिए समर्पित।
            </p>
            <div className="footer-social">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="footer-col">
            <h3 className="footer-heading">Our Programs</h3>
            <p className="footer-col-sub">हमारे कार्यक्रम</p>
            <ul className="footer-programs">
              {PROGRAMS.map((program) => (
                <li key={program.label}>
                  <Link to={program.to}>
                    <span className="footer-program-icon" aria-hidden="true">
                      {program.icon}
                    </span>
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <p className="footer-col-sub">त्वरित लिंक</p>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3 className="footer-heading">Contact</h3>
            <p className="footer-col-sub">संपर्क करें</p>
            <ul className="footer-contact">
              <li>
                <span className="footer-contact-icon" aria-hidden="true">📍</span>
                <span>
                  रामपुर ढपरपुर, चिलसरा रोड, फर्रुखाबाद — 209625
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-map-link"
                  >
                    View on Map →
                  </a>
                </span>
              </li>
              <li>
                <span className="footer-contact-icon" aria-hidden="true">📞</span>
                <a href={`tel:${config.primaryPhone}`}>{config.primaryPhone}</a>
              </li>
              <li>
                <span className="footer-contact-icon" aria-hidden="true">📱</span>
                <a href={`https://wa.me/${config.primaryPhone}`}>
                  WhatsApp: {config.primaryPhone}
                </a>
              </li>
              <li>
                <span className="footer-contact-icon" aria-hidden="true">✉️</span>
                <a href="mailto:nishwarthaprays@gmail.com">
                  nishwarthaprays@gmail.com
                </a>
              </li>
            </ul>
            <p className="footer-location">
              Serving <strong>Farrukhabad</strong> &amp; <strong>Kanpur</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} निस्वार्थ प्रयास. All rights reserved.
          </p>
          <p className="footer-credit">
            Developed by <strong>Krishna</strong>
            <span className="footer-backlinks">
              {" · "}
              <a href="https://shutterpics.in" target="_blank" rel="noopener noreferrer">
                shutterpics.in
              </a>
              {" · "}
              <a href="https://vadg.in" target="_blank" rel="noopener noreferrer">
                vadg.in
              </a>
              {" · "}
              <a href="https://linkchat.in" target="_blank" rel="noopener noreferrer">
                linkchat.in
              </a>
            </span>
          </p>
          <button
            type="button"
            className="footer-back-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
