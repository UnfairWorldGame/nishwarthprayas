import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Seo from "./Seo";
import { PAGE_SEO } from "./seoConfig";
import "./styles/connectus.css";
import whatsappIcon from "./images/whatsapplogo.png";
import g9 from "./images/g9.jpeg";
import config from "./config";
import { useInView } from "./hooks/useInView";
import AnimatedCounter from "./AnimatedCounter";

const STATS = [
  { value: "100+", label: "सक्रिय स्वयंसेवक" },
  { value: "9+", label: "कार्यक्रम क्षेत्र" },
  { value: "500+", label: "परिवारों तक पहुँच" },
  { value: "24/7", label: "WhatsApp सहायता" },
];

const WAYS_TO_HELP = [
  {
    icon: "🙋",
    title: "स्वयंसेवक बनें",
    interest: "volunteer",
    description:
      "शिक्षा, राहत कार्य, या सामुदायिक कार्यक्रमों में अपना समय और कौशल दान करें।",
  },
  {
    icon: "💝",
    title: "दान करें",
    interest: "donate",
    description:
      "वस्त्र, खाद्य सामग्री, या आर्थिक सहयोग से जरूरतमंद परिवारों की मदद करें।",
  },
  {
    icon: "📢",
    title: "जागरूकता फैलाएं",
    interest: "awareness",
    description:
      "हमारे कार्यक्रमों को अपने समुदाय और सोशल मीडिया पर साझा करें।",
  },
  {
    icon: "🤝",
    title: "साझेदारी करें",
    interest: "partner",
    description:
      "संस्थाओं, स्कूलों और व्यवसायों के साथ मिलकर बड़े प्रभाव के लिए कार्य करें।",
  },
];

const PROGRAMS = [
  { icon: "📚", title: "मुफ्त कोचिंग", text: "ग्रामीण छात्रों के लिए शिक्षा सहायता" },
  { icon: "👕", title: "कपड़े वितरण", text: "आपदा प्रभावित परिवारों को राहत" },
  { icon: "💪", title: "महिला सशक्तिकरण", text: "प्रशिक्षण और स्वावलंबन कार्यक्रम" },
  { icon: "🌾", title: "ग्रामीण विकास", text: "गांवों में सतत विकास परियोजनाएं" },
];

const JOIN_STEPS = [
  { step: "1", title: "संपर्क करें", text: "WhatsApp, कॉल, या फॉर्म भरकर जुड़ें।" },
  { step: "2", title: "रुचि बताएं", text: "शिक्षा, राहत, दान, या साझेदारी — अपना क्षेत्र चुनें।" },
  { step: "3", title: "कार्यक्रम में शामिल हों", text: "टीम आपको उपयुक्त अवसर से जोड़ेगी।" },
  { step: "4", title: "प्रभाव बनाएं", text: "मिलकर समुदाय में स्थायी परिवर्तन लाएं।" },
];

const WHY_JOIN = [
  "समाज सेवा का सार्थक अनुभव",
  "एक मजबूत और सहायक समुदाय",
  "शिक्षा और सशक्तिकरण में योगदान",
  "स्थानीय स्तर पर वास्तविक प्रभाव",
];

const TESTIMONIALS = [
  {
    quote:
      "निस्वार्थ प्रयास के साथ काम करके मुझे समाज सेवा का असली अर्थ समझ आया।",
    author: "स्वयंसेवक, फर्रुखाबाद",
  },
  {
    quote:
      "मुफ्त कोचिंग कार्यक्रम ने गांव के कई छात्रों को नई दिशा दी।",
    author: "सामुदायिक सहयोगी",
  },
];

const FAQS = [
  {
    q: "कौन जुड़ सकता है?",
    a: "कोई भी — छात्र, professional, गृहिणी, या retire व्यक्ति। कोई विशेष योग्यता आवश्यक नहीं, केवल समर्पण की भावना।",
  },
  {
    q: "कितना समय देना होगा?",
    a: "आप अपनी सुविधा अनुसार — सप्ताह में कुछ घंटे या विशेष कार्यक्रमों में भाग ले सकते हैं।",
  },
  {
    q: "दान कैसे करें?",
    a: "वस्त्र, खाद्य सामग्री, या आर्थिक सहयोग — WhatsApp या फॉर्म के माध्यम से संपर्क करें, हमारी टीम मार्गदर्शन करेगी।",
  },
  {
    q: "क्या मैं दूर से भी मदद कर सकता/सकती हूँ?",
    a: "हाँ! जागरूकता फैलाना, ऑनलाइन सहयोग, या दान — दूर से भी योगदान संभव है।",
  },
];

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, inView] = useInView({ threshold: 0.08 });
  return (
    <Tag
      ref={ref}
      className={`join-reveal ${inView ? "join-revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Connectus() {
  const formRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [interest, setInterest] = useState("volunteer");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
  }, []);

  const scrollToForm = useCallback((selectedInterest) => {
    if (selectedInterest) setInterest(selectedInterest);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "JoinUs",
        name,
        email,
        mobile,
        interest,
        message,
      }).toString(),
    })
      .then((response) => {
        if (response.ok) {
          setStatus("success");
          setName("");
          setEmail("");
          setMobile("");
          setMessage("");
          setInterest("volunteer");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="join-page">
      <Seo {...PAGE_SEO.connect} />

      {/* Hero */}
      <section className="join-hero">
        <div className="join-hero-bg" style={{ backgroundImage: `url(${g9})` }} aria-hidden="true" />
        <div className="join-hero-overlay">
          <div className="join-hero-content">
            <span className="join-badge">Join Us</span>
            <h1>हमसे जुड़ें</h1>
            <p className="join-tagline">एक कदम मानवता की ओर</p>
            <p className="join-intro">
              निस्वार्थ प्रयास का परिवार बनें — स्वयंसेवक, दाता, या साझेदार के
              रूप में समाज में सकारात्मक बदलाव लाने में हमारा साथ दें।
            </p>
            <div className="join-hero-actions">
              <button type="button" className="btn btn-primary btn-glow" onClick={() => scrollToForm()}>
                फॉर्म भरें
              </button>
              <a
                href={`https://wa.me/${config.primaryPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-hero"
              >
                <img src={whatsappIcon} alt="" className="btn-wa-icon" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="join-stats" ref={statsRef}>
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`join-stat ${statsInView ? "stat-visible" : ""}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="join-stat-value">
              <AnimatedCounter value={stat.value} active={statsInView} />
            </span>
            <span className="join-stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Why join */}
      <section className="join-why">
        <Reveal className="section-header">
          <span className="section-tag">Why Join</span>
          <h2>क्यों जुड़ें?</h2>
        </Reveal>
        <ul className="join-why-list">
          {WHY_JOIN.map((item, i) => (
            <Reveal key={item} delay={i * 70} as="li" className="join-why-item">
              <span className="join-why-check">✓</span>
              {item}
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Ways to help — clickable */}
      <section className="join-ways">
        <Reveal className="section-header">
          <span className="section-tag">Contribute</span>
          <h2>योगदान के तरीके</h2>
          <p>कार्ड पर क्लिक करें — फॉर्म में रुचि अपने आप भर जाएगी</p>
        </Reveal>
        <div className="join-ways-grid">
          {WAYS_TO_HELP.map((way, i) => (
            <Reveal key={way.title} delay={i * 90}>
              <button
                type="button"
                className={`join-way-card ${interest === way.interest ? "selected" : ""}`}
                onClick={() => scrollToForm(way.interest)}
              >
                <span className="join-way-icon">{way.icon}</span>
                <h3>{way.title}</h3>
                <p>{way.description}</p>
                <span className="join-way-cta">चुनें →</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="join-programs">
        <Reveal className="section-header">
          <span className="section-tag">Programs</span>
          <h2>जिन कार्यक्रमों में योगदान दें</h2>
        </Reveal>
        <div className="join-programs-grid">
          {PROGRAMS.map((prog, i) => (
            <Reveal key={prog.title} delay={i * 70} className="join-program-chip">
              <span>{prog.icon}</span>
              <div>
                <strong>{prog.title}</strong>
                <p>{prog.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="join-programs-link">
            <Link to="/ngo-service-page">सभी सेवाएं देखें →</Link>
          </p>
        </Reveal>
      </section>

      {/* Steps */}
      <section className="join-steps-section">
        <Reveal className="section-header">
          <span className="section-tag">How It Works</span>
          <h2>कैसे शामिल हों?</h2>
        </Reveal>
        <div className="join-steps">
          {JOIN_STEPS.map((item, i) => (
            <Reveal key={item.step} delay={i * 80} className="join-step-card">
              <span className="join-step-num">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="join-testimonials">
        <Reveal className="section-header">
          <span className="section-tag">Voices</span>
          <h2>हमारे परिवार की आवाज़</h2>
        </Reveal>
        <div className="join-testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author} delay={i * 100} className="join-testimonial-card">
              <span className="quote-mark">"</span>
              <p>{t.quote}</p>
              <cite>— {t.author}</cite>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + contact */}
      <section className="join-main" id="join-form" ref={formRef}>
        <Reveal className="join-form-panel">
          <h2>जुड़ने के लिए फॉर्म भरें</h2>
          <p className="form-subtitle">24–48 घंटों में हमारी टीम आपसे संपर्क करेगी</p>

          {status === "success" && (
            <div className="alert alert-success" role="status">
              ✓ धन्यवाद! आपका अनुरोध प्राप्त हो गया। हम जल्द संपर्क करेंगे।
            </div>
          )}
          {status === "error" && (
            <div className="alert alert-error" role="alert">
              ✗ कुछ गलत हुआ। कृपया{" "}
              <a href={`https://wa.me/${config.primaryPhone}`}>WhatsApp</a> से संपर्क करें।
            </div>
          )}

          <form
            name="JoinUs"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="join-form"
          >
            <input type="hidden" name="form-name" value="JoinUs" />
            <p className="hidden-honeypot">
              <label>
                Don&apos;t fill: <input name="bot-field" />
              </label>
            </p>

            <div className="form-group">
              <label htmlFor="join-name">नाम / Name *</label>
              <input
                id="join-name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="आपका पूरा नाम"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="join-email">ईमेल / Email *</label>
                <input
                  id="join-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="join-mobile">मोबाइल / Mobile *</label>
                <input
                  id="join-mobile"
                  type="tel"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="10-digit number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="join-interest">रुचि / I want to *</label>
              <select
                id="join-interest"
                name="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              >
                <option value="volunteer">स्वयंसेवक बनना / Volunteer</option>
                <option value="donate">दान करना / Donate</option>
                <option value="partner">साझेदारी / Partner</option>
                <option value="awareness">जागरूकता / Spread awareness</option>
                <option value="other">अन्य / Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="join-message">संदेश / Message</label>
              <textarea
                id="join-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="अपनी रुचि, उपलब्ध समय, या प्रश्न लिखें..."
                rows={4}
              />
            </div>

            <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
              {isSubmitting ? "भेजा जा रहा है…" : "अनुरोध भेजें / Submit"}
            </button>
          </form>
        </Reveal>

        <Reveal className="join-contact-panel" delay={120}>
          <h2>सीधे संपर्क</h2>
          <p>तुरंत बात करना चाहते हैं? यहाँ संपर्क करें</p>

          <div className="join-contact-cards">
            <a href={`tel:${config.primaryPhone}`} className="join-contact-card">
              <span>📞</span>
              <div>
                <strong>Call</strong>
                <span>{config.primaryPhone}</span>
              </div>
            </a>
            <a
              href={`https://wa.me/${config.primaryPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="join-contact-card join-contact-card--wa"
            >
              <img src={whatsappIcon} alt="" />
              <div>
                <strong>WhatsApp</strong>
                <span>{config.primaryPhone}</span>
              </div>
            </a>
            <a href={`tel:${config.secondaryPhone}`} className="join-contact-card">
              <span>📱</span>
              <div>
                <strong>Alternate</strong>
                <span>{config.secondaryPhone}</span>
              </div>
            </a>
            <a href="mailto:nishwarthaprays@gmail.com" className="join-contact-card">
              <span>✉️</span>
              <div>
                <strong>Email</strong>
                <span>nishwarthaprays@gmail.com</span>
              </div>
            </a>
          </div>

          <div className="join-address">
            <strong>📍 Address</strong>
            <p>रामपुर ढपरपुर, चिलसरा रोड, फर्रुखाबाद, उ.प्र. — 209625</p>
          </div>

          <div className="join-hours">
            <strong>🕐 Response Time</strong>
            <p>WhatsApp: तुरंत · Email/Form: 24–48 घंटे</p>
          </div>

          <div className="join-links">
            <Link to="/india-ngo-contact">Contact Page →</Link>
            <Link to="/ngo-family-page">Meet Our Family →</Link>
            <Link to="/india-ngo-about">About Us →</Link>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="join-faq">
        <Reveal className="section-header">
          <span className="section-tag">FAQ</span>
          <h2>अक्सर पूछे जाने वाले प्रश्न</h2>
        </Reveal>
        <ul className="join-faq-list">
          {FAQS.map((faq, index) => (
            <Reveal key={index} delay={index * 60} as="li" className={`join-faq-item ${expandedFaq === index ? "open" : ""}`}>
              <button
                type="button"
                className="join-faq-question"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                aria-expanded={expandedFaq === index}
              >
                <span>{faq.q}</span>
                <span className="join-faq-icon">{expandedFaq === index ? "−" : "+"}</span>
              </button>
              <div className="join-faq-answer-wrap">
                <p className="join-faq-answer">{faq.a}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <Reveal>
        <section className="join-cta">
          <blockquote>
            "समाज की सेवा में छोटा सा योगदान भी बड़ा बदलाव ला सकता है।"
          </blockquote>
          <div className="join-cta-actions">
            <Link to="/india-ngo-about" className="btn btn-outline-light">
              हमारे बारे में
            </Link>
            <Link to="/ngo-family-page" className="btn btn-outline-light">
              परिवार से मिलें
            </Link>
          </div>
        </section>
      </Reveal>

      <a
        href={`https://wa.me/${config.primaryPhone}`}
        className="join-wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span className="join-wa-pulse" aria-hidden="true" />
        <img src={whatsappIcon} alt="" />
      </a>
    </div>
  );
}

export default Connectus;
