import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "./Seo";
import { PAGE_SEO } from "./seoConfig";
import "./styles/donate.css";
import g9 from "./images/g9.jpeg";
import whatsappIcon from "./images/whatsapplogo.png";
import config, {
  getWhatsAppUrl,
  isDonationBankConfigured,
  isDonationUpiConfigured,
} from "./config";
import { useInView } from "./hooks/useInView";

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

const CAUSES = [
  {
    id: "education",
    icon: "📚",
    title: "शिक्षा सहायता",
    description: "मुफ्त कोचिंग, किताबें और छात्रों के लिए शैक्षणिक सामग्री",
  },
  {
    id: "food",
    icon: "🍲",
    title: "खाद्य व राहत",
    description: "आपदा प्रभावित परिवारों को भोजन और आवश्यक सामग्री",
  },
  {
    id: "clothing",
    icon: "👕",
    title: "वस्त्र वितरण",
    description: "जरूरतमंद बच्चों और परिवारों को कपड़े और राहत सामग्री",
  },
  {
    id: "women",
    icon: "💪",
    title: "महिला सशक्तिकरण",
    description: "प्रशिक्षण, स्वावलंबन और स्किल डेवलपमेंट कार्यक्रम",
  },
  {
    id: "rural",
    icon: "🌾",
    title: "ग्रामीण विकास",
    description: "गांवों में सतत विकास और सामुदायिक परियोजनाएं",
  },
  {
    id: "general",
    icon: "🤝",
    title: "सामान्य कोष",
    description: "जहाँ सबसे अधिक जरूरत हो — NGO टीम द्वारा उपयोग",
  },
];

const IMPACT = [
  { amount: "₹500", text: "1 छात्र के लिए 1 महीने की कोचिंग सामग्री" },
  { amount: "₹1,000", text: "2 परिवारों को राहत किट (खाद्य + स्वच्छता)" },
  { amount: "₹2,500", text: "5 बच्चों के लिए स्कूल किट और किताबें" },
  { amount: "₹5,000", text: "1 गांव में स्वास्थ्य शिविर का आयोजन" },
];

const FAQS = [
  {
    q: "दान कहाँ उपयोग होता है?",
    a: "आपका योगदान सीधे हमारे कार्यक्रमों — शिक्षा, राहत, महिला सशक्तिकरण और ग्रामीण विकास — में जाता है। हर राशि पारदर्शी रूप से रिकॉर्ड की जाती है।",
  },
  {
    q: "कौन-से भुगतान तरीके उपलब्ध हैं?",
    a: "UPI, बैंक ट्रांसfer, WhatsApp के माध्यम से समन्वय, और ऑनलाइन UPI/कार्ड/नेटबैंकिंग (Razorpay) — सभी विकल्प उपलब्ध हैं।",
  },
  {
    q: "क्या मुझे रसीद मिलेगी?",
    a: "हाँ। भुगतान के बाद WhatsApp या ईमेल पर रसीद भेजी जाती है। 80G कर छूट के लिए PAN और पता विवरण साझा करें।",
  },
  {
    q: "क्या विदेश से दान कर सकते हैं?",
    a: "हाँ — ऑनलाइन भुगतान या बैंक ट्रांसfer के माध्यम से। विवरण के लिए WhatsApp पर संपर्क करें।",
  },
];

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, inView] = useInView({ threshold: 0.08 });
  return (
    <Tag
      ref={ref}
      className={`donate-reveal ${inView ? "donate-revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function getDefaultPaymentMethod() {
  if (isDonationUpiConfigured()) return "upi";
  if (isDonationBankConfigured()) return "bank";
  return "whatsapp";
}

function Donate() {
  const upiReady = isDonationUpiConfigured();
  const bankReady = isDonationBankConfigured();
  const razorpayEnabled = Boolean(config.razorpayKeyId);

  const [selectedCause, setSelectedCause] = useState("general");
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(getDefaultPaymentMethod);
  const [copiedField, setCopiedField] = useState("");
  const [payStatus, setPayStatus] = useState("idle");
  const [payError, setPayError] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");

  const causeLabel =
    CAUSES.find((c) => c.id === selectedCause)?.title || "सामान्य कोष";

  const parsedCustomAmount = customAmount.trim() ? Number(customAmount) : null;
  const effectiveAmount =
    parsedCustomAmount !== null && !Number.isNaN(parsedCustomAmount)
      ? parsedCustomAmount
      : amount;

  const formattedAmount = effectiveAmount.toLocaleString("en-IN");

  const donationMessage = useMemo(
    () =>
      `नमस्ते निस्वार्थ प्रयास,\n\nमैं ₹${formattedAmount} का दान करना चाहता/चाहती हूँ।\nकार्यक्रम: ${causeLabel}\nनाम: ${donorName || "—"}\n\nकृपया भुगतान विवरण साझा करें।`,
    [formattedAmount, causeLabel, donorName]
  );

  const whatsappDonateUrl = getWhatsAppUrl(donationMessage);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
  }, []);

  useEffect(() => {
    if (paymentMethod === "upi" && !upiReady) {
      setPaymentMethod(getDefaultPaymentMethod());
    }
    if (paymentMethod === "bank" && !bankReady) {
      setPaymentMethod(getDefaultPaymentMethod());
    }
    if (paymentMethod === "online" && !razorpayEnabled) {
      setPaymentMethod(getDefaultPaymentMethod());
    }
  }, [paymentMethod, upiReady, bankReady, razorpayEnabled]);

  const copyText = useCallback(async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    } catch {
      setCopiedField("");
    }
  }, []);

  const handlePresetAmount = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  const validateDonation = () => {
    if (!effectiveAmount || effectiveAmount < 10) {
      return "कृपया कम से कम ₹10 की वैध राशि दर्ज करें।";
    }
    if (!donorName.trim()) {
      return "कृपया अपना नाम दर्ज करें।";
    }
    return "";
  };

  const handleOnlinePay = async () => {
    const validationError = validateDonation();
    if (validationError) {
      setPayError(validationError);
      return;
    }

    setPayError("");
    setPayStatus("loading");

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setPayError("भुगतान सेवा लोड नहीं हो सकी। कृपया UPI या WhatsApp का उपयोग करें।");
      setPayStatus("idle");
      return;
    }

    try {
      const res = await fetch(`${config.serverUrl}/donate/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveAmount,
          cause: selectedCause,
          name: donorName.trim(),
          email: donorEmail.trim(),
          phone: donorPhone.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "ऑर्डर बनाने में समस्या आई।");
      }

      const options = {
        key: data.keyId || config.razorpayKeyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "निस्वार्थ प्रयास",
        description: `${causeLabel} — सामाजिक कार्य`,
        order_id: data.orderId,
        prefill: {
          name: donorName.trim(),
          email: donorEmail.trim(),
          contact: donorPhone.trim(),
        },
        theme: { color: "#0a5c83" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${config.serverUrl}/donate/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaySuccess(true);
              setPayStatus("success");
            } else {
              setPayError("भुगतान सत्यापन विफल। कृपया WhatsApp पर संपर्क करें।");
              setPayStatus("idle");
            }
          } catch {
            setPaySuccess(true);
            setPayStatus("success");
          }
        },
        modal: {
          ondismiss: () => setPayStatus("idle"),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setPayError(
        err.message || "ऑनलाइन भुगतान उपलब्ध नहीं है। UPI या WhatsApp से दान करें।"
      );
      setPayStatus("idle");
    }
  };

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    const validationError = validateDonation();
    if (validationError) {
      setPayError(validationError);
      return;
    }

    setPayError("");
    setFormStatus("sending");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "DonatePledge",
        name: donorName.trim(),
        email: donorEmail.trim(),
        phone: donorPhone.trim(),
        amount: String(effectiveAmount),
        cause: selectedCause,
        method: paymentMethod,
      }).toString(),
    })
      .then(() => {
        setFormStatus("sent");
        setTimeout(() => setFormStatus("idle"), 5000);
      })
      .catch(() => setFormStatus("idle"));
  };

  const upiDeepLink = upiReady
    ? `upi://pay?pa=${encodeURIComponent(config.donationUpiId)}&pn=${encodeURIComponent("Nishwarth Prayas")}&am=${effectiveAmount}&cu=INR&tn=${encodeURIComponent(causeLabel)}`
    : whatsappDonateUrl;

  return (
    <div className="donate-page">
      <Seo {...PAGE_SEO.donate} />

      <section className="donate-hero">
        <div className="donate-hero-bg" style={{ backgroundImage: `url(${g9})` }} />
        <div className="donate-hero-overlay">
          <div className="donate-hero-content">
            <span className="donate-badge">Donate · दान करें</span>
            <h1>एक छोटा योगदान, बड़ा प्रभाव</h1>
            <p className="donate-tagline">समाज सेवा में अपना हिस्सा दें</p>
            <p className="donate-intro">
              आपका दान सीधे फर्रुखाबाद और कानपुर में जरूरतमंद परिवारों, छात्रों
              और महिलाओं तक पहुँचता है।
            </p>
            <div className="donate-hero-actions">
              <a href="#donate-form" className="donate-btn donate-btn--primary">
                अभी दान करें
              </a>
              <a
                href={whatsappDonateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="donate-btn donate-btn--outline"
              >
                <img src={whatsappIcon} alt="" className="donate-wa-icon" />
                WhatsApp पर संपर्क
              </a>
            </div>
          </div>
        </div>
      </section>

      {paySuccess ? (
        <section className="donate-success-banner">
          <div className="donate-success-inner">
            <span className="donate-success-icon" aria-hidden="true">
              ✓
            </span>
            <div>
              <h2>धन्यवाद! आपका दान सफल रहा</h2>
              <p>
                ₹{formattedAmount} — {causeLabel} के लिए प्राप्त हुआ। रसीद जल्द ही
                ईमेल/WhatsApp पर भेजी जाएगी।
              </p>
            </div>
            <button
              type="button"
              className="donate-btn donate-btn--primary"
              onClick={() => {
                setPaySuccess(false);
                setPayStatus("idle");
              }}
            >
              और दान करें
            </button>
          </div>
        </section>
      ) : null}

      <section className="donate-main" id="donate-form">
        <div className="donate-container">
          <Reveal className="donate-panel donate-panel--form">
            <h2>दान विवरण</h2>
            <p className="donate-panel-sub">
              Choose cause & amount · कार्यक्रम और राशि चुनें
            </p>

            <div className="donate-summary" aria-live="polite">
              <div className="donate-summary-row">
                <span>कार्यक्रम</span>
                <strong>{causeLabel}</strong>
              </div>
              <div className="donate-summary-row donate-summary-row--amount">
                <span>राशि</span>
                <strong>₹{formattedAmount}</strong>
              </div>
            </div>

            <div className="donate-section">
              <span className="donate-label">कार्यक्रम चुनें</span>
              <div className="donate-causes" role="group" aria-label="Donation cause">
                {CAUSES.map((cause) => (
                  <button
                    key={cause.id}
                    type="button"
                    className={`donate-cause${selectedCause === cause.id ? " is-selected" : ""}`}
                    onClick={() => setSelectedCause(cause.id)}
                    aria-pressed={selectedCause === cause.id}
                  >
                    <span className="donate-cause-icon" aria-hidden="true">
                      {cause.icon}
                    </span>
                    <span className="donate-cause-title">{cause.title}</span>
                    <span className="donate-cause-desc">{cause.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="donate-section">
              <span className="donate-label">राशि (₹)</span>
              <div className="donate-amounts">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={`donate-amount-btn${
                      !customAmount && amount === preset ? " is-selected" : ""
                    }`}
                    onClick={() => handlePresetAmount(preset)}
                    aria-pressed={!customAmount && amount === preset}
                  >
                    ₹{preset.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
              <input
                type="number"
                className="donate-input donate-custom-amount"
                placeholder="अन्य राशि दर्ज करें (न्यूनतम ₹10)"
                min="10"
                step="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                aria-label="Custom donation amount"
              />
            </div>

            <div className="donate-section donate-donor-fields">
              <span className="donate-label">आपकी जानकारी</span>
              <input
                type="text"
                className="donate-input"
                placeholder="नाम *"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required
                autoComplete="name"
              />
              <input
                type="email"
                className="donate-input"
                placeholder="ईमेल (वैकल्पिक — रसीद के लिए)"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                autoComplete="email"
              />
              <input
                type="tel"
                className="donate-input"
                placeholder="मोबाइल (वैकल्पिक)"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>

            <div className="donate-section">
              <span className="donate-label">भुगतान का तरीका</span>
              <div className="donate-methods" role="group" aria-label="Payment method">
                {upiReady ? (
                  <button
                    type="button"
                    className={`donate-method${paymentMethod === "upi" ? " is-active" : ""}`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    UPI
                  </button>
                ) : null}
                {bankReady ? (
                  <button
                    type="button"
                    className={`donate-method${paymentMethod === "bank" ? " is-active" : ""}`}
                    onClick={() => setPaymentMethod("bank")}
                  >
                    बैंक ट्रांसfer
                  </button>
                ) : null}
                {razorpayEnabled ? (
                  <button
                    type="button"
                    className={`donate-method${paymentMethod === "online" ? " is-active" : ""}`}
                    onClick={() => setPaymentMethod("online")}
                  >
                    ऑनलाइन भुगतान
                  </button>
                ) : null}
                <button
                  type="button"
                  className={`donate-method${paymentMethod === "whatsapp" ? " is-active" : ""}`}
                  onClick={() => setPaymentMethod("whatsapp")}
                >
                  WhatsApp
                </button>
              </div>
            </div>

            {payError ? <p className="donate-error" role="alert">{payError}</p> : null}

            {paymentMethod === "upi" && upiReady ? (
              <div className="donate-payment-box">
                <h3>UPI से भुगतान</h3>
                <div className="donate-detail-row">
                  <span className="donate-detail-label">UPI ID</span>
                  <code className="donate-detail-value">{config.donationUpiId}</code>
                  <button
                    type="button"
                    className="donate-copy-btn"
                    onClick={() => copyText(config.donationUpiId, "upi")}
                  >
                    {copiedField === "upi" ? "कॉपी हो गया!" : "कॉपी"}
                  </button>
                </div>
                <p className="donate-payment-note">
                  ₹{formattedAmount} — {causeLabel} — UPI नोट में लिखें
                </p>
                <a href={upiDeepLink} className="donate-btn donate-btn--primary donate-pay-action">
                  UPI ऐप खोलें
                </a>
              </div>
            ) : null}

            {paymentMethod === "bank" && bankReady ? (
              <div className="donate-payment-box">
                <h3>बैंक ट्रांसfer</h3>
                {[
                  { label: "खाताधारक", value: config.donationAccountHolder, key: "holder" },
                  { label: "बैंक", value: config.donationBankName, key: "bank" },
                  { label: "खाता संख्या", value: config.donationAccountNumber, key: "account" },
                  { label: "IFSC", value: config.donationIfsc, key: "ifsc" },
                ].map(({ label, value, key }) => (
                  <div className="donate-detail-row" key={key}>
                    <span className="donate-detail-label">{label}</span>
                    <code className="donate-detail-value">{value}</code>
                    <button
                      type="button"
                      className="donate-copy-btn"
                      onClick={() => copyText(value, key)}
                    >
                      {copiedField === key ? "कॉपी!" : "कॉपी"}
                    </button>
                  </div>
                ))}
                <p className="donate-payment-note">
                  ट्रांसfer के बाद WhatsApp पर स्क्रीनशॉट भेजें — रसीद जारी की जाएगी।
                </p>
              </div>
            ) : null}

            {paymentMethod === "online" && razorpayEnabled ? (
              <div className="donate-payment-box">
                <h3>सुरक्षित ऑनलाइन भुगतान</h3>
                <p className="donate-payment-note">
                  UPI, डेबिट/क्रेडिट कार्ड, नेटबैंकिंग — Razorpay द्वारा सुरक्षित
                </p>
                <button
                  type="button"
                  className="donate-btn donate-btn--primary donate-pay-action"
                  onClick={handleOnlinePay}
                  disabled={payStatus === "loading"}
                >
                  {payStatus === "loading"
                    ? "प्रोसेस हो रहा है..."
                    : `₹${formattedAmount} — अभी भुगतान करें`}
                </button>
              </div>
            ) : null}

            {paymentMethod === "whatsapp" ? (
              <div className="donate-payment-box">
                <h3>WhatsApp पर दान करें</h3>
                <p className="donate-payment-note">
                  {!upiReady && !bankReady
                    ? "हमारी टीम आपको UPI/बैंक विवरण, राशि और रसीद प्रक्रिया में तुरंत मदद करेगी।"
                    : "हमारी टीम आपको UPI/बैंक विवरण और रसीद प्रक्रिया में मदद करेगी।"}
                </p>
                <a
                  href={whatsappDonateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="donate-btn donate-btn--whatsapp donate-pay-action"
                >
                  <img src={whatsappIcon} alt="" className="donate-wa-icon" />
                  WhatsApp पर संदेश भेजें
                </a>
              </div>
            ) : null}

            <form className="donate-pledge-form" onSubmit={handlePledgeSubmit}>
              <p className="donate-pledge-note">
                भुगतान के बाद यह फॉर्म भरें — हम आपकी रसीद और 80G दस्तावेज़ तैयार करेंगे।
              </p>
              <button
                type="submit"
                className="donate-btn donate-btn--secondary"
                disabled={formStatus === "sending"}
              >
                {formStatus === "sent"
                  ? "✓ विवरण भेज दिया गया"
                  : formStatus === "sending"
                    ? "भेजा जा रहा है..."
                    : "दान विवरण सबमिट करें"}
              </button>
            </form>
          </Reveal>

          <Reveal className="donate-panel donate-panel--info" delay={100}>
            <h3>आपके दान का प्रभाव</h3>
            <ul className="donate-impact-list">
              {IMPACT.map((item) => (
                <li key={item.amount}>
                  <strong>{item.amount}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="donate-trust-badges">
              <div className="donate-trust-item">
                <span aria-hidden="true">🔒</span>
                <p>100% सुरक्षित भुगतान</p>
              </div>
              <div className="donate-trust-item">
                <span aria-hidden="true">📋</span>
                <p>80G कर छूट उपलब्ध</p>
              </div>
              <div className="donate-trust-item">
                <span aria-hidden="true">✦</span>
                <p>2014 से Farrukhabad में सेवा</p>
              </div>
            </div>

            <div className="donate-contact-card">
              <h4>सहायता चाहिए?</h4>
              <a href={`tel:${config.primaryPhone}`}>📞 {config.primaryPhone}</a>
              <a href={getWhatsAppUrl()}>💬 WhatsApp: {config.primaryPhone}</a>
              <a href="mailto:nishwarthaprays@gmail.com">✉️ nishwarthaprays@gmail.com</a>
              <Link to="/india-ngo-contact">संपर्क पृष्ठ →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="donate-faq">
        <div className="donate-container donate-container--narrow">
          <Reveal>
            <h2>अक्सर पूछे जाने वाले प्रश्न</h2>
            <div className="donate-faq-list">
              {FAQS.map((faq) => (
                <details key={faq.q} className="donate-faq-item">
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="donate-cta">
        <Reveal>
          <h2>स्वयंसेवक बनकर भी जुड़ें</h2>
          <p>समय, कौशल, या संसाधन — हर योगदान मायने रखता है</p>
          <div className="donate-cta-actions">
            <Link to="/online-connectus" className="donate-btn donate-btn--primary">
              हमसे जुड़ें
            </Link>
            <Link to="/ngo-service-page" className="donate-btn donate-btn--outline-light">
              हमारे कार्यक्रम देखें
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default Donate;
