import PropTypes from "prop-types";

const AuthTop = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-[22px] font-bold text-[#0E0E0E] leading-8">
        {" "}
        {title}{" "}
      </h3>
      <p className="text-base  text-[#0E0E0E] leading-[26px]"> {subtitle} </p>
    </div>
  );
};

AuthTop.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default AuthTop;
