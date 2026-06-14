import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"; // Import Helmet from the react-helmet library

import "../components/styles/header.css";

function Header() {
  return (
    <div className="div1">
      <Helmet>
        <title>निस्वार्थ प्रयास | एक कदम मानवता की ओर</title>
        <meta
          name="description"
          content="Ngo in farrukhabad,ngo in kanpur,ngo in uttarpradesh,farrukhabad ngo, ngo in UP, ngo"
        />
        <meta
          property="og:title"
          content="NiswarthPrays: Helping the needy in Farrukhabad and Kanpur Ngo in farrukhabad kanpur,farrukhabad ngo in uttarpradesh ngo in UP ngo"
        />
        <meta
          property="og:description"
          content="NiswarthPrays is a non-profit organization that provides food, shelter, and education to the needy in Farrukhabad and Kanpur, India.Ngo in farrukhabad kanpur,farrukhabad ngo in uttarpradesh ngo in UP ngo"
        />
        <meta
          property="og:image"
          content="https://farrukhabadngo.com/fevicon.ico"
        />
      </Helmet>

      <nav>
        <div className="header">
          <ul>
            <li style={{ fontSize: "1rem", fontWeight: "bold" }}>
              <Link to={"/"}>Nishwartha Prayas</Link>
            </li>

            {/* <li>
            <Link to={"/temp"}>TestingPage</Link>
          </li> */}
            {/* <li>
            <Link to={"/online-mobile-repair"}>Mobile-Repair</Link>
          </li>
          */}

            <li>
              <Link to={"/ngo-service-page"}>NGO-Work</Link>
            </li>
            <li>
              <Link to={"/ngo-family-page"}>NGO-Family</Link>
            </li>
            <li>
              <Link to={"/ngo-latest-news-blog"}>News</Link>
            </li>
            <li>
              <Link to={"/india-ngo-about"}>About</Link>
            </li>
            <li>
              <Link to={"/ngo-blog"}>BLog</Link>
            </li>
            <li>
              <Link to={"/india-ngo-contact"}>Contact</Link>
            </li>
            {/* <li>
              <Link to={"/ngo-ai-chat-bot"}>Chat-bot</Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
