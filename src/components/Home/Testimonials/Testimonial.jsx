// Install required packages using:
// npm install react-slick slick-carousel

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./testimonials.css"; // Ensure you have corresponding CSS for styling

const testimonials = [
  {
    name: "Taylor Jay",
    title: "Founder & CEO",
    companyLogo: "/path-to-rave-rebel-logo.png",
    testimonial:
      "Love the design and customization of InstaShow. We have used various Instagram apps for Shopify in the past but they would...",
    rating: 5,
  },
  {
    name: "Garrett Kite",
    title: "Business Strategist",
    companyLogo: "/path-to-kite-media-logo.png",
    testimonial:
      "I have used Elfsight's InstaShow Instagram feed plugin for a couple years and have nothing but good things to say about it. I like the...",
    rating: 5,
  },
  {
    name: "Marion Campbell",
    title: "Entrepreneur",
    companyLogo: "/path-to-izettle-logo.png",
    testimonial:
      "A very well done plugin that now works exactly as advertised. Leaps and bounds above any other Facebook plugin I've ever worked with...",
    rating: 5,
  },
  {
    name: "Ruby King",
    title: "International Economist",
    companyLogo: "/path-to-recurly-logo.png",
    testimonial:
      "This Instagram Feed app saved my day! It's very easy to install and the online configurator makes it really easy to customize it. Nice job...",
    rating: 5,
  },
];

const nextArrow = (
  <svg
    width="20"
    height="40"
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.17196 5.00002L0.342957 2.17202L1.75696 0.757019L5.99996 5.00002L1.75696 9.24302L0.342957 7.82802L3.17196 5.00002Z"
      fill="#ff0000"
    />
  </svg>
);
const prevArrow = (
  <svg
    width="20"
    height="40"
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.82804 4.99998L5.65704 7.82798L4.24304 9.24298L4.3869e-05 4.99998L4.24304 0.756981L5.65704 2.17198L2.82804 4.99998Z"
      fill="#ff0000"
    />
  </svg>
);
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}>
      <span>{nextArrow}</span>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}>
      <span>{prevArrow}</span>
    </div>
  );
}
const settings = {
  dots: true,
  infinite: true,

  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const TestimonialCard = ({ testimonial, reviews, loading }) => {
  return (
    <div className="testimonial-card">
      <div className="personl_details">
        <img
          src={testimonial.image}
          alt="company logo"
          className="company-logo"
        />
        <div className="name_start_box">
          <h3>{testimonial.name}</h3>
          <div className="flex items-center gap-1 pt-2">
            {[1, 2, 3, 4, 5].slice(0, testimonial.review_count).map((index) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                key={index}>
                <path
                  d="M13.9317 9.93301C13.7159 10.1422 13.6167 10.4447 13.6659 10.7413L14.4067 14.8413C14.4692 15.1888 14.3226 15.5405 14.0317 15.7413C13.7467 15.9497 13.3676 15.9747 13.0567 15.808L9.36591 13.883C9.23758 13.8147 9.09508 13.778 8.94925 13.7738H8.72341C8.64508 13.7855 8.56841 13.8105 8.49841 13.8488L4.80675 15.783C4.62425 15.8747 4.41758 15.9072 4.21508 15.8747C3.72175 15.7813 3.39258 15.3113 3.47341 14.8155L4.21508 10.7155C4.26425 10.4163 4.16508 10.1122 3.94925 9.89967L0.940079 6.98301C0.688412 6.73884 0.600912 6.37217 0.715912 6.04134C0.827579 5.71134 1.11258 5.47051 1.45675 5.41634L5.59841 4.81551C5.91341 4.78301 6.19008 4.59134 6.33175 4.30801L8.15674 0.566341C8.20008 0.483008 8.25591 0.406341 8.32341 0.341341L8.39841 0.283008C8.43758 0.239674 8.48258 0.203841 8.53258 0.174674L8.62341 0.141341L8.76508 0.0830078H9.11591C9.42924 0.115508 9.70508 0.303008 9.84925 0.583008L11.6984 4.30801C11.8317 4.58051 12.0909 4.76967 12.3901 4.81551L16.5317 5.41634C16.8817 5.46634 17.1742 5.70801 17.2901 6.04134C17.3992 6.37551 17.3051 6.74217 17.0484 6.98301L13.9317 9.93301Z"
                  fill="#FFB900"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="testimonial">{testimonial.testimonial}</p>
    </div>
  );
};

const Testimonials = ({ reviews }) => {
  // console.log("🚀 ~ reviews:", reviews);
  return (
    <div className="testimonials-container">
      <h2>What our clients say</h2>
      <Slider {...settings}>
        {reviews?.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
