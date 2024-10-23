import PropTypes from "prop-types";
import "./FeaturedBox.css";

const FeaturedBox = ({ text, subtext, bgImg, type }) => {
  return (
    <div className="w-full h-[340px] lg:h-[370px] featured-box pt-5 lg:pt-[60px] pl-8 relative">
      <h3 className=" text-[20px] lg:text-[26px] text-black font-bold">
        {" "}
        {text}{" "}
      </h3>
      <p
        className={` text-base lg:text-[18px] text-black font-medium ${
          type === "coach" ? "lg:max-w-[195px]" : ""
        }`}
      >
        {" "}
        {subtext}{" "}
      </p>

      {/* figure */}
      <div
        className={` ${
          type === "coach"
            ? "w-[260px] h-[250px] lg:h-[318px]"
            : "w-[360px] h-[230px] lg:h-[300px]"
        }  absolute bottom-0 ${
          type === "coach"
            ? " left-1/2 -translate-x-1/2 lg:right-6 lg:left-auto lg:translate-x-0"
            : " left-1/2 -translate-x-1/2 lg:right-3 lg:left-auto lg:translate-x-0"
        }`}
      >
        <img
          className="w-full h-full object-contain lg:object-cover"
          src={bgImg}
          alt=""
        />
      </div>
    </div>
  );
};

FeaturedBox.propTypes = {
  text: PropTypes.string,
  subtext: PropTypes.string,
  bgImg: PropTypes.string,
  type: PropTypes.string,
};

export default FeaturedBox;
