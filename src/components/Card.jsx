// Card.js
import React from "react";

const Card = ({ imageUrl, title }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-32 object-cover mb-2"
        loading="lazy"
      />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default Card;
