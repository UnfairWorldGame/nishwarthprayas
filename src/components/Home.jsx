import React, { useState } from "react";
import "./styles/home.css"; // Import your CSS stylesheet

import whatsappIcon from "./images/whatsapplogo.jpg";
import p3 from "./images/p3.jpeg";
import p2 from "./images/p2.jpeg";
import p1 from "./images/p1.jpeg";
import g8 from "./images/g8.jpeg";
import g7 from "./images/g7.jpeg";
import g6 from "./images/g6.jpeg";
import g5 from "./images/g5.jpeg";
import g4 from "./images/g4.jpeg";
// import g1 from "./images/g1.jpeg";
import g9 from "./images/g9.jpeg";
import m1 from "./images/m1.jpg";
import a1 from "./images/g9.jpeg";
import a2 from "./images/g3.jpeg";
import a3 from "./images/g2.jpeg";
// import sell from "./images/sell.png";
// import buy from "./images/buy.jpg";
// import store from "./images/store.jpg";
// import buyy from "./images/buyy.jpg";

import Slider from "react-slick";
import { Link } from "react-router-dom";
import Seo from "./Seo";
import { PAGE_SEO } from "./seoConfig";
import config from "./config";

const Home = () => {
  // Define the trending articles data
 
  const faqs = [
    {
      question: "​What is Nishwarthaprayas??",
      answer:
        "​It is an NGO. Our commitment extends beyond individual programs; we are deeply involved in 'Engaging in Social Works' to address the diverse needs of our communities. Through a spectrum of initiatives, ranging from community development projects to advocacy and awareness campaigns, we strive to tackle various social issues.",
    },
    {
      question: "​What is NGO? ",
      answer:
        "NGO stands for non-governmental organization. While there is no universally agreed-upon definition of an NGO, typically it is a voluntary group or institution with a social mission, which operates independently from the government.",
    },
    {
      question: "Women's Empowerment in Rural Areas",
      answer:
        "We recognize the pivotal role women play in the growth and sustainability of communities. Our 'Women's Empowerment in Rural Areas' initiative is dedicated to fostering independence, education, and entrepreneurship among women in rural regions.",
    },
    {
      question: "​How you can join us?",
      answer: "Simply contact us. Whatsapp no 8173893121 ",
    },
    // Add more FAQ items as needed
  ];
  // State to track FAQ expansion
  const [expandedFAQs, setExpandedFAQs] = useState({});

  // Function to toggle FAQ expansion
  const toggleFAQ = (index) => {
    setExpandedFAQs((prevExpandedFAQs) => ({
      ...prevExpandedFAQs,
      [index]: !prevExpandedFAQs[index],
    }));
  };

  // brand names
  const brands = [
    { name: "", imageUrl: a3 },
    { name: "", imageUrl: p3 },
    { name: "", imageUrl: a2 },
    { name: "", imageUrl: g4 },
    { name: "", imageUrl: g5 },
    { name: "", imageUrl: g6 },
    { name: "", imageUrl: g7 },
    { name: "", imageUrl: g8 },
    { name: "", imageUrl: g9 },
    { name: "", imageUrl: p3 },
    { name: "", imageUrl: p1 },
    { name: "", imageUrl: p2 },
    { name: "", imageUrl: g4 },
    { name: "", imageUrl: g5 },
    { name: "", imageUrl: g6 },
    { name: "", imageUrl: g7 },
    { name: "", imageUrl: g8 },
    { name: "", imageUrl: g9 },

    // Add more brand entries as needed
  ];

  // Slick slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of visible slides at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Auto-advance speed in milliseconds
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="home-container">
      <Seo {...PAGE_SEO.home} />
       {/* connect card */}
       <div className="contact-container">
        <section className="contact">
          <h1>Contact Us</h1>
          <p>
            Mobile: <a href={`tel:${config.primaryPhone}`}>{config.primaryPhone}</a>
          </p>
          <p>
            Whatsapp No:{" "}
            <img
              src={whatsappIcon}
              alt="WhatsApp Icon"
              style={{
                verticalAlign: "middle",
                marginRight: "8px",
                height: "20px",
              }}
            />{" "}
            <a href={`https://wa.me/${config.primaryPhone}`}>{config.primaryPhone}</a>
          </p>
          <p className="contact-email">
            You can Mail us:{" "}
            <a href="mailto:nishwarthaprays@gmail.com">nishwarthaprays@gmail.com</a>
          </p>
        </section>
      </div>
      {/* Device Selection with Links */}
      <section className="device-selection-section">
        <div className="device-links">
          <Link to="#">
            <img src={g9} alt="Mobile Repair" />
            <p>मुफ्त कोचिंग</p>
          </Link>
          <Link to="#">
            <img src={a2} alt="Laptop Repair" />
            <p>बाढ़ प्रभावित क्षेत्रों में खाद्य वितरण</p>
          </Link>
          <Link to="#">
            <img src={m1} alt="Tablet Repair" />
            <p>महिला सशक्तिकरण</p>
          </Link>
          <Link to="#">
            <img src={a3} alt="Tablet Repair" />
            <p>ग्रामीण विकास कार्य</p>
          </Link>
        </div>
      </section>
     
      {/* Brand Names and Images Slider */}
      <section className="brand-names-slider">
        <h2>Photo Gallary</h2>
        <Slider {...sliderSettings}>
          {brands.map((brand, index) => (
            <div key={index} className="brand-item">
              <img src={brand.imageUrl} alt={brand.name} />
            </div>
          ))}
        </Slider>
      </section>

      {/* Hero Section */}
      <section className="hero-section">
        <img src={a1} alt="Technician at work" />
        <h2>मुफ्त कोचिंग </h2>
        <p>
          हम विद्यार्थियों को मुफ्त कोचिंग सेवाएं प्रदान करते हैं ताकि वे उच्च
          शिक्षा में सफलता प्राप्त कर सकें। हम उन्हें अच्छी शिक्षा, मार्गदर्शन
          और शैक्षणिक साधनों की पहुंच प्रदान करते हैं।
        </p>
        {/* <section className="hero-section"> */}
        <img src={a2} alt="Technician at work" />
        <h2>बाढ़ प्रभावित क्षेत्रों में खाद्य वितरण</h2>
        <p>
          आपदा के समय, खाद्य सामग्री की कमी से प्रभावित क्षेत्रों को हम खाद्य
          सामग्री प्रदान करने के लिए समर्पित हैं। हमारी समर्पित टीम निरंतर
          प्रयास करती है कि आपदा प्रभावित समुदायों को तत्काल सहायता और राहत
          प्राप्त हो।
        </p>
        {/* <section className="hero-section"> */}
        <img src={a3} alt="Technician at work" />
        <h2> ग्रामीण विकास कार्य </h2>
        <p>
          हम ग्रामीण क्षेत्रों में स्थायी परिवर्तन लाने के लिए परियोजनाओं पर काम
          करते हैं। हम सुनिश्चित करना चाहते हैं कि गांवों में सामाजिक, आर्थिक और
          आधारिक सुविधाओं में सुधार हो।
        </p>
        <img src={p1} alt="Technician at work" />
        <h2> कपड़े वितरण </h2>
        <p>
          निस्वार्थ प्रयास द्वारा कपड़ों का वितरण एक महत्वपूर्ण सेवा है जो आपदा
          से प्रभावित क्षेत्रों और जरूरतमंद लोगों की मदद के लिए की जाती है। इस
          उपकरण के माध्यम से, उन लोगों को वस्त्र प्रदान किए जाते हैं जो आर्थिक
          रूप से कमजोर हैं या जिन्हें विशेष परिस्थितियों में सहायता की आवश्यकता
          है।
        </p>
        <img src={p2} alt="Technician at work" />
        <h2> ग्रामीण विकास कार्य </h2>
        <p>
          हम ग्रामीण क्षेत्रों में स्थायी परिवर्तन लाने के लिए परियोजनाओं पर काम
          करते हैं। यह व्यावसायिक संगठनों, स्थानीय अधिकारियों
          और स्थानीय निकायों के साथ सहयोग के रूप में किया जाता है ताकि इस सेवा
          को जिन लोगों की आवश्यकता है, उन्हें सही समय पर पहुंचा सके।
        </p>
        <img src={p3} alt="Technician at work" />
        <h2> मेला आयोजन: </h2>
        <p>
          निस्वार्थ प्रयास द्वारा आयोजित मेला एक सामूहिक उत्सव होता है जो समुदाय
          के सदस्यों को एक स्थान पर आमंत्रित करता है। यहाँ स्थानीय व्यापारियों
          और उद्यमियों को अपने उत्पादों को प्रदर्शित करने और बेचने का मौका मिलता
          है। मेले में खिलौने, वस्त्र, गहने, खाद्य आदि की खरीदारी की जा सकती है।
        </p>
        {/* <Link to="/online-mobile-repair" className="cta-link">
          Mobile Repair
        </Link>
        <Link to="/online-laptop-repair" className="cta-link">
          Laptop Repair
        </Link>
        <Link to="/online-laptop-repair" className="cta-link">
          Teblet Repair
        </Link>
        <Link to="/online-laptop-repair" className="cta-link">
          Desktop Repair
        </Link> */}
      </section>

      {/* Introduction */}
      <section className="introduction-section">
        <p>
          निस्वार्थ प्रयास एक सामाजिक संगठन है जो समाज में सकारात्मक परिवर्तन
          लाने के उद्देश्य से समर्पित है। हमारा मिशन है समाज में समानता, शिक्षा,
          और सामाजिक उत्थान को प्रोत्साहित करना। हम विभिन्न क्षेत्रों में सेवाएं
          प्रदान करके समुदाय के विकास में योगदान देने का प्रयास करते हैं।
        </p>
      </section>

      {/* Appointment Booking */}
      <section className="appointment-booking-section">
        <p className="cta-text">Ready to Join Us? Join Us now!</p>
        <Link to="/online-connectus" className="cta-link">
          Contact Us
        </Link>
        {/* <p>
          Our easy appointment system allows for in-home repairs. Here's how it
          works:
        </p>
        <ol>
          <li>Choose your device type</li>
          <li>Select your device model</li>
          <li>Pick a convenient time slot</li>
          <li>Our technician will arrive at your location</li>
        </ol> */}
      </section>
      {/* Frequently Asked Questions */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <ul>
          {faqs.map((faq, index) => (
            <li key={index}>
              <button
                className={`faq-toggle ${
                  expandedFAQs[index] ? "expanded" : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                {expandedFAQs[index] ? "−" : "+"}
              </button>
              <strong>{faq.question}</strong>
              {expandedFAQs[index] && <p>{faq.answer}</p>}
            </li>
          ))}
        </ul>
        <button className="load-more-button">Load More FAQs</button>
      </section>
      {/* Trending Articles */}
      {/* <section className="trending-articles-section">
        <h2>Trending Articles</h2>
        <ul>
          {trendingArticles.map((article, index) => (
            <li key={index}>
              <img src={article.imageUrl} alt={article.title} />
              <h3>{article.title}</h3>
              <a href={article.link} className="read-more-link">
                Read More
              </a>
            </li>
          ))}
        </ul>
      </section> */}
      {/* Trust and Assurance */}
      <section className="trust-assurance-section">
        <div className="certifications">
          <img src={a1} alt="Certification 1" />
          <img src={a2} alt="Certification 2" />
        </div>
        <p>
          निस्वार्थ प्रयास में, हम समाज में इन विविध पहलों और सेवाओं के माध्यम
          से सकारात्मक और सतत परिवर्तन लाने के समर्थ हैं। प्रत्येक कार्यक्रम एक
          अर्थपूर्ण और सतत परिवर्तन लाने की दिशा में तैयार किया गया है, जो
          समानता, शिक्षा, और समुदाय विकास को प्रोत्साहित करता है।.
        </p>
      </section>

      {/* // RepairTechies Section */}
      <section className="repair-techies-section">
        <h2>निस्वार्थ प्रयास | एक कदम मानवता की ओर </h2>
        <p>
          नैतिक इच्छाशक्ति, समाज सेवा और समृद्धि के प्रति समर्पण - ये सिद्धांत
          हमारे एनजीओ के मूल आधार हैं। हमारा एनजीओ निश्वार्थ प्रयास, समाज में
          सकारात्मक बदलाव लाने और समृद्धि के संकल्प से जुड़ा हुआ है। हम समाज में
          सामानता, शिक्षा के अधिकार, महिला सशक्तिकरण, ग्रामीण विकास, और आपदा
          प्रभावित क्षेत्रों में सहायता के क्षेत्र में कार्यरत हैं। हमारा मिशन
          उन अंधकार क्षेत्रों में रोशनी लाना है, जहां समाज की आवश्यकताएं अधूरी
          हैं। हम सहायता प्रदान करके, जागरूकता फैलाकर, और साथ होकर समाज को सशक्त
          बनाने के प्रयासों में संलग्न हैं। हमारा उद्देश्य एक समृद्ध समाज बनाना
          है, जो सभी को समान अवसर प्रदान करता है और हर व्यक्ति के जीवन को
          सुधारता है। आम जनता की सेवा के लिए समर्पित, हम निश्वार्थ प्रयास में एक
          सकारात्मक बदलाव लाने के लिए आगे बढ़ते हैं।
        </p>

        <h3>Why join निस्वार्थ प्रयास?</h3>
        <p>
          नैतिक इच्छाशक्ति, समाज सेवा और व्यक्तिगत विकास के लिए एक सामाजिक संगठन
          जैसे एनजीओ में शामिल होना व्यक्तियों के लिए एक महत्वपूर्ण और सार्थक
          कदम होता है। इससे आप समाज में सक्रिय भूमिका निभाते हैं और विभिन्न
          क्षेत्रों में सेवा प्रदान करके उसमें सहायता करते हैं, जैसे शिक्षा,
          स्वास्थ्य, आपदा से प्रभावित क्षेत्रों में मदद, और सामुदायिक विकास। यह
          समर्पण और सेवाभाव आत्मा को निखारता है, जिससे आप खुद को समृद्ध और
          संवेदनशील मानते हैं। इससे समाज में सकारात्मक परिवर्तन लाने के लिए एक
          अवसर बनता है और साथ ही अनगिनत नए कौशलों को सीखने का मौका भी मिलता है।
          इसके तहत, आप समूह और समुदाय का हिस्सा बनते हैं, जो समाज में सकारात्मक
          परिवर्तन लाने में मदद करता है और व्यक्तिगत और सामाजिक स्तर पर आपकी
          विकासशीलता को बढ़ावा देता है।
        </p>
        <h3>How Does निस्वार्थ प्रयास Work?</h3>
        <p>
          एनजीओ (गैर-सरकारी संगठन) एक सामाजिक संगठन होता है जो समाज के विभिन्न
          मुद्दों पर काम करता है। यह संगठन स्वयंसेवकों और सहायक संगठनों के साथ
          मिलकर विभिन्न क्षेत्रों में कार्य करता है। एनजीओ के कार्यों में
          शिक्षा, स्वास्थ्य, आपदा से प्रभावित क्षेत्रों में मदद, महिला
          सशक्तिकरण, ग्रामीण विकास, वातावरण संरक्षण और अन्य क्षेत्र शामिल होते
          हैं। ये संगठन डोनेशन, स्वयंसेवा और सरकारी योजनाओं के माध्यम से अपने
          कार्यों को संचालित करते हैं। ये संगठन समाज में सकारात्मक परिवर्तन
          लाने, असहाय लोगों की मदद करने, और उन्हें अच्छी जीवन शैली के लिए संबल
          प्रदान करने का काम करते हैं।
        </p>
        <h3>Why NGO?</h3>
        <p>
          एनजीओ, निश्वार्थ प्रयास, समाज के विभिन्न पहलुओं में सक्रिय रहकर,
          व्यक्तियों को सामाजिक स्थिति में सुधार करने और समृद्धि के मार्ग पर
          अग्रसर होने में सहायता प्रदान करता है। हमारा अभियान समाज में जागरूकता
          बढ़ाने, शिक्षा के महत्त्व को सामाजिक रूप से प्रोत्साहित करने, महिलाओं
          की स्थिति में सुधार लाने और ग्रामीण क्षेत्रों में विकास के लिए काम
          करता है। हम आपदा प्रभावित क्षेत्रों में भोजन वितरण, स्वास्थ्य सेवाएं
          और शिक्षा की सुविधाएँ प्रदान करके सहायता पहुंचाते हैं। हमारा उद्देश्य
          समाज में सामान्य विकास के लिए साझेदारी और समर्थन प्रदान करना है। हम
          व्यक्तियों को समृद्ध और खुशहाल जीवन जीने के लिए सक्षम बनाने के लिए
          प्रेरित करते हैं, जिससे एक बेहतर भविष्य बना सके। हमारे एनजीओ का संकल्प
          है समाज में सकारात्मक परिवर्तन लाना और सबका समृद्धि में सहायता करना।
        </p>
        <ul>
          <li>समाज की सेवा:</li>
          <li>सामाजिक परिवर्तन:</li>
          <li>आत्मसमर्पण:</li>
          <li>सहयोग का माध्यम:</li>
        </ul>
        <p>
          हमारा उद्देश्य समाज में सामान्य विकास के लिए साझेदारी और समर्थन प्रदान
          करना है। हम व्यक्तियों को समृद्ध और खुशहाल जीवन जीने के लिए सक्षम
          बनाने के लिए प्रेरित करते हैं, जिससे एक बेहतर भविष्य बना सके। हमारे
          एनजीओ का संकल्प है समाज में सकारात्मक परिवर्तन लाना और सबका समृद्धि
          में सहायता करना।
        </p>
      </section>
    </div>
  );
};

export default Home;
