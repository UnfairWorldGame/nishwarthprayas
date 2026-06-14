import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./styles/ngofamily.css";
import config from "./config";
import { useInView } from "./hooks/useInView";
import AnimatedCounter from "./AnimatedCounter";

import blankImage from "./images/prof.jpeg";
import dam from "./images/dam.jpg";
import familyHonor from "./ImageGallery/family-honor.png";

import p1 from "./ImageGallery/p1.jpeg";
import p2 from "./ImageGallery/p2.jpeg";
import p3 from "./ImageGallery/p3.jpeg";
import p4 from "./ImageGallery/p4.jpeg";
import p5 from "./ImageGallery/p5.jpeg";
import p6 from "./ImageGallery/p6.jpeg";
import p7 from "./ImageGallery/p7.jpeg";
import p8 from "./ImageGallery/p8.jpeg";
import p9 from "./ImageGallery/p9.jpeg";
import p10 from "./ImageGallery/p10.jpeg";
import p11 from "./ImageGallery/p11.jpeg";
import p12 from "./ImageGallery/p12.jpeg";
import p13 from "./ImageGallery/p13.jpeg";
import p14 from "./ImageGallery/p14.jpeg";
import p15 from "./ImageGallery/p15.jpeg";
import p16 from "./ImageGallery/p16.jpeg";
import p17 from "./ImageGallery/p17.jpeg";
import p18 from "./ImageGallery/p18.jpeg";
import p19 from "./ImageGallery/p19.jpeg";
import p20 from "./ImageGallery/p20.jpeg";
import p21 from "./ImageGallery/p21.jpeg";
import p22 from "./ImageGallery/p22.jpeg";
import p23 from "./ImageGallery/p23.jpeg";

const photos = [
  p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
  p11, p12, p13, p14, p15, p16, p17, p18, p19, p20,
  p21, p22, p23,
];

const highlights = [
  { value: "23+", label: "यादगार तस्वीरें" },
  { value: "100+", label: "परिवार के सदस्य" },
  { value: "10+", label: "वर्षों की एकजुटता" },
  { value: "500+", label: "परिवारों तक पहुँच" },
];

const LEADERSHIP = [
  {
    name: "नरोत्तम सिंह राजपूत",
    role: "संस्थापक",
    image: blankImage,
    quote: "एक समर्थ समाज बनाना हमारा सपना है — जहाँ सभी को समान अवसर मिले।",
  },
  {
    name: "दामोदर सिंह राजपूत",
    role: "सहायक कर्ता",
    image: dam,
    quote: "समाज में सकारात्मक बदलाव और विकास को आगे बढ़ाना हमारा संकल्प है।",
  },
];

const FAMILY_VALUES = [
  {
    icon: "🤝",
    title: "एकता",
    text: "हम मिलकर कार्य करते हैं — अलग-अलग पृष्ठभूमि, एक ही उद्देश्य।",
  },
  {
    icon: "❤️",
    title: "सहानुभूति",
    text: "हर सदस्य समुदाय की जरूरतों को समझकर सेवा में आगे आता है।",
  },
  {
    icon: "🙏",
    title: "सम्मान",
    text: "परंपरा, अतिथि और सहयोगी — सभी का सम्मान हमारी संस्कृति है।",
  },
  {
    icon: "💪",
    title: "समर्पण",
    text: "स्वयंसेवा और निस्वार्थ सेवा — परिवार की पहचान।",
  },
];

const VOLUNTEER_ROLES = [
  "शिक्षा और कोचिंग सहायक",
  "आपदा राहत स्वयंसेवक",
  "सामुदायिक कार्यक्रम समन्वयक",
  "मीडिया और जागरूकता",
  "ग्रामीण विकास सहयोगी",
  "प्रशासनिक सहायता",
];

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, inView] = useInView({ threshold: 0.08 });
  return (
    <Tag
      ref={ref}
      className={`fam-reveal ${inView ? "fam-revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

const NgoFamily = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <div className="ngo-family-page">
      <Helmet>
        <title>NGO Family | निस्वार्थ प्रयास</title>
        <meta
          name="description"
          content="Meet the Nishwarthaprayas NGO family — volunteers and community members working together for social change in Farrukhabad, Uttar Pradesh."
        />
      </Helmet>

      {/* Hero */}
      <section className="family-hero">
        <div className="family-hero-bg" style={{ backgroundImage: `url(${p1})` }} aria-hidden="true" />
        <div className="family-hero-overlay">
          <div className="family-hero-content">
            <span className="family-badge">हमारा परिवार</span>
            <h1>NGO Family</h1>
            <p className="family-tagline">एकजुट, सशक्त, और समर्पित</p>
            <p className="family-intro">
              निस्वार्थ प्रयास का परिवार केवल संगठन नहीं — यह उन स्वयंसेवकों,
              समर्थकों और समुदाय के सदस्यों का एक जीवंत समूह है जो मिलकर
              सामाजिक परिवर्तन लाते हैं।
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="family-stats" ref={statsRef}>
        {highlights.map((item, i) => (
          <div
            key={item.label}
            className={`family-stat ${statsInView ? "stat-visible" : ""}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="family-stat-value">
              <AnimatedCounter value={item.value} active={statsInView} />
            </span>
            <span className="family-stat-label">{item.label}</span>
          </div>
        ))}
      </section>

      {/* Featured moment — honor ceremony */}
      <section className="family-featured">
        <div className="family-featured-inner">
          <Reveal className="family-featured-image-wrap">
            <img
              src={familyHonor}
              alt="Traditional gamosa honoring ceremony at Nishwarthaprayas NGO family gathering"
              loading="lazy"
            />
            <span className="family-featured-badge">विशेष क्षण</span>
          </Reveal>
          <Reveal className="family-featured-text" delay={120}>
            <span className="section-tag">Tradition & Respect</span>
            <h2>सम्मान और परंपरा</h2>
            <p>
              निस्वार्थ प्रयास परिवार में सम्मान और परंपरा को महत्व दिया जाता
              है। गमोसा (Gamosa) से सम्मानित करना हमारी संस्कृति का अभिन्न हिस्सा
              है — यह स्वागत, सम्मान और सामुदायिक एकता का प्रतीक है।
            </p>
            <p>
              हर सदस्य, स्वयंसेवक और अतिथि को इस परिवार में गर्मजोशी से
              स्वागत किया जाता है। ये क्षण हमारे साझा संघर्ष, सफलताओं और
              मानवीय मूल्यों की गवाही देते हैं।
            </p>
            <ul className="family-featured-points">
              <li>सामुदायिक सम्मान समारोह</li>
              <li>पारंपरिक स्वागत और एकता</li>
              <li>सेवा के प्रति समर्पण की भावना</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="family-leaders">
        <Reveal className="section-header">
          <span className="section-tag">Leadership</span>
          <h2>परिवार के नेतृत्व</h2>
          <p>समाज सेवा के प्रति समर्पित — हमारे मार्गदर्शक</p>
        </Reveal>
        <div className="family-leaders-grid">
          {LEADERSHIP.map((leader, i) => (
            <Reveal key={leader.name} delay={i * 120} className="leader-card">
              <div className="leader-image-wrap">
                <img src={leader.image} alt={leader.name} loading="lazy" />
              </div>
              <div className="leader-info">
                <h3>{leader.name}</h3>
                <span className="leader-role">{leader.role}</span>
                <blockquote>"{leader.quote}"</blockquote>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Family values */}
      <section className="family-values-section">
        <Reveal className="section-header">
          <span className="section-tag">Our Bond</span>
          <h2>परिवार के मूल्य</h2>
          <p>जो हमें एक साथ जोड़ता है</p>
        </Reveal>
        <div className="family-values-grid">
          {FAMILY_VALUES.map((val, i) => (
            <Reveal key={val.title} delay={i * 80} className="family-value-card">
              <span className="family-value-icon">{val.icon}</span>
              <h3>{val.title}</h3>
              <p>{val.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Volunteer roles */}
      <section className="family-volunteer">
        <Reveal>
          <div className="family-volunteer-inner">
            <div className="family-volunteer-text">
              <span className="section-tag section-tag--light">Join Us</span>
              <h2>स्वयंसेवक के रूप में जुड़ें</h2>
              <p>
                चाहे आप शिक्षा, राहत कार्य, या सामुदायिक कार्यक्रमों में रुचि
                रखते हों — हमारे परिवार में हर किसी के लिए जगह है।
              </p>
            </div>
            <ul className="family-volunteer-list">
              {VOLUNTEER_ROLES.map((role) => (
                <li key={role}>
                  <span className="volunteer-check">✓</span>
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="family-gallery-section">
        <Reveal className="section-header">
          <span className="section-tag">Gallery</span>
          <h2>परिवार की झलकियाँ</h2>
          <p>साझा क्षण, सामुदायिक कार्यक्रम और यादगार पल — तस्वीर पर क्लिक करके बड़ा देखें</p>
        </Reveal>
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <Reveal key={index} delay={(index % 4) * 60}>
              <button
                type="button"
                className="photo-card"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View family moment ${index + 1}`}
              >
                <img
                  src={photo}
                  alt={`Nishwarthaprayas family moment ${index + 1}`}
                  loading="lazy"
                />
                <span className="photo-overlay">
                  <span className="photo-zoom">🔍 देखें</span>
                  <span className="photo-number">{index + 1} / {photos.length}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quote */}
      <Reveal>
        <blockquote className="family-quote">
          <span className="quote-mark">"</span>
          हम सिर्फ एक संगठन नहीं — हम एक परिवार हैं जो मिलकर समाज में
          सकारात्मक और सतत परिवर्तन लाने के संकल्पित हैं।
        </blockquote>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="family-cta">
          <div className="family-cta-card">
            <h2>हमारे परिवार का हिस्सा बनें</h2>
            <p>स्वयंसेवक बनकर समाज सेवा में योगदान दें — हर हाथ मायने रखता है</p>
            <div className="family-cta-actions">
              <Link to="/online-connectus" className="btn btn-primary btn-glow">
                हमसे जुड़ें
              </Link>
              <Link to="/india-ngo-contact" className="btn btn-outline">
                संपर्क करें
              </Link>
              <a
                href={`https://wa.me/${config.primaryPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <img
            src={photos[lightboxIndex]}
            alt={`Family moment ${lightboxIndex + 1}`}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Next photo"
          >
            ›
          </button>
          <span className="lightbox-counter">
            {lightboxIndex + 1} / {photos.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default NgoFamily;
