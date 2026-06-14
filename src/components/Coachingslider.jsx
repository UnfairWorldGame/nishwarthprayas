import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import im1 from "./SliderImages/im1.jpg";
import im2 from "./SliderImages/im2.jpg";
import im3 from "./SliderImages/im3.jpg";
import im4 from "./SliderImages/im4.jpg";
import { Helmet } from "react-helmet";
import "./styles/slider.css";
const Coachingslider = () => {
  const sliderRef = useRef(null);

  const photos = [
    {
      image: im1,
      description: "मुफ्त कोचिंग एक सामाजिक पहल है जो विद्यार्थियों को शिक्षा में मदद करती है",
    },
    {
      image: im2,
      description: "शिक्षा के लिए वित्तीय संकट से जूझ रहे छात्रों को मुफ्त में मार्गदर्शन और साथीकरण प्रदान",
    },
    {
      image: im3,
      description: "समाज सेवा मुफ्त कोचिंग की योजना ",
    },
    {
      image: im4,
      description: "Description for Photo 2",
    },
    // Add more photos and their descriptions as needed
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 50000,
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
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
      <div className="max-w-lg w-full relative">
        <Slider {...settings} ref={sliderRef}>
          {photos.map((photo, index) => (
            <div key={index}>
              <img
                src={photo.image}
                alt={`Photos ${index + 1}`}
                className="w-full"
              />
              <p className="text-center mt-2">{photo.description}</p>
            </div>
          ))}
        </Slider>
        <button
          className="absolute  top-1/2 transform -translate-y-1/2 left-4 bg-gray-500  py-2 px-4 rounded"
          onClick={goToPrev}
        >
          Prev
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-gray-500  py-2 px-4 rounded"
          onClick={goToNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Coachingslider;
