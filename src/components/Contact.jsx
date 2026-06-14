import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./styles/contact.css";
import whatsappIcon from "./images/whatsapplogo.png";
import facebookIcon from "./images/fac.jpg";
import config from "./config";

const contactDetails = [
  {
    label: "Mobile",
    value: config.primaryPhone,
    href: `tel:${config.primaryPhone}`,
    icon: "📞",
  },
  {
    label: "WhatsApp",
    value: config.primaryPhone,
    href: `https://wa.me/${config.primaryPhone}`,
    icon: null,
    isWhatsapp: true,
  },
  {
    label: "Alternate Phone",
    value: config.secondaryPhone,
    href: `tel:${config.secondaryPhone}`,
    icon: "📱",
  },
  {
    label: "Email",
    value: "nishwarthaprays@gmail.com",
    href: "mailto:nishwarthaprays@gmail.com",
    icon: "✉️",
  },
];

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mobile, setMobile] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "ContactInfo",
        name,
        email,
        message,
        mobile,
      }).toString(),
    })
      .then((response) => {
        if (response.ok) {
          setSubmissionStatus("success");
          setName("");
          setEmail("");
          setMessage("");
          setMobile("");
        } else {
          setSubmissionStatus("error");
        }
      })
      .catch((error) => {
        console.error(error);
        setSubmissionStatus("error");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Us | निस्वार्थ प्रयास</title>
        <meta
          name="description"
          content="Contact Nishwarthaprayas NGO in Farrukhabad, Uttar Pradesh. Call, WhatsApp, or send a message to join our social service initiatives."
        />
        <meta
          property="og:title"
          content="Contact Nishwarthaprayas NGO — Farrukhabad & Kanpur"
        />
        <meta
          property="og:description"
          content="Reach out to Nishwarthaprayas for volunteering, donations, or community support in Farrukhabad and Kanpur."
        />
        <meta
          property="og:image"
          content="https://farrukhabadngo.com/fevicon.ico"
        />
      </Helmet>

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <span className="contact-badge">संपर्क करें</span>
          <h1>Contact Us</h1>
          <p className="contact-tagline">हम आपकी मदद के लिए तैयार हैं</p>
          <p className="contact-intro">
            स्वयंसेवक बनना, सहयोग करना, या हमारे कार्यक्रमों के बारे में जानना
            चाहते हैं? नीचे दिए गए फॉर्म से संदेश भेजें या सीधे कॉल / WhatsApp
            करें।
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="contact-main">
        {/* Info panel */}
        <aside className="contact-info-panel">
          <h2>संपर्क जानकारी</h2>
          <div className="contact-cards">
            {contactDetails.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="contact-detail-card"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="contact-detail-icon">
                  {item.isWhatsapp ? (
                    <img src={whatsappIcon} alt="" className="whatsapp-icon" />
                  ) : (
                    item.icon
                  )}
                </span>
                <span className="contact-detail-text">
                  <span className="contact-detail-label">{item.label}</span>
                  <span className="contact-detail-value">{item.value}</span>
                </span>
              </a>
            ))}
          </div>

          <div className="contact-address">
            <span className="contact-detail-label">Address</span>
            <p>रामपुर ढपरपुर, चिलसरा रोड, फर्रुखाबाद, उत्तर प्रदेश — 209625</p>
          </div>

          <div className="contact-quick-actions">
            <a
              href={`https://wa.me/${config.primaryPhone}`}
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={whatsappIcon} alt="" className="whatsapp-icon" />
              WhatsApp करें
            </a>
            <a href={`tel:${config.primaryPhone}`} className="btn btn-call">
              📞 अभी कॉल करें
            </a>
          </div>

          <a
            href="https://m.facebook.com/nirottamSinghrajput81"
            target="_blank"
            rel="noopener noreferrer"
            className="facebook-link"
          >
            <img src={facebookIcon} alt="" className="facebook-icon" />
            Facebook पर जुड़ें
          </a>
        </aside>

        {/* Form panel */}
        <div className="contact-form-panel">
          <h2>संदेश भेजें</h2>
          <p className="form-subtitle">
            फॉर्म भरें और हम जल्द से जल्द आपसे संपर्क करेंगे
          </p>

          {submissionStatus === "success" && (
            <div className="alert alert-success" role="status">
              ✓ आपका संदेश सफलतापूर्वक भेज दिया गया! हम जल्द संपर्क करेंगे।
            </div>
          )}
          {submissionStatus === "error" && (
            <div className="alert alert-error" role="alert">
              ✗ संदेश भेजने में समस्या हुई। कृपया पुनः प्रयास करें या सीधे
              WhatsApp करें।
            </div>
          )}

          <form
            name="ContactInfo"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <input type="hidden" name="form-name" value="ContactInfo" />

            <div className="form-group">
              <label htmlFor="contact-name">Your Name / आपका नाम</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email / ईमेल</label>
              <input
                id="contact-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-mobile">Mobile / मोबाइल</label>
              <input
                id="contact-mobile"
                type="tel"
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                name="mobile"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message / संदेश</label>
              <textarea
                id="contact-message"
                placeholder="How would you like to help or what do you need?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "भेजा जा रहा है…" : "Submit / संदेश भेजें"}
            </button>
          </form>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${config.primaryPhone}`}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <img src={whatsappIcon} alt="" />
      </a>
    </div>
  );
}

export default Contact;
