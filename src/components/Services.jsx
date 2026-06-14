import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./styles/services.css";
import config from "./config";
import { useInView } from "./hooks/useInView";
import AnimatedCounter from "./AnimatedCounter";

import im1 from "./ServiceImages/im1.jpeg";
import im2 from "./ServiceImages/im2.jpeg";
import im3 from "./ServiceImages/im3.jpeg";
import im4 from "./ServiceImages/im4.jpeg";
import im5 from "./ServiceImages/im5.jpeg";
import im6 from "./ServiceImages/im6.jpeg";
import im7 from "./ServiceImages/im7.jpeg";
import im8 from "./ServiceImages/im8.jpeg";
import im9 from "./ServiceImages/im9.jpeg";

const serviceStats = [
  { value: "9+", label: "सेवा क्षेत्र" },
  { value: "500+", label: "लाभान्वित परिवार" },
  { value: "2", label: "शहर — फर्रुखाबाद व कानपुर" },
  { value: "10+", label: "वर्षों की सेवा" },
];

const CATEGORIES = [
  { id: "all", label: "सभी" },
  { id: "education", label: "शिक्षा" },
  { id: "relief", label: "राहत कार्य" },
  { id: "empowerment", label: "सशक्तिकरण" },
  { id: "community", label: "सामुदायिक" },
];

const HOW_WE_WORK = [
  {
    step: "01",
    title: "जरूरत की पहचान",
    text: "ग्रामीण और शहरी communities में सीधे संपर्क से वास्तविक जरूरतों को समझते हैं।",
  },
  {
    step: "02",
    title: "योजना और सहयोग",
    text: "स्वयंसेवकों, स्थानीय नेताओं और साझेदारों के साथ मिलकर कार्ययोजना बनाते हैं।",
  },
  {
    step: "03",
    title: "कार्यान्वयन",
    text: "शिक्षा, राहत, सशक्तिकरण और विकास कार्यक्रमों को मैदान में उतारते हैं।",
  },
  {
    step: "04",
    title: "सतत प्रभाव",
    text: "समुदाय की प्रगति को लंबे समय तक बनाए रखने के लिए निरंतर सहायता देते हैं।",
  },
];

const services = [
  {
    image: im3,
    title: "मुफ्त कोचिंग",
    category: "education",
    categoryLabel: "शिक्षा",
    icon: "📚",
    description:
      "गरीब और जरूरतमंद छात्रों को अंग्रेजी, गणित और अन्य विषयों में निःशुल्क कोचिंग — ताकि उन्हें उच्च शिक्षा और रोजगार के बेहतर अवसर मिल सकें।",
    highlights: ["अंग्रेजी व गणित की कक्षाएं", "ग्रामीण छात्रों को प्राथमिकता", "मार्गदर्शन और अध्ययन सामग्री"],
    alt: "Free coaching for underprivileged students",
  },
  {
    image: im6,
    title: "कपड़े वितरण",
    category: "relief",
    categoryLabel: "राहत कार्य",
    icon: "👕",
    description:
      "आपदा प्रभावित क्षेत्रों और आर्थिक रूप से कमजोर परिवारों तक कपड़ों का वितरण — ठंड, बारिश और कठिन मौसम में सुरक्षा प्रदान करना।",
    highlights: ["आपदा प्रभावित क्षेत्र", "जरूरतमंद परिवारों को वस्त्र", "मौसमी सहायता अभियान"],
    alt: "Clothing distribution for disaster-affected families",
  },
  {
    image: im7,
    title: "महिला सशक्तिकरण",
    category: "empowerment",
    categoryLabel: "सशक्तिकरण",
    icon: "💪",
    description:
      "ग्रामीण महिलाओं को शिक्षा, प्रशिक्षण और उद्यमिता के अवसर — समाज में समानता और आर्थिक स्वावलंबन की दिशा में।",
    highlights: ["कौशल प्रशिक्षण शिविर", "स्वावलंबन कार्यक्रम", "अधिकारों के प्रति जागरूकता"],
    alt: "Women empowerment programs in rural areas",
  },
  {
    image: im8,
    title: "ग्रामीण विकास",
    category: "community",
    categoryLabel: "सामुदायिक",
    icon: "🌾",
    description:
      "ग्रामीण क्षेत्रों में सामाजिक, आर्थिक और बुनियादी सुविधाओं में सुधार — स्थायी और समावेशी विकास के लिए परियोजनाएं।",
    highlights: ["गांव-स्तरीय विकास योजनाएं", "स्थानीय सहभागिता", "बुनियादी सुविधाओं में सुधार"],
    alt: "Social programs for rural development",
  },
  {
    image: im5,
    title: "जागरूकता अभियान",
    category: "community",
    categoryLabel: "सामुदायिक",
    icon: "📢",
    description:
      "स्वास्थ्य, शिक्षा, अधिकारों और सामाजिक मुद्दों पर जागरूकता — समुदाय को सूचित निर्णय लेने में सक्षम बनाना।",
    highlights: ["सामुदायिक बैठकें", "शिक्षा व स्वास्थ्य जागरूकता", "सामाजिक मुद्दों पर चर्चा"],
    alt: "Awareness campaigns in local communities",
  },
  {
    image: im9,
    title: "मेला आयोजन",
    category: "community",
    categoryLabel: "सामुदायिक",
    icon: "🎪",
    description:
      "सामुदायिक मेले जो स्थानीय व्यापारियों, कलाकारों और उद्यमियों को अपने उत्पाद प्रदर्शित करने और समुदाय को एकत्रित करने का मंच देते हैं।",
    highlights: ["स्थानीय उद्यमियों को मंच", "सांस्कृतिक कार्यक्रम", "सामुदायिक एकता"],
    alt: "Community fair organized by the NGO",
  },
  {
    image: im1,
    title: "सामुदायिक सेवा",
    category: "community",
    categoryLabel: "सामुदायिक",
    icon: "🤝",
    description:
      "स्वयंसेवकों और समुदाय के सदस्यों को एक मंच पर लाकर सामूहिक अभियानों की योजना — शिक्षा, स्वास्थ्य और सामाजिक कार्यों में सहयोग।",
    highlights: ["स्वयंसेवक नेटवर्क", "सामूहिक अभियान", "स्थानीय सहयोग"],
    alt: "Community service volunteers planning campaigns",
  },
  {
    image: im2,
    title: "पारिवारिक सहायता",
    category: "relief",
    categoryLabel: "राहत कार्य",
    icon: "🕊️",
    description:
      "कठिन समय में पीड़ित परिवारों के साथ खड़े होना — संवेदना, समर्थन और व्यावहारिक सहायता के माध्यम से।",
    highlights: ["आपातकालीन सहायता", "परिवार के साथ सहानुभूति", "सामुदायिक समर्थन"],
    alt: "NGO members offering support to families in need",
  },
  {
    image: im4,
    title: "नेतृत्व के साथ सहयोग",
    category: "community",
    categoryLabel: "सामुदायिक",
    icon: "🏛️",
    description:
      "स्थानीय नेताओं और प्रतिनिधियों के साथ मिलकर समुदाय की जरूरतों पर कार्य — नीति और कार्यक्रमों में सामाजिक हित को आगे बढ़ाना।",
    highlights: ["स्थानीय नेतृत्व से समन्वय", "सामुदायिक प्रतिनिधित्व", "नीति में सामाजिक आवाज"],
    alt: "NGO collaboration with community leaders",
  },
];

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, inView] = useInView({ threshold: 0.08 });
  return (
    <Tag
      ref={ref}
      className={`svc-reveal ${inView ? "svc-revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Services() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return services;
    return services.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="services-page">
      <Helmet>
        <title>NGO Work & Services | निस्वार्थ प्रयास</title>
        <meta
          name="description"
          content="Explore Nishwarthaprayas NGO services — free coaching, disaster relief, women empowerment, rural development, and community programs in Farrukhabad and Kanpur."
        />
        <meta
          property="og:title"
          content="Nishwarthaprayas NGO Services — Farrukhabad & Kanpur"
        />
        <meta
          property="og:description"
          content="Food distribution, clothing aid, free coaching, awareness campaigns, and rural development by Nishwarthaprayas NGO."
        />
        <meta property="og:image" content="https://farrukhabadngo.com/fevicon.ico" />
      </Helmet>

      {/* Hero */}
      <section className="services-hero">
        <div className="services-hero-bg" style={{ backgroundImage: `url(${im5})` }} aria-hidden="true" />
        <div className="services-hero-overlay">
          <div className="services-hero-content">
            <span className="services-badge">हमारा कार्य</span>
            <h1>NGO Services</h1>
            <p className="services-tagline">एक कदम मानवता की ओर</p>
            <p className="services-intro">
              निस्वार्थ प्रयास फर्रुखाबाद और कानपुर क्षेत्र में शिक्षा, आपदा राहत,
              महिला सशक्तिकरण, ग्रामीण विकास और सामुदायिक कार्यक्रमों के माध्यम
              से समाज सेवा में समर्पित है।
            </p>
            <Link to="/online-connectus" className="btn btn-primary btn-glow">
              सेवा में योगदान दें
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="services-stats" ref={statsRef}>
        {serviceStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`services-stat ${statsInView ? "stat-visible" : ""}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="services-stat-value">
              <AnimatedCounter value={stat.value} active={statsInView} />
            </span>
            <span className="services-stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* How we work */}
      <section className="services-process">
        <Reveal className="section-header">
          <span className="section-tag">Process</span>
          <h2>हम कैसे कार्य करते हैं</h2>
          <p>जरूरत से प्रभाव तक — हमारा समर्पित दृष्टिकोण</p>
        </Reveal>
        <div className="services-process-grid">
          {HOW_WE_WORK.map((item, i) => (
            <Reveal key={item.step} delay={i * 90} className="process-card">
              <span className="process-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Filter + Services grid */}
      <section className="services-grid-section">
        <Reveal className="section-header">
          <span className="section-tag">Programs</span>
          <h2>हमारी सेवाएँ</h2>
          <p>समाज के हर वर्ग तक पहुँचने के लिए हमारे प्रमुख कार्यक्रम</p>
        </Reveal>

        <div className="services-filters" role="tablist" aria-label="Service categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`services-filter-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="services-count">
          {filteredServices.length} कार्यक्रम
          {activeCategory !== "all" &&
            ` — ${CATEGORIES.find((c) => c.id === activeCategory)?.label}`}
        </p>

        <div className="services-grid">
          {filteredServices.map((service, index) => (
            <Reveal key={service.title} delay={(index % 3) * 100}>
              <article className="service-card">
                <div className="service-card-image">
                  <img src={service.image} alt={service.alt} loading="lazy" />
                  <span className="service-category">{service.categoryLabel}</span>
                  <span className="service-icon" aria-hidden="true">{service.icon}</span>
                </div>
                <div className="service-card-body">
                  <h3>{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                  <ul className="service-highlights">
                    {service.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Impact quote */}
      <Reveal>
        <section className="services-mission">
          <span className="mission-quote-mark">"</span>
          <p>
            हमारा उद्देश्य समाज में सामान्य विकास के लिए साझेदारी और समर्थन
            प्रदान करना है — व्यक्तियों को समृद्ध, सशक्त और खुशहाल जीवन जीने
            के लिए सक्षम बनाना।
          </p>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="services-cta">
          <div className="services-cta-card">
            <h2>इन सेवाओं में योगदान दें</h2>
            <p>
              स्वयंसेवक बनें, सहयोग करें, या सेवा प्राप्त करें — हर कदम मायने
              रखता है।
            </p>
            <div className="services-cta-actions">
              <Link to="/online-connectus" className="btn btn-primary btn-glow">
                हमसे जुड़ें
              </Link>
              <Link to="/india-ngo-contact" className="btn btn-outline">
                संपर्क करें
              </Link>
              <Link to="/ngo-family-page" className="btn btn-outline">
                हमारा परिवार
              </Link>
            </div>
            <p className="services-cta-contact">
              WhatsApp:{" "}
              <a href={`https://wa.me/${config.primaryPhone}`}>{config.primaryPhone}</a>
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

export default Services;
