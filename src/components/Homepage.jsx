import React, { useState, useEffect } from "react";
import "./styles/homepage.css";
import whatsappIcon from "./images/whatsapplogo.jpg";
import p3 from "./images/p3.jpeg";
import p2 from "./images/p2.jpeg";
import p1 from "./images/p1.jpeg";
import g7 from "./images/g7.jpeg";
import g5 from "./images/g5.jpeg";
import g9 from "./images/g9.jpeg";
import m1 from "./images/m1.jpg";
import a2 from "./images/g3.jpeg";
import a3 from "./images/g2.jpeg";
import facebook from "./images/fac.jpg";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Seo from "./Seo";
import { PAGE_SEO } from "./seoConfig";
import config from "./config";
import { useInView } from "./hooks/useInView";
import AnimatedCounter from "./AnimatedCounter";
import { NGO_TIMELINE } from "./timelineData";

const SERVER_URL = config.serverUrl;

const services = [
  {
    title: "मुफ्त कोचिंग",
    image: g9,
    alt: "Free coaching for students",
    link: "/ngo-service-page",
    icon: "📚",
  },
  {
    title: "आपातकालीन सहायता",
    image: a2,
    alt: "Disaster relief and emergency aid",
    link: "/ngo-service-page",
    icon: "🤝",
  },
  {
    title: "महिला सशक्तिकरण",
    image: m1,
    alt: "Women empowerment programs",
    link: "/ngo-service-page",
    icon: "💪",
  },
  {
    title: "ग्रामीण विकास कार्य",
    image: a3,
    alt: "Rural development initiatives",
    link: "/ngo-service-page",
    icon: "🌾",
  },
];

const workHighlights = [
  {
    image: a2,
    title: "बाढ़ प्रभावित क्षेत्रों में खाद्य वितरण",
    description:
      "आपदा के समय, खाद्य सामग्री की कमी से प्रभावित क्षेत्रों को हम खाद्य सामग्री प्रदान करने के लिए समर्पित हैं।",
  },
  {
    image: a3,
    title: "ग्रामीण विकास कार्य",
    description:
      "हम ग्रामीण क्षेत्रों में स्थायी परिवर्तन लाने के लिए परियोजनाओं पर काम करते हैं।",
  },
  {
    image: p3,
    title: "मेला आयोजन",
    description:
      "निस्वार्थ प्रयास द्वारा आयोजित मेला एक सामूहिक उत्सव होता है जो समुदाय के सदस्यों को एक स्थान पर आमंत्रित करता है।",
  },
  {
    image: p1,
    title: "कपड़े वितरण",
    description:
      "आपदा से प्रभावित क्षेत्रों और जरूरतमंद लोगों की मदद के लिए कपड़ों का वितरण।",
  },
  {
    image: p2,
    title: "सामुदायिक विकास",
    description:
      "स्थानीय अधिकारियों और संगठनों के साथ मिलकर ग्रामीण क्षेत्रों में स्थायी परिवर्तन।",
  },
  {
    image: g7,
    title: "महिला सशक्तिकरण",
    description:
      "महिलाओं को समाज में उनकी अधिकारों की सम्मानित पहचान दिलाने का प्रयास।",
  },
];

const galleryImages = [a3, p3, a2, g5, g7, g9, p1, p2];

const faqs = [
  {
    question: "What is Nishwarthaprayas?",
    answer:
      "It is an NGO deeply involved in social works to address the diverse needs of our communities through development projects, advocacy, and awareness campaigns.",
  },
  {
    question: "What is an NGO?",
    answer:
      "NGO stands for non-governmental organization — a voluntary group with a social mission that operates independently from the government.",
  },
  {
    question: "Women's Empowerment in Rural Areas",
    answer:
      "Our initiative fosters independence, education, and entrepreneurship among women in rural regions.",
  },
  {
    question: "How can you join us?",
    answer: `Simply contact us via WhatsApp at ${config.primaryPhone} or visit our Contact page.`,
  },
  {
    question: "How can I open an NGO in India?",
    answer:
      "Opening an NGO involves fulfilling legal requirements, obtaining approvals, and building organizational capacity to create lasting social impact.",
  },
];

const impactStats = [
  { value: "12+", label: "वर्षों की सेवा" },
  { value: "500+", label: "परिवारों को सहायता" },
  { value: "4", label: "मुख्य कार्यक्रम" },
  { value: "2", label: "शहर — फर्रुखाबाद व कानपुर" },
];

function ScrollReveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, inView] = useInView({ threshold: 0.12 });
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

const Homepage = () => {
  const [expandedFAQs, setExpandedFAQs] = useState({});
  const [images, setImages] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    const resetHorizontalScroll = () => {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
      }
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;
    };

    resetHorizontalScroll();
    window.addEventListener("load", resetHorizontalScroll);
    window.addEventListener("resize", resetHorizontalScroll);

    return () => {
      window.removeEventListener("load", resetHorizontalScroll);
      window.removeEventListener("resize", resetHorizontalScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/images`);
        const contentType = response.headers.get("content-type") || "";
        if (!response.ok || !contentType.includes("application/json")) {
          return;
        }
        setImages(await response.json());
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width >= 1024) setSlidesToShow(4);
      else if (width >= 768) setSlidesToShow(3);
      else if (width >= 480) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  useEffect(() => {
    const resetHorizontalScroll = () => {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
      }
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;
    };

    resetHorizontalScroll();
    const timer = setTimeout(resetHorizontalScroll, 150);
    return () => clearTimeout(timer);
  }, [slidesToShow]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleFAQ = (index) => {
    setExpandedFAQs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    variableWidth: false,
    adaptiveHeight: false,
  };

  return (
    <div className="homepage">
      <Seo
        {...PAGE_SEO.home}
        includeOrgSchema
      />

      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Hero */}
      <section className="hero-banner">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${g9})` }}
          aria-hidden="true"
        />
        <div className="hero-shapes" aria-hidden="true">
          <span className="shape shape-1" />
          <span className="shape shape-2" />
          <span className="shape shape-3" />
        </div>
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-badge animate-in" style={{ animationDelay: "0.1s" }}>
              ✦ Farrukhabad, Uttar Pradesh
            </span>
            <h1 className="animate-in" style={{ animationDelay: "0.25s" }}>
              निस्वार्थ प्रयास
            </h1>
            <p
              className="hero-tagline animate-in"
              style={{ animationDelay: "0.4s" }}
            >
              एक कदम मानवता की ओर
            </p>
            <p
              className="hero-description animate-in"
              style={{ animationDelay: "0.55s" }}
            >
              समाज में समानता, शिक्षा और सामाजिक उत्थान को प्रोत्साहित करने के
              लिए समर्पित एक गैर-लाभकारी संगठन।
            </p>
            <div
              className="hero-actions animate-in"
              style={{ animationDelay: "0.7s" }}
            >
              <Link to="/online-connectus" className="btn btn-primary btn-glow">
                हमसे जुड़ें
              </Link>
              <Link to="/india-ngo-about" className="btn btn-outline">
                हमारे बारे में
              </Link>
            </div>
          </div>
          <div className="scroll-indicator" aria-hidden="true">
            <span className="scroll-dot" />
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="impact-stats" ref={statsRef}>
        {impactStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`stat-card ${statsInView ? "stat-visible" : ""}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span className="stat-value">
              <AnimatedCounter value={stat.value} active={statsInView} />
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Journey timeline */}
      <section className="timeline-section">
        <ScrollReveal className="section-header">
          <span className="section-tag">Journey</span>
          <h2>हमारी यात्रा</h2>
          <p>2014 से आज तक — समाज सेवा का सफर</p>
        </ScrollReveal>
        <div className="timeline-track">
          {NGO_TIMELINE.map((item) => (
            <div
              key={item.year}
              className={`timeline-item ${item.highlight ? "timeline-item--highlight" : ""}`}
            >
              <div className="timeline-marker">
                <span className="timeline-dot" />
              </div>
              <div className="timeline-card">
                <span className="timeline-year">{item.year}</span>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <ScrollReveal className="section-header">
          <span className="section-tag">Our Programs</span>
          <h2>हमारे कार्यक्रम</h2>
          <p>समुदाय के विकास के लिए हमारी प्रमुख पहल</p>
        </ScrollReveal>
        <div className="services-grid">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 100}>
              <Link to={service.link} className="service-card">
                <div className="service-image-wrap">
                  <img src={service.image} alt={service.alt} loading="lazy" />
                  <span className="service-overlay">
                    <span className="service-icon">{service.icon}</span>
                    <span className="service-cta">और जानें →</span>
                  </span>
                </div>
                <h3>{service.title}</h3>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section">
        <ScrollReveal className="section-header">
          <span className="section-tag">Gallery</span>
          <h2>NGO Work Gallery</h2>
          <p>हमारे सामाजिक कार्यों की झलक</p>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div className="gallery-slider-wrap">
            <Slider key={slidesToShow} {...sliderSettings}>
              {galleryImages.map((img, index) => (
                <div key={index} className="gallery-slide">
                  <div className="gallery-frame">
                    <img src={img} alt={`NGO work ${index + 1}`} loading="lazy" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </ScrollReveal>
      </section>

      {/* Work highlights */}
      <section className="highlights-section">
        <ScrollReveal className="section-header">
          <span className="section-tag">Impact</span>
          <h2>हमारा प्रभाव</h2>
          <p>समाज में सकारात्मक परिवर्तन लाने के हमारे प्रयास</p>
        </ScrollReveal>
        <div className="highlights-grid">
          {workHighlights.map((item, i) => (
            <ScrollReveal key={item.title} delay={(i % 3) * 120}>
              <article className="highlight-card">
                <div className="highlight-image-wrap">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="highlight-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
          {images.map((image, index) => (
            <ScrollReveal key={`upload-${index}`} delay={(index % 3) * 120}>
              <article className="highlight-card highlight-card--dynamic">
                <div className="highlight-image-wrap">
                  <img
                    src={`${SERVER_URL}/uploads/${image.imageData}`}
                    alt={image.title || `Uploaded photo ${index + 1}`}
                    loading="lazy"
                  />
                </div>
                <div className="highlight-body">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Mission */}
      <ScrollReveal>
        <section className="mission-section">
          <div className="mission-inner">
            <span className="mission-icon">🙏</span>
            <p>
              निस्वार्थ प्रयास एक सामाजिक संगठन है जो समाज में सकारात्मक परिवर्तन
              लाने के उद्देश्य से समर्पित है। हमारा मिशन है समाज में समानता,
              शिक्षा, और सामाजिक उत्थान को प्रोत्साहित करना।
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="cta-section">
          <div className="cta-card">
            <h2>Ready to Join Us?</h2>
            <p>समाज सेवा में अपना योगदान दें — आज ही हमसे संपर्क करें</p>
            <Link to="/online-connectus" className="btn btn-primary btn-glow">
              Contact Us
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <section className="faq-section">
        <ScrollReveal className="section-header">
          <span className="section-tag">FAQ</span>
          <h2>Frequently Asked Questions</h2>
        </ScrollReveal>
        <ul className="faq-list">
          {faqs.map((faq, index) => (
            <ScrollReveal
              key={index}
              as="li"
              className={`faq-item ${expandedFAQs[index] ? "open" : ""}`}
              delay={index * 60}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={!!expandedFAQs[index]}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{expandedFAQs[index] ? "−" : "+"}</span>
              </button>
              <div className="faq-answer-wrap">
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </ScrollReveal>
          ))}
        </ul>
      </section>

      {/* Quote */}
      <ScrollReveal>
        <blockquote className="quote-block">
          <span className="quote-mark">"</span>
          निस्वार्थ प्रयास में, हम समाज में इन विविध पहलों और सेवाओं के माध्यम
          से सकारात्मक और सतत परिवर्तन लाने के समर्थ हैं।
        </blockquote>
      </ScrollReveal>

      {/* About summary */}
      <ScrollReveal>
        <section className="about-summary">
          <h2>निस्वार्थ प्रयास | एक कदम मानवता की ओर</h2>
          <p>
            नैतिक इच्छाशक्ति, समाज सेवा और समृद्धि के प्रति समर्पण — ये सिद्धांत
            हमारे एनजीओ के मूल आधार हैं।
          </p>
          <ul className="values-list">
            {["समाज की सेवा", "सामाजिक परिवर्तन", "आत्मसमर्पण", "सहयोग का माध्यम"].map(
              (val, i) => (
                <li key={val} style={{ animationDelay: `${i * 0.1}s` }}>
                  {val}
                </li>
              )
            )}
          </ul>
        </section>
      </ScrollReveal>

      {/* Contact */}
      <section className="contact-section">
        <ScrollReveal className="section-header">
          <span className="section-tag">Get in Touch</span>
          <h2>Contact Us</h2>
        </ScrollReveal>
        <div className="contact-grid">
          {[
            {
              label: "Mobile",
              content: (
                <a href={`tel:${config.primaryPhone}`}>{config.primaryPhone}</a>
              ),
            },
            {
              label: "WhatsApp",
              content: (
                <a href={`https://wa.me/${config.primaryPhone}`}>
                  <img src={whatsappIcon} alt="WhatsApp" className="contact-icon" />
                  {config.primaryPhone}
                </a>
              ),
            },
            {
              label: "Email",
              content: (
                <a href="mailto:nishwarthaprays@gmail.com">
                  nishwarthaprays@gmail.com
                </a>
              ),
            },
            {
              label: "Address",
              content: <p>रामपुर ढपरपुर, चिलसरा रोड, फर्रुखाबाद</p>,
            },
          ].map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 80}>
              <div className="contact-card">
                <span className="contact-label">{item.label}</span>
                {item.content}
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={200}>
          <a
            href="https://m.facebook.com/nirottamSinghrajput81"
            target="_blank"
            rel="noopener noreferrer"
            className="facebook-btn"
          >
            <img src={facebook} alt="Facebook" className="contact-icon" />
            Connect on Facebook
          </a>
        </ScrollReveal>
      </section>

      <a
        href={`https://wa.me/${config.primaryPhone}`}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span className="whatsapp-pulse" aria-hidden="true" />
        <img src={whatsappIcon} alt="WhatsApp" />
      </a>
    </div>
  );
};

export default Homepage;
