import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Seo from "./Seo";
import { PAGE_SEO } from "./seoConfig";
import "./styles/about.css";
import blankImage from "./images/prof.jpeg";
import dam from "./images/dam.jpg";
import g9 from "./images/g9.jpeg";
import config from "./config";
import { useInView } from "./hooks/useInView";
import { NGO_TIMELINE } from "./timelineData";

const TEAM = [
  {
    name: "नरोत्तम सिंह राजपूत",
    role: "संस्थापक",
    image: blankImage,
    description:
      "एक समाजसेवी और समाज सुधारक जिनका सपना है एक समर्थ समाज बनाना जहाँ सभी लोग अच्छे जीवन का आनंद ले सकें। शिक्षा, आपदा राहत, महिला सशक्तिकरण और ग्रामीण विकास में अग्रणी भूमिका।",
  },
  {
    name: "दामोदर सिंह राजपूत",
    role: "सहायक कर्ता",
    image: dam,
    description:
      "समाजसेवी और राजनीतिज्ञ जो सकारात्मक बदलाव और विकास को प्रोत्साहित करने के लिए सक्रिय रूप से कार्य करते हैं। सामाजिक और आर्थिक बदलाव को बढ़ावा देने में महत्वपूर्ण योगदान।",
  },
];

const VALUES = [
  {
    icon: "🤝",
    title: "समर्थ समाज",
    description:
      "हमारा संकल्प समर्थ समाज का निर्माण है, जहाँ सभी को समान अवसर मिले और सभी का सम्मान हो।",
  },
  {
    icon: "🌱",
    title: "साझेदारी",
    description:
      "हम विभिन्न स्तरों के साझेदारों के साथ मिलकर काम करते हैं ताकि हम अपने लक्ष्यों को पूरा कर सकें।",
  },
  {
    icon: "💙",
    title: "समर्थन और सहायता",
    description:
      "हम अपने समुदाय की सहायता करने और उन्हें विकास के मार्ग पर साथ चलने में समर्थन प्रदान करते हैं।",
  },
  {
    icon: "⚖️",
    title: "नैतिकता",
    description:
      "हमारे कार्यों में नैतिकता, सच्चाई और ईमानदारी को सबसे महत्वपूर्ण मानते हैं।",
  },
];

const TRUST_POINTS = [
  "पारदर्शिता और ज़िम्मेदारी",
  "ईमानदारी और अखंडता",
  "सहयोग और साझेदारी",
  "समुदाय-केंद्रित कार्य",
  "जवाबदेही",
];

const FOCUS_AREAS = [
  { icon: "📚", label: "शिक्षा" },
  { icon: "🏥", label: "स्वास्थ्य" },
  { icon: "🌊", label: "आपदा राहत" },
  { icon: "👩", label: "महिला सशक्तिकरण" },
  { icon: "🏡", label: "ग्रामीण विकास" },
  { icon: "🌿", label: "पर्यावरण" },
];

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <Tag
      ref={ref}
      className={`about-reveal ${inView ? "about-revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
  }, []);

  return (
    <div className="about-page">
      <Seo {...PAGE_SEO.about} />

      {/* Hero */}
      <section className="about-hero">
        <div
          className="about-hero-bg"
          style={{ backgroundImage: `url(${g9})` }}
          aria-hidden="true"
        />
        <div className="about-hero-overlay">
          <div className="about-hero-content">
            <span className="about-hero-badge">About Us</span>
            <h1>निस्वार्थ प्रयास</h1>
            <p className="about-hero-tagline">एक कदम मानवता की ओर</p>
            <p className="about-hero-desc">
              फर्रुखाबाद, उत्तर प्रदेश में स्थित एक गैर-लाभकारी संगठन — समानता,
              शिक्षा और सामाजिक उत्थान के लिए समर्पित।
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission-vision">
        <div className="about-mv-grid">
          <Reveal className="about-mv-card about-mv-card--mission">
            <span className="about-mv-icon">🎯</span>
            <h2>हमारा मिशन</h2>
            <p>
              समाज में समानता, शिक्षा और सामाजिक उत्थान को प्रोत्साहित करना।
              हम विभिन्न क्षेत्रों में सेवाएं प्रदान करके समुदाय के विकास में
              योगदान देते हैं।
            </p>
          </Reveal>
          <Reveal className="about-mv-card about-mv-card--vision" delay={120}>
            <span className="about-mv-icon">👁️</span>
            <h2>हमारी दृष्टि</h2>
            <p>
              एक समृद्ध समाज की रचना — जहाँ सभी को समान अवसर मिले, सभी की आवाज
              सुनी जाए, और हर व्यक्ति खुशहाली का अनुभव कर सके।
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <Reveal className="about-section-header">
          <span className="about-section-tag">Our Story</span>
          <h2>हमारी कहानी</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="about-story-content">
            <p>
              <strong>नरोत्तम सिंह राजपूत</strong>, निस्वार्थ प्रयास के संस्थापक,
              एक समाजसेवी और समाज सुधारक हैं। उन्होंने संस्था की स्थापना समाज में
              समानता, शिक्षा और समुदाय सेवा के मूल मूल्यों पर केंद्रित करते हुए की।
            </p>
            <p>
              विभिन्न क्षेत्रों में — शिक्षा, आपदा राहत, महिला सशक्तिकरण और
              ग्रामीण विकास — उनकी पहल ने समाज में उदारता, सहानुभूति और सहायता
              की भावना को बढ़ावा दिया है। आज भी निस्वार्थ प्रयास उनके नेतृत्व में
              समाज को सुधारने और समृद्धि के मार्ग पर अग्रसर है।
            </p>
          </div>
        </Reveal>

        <div className="about-focus-areas">
          {FOCUS_AREAS.map((area, i) => (
            <Reveal key={area.label} delay={i * 60} className="about-focus-chip">
              <span>{area.icon}</span>
              {area.label}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline-section">
        <Reveal className="about-section-header">
          <span className="about-section-tag">Journey</span>
          <h2>हमारी यात्रा</h2>
        </Reveal>
        <div className="about-timeline">
          {NGO_TIMELINE.map((item) => (
            <div
              key={item.year}
              className={`about-timeline-item ${item.highlight ? "about-timeline-item--highlight" : ""}`}
            >
              <div className="about-timeline-marker">
                <span className="about-timeline-dot" />
              </div>
              <div className="about-timeline-card">
                <span className="about-timeline-year">{item.year}</span>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="about-team-section">
        <Reveal className="about-section-header">
          <span className="about-section-tag">Leadership</span>
          <h2>हमारी टीम</h2>
          <p>समाज सेवा के प्रति समर्पित नेतृत्व</p>
        </Reveal>
        <div className="about-team-grid">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 120} className="about-team-card">
              <div className="about-team-image-wrap">
                <img src={member.image} alt={member.name} loading="lazy" />
              </div>
              <div className="about-team-info">
                <h3>{member.name}</h3>
                <span className="about-team-role">{member.role}</span>
                <p>{member.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="about-values-section">
        <Reveal className="about-section-header">
          <span className="about-section-tag">Values</span>
          <h2>हमारे मूल्य</h2>
        </Reveal>
        <div className="about-values-grid">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 80} className="about-value-card">
              <span className="about-value-icon">{value.icon}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="about-trust-section">
        <Reveal>
          <div className="about-trust-inner">
            <h2>हम पर क्यों भरोसा करें?</h2>
            <p>
              यह संगठन स्वयंसेवकों और सहायक संगठनों के साथ मिलकर विभिन्न क्षेत्रों
              में कार्य करता है — शिक्षा, स्वास्थ्य, आपदा राहत, महिला
              सशक्तिकरण, ग्रामीण विकास और पर्यावरण संरक्षण।
            </p>
            <ul className="about-trust-list">
              {TRUST_POINTS.map((point) => (
                <li key={point}>
                  <span className="about-trust-check">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <Reveal>
          <div className="about-cta-inner">
            <h2>हमसे जुड़ें</h2>
            <p>
              स्वयंसेवक बनें, दान करें, या बस हमारे बारे में और जानें — हर
              योगदान मायने रखता है।
            </p>
            <div className="about-cta-actions">
              <Link to="/online-connectus" className="about-btn about-btn--primary">
                Join Us
              </Link>
              <Link to="/india-ngo-contact" className="about-btn about-btn--outline">
                Contact Us
              </Link>
              <a
                href={`https://wa.me/${config.primaryPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="about-btn about-btn--outline"
              >
                WhatsApp
              </a>
            </div>
            <p className="about-cta-email">
              <a href="mailto:nishwarthaprays@gmail.com">nishwarthaprays@gmail.com</a>
              {" · "}
              <a href={`tel:${config.primaryPhone}`}>{config.primaryPhone}</a>
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default About;
