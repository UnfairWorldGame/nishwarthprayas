// Card.js
import React from "react";
import { Helmet } from "react-helmet"; // Import Helmet from the react-helmet library

const Card = ({ imageUrl, title }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
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
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-32 object-cover mb-2"
      />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default Card;
